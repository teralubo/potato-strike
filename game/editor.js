const canvas = document.getElementById("studio-canvas");
const ctx = canvas.getContext("2d");
const $ = (id) => document.getElementById(id);

const ui = {
  viewportMode: $("viewport-mode"),
  name: $("map-name"),
  list: $("map-list"),
  load: $("load-map"),
  newMap: $("new-map"),
  generate: $("generate-map"),
  save: $("save-map"),
  test: $("test-map"),
  exportMap: $("export-map"),
  importMap: $("import-map"),
  importFile: $("import-file"),
  textureFile: $("texture-file"),
  textureName: $("texture-name"),
  importTexture: $("import-texture"),
  assetFiles: $("asset-files"),
  importAssets: $("import-assets"),
  modCode: $("mod-code"),
  saveMod: $("save-mod"),
  gameMode: $("game-mode"),
  testGraphics: $("test-graphics"),
  matchSize: $("match-size"),
  defaultWeapon: $("default-weapon"),
  properties: $("properties"),
  objects: $("object-list"),
  assets: $("asset-list"),
  status: $("studio-status"),
};

const baseMaps = {
  dustyard: makeMap("Dustyard", 2200, 1480, 1),
  officepark: makeMap("Officepark", 2000, 1340, 2),
  cachebox: makeMap("Cachebox", 2180, 1380, 3),
  dust2: makeMap("Dust II style", 2250, 1500, 4),
  mirage: makeMap("Mirage style", 2180, 1460, 5),
  inferno: makeMap("Inferno style", 2050, 1580, 6),
  nuke: makeMap("Nuke style", 1980, 1380, 7),
  overpass: makeMap("Overpass style", 2300, 1520, 8),
  vertigo: makeMap("Vertigo style", 1900, 1320, 9),
  ancient: makeMap("Ancient style", 2180, 1540, 10),
  anubis: makeMap("Anubis style", 2240, 1480, 11),
  train: makeMap("Train style", 2360, 1420, 12),
};

let activeTool = "select";
let selectedId = "";
let drag = null;
let map = emptyMap();
let textures = loadJson("potatoStrikeStudioTextures", []);
let mods = loadJson("potatoStrikeStudioMods", []);
let files = loadJson("potatoStrikeStudioFiles", []);
let studioSettings = loadJson("potatoStrikeStudioSettings", {
  viewportMode: "2d",
  gameMode: "sandbox",
  testGraphics: "2d",
  matchSize: 5,
  defaultWeapon: "side-default",
});
studioSettings.viewportMode = studioSettings.viewportMode === "3d" ? "3d" : "2d";

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function loadJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
  } catch {
    return fallback;
  }
}

function saveJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function status(text) {
  ui.status.textContent = text;
}

function emptyMap() {
  return {
    name: "Studio Map",
    w: 2200,
    h: 1400,
    tSpawn: { x: 180, y: 1220 },
    ctSpawn: { x: 2020, y: 180 },
    sites: { A: { x: 1650, y: 1000, r: 115 }, B: { x: 560, y: 330, r: 110 } },
    meta: { gameMode: "sandbox", defaultWeapon: "side-default", matchSize: 5 },
    obstacles: [],
  };
}

function makeMap(name, w, h, seed) {
  const rand = seededRandom(`${name}-${seed}`);
  const obstacles = [];
  for (let i = 0; i < 12; i += 1) {
    obstacles.push({
      id: `obj-${seed}-${i}`,
      type: i % 3 === 0 ? "crate" : "wall",
      x: 180 + Math.floor(rand() * (w - 420)),
      y: 160 + Math.floor(rand() * (h - 360)),
      w: 90 + Math.floor(rand() * 260),
      h: 70 + Math.floor(rand() * 190),
      z: 96,
      rot: 0,
      color: i % 3 === 0 ? "#7d6648" : "#56614d",
    });
  }
  return {
    name,
    w,
    h,
    tSpawn: { x: 180, y: h - 180 },
    ctSpawn: { x: w - 180, y: 180 },
    sites: { A: { x: Math.floor(w * 0.74), y: Math.floor(h * 0.72), r: 115 }, B: { x: Math.floor(w * 0.32), y: Math.floor(h * 0.26), r: 110 } },
    meta: { gameMode: "sandbox", defaultWeapon: "side-default", matchSize: 5 },
    obstacles,
  };
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function normalizeStudioMap(rawMap) {
  const fallback = emptyMap();
  const source = rawMap && typeof rawMap === "object" ? rawMap : fallback;
  const w = clamp(Number(source.w) || fallback.w, 900, 5000);
  const h = clamp(Number(source.h) || fallback.h, 700, 4000);
  const point = (value, fallbackPoint) => ({
    x: clamp(Number(value?.x) || fallbackPoint.x, 24, w - 24),
    y: clamp(Number(value?.y) || fallbackPoint.y, 24, h - 24),
  });
  return {
    ...fallback,
    ...source,
    name: source.name || fallback.name,
    w,
    h,
    tSpawn: point(source.tSpawn, { x: 180, y: h - 180 }),
    ctSpawn: point(source.ctSpawn, { x: w - 180, y: 180 }),
    sites: {
      A: { ...point(source.sites?.A, { x: Math.floor(w * 0.74), y: Math.floor(h * 0.72) }), r: clamp(Number(source.sites?.A?.r) || 115, 48, 260) },
      B: { ...point(source.sites?.B, { x: Math.floor(w * 0.32), y: Math.floor(h * 0.26) }), r: clamp(Number(source.sites?.B?.r) || 110, 48, 260) },
    },
    meta: {
      ...fallback.meta,
      ...(source.meta || {}),
    },
    obstacles: (Array.isArray(source.obstacles) ? source.obstacles : []).map((obj, index) => ({
      id: obj.id || `obj-${Date.now().toString(36)}-${index}`,
      type: obj.type || "wall",
      x: clamp(Number(obj.x) || 0, 0, w - 12),
      y: clamp(Number(obj.y) || 0, 0, h - 12),
      w: clamp(Math.abs(Number(obj.w) || 96), 12, w),
      h: clamp(Math.abs(Number(obj.h) || 96), 12, h),
      z: clamp(Number(obj.z) || 64, 0, 512),
      rot: Number(obj.rot) || 0,
      color: obj.color || "#56614d",
      texture: obj.texture || "",
      script: obj.script || "",
    })),
  };
}

function seededRandom(seed) {
  let value = 2166136261;
  for (let i = 0; i < seed.length; i += 1) value = Math.imul(value ^ seed.charCodeAt(i), 16777619);
  return () => {
    value += value << 13; value ^= value >>> 7; value += value << 3; value ^= value >>> 17; value += value << 5;
    return ((value >>> 0) % 10000) / 10000;
  };
}

function userMaps() {
  return loadJson("potatoStrikeUserMaps", []);
}

function writeUserMaps(list) {
  saveJson("potatoStrikeUserMaps", list);
}

function refreshMapList() {
  ui.list.innerHTML = "";
  for (const [id, item] of Object.entries(baseMaps)) {
    const option = document.createElement("option");
    option.value = `base:${id}`;
    option.textContent = item.name;
    ui.list.appendChild(option);
  }
  for (const item of userMaps()) {
    const option = document.createElement("option");
    option.value = `user:${item.id}`;
    option.textContent = item.map.name || item.id;
    ui.list.appendChild(option);
  }
}

function fitCanvas() {
  const wrap = document.querySelector(".studio-canvas-wrap");
  wrap.dataset.view = studioSettings.viewportMode.toUpperCase();
  wrap.classList.toggle("preview-3d", studioSettings.viewportMode === "3d");
  if (studioSettings.viewportMode === "3d") {
    const rect = wrap.getBoundingClientRect();
    const width = Math.max(640, Math.floor(rect.width || window.innerWidth));
    const height = Math.max(420, Math.floor(rect.height || window.innerHeight));
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    return;
  }
  canvas.width = map.w;
  canvas.height = map.h;
  canvas.style.width = `${map.w}px`;
  canvas.style.height = `${map.h}px`;
}

function draw() {
  fitCanvas();
  if (studioSettings.viewportMode === "3d") {
    draw3dPreview();
    return;
  }
  draw2dEditor();
}

function draw2dEditor() {
  ctx.fillStyle = "#252b23";
  ctx.fillRect(0, 0, map.w, map.h);
  ctx.strokeStyle = "rgba(242,240,223,0.055)";
  ctx.lineWidth = 1;
  for (let x = 0; x < map.w; x += 64) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, map.h); ctx.stroke();
  }
  for (let y = 0; y < map.h; y += 64) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(map.w, y); ctx.stroke();
  }
  drawSite("A", map.sites.A, "#d7bd62");
  drawSite("B", map.sites.B, "#77b56f");
  drawSpawn("T", map.tSpawn, "#c48a45");
  drawSpawn("CT", map.ctSpawn, "#8ea9b8");
  for (const obj of map.obstacles) drawObject(obj);
}

function draw3dPreview() {
  const w = canvas.width;
  const h = canvas.height;
  const layout = isoLayout();
  const { originX, originY, scale } = layout;
  ctx.fillStyle = "#151916";
  ctx.fillRect(0, 0, w, h);
  const sky = ctx.createLinearGradient(0, 0, 0, h * 0.45);
  sky.addColorStop(0, "#3d555d");
  sky.addColorStop(0.7, "#27363a");
  sky.addColorStop(1, "#202620");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h * 0.45);
  drawIsoFloor(originX, originY, scale);
  const sorted = [...map.obstacles].sort((a, b) => (a.x + a.y) - (b.x + b.y));
  for (const obj of sorted) drawIsoBox(obj, originX, originY, scale);
  drawIsoMarker("A", map.sites.A, "#d7bd62", originX, originY, scale);
  drawIsoMarker("B", map.sites.B, "#77b56f", originX, originY, scale);
  drawIsoMarker("T", map.tSpawn, "#c48a45", originX, originY, scale);
  drawIsoMarker("CT", map.ctSpawn, "#8ea9b8", originX, originY, scale);
  drawViewLabel("3D EDIT", "bezposrednia edycja bryl");
}

function isoPoint(x, y, originX, originY, scale) {
  return { x: originX + (x - y) * scale * 0.5, y: originY + (x + y) * scale * 0.25 };
}

function convertMapForViewport(mode) {
  map = normalizeStudioMap(map);
  map.meta = { ...(map.meta || {}), editorViewport: mode, format: "potato-map-3d-lite" };
  map.obstacles = map.obstacles.map((obj, index) => ({
    id: obj.id || `obj-${Date.now().toString(36)}-${index}`,
    type: obj.type || "wall",
    x: Number(obj.x || 0),
    y: Number(obj.y || 0),
    w: Number(obj.w || 120),
    h: Number(obj.h || 80),
    z: Number(obj.z ?? (obj.type === "light" ? 10 : obj.type === "cover" ? 46 : obj.type === "crate" ? 64 : 96)),
    rot: Number(obj.rot || 0),
    color: obj.color || "#56614d",
    material: obj.material || "potato-concrete",
    texture: obj.texture || "",
  }));
  map = normalizeStudioMap(map);
}

function isoLayout() {
  return {
    originX: canvas.width / 2,
    originY: canvas.height * 0.18,
    scale: Math.min(canvas.width / (map.w + map.h), canvas.height / (map.w + map.h) * 2.1) * 1.72,
  };
}

function drawViewLabel(title, subtitle) {
  ctx.save();
  ctx.fillStyle = "rgba(17,20,17,0.82)";
  ctx.strokeStyle = "rgba(242,240,223,0.18)";
  ctx.lineWidth = 1;
  ctx.fillRect(14, 14, 210, 54);
  ctx.strokeRect(14.5, 14.5, 209, 53);
  ctx.fillStyle = "#f2f0df";
  ctx.font = "800 18px Arial";
  ctx.fillText(title, 28, 38);
  ctx.fillStyle = "#d8d5bf";
  ctx.font = "12px Arial";
  ctx.fillText(subtitle, 28, 57);
  ctx.restore();
}

function drawIsoFloor(originX, originY, scale) {
  const corners = [
    isoPoint(0, 0, originX, originY, scale),
    isoPoint(map.w, 0, originX, originY, scale),
    isoPoint(map.w, map.h, originX, originY, scale),
    isoPoint(0, map.h, originX, originY, scale),
  ];
  const floor = ctx.createLinearGradient(0, originY, 0, canvas.height);
  floor.addColorStop(0, "#303a2f");
  floor.addColorStop(1, "#1f271f");
  ctx.fillStyle = floor;
  ctx.beginPath();
  ctx.moveTo(corners[0].x, corners[0].y);
  for (const point of corners.slice(1)) ctx.lineTo(point.x, point.y);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "rgba(242,240,223,0.16)";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.strokeStyle = "rgba(242,240,223,0.075)";
  ctx.lineWidth = 1;
  for (let x = 0; x <= map.w; x += 256) drawIsoLine(x, 0, x, map.h, originX, originY, scale);
  for (let y = 0; y <= map.h; y += 256) drawIsoLine(0, y, map.w, y, originX, originY, scale);
}

function isoCanvasPoint(screenX, screenY) {
  const { originX, originY, scale } = isoLayout();
  const dx = (screenX - originX) / (scale * 0.5);
  const dy = (screenY - originY) / (scale * 0.25);
  return {
    x: Math.max(0, Math.min(map.w, (dx + dy) / 2)),
    y: Math.max(0, Math.min(map.h, (dy - dx) / 2)),
  };
}

function eventCanvasPixel(event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: (event.clientX - rect.left) * (canvas.width / rect.width),
    y: (event.clientY - rect.top) * (canvas.height / rect.height),
  };
}

function pointInPolygon(point, polygon) {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i, i += 1) {
    const a = polygon[i];
    const b = polygon[j];
    const intersects = ((a.y > point.y) !== (b.y > point.y)) && point.x < ((b.x - a.x) * (point.y - a.y)) / (b.y - a.y || 1) + a.x;
    if (intersects) inside = !inside;
  }
  return inside;
}

function isoBoxFaces(obj) {
  const { originX, originY, scale } = isoLayout();
  const z = Math.max(18, obj.z || 64) * scale * 0.7;
  const p1 = isoPoint(obj.x, obj.y, originX, originY, scale);
  const p2 = isoPoint(obj.x + obj.w, obj.y, originX, originY, scale);
  const p3 = isoPoint(obj.x + obj.w, obj.y + obj.h, originX, originY, scale);
  const p4 = isoPoint(obj.x, obj.y + obj.h, originX, originY, scale);
  return [
    [{ x: p1.x, y: p1.y - z }, { x: p2.x, y: p2.y - z }, { x: p3.x, y: p3.y - z }, { x: p4.x, y: p4.y - z }],
    [{ x: p2.x, y: p2.y - z }, { x: p3.x, y: p3.y - z }, p3, p2],
    [{ x: p1.x, y: p1.y - z }, { x: p2.x, y: p2.y - z }, p2, p1],
  ];
}

function hitIsoObject(screenX, screenY) {
  const point = { x: screenX, y: screenY };
  return [...map.obstacles]
    .sort((a, b) => (b.x + b.y + b.z) - (a.x + a.y + a.z))
    .find((obj) => isoBoxFaces(obj).some((face) => pointInPolygon(point, face)));
}

function drawIsoLine(x1, y1, x2, y2, originX, originY, scale) {
  const a = isoPoint(x1, y1, originX, originY, scale);
  const b = isoPoint(x2, y2, originX, originY, scale);
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.stroke();
}

function drawIsoBox(obj, originX, originY, scale) {
  const z = Math.max(18, obj.z || 64) * scale * 0.7;
  const p1 = isoPoint(obj.x, obj.y, originX, originY, scale);
  const p2 = isoPoint(obj.x + obj.w, obj.y, originX, originY, scale);
  const p3 = isoPoint(obj.x + obj.w, obj.y + obj.h, originX, originY, scale);
  const p4 = isoPoint(obj.x, obj.y + obj.h, originX, originY, scale);
  const base = obj.color || "#56614d";
  ctx.fillStyle = "rgba(0,0,0,0.22)";
  ctx.beginPath();
  ctx.moveTo(p1.x + 12, p1.y + 8);
  ctx.lineTo(p2.x + 12, p2.y + 8);
  ctx.lineTo(p3.x + 12, p3.y + 8);
  ctx.lineTo(p4.x + 12, p4.y + 8);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = shadeColor(base, 20);
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y - z);
  ctx.lineTo(p2.x, p2.y - z);
  ctx.lineTo(p3.x, p3.y - z);
  ctx.lineTo(p4.x, p4.y - z);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "rgba(242,240,223,0.14)";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.fillStyle = shadeColor(base, -26);
  ctx.beginPath();
  ctx.moveTo(p2.x, p2.y - z);
  ctx.lineTo(p3.x, p3.y - z);
  ctx.lineTo(p3.x, p3.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = shadeColor(base, -12);
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y - z);
  ctx.lineTo(p2.x, p2.y - z);
  ctx.lineTo(p2.x, p2.y);
  ctx.lineTo(p1.x, p1.y);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "rgba(0,0,0,0.22)";
  ctx.lineWidth = 1;
  ctx.stroke();
  if (obj.id === selectedId) {
    ctx.strokeStyle = "#77b56f";
    ctx.lineWidth = 4;
    for (const face of isoBoxFaces(obj)) {
      ctx.beginPath();
      ctx.moveTo(face[0].x, face[0].y);
      for (const point of face.slice(1)) ctx.lineTo(point.x, point.y);
      ctx.closePath();
      ctx.stroke();
    }
  }
}

function shadeColor(color, amount) {
  const hex = color.replace("#", "");
  if (hex.length !== 6) return color;
  const number = parseInt(hex, 16);
  const r = Math.max(0, Math.min(255, (number >> 16) + amount));
  const g = Math.max(0, Math.min(255, ((number >> 8) & 255) + amount));
  const b = Math.max(0, Math.min(255, (number & 255) + amount));
  return `rgb(${r},${g},${b})`;
}

function drawIsoMarker(label, point, color, originX, originY, scale) {
  const p = isoPoint(point.x, point.y, originX, originY, scale);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(p.x, p.y - 16, 15, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#101410";
  ctx.font = "800 11px Arial";
  ctx.textAlign = "center";
  ctx.fillText(label, p.x, p.y - 12);
}

function drawSite(label, site, color) {
  ctx.fillStyle = `${color}44`;
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(site.x, site.y, site.r, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#171812";
  ctx.font = "800 42px Arial";
  ctx.textAlign = "center";
  ctx.fillText(label, site.x, site.y + 14);
}

function drawSpawn(label, spawn, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(spawn.x, spawn.y, 28, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#101410";
  ctx.font = "800 18px Arial";
  ctx.textAlign = "center";
  ctx.fillText(label, spawn.x, spawn.y + 6);
}

function drawObject(obj) {
  ctx.save();
  ctx.translate(obj.x + obj.w / 2, obj.y + obj.h / 2);
  ctx.rotate((obj.rot || 0) * Math.PI / 180);
  ctx.fillStyle = obj.color || "#56614d";
  ctx.fillRect(-obj.w / 2, -obj.h / 2, obj.w, obj.h);
  ctx.fillStyle = "rgba(255,255,255,0.12)";
  for (let x = -obj.w / 2; x < obj.w / 2; x += 18) ctx.fillRect(x, -obj.h / 2, 2, obj.h);
  if (obj.id === selectedId) {
    ctx.strokeStyle = "#77b56f";
    ctx.lineWidth = 5;
    ctx.strokeRect(-obj.w / 2, -obj.h / 2, obj.w, obj.h);
  }
  ctx.restore();
}

function canvasPoint(event) {
  const screen = eventCanvasPixel(event);
  if (studioSettings.viewportMode === "3d") return isoCanvasPoint(screen.x, screen.y);
  return screen;
}

function hitObject(x, y) {
  return [...map.obstacles].reverse().find((obj) => x >= obj.x && y >= obj.y && x <= obj.x + obj.w && y <= obj.y + obj.h);
}

function hitObjectAtEvent(event) {
  if (studioSettings.viewportMode === "3d") {
    const screen = eventCanvasPixel(event);
    return hitIsoObject(screen.x, screen.y);
  }
  const p = canvasPoint(event);
  return hitObject(p.x, p.y);
}

function addObject(type, x, y) {
  const presets = {
    wall: [180, 80, 96, "#56614d"],
    crate: [84, 84, 64, "#7d6648"],
    cover: [150, 58, 46, "#61715f"],
    ramp: [160, 90, 28, "#6f765f"],
    light: [64, 64, 10, "#d7bd62"],
    trigger: [160, 120, 0, "#7f6bd4"],
    logic: [120, 80, 0, "#5ca8a6"],
    weaponPickup: [88, 46, 12, "#bfc7c1"],
    prop: [110, 90, 36, "#8d846b"],
  };
  const p = presets[type] || presets.wall;
  const obj = { id: `obj-${Date.now().toString(36)}`, type, x: x - p[0] / 2, y: y - p[1] / 2, w: p[0], h: p[1], z: p[2], rot: 0, color: p[3] };
  map.obstacles.push(obj);
  selectedId = obj.id;
  renderUi();
}

function renderUi() {
  map = normalizeStudioMap(map);
  ui.name.value = map.name;
  map.meta = map.meta || {};
  ui.viewportMode.value = studioSettings.viewportMode;
  ui.gameMode.value = map.meta.gameMode || studioSettings.gameMode;
  studioSettings.testGraphics = studioSettings.viewportMode;
  ui.testGraphics.value = studioSettings.viewportMode;
  ui.matchSize.value = String(map.meta.matchSize || studioSettings.matchSize);
  ui.defaultWeapon.value = map.meta.defaultWeapon || studioSettings.defaultWeapon;
  renderProperties();
  renderObjects();
  renderAssets();
  try {
    draw();
  } catch (error) {
    console.error(error);
    map = normalizeStudioMap(emptyMap());
    draw();
    status(`Blad renderu Studio: ${error?.message || "naprawiono mape"}`);
  }
}

function renderProperties() {
  ui.properties.innerHTML = "";
  const selected = map.obstacles.find((obj) => obj.id === selectedId);
  const target = selected || map;
  const fields = selected
    ? [["type", "text"], ["x", "number"], ["y", "number"], ["w", "number"], ["h", "number"], ["z", "number"], ["rot", "number"], ["color", "color"]]
    : [["name", "text"], ["w", "number"], ["h", "number"]];
  for (const [key, type] of fields) {
    const label = document.createElement("label");
    label.textContent = key;
    const input = document.createElement("input");
    input.type = type;
    input.value = target[key] ?? "";
    input.addEventListener("input", () => {
      target[key] = type === "number" ? Number(input.value) : input.value;
      if (target === map && key === "name") ui.name.value = target[key];
      draw();
      renderObjects();
    });
    label.appendChild(input);
    ui.properties.appendChild(label);
  }
}

function renderObjects() {
  ui.objects.innerHTML = "";
  const special = [
    ["Spawn T", `${Math.round(map.tSpawn.x)}, ${Math.round(map.tSpawn.y)}`],
    ["Spawn CT", `${Math.round(map.ctSpawn.x)}, ${Math.round(map.ctSpawn.y)}`],
    ["Bombsite A", `${Math.round(map.sites.A.x)}, ${Math.round(map.sites.A.y)}`],
    ["Bombsite B", `${Math.round(map.sites.B.x)}, ${Math.round(map.sites.B.y)}`],
  ];
  for (const [name, value] of special) addObjectRow(name, value);
  for (const obj of map.obstacles) addObjectRow(obj.type, `${Math.round(obj.x)}, ${Math.round(obj.y)}`, obj.id);
}

function addObjectRow(name, value, id = "") {
  const row = document.createElement("button");
  row.className = `object-row${id && id === selectedId ? " active" : ""}`;
  row.innerHTML = `<span>${name}</span><span class="tag">${value}</span>`;
  if (id) row.addEventListener("click", () => { selectedId = id; renderUi(); });
  ui.objects.appendChild(row);
}

function renderAssets() {
  ui.assets.innerHTML = "";
  const rows = [
    ...textures.map((item) => ["Texture", item.name]),
    ...mods.map((item) => ["Mod", item.name || item.id || "unnamed"]),
    ...files.map((item) => [item.kind || "File", item.name]),
  ];
  if (!rows.length) rows.push(["Assets", "brak"]);
  for (const [kind, name] of rows) addAssetRow(kind, name);
}

function addAssetRow(kind, name) {
  const row = document.createElement("div");
  row.className = "object-row";
  row.innerHTML = `<span>${kind}</span><span class="tag">${name}</span>`;
  ui.assets.appendChild(row);
}

function saveMap() {
  map = normalizeStudioMap(map);
  map.name = ui.name.value || map.name || "Studio Map";
  map.meta = {
    ...(map.meta || {}),
    gameMode: ui.gameMode.value,
    defaultWeapon: ui.defaultWeapon.value,
    matchSize: Number(ui.matchSize.value || 5),
    testGraphics: ui.testGraphics.value,
    license: "GNU GPL 3.0",
  };
  const id = `studio-${map.name.replace(/[^a-z0-9_-]/gi, "-").toLowerCase() || Date.now().toString(36)}`;
  const list = userMaps().filter((item) => item.id !== id);
  list.push({ id, map: normalizeStudioMap(clone(map)) });
  writeUserMaps(list);
  localStorage.setItem("potatoStrikeStudioLastMap", JSON.stringify(map));
  refreshMapList();
  status(`Zapisano: ${map.name}`);
  return id;
}

function loadSelectedMap() {
  const [kind, id] = ui.list.value.split(":");
  if (kind === "base") map = normalizeStudioMap(clone(baseMaps[id]));
  else {
    const item = userMaps().find((entry) => entry.id === id);
    if (item) map = normalizeStudioMap(clone(item.map));
  }
  selectedId = "";
  renderUi();
  status(`Otwarta mapa: ${map.name}`);
}

function generateMap() {
  const seed = `${ui.name.value || "studio"}-${Date.now().toString(36)}`;
  map = makeMap(`Generated ${seed.slice(-6)}`, 2100, 1400, seed.length);
  selectedId = "";
  renderUi();
  status("Wygenerowano mape do dalszej edycji");
}

function exportMap() {
  const blob = new Blob([JSON.stringify({ type: "potato-strike-map", map }, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `${(map.name || "studio-map").replace(/\s+/g, "-").toLowerCase()}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
}

async function importMapFile() {
  const file = ui.importFile.files[0];
  if (!file) return;
  try {
    const data = JSON.parse(await file.text());
    map = normalizeStudioMap(data.map || data);
    selectedId = "";
    renderUi();
    status(`Zaimportowano: ${map.name || file.name}`);
  } catch (error) {
    console.error(error);
    status(`Nie udalo sie zaimportowac mapy: ${error?.message || "bledny plik"}`);
  }
}

async function importTexture() {
  const file = ui.textureFile.files[0];
  if (!file) return status("Wybierz plik tekstury");
  const dataUrl = await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
  textures.push({ id: `tex-${Date.now().toString(36)}`, name: ui.textureName.value || file.name, dataUrl });
  saveJson("potatoStrikeStudioTextures", textures);
  renderAssets();
  status("Tekstura dodana do Studio");
}

async function importAssets() {
  const selected = [...ui.assetFiles.files];
  if (!selected.length) return status("Wybierz pliki assetow");
  for (const file of selected) {
    const textLike = /\.(json|js|txt|css)$/i.test(file.name);
    const data = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      if (textLike) reader.readAsText(file);
      else reader.readAsDataURL(file);
    });
    files.push({
      id: `file-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 5)}`,
      name: file.name,
      kind: file.type.startsWith("image/") ? "Texture file" : file.name.endsWith(".js") ? "Code file" : "Data file",
      type: file.type || "application/octet-stream",
      data,
    });
  }
  saveJson("potatoStrikeStudioFiles", files);
  renderAssets();
  status(`Dodano pliki: ${selected.length}`);
}

async function saveMod() {
  let mod;
  try {
    mod = JSON.parse(ui.modCode.value);
  } catch {
    mod = { id: `script-${Date.now().toString(36)}`, name: "Studio Script", code: ui.modCode.value };
  }
  mods.push(mod);
  saveJson("potatoStrikeStudioMods", mods);
  renderAssets();
  if (window.potatoNative?.saveMod) await window.potatoNative.saveMod(mod.name || mod.id || "studio-mod", mod);
  status("Mod zapisany");
}

async function testMap() {
  saveMap();
  localStorage.setItem("potatoStrikeStudioTestMap", JSON.stringify({ ...map, meta: { ...(map.meta || {}), testGraphics: ui.testGraphics.value } }));
  status("Uruchamiam test mapy");
  if (window.potatoNative?.testMap) await window.potatoNative.testMap();
  else window.open("index.html?studioTest=1", "_blank");
}

document.querySelectorAll("[data-tool]").forEach((button) => {
  button.addEventListener("click", () => {
    activeTool = button.dataset.tool;
    document.querySelectorAll("[data-tool]").forEach((item) => item.classList.toggle("active", item === button));
    status(`Tool: ${activeTool}`);
  });
});

canvas.addEventListener("mousedown", (event) => {
  const p = canvasPoint(event);
  if (activeTool === "select") {
    const obj = hitObjectAtEvent(event);
    selectedId = obj?.id || "";
    if (obj) drag = { id: obj.id, dx: studioSettings.viewportMode === "3d" ? obj.w / 2 : p.x - obj.x, dy: studioSettings.viewportMode === "3d" ? obj.h / 2 : p.y - obj.y };
    status(obj ? `Wybrano ${obj.type} w widoku ${studioSettings.viewportMode.toUpperCase()}` : "Brak obiektu pod kursorem");
    renderUi();
    return;
  }
  if (activeTool === "delete") {
    const obj = hitObjectAtEvent(event);
    if (obj) map.obstacles = map.obstacles.filter((item) => item.id !== obj.id);
    selectedId = "";
    renderUi();
    return;
  }
  if (activeTool === "spawnT") map.tSpawn = p;
  else if (activeTool === "spawnCT") map.ctSpawn = p;
  else if (activeTool === "siteA") map.sites.A = { x: p.x, y: p.y, r: 115 };
  else if (activeTool === "siteB") map.sites.B = { x: p.x, y: p.y, r: 110 };
  else addObject(activeTool, p.x, p.y);
  status(`Uzyto ${activeTool} w widoku ${studioSettings.viewportMode.toUpperCase()}`);
  renderUi();
});

canvas.addEventListener("mousemove", (event) => {
  if (!drag) return;
  const obj = map.obstacles.find((item) => item.id === drag.id);
  if (!obj) return;
  const p = canvasPoint(event);
  obj.x = p.x - drag.dx;
  obj.y = p.y - drag.dy;
  draw();
  renderObjects();
});

window.addEventListener("mouseup", () => { drag = null; });
window.addEventListener("keydown", (event) => {
  const obj = map.obstacles.find((item) => item.id === selectedId);
  if (!obj) return;
  if (event.code === "Delete" || event.code === "Backspace") {
    map.obstacles = map.obstacles.filter((item) => item.id !== selectedId);
    selectedId = "";
    renderUi();
    status("Usunieto obiekt");
    return;
  }
  if (event.code === "KeyQ" || event.code === "KeyE") {
    obj.rot = ((obj.rot || 0) + (event.code === "KeyE" ? 15 : -15) + 360) % 360;
    renderUi();
    status(`Rotacja: ${obj.rot}`);
    return;
  }
  if (event.key === "+" || event.key === "=" || event.key === "-") {
    obj.z = Math.max(0, (obj.z || 0) + (event.key === "-" ? -8 : 8));
    renderUi();
    status(`Wysokosc: ${obj.z}`);
  }
});
ui.name.addEventListener("input", () => { map.name = ui.name.value; });
ui.viewportMode.addEventListener("change", () => {
  studioSettings.viewportMode = ui.viewportMode.value === "3d" ? "3d" : "2d";
  studioSettings.testGraphics = studioSettings.viewportMode;
  convertMapForViewport(studioSettings.viewportMode);
  saveJson("potatoStrikeStudioSettings", studioSettings);
  renderUi();
  status(`Mapa przekonwertowana do edycji ${studioSettings.viewportMode.toUpperCase()}`);
});
ui.gameMode.addEventListener("change", () => { map.meta = { ...(map.meta || {}), gameMode: ui.gameMode.value }; });
ui.matchSize.addEventListener("change", () => { map.meta = { ...(map.meta || {}), matchSize: Number(ui.matchSize.value) }; });
ui.defaultWeapon.addEventListener("change", () => { map.meta = { ...(map.meta || {}), defaultWeapon: ui.defaultWeapon.value }; });
ui.newMap.addEventListener("click", () => { map = emptyMap(); selectedId = ""; renderUi(); status("Nowa mapa"); });
ui.generate.addEventListener("click", generateMap);
ui.save.addEventListener("click", saveMap);
ui.test.addEventListener("click", testMap);
ui.exportMap.addEventListener("click", exportMap);
ui.importMap.addEventListener("click", () => ui.importFile.click());
ui.importFile.addEventListener("change", importMapFile);
ui.load.addEventListener("click", loadSelectedMap);
ui.importTexture.addEventListener("click", importTexture);
ui.importAssets.addEventListener("click", importAssets);
ui.saveMod.addEventListener("click", saveMod);

try {
  map = normalizeStudioMap(JSON.parse(localStorage.getItem("potatoStrikeStudioLastMap") || "null") || emptyMap());
} catch {
  map = normalizeStudioMap(emptyMap());
}
convertMapForViewport(studioSettings.viewportMode);
refreshMapList();
renderUi();
document.querySelector('[data-tool="select"]').classList.add("active");
window.addEventListener("resize", draw);
