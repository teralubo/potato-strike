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
    let body = "";
    req.on("data", (chunk) => { body += chunk; });
    req.on("end", () => {
      const payload = JSON.parse(body || "{}");
      const room = payload.room || "potato-lan";
      const list = rooms.get(room) || [];
      const next = list.filter((p) => Date.now() - p.time < 10000 && p.name !== payload.name);
      next.push({ name: payload.name || "Potato", team: payload.team || "T", time: Date.now() });
      rooms.set(room, next);
      send(res, 200, JSON.stringify({ room, players: next }), "application/json; charset=utf-8");
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
