const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = Number(process.env.PORT || 8787);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
};

const rooms = new Map();
const audioEvents = new Map();
const roomOwners = new Map();
const roomConfigs = new Map();
const roomLobbyState = new Map();
const roomBans = new Map();
const roomKicks = new Map();

function readJson(req, callback) {
  let body = "";
  req.on("data", (chunk) => {
    if (body.length < 256000) body += chunk;
  });
  req.on("end", () => {
    try {
      callback(null, JSON.parse(body || "{}"));
    } catch (error) {
      callback(error);
    }
  });
}

function activeRoomPlayers(room) {
  const players = (rooms.get(room) || []).filter((player) => player.virtual || Date.now() - player.time < 10000);
  rooms.set(room, players);
  const activeIds = new Set(players.map((player) => player.playerId));
  if (!activeIds.has(roomOwners.get(room))) roomOwners.set(room, players[0]?.playerId || "");
  return players;
}

function cleanRoom(value) {
  return String(value || "potato-lan").slice(0, 80);
}

function cleanPlayer(payload = {}) {
  return {
    playerId: String(payload.playerId || payload.name || "Potato").slice(0, 80),
    name: String(payload.name || "Potato").slice(0, 40),
    team: payload.team === "CT" ? "CT" : "T",
    time: Date.now(),
    virtual: Boolean(payload.virtual),
  };
}

function upsertRoomPlayer(room, payload) {
  const player = cleanPlayer(payload);
  const next = activeRoomPlayers(room).filter((entry) => entry.playerId !== player.playerId);
  next.push(player);
  rooms.set(room, next);
  if (!roomOwners.get(room)) roomOwners.set(room, player.playerId);
  return player;
}

function lobbySnapshot(room) {
  const players = activeRoomPlayers(room);
  const lobby = roomLobbyState.get(room) || { status: "waiting", startedAt: 0 };
  return {
    room,
    players,
    ownerId: roomOwners.get(room) || "",
    config: roomConfigs.get(room) || null,
    status: lobby.status || "waiting",
    startedAt: Number(lobby.startedAt) || 0,
    bans: [...(roomBans.get(room) || new Map()).entries()].map(([playerId, name]) => ({ playerId, name })),
  };
}

function send(res, status, body, type = "text/plain; charset=utf-8") {
  res.writeHead(status, {
    "content-type": type,
    "cache-control": "no-store",
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET,POST,OPTIONS",
    "access-control-allow-headers": "content-type",
  });
  res.end(body);
}

function serveFile(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const clean = decodeURIComponent(url.pathname === "/" ? "/PotatoStrike.html" : url.pathname);
  const file = path.normalize(path.join(root, clean));
  if (!file.startsWith(root)) return send(res, 403, "Forbidden");
  fs.readFile(file, (err, data) => {
    if (err) return send(res, 404, "Not found");
    send(res, 200, data, types[path.extname(file)] || "application/octet-stream");
  });
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  if (req.method === "OPTIONS") return send(res, 204, "");
  if (url.pathname === "/api/rooms" && req.method === "GET") {
    const list = [...rooms.keys()].map((room) => lobbySnapshot(room)).filter((entry) => entry.players.length > 0);
    return send(res, 200, JSON.stringify(list), "application/json; charset=utf-8");
  }
  if (url.pathname === "/api/heartbeat" && req.method === "POST") {
    readJson(req, (error, payload) => {
      if (error) return send(res, 400, "Bad heartbeat");
      const room = cleanRoom(payload.room);
      if ((roomBans.get(room) || new Map()).has(String(payload.playerId || "").slice(0, 80))) return send(res, 403, "Player is banned from this LAN room");
      upsertRoomPlayer(room, payload);
      send(res, 200, JSON.stringify(lobbySnapshot(room)), "application/json; charset=utf-8");
    });
    return;
  }
  if (url.pathname === "/api/lobby" && req.method === "GET") {
    const room = cleanRoom(url.searchParams.get("room"));
    return send(res, 200, JSON.stringify(lobbySnapshot(room)), "application/json; charset=utf-8");
  }
  if (url.pathname === "/api/lobby" && req.method === "POST") {
    readJson(req, (error, payload) => {
      if (error) return send(res, 400, "Bad lobby request");
      const room = cleanRoom(payload.room);
      const action = String(payload.action || "join");
      const player = cleanPlayer(payload);
      const active = activeRoomPlayers(room);
      const ownerId = roomOwners.get(room) || "";
      if (!["create", "join", "leave", "transfer", "start", "add", "kick", "ban", "unban"].includes(action)) return send(res, 400, "Unknown lobby action");
      const bans = roomBans.get(room) || new Map();
      roomBans.set(room, bans);
      const kicks = roomKicks.get(room) || new Set();
      roomKicks.set(room, kicks);
      if (action === "join" && bans.has(player.playerId)) return send(res, 403, "Player is banned from this LAN room");
      if (action === "join" && kicks.has(player.playerId)) {
        kicks.delete(player.playerId);
        return send(res, 403, "Player was kicked from this LAN room");
      }
      if (action === "create" && ownerId && ownerId !== player.playerId && active.length) {
        return send(res, 409, "LAN room is already owned");
      }
      if (action === "leave") {
        rooms.set(room, active.filter((entry) => entry.playerId !== player.playerId));
        if (ownerId === player.playerId) roomOwners.set(room, rooms.get(room)[0]?.playerId || "");
        if (!rooms.get(room).length) {
          roomOwners.delete(room);
          roomConfigs.delete(room);
          roomLobbyState.delete(room);
          roomBans.delete(room);
          roomKicks.delete(room);
        }
        return send(res, 200, JSON.stringify(lobbySnapshot(room)), "application/json; charset=utf-8");
      }
      if (action === "transfer" && ownerId !== player.playerId) return send(res, 403, "Only lobby owner can transfer command");
      if (action === "start" && ownerId !== player.playerId) return send(res, 403, "Only lobby owner can start match");
      if (["add", "kick", "ban", "unban"].includes(action) && ownerId !== player.playerId) return send(res, 403, "Only lobby owner can manage players");
      if (["kick", "ban"].includes(action) && String(payload.targetId || "") === ownerId) return send(res, 400, "Lobby owner cannot remove themselves");
      upsertRoomPlayer(room, payload);
      if (action === "create") {
        roomOwners.set(room, player.playerId);
        roomLobbyState.set(room, { status: "waiting", startedAt: 0 });
        if (payload.config && typeof payload.config === "object") roomConfigs.set(room, payload.config);
      }
      if (action === "transfer") {
        const targetId = String(payload.targetId || "").slice(0, 80);
        if (!activeRoomPlayers(room).some((entry) => entry.playerId === targetId)) return send(res, 404, "Target player is not in lobby");
        roomOwners.set(room, targetId);
      }
      if (action === "add") {
        const guestId = String(payload.targetId || `local-${Date.now()}`).slice(0, 80);
        if (bans.has(guestId)) return send(res, 403, "Player is banned from this LAN room");
        upsertRoomPlayer(room, { playerId: guestId, name: payload.targetName || "LAN Player", team: payload.targetTeam, virtual: true });
      }
      if (action === "kick" || action === "ban") {
        const targetId = String(payload.targetId || "").slice(0, 80);
        const target = activeRoomPlayers(room).find((entry) => entry.playerId === targetId);
        rooms.set(room, activeRoomPlayers(room).filter((entry) => entry.playerId !== targetId));
        if (action === "kick" && targetId) kicks.add(targetId);
        if (action === "ban" && targetId) bans.set(targetId, target?.name || payload.targetName || targetId);
      }
      if (action === "unban") bans.delete(String(payload.targetId || "").slice(0, 80));
      if (action === "start") {
        if (payload.config && typeof payload.config === "object") roomConfigs.set(room, payload.config);
        roomLobbyState.set(room, { status: "started", startedAt: Date.now() });
      }
      return send(res, 200, JSON.stringify(lobbySnapshot(room)), "application/json; charset=utf-8");
    });
    return;
  }
  if (url.pathname === "/api/server-config" && req.method === "GET") {
    const room = String(url.searchParams.get("room") || "potato-lan").slice(0, 80);
    activeRoomPlayers(room);
    return send(res, 200, JSON.stringify({ room, ownerId: roomOwners.get(room) || "", config: roomConfigs.get(room) || null }), "application/json; charset=utf-8");
  }
  if (url.pathname === "/api/server-config" && req.method === "POST") {
    readJson(req, (error, payload) => {
      if (error) return send(res, 400, "Bad server config");
      const room = String(payload.room || "potato-lan").slice(0, 80);
      const playerId = String(payload.playerId || "").slice(0, 80);
      activeRoomPlayers(room);
      if (!playerId || roomOwners.get(room) !== playerId) return send(res, 403, "Only lobby owner can update server config");
      const config = payload.config && typeof payload.config === "object" ? payload.config : {};
      roomConfigs.set(room, config);
      return send(res, 200, JSON.stringify({ ok: true, room, ownerId: playerId, config }), "application/json; charset=utf-8");
    });
    return;
  }
  if (url.pathname === "/api/audio" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => { body += chunk; });
    req.on("end", () => {
      let payload = {};
      try {
        payload = JSON.parse(body || "{}");
      } catch {
        return send(res, 400, "Bad audio event");
      }
      const room = String(payload.room || "potato-lan").slice(0, 80);
      const list = audioEvents.get(room) || [];
      list.push({
        id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
        kind: String(payload.kind || "ui").slice(0, 40),
        x: Number(payload.x) || 0,
        y: Number(payload.y) || 0,
        weapon: String(payload.weapon || "").slice(0, 40),
        type: String(payload.type || "").slice(0, 30),
        playerId: String(payload.playerId || "").slice(0, 80),
        name: String(payload.name || "Potato").slice(0, 40),
        time: Date.now(),
      });
      audioEvents.set(room, list.filter((event) => Date.now() - event.time < 5000).slice(-96));
      send(res, 200, JSON.stringify({ ok: true }), "application/json; charset=utf-8");
    });
    return;
  }
  if (url.pathname === "/api/audio-events" && req.method === "GET") {
    const room = String(url.searchParams.get("room") || "potato-lan").slice(0, 80);
    const since = Number(url.searchParams.get("since") || 0);
    const list = (audioEvents.get(room) || []).filter((event) => event.time > since && Date.now() - event.time < 5000);
    return send(res, 200, JSON.stringify({ room, events: list, now: Date.now() }), "application/json; charset=utf-8");
  }
  serveFile(req, res);
});

server.listen(port, () => {
  console.log(`Potato Strike server: http://localhost:${port}`);
});
