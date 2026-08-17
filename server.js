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
  const players = (rooms.get(room) || []).filter((player) => Date.now() - player.time < 10000);
  rooms.set(room, players);
  const activeIds = new Set(players.map((player) => player.playerId));
  if (!activeIds.has(roomOwners.get(room))) roomOwners.set(room, players[0]?.playerId || "");
  return players;
}

function send(res, status, body, type = "text/plain; charset=utf-8") {
  res.writeHead(status, { "content-type": type, "cache-control": "no-store" });
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
  if (url.pathname === "/api/rooms" && req.method === "GET") {
    return send(res, 200, JSON.stringify([...rooms.entries()]), "application/json; charset=utf-8");
  }
  if (url.pathname === "/api/heartbeat" && req.method === "POST") {
    readJson(req, (error, payload) => {
      if (error) return send(res, 400, "Bad heartbeat");
      const room = payload.room || "potato-lan";
      const playerId = String(payload.playerId || payload.name || "Potato").slice(0, 80);
      const list = activeRoomPlayers(room);
      const next = list.filter((player) => player.playerId !== playerId);
      next.push({ playerId, name: payload.name || "Potato", team: payload.team || "T", time: Date.now() });
      rooms.set(room, next);
      if (!roomOwners.get(room)) roomOwners.set(room, playerId);
      send(res, 200, JSON.stringify({ room, players: next, ownerId: roomOwners.get(room), config: roomConfigs.get(room) || null }), "application/json; charset=utf-8");
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
