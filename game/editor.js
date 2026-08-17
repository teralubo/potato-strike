const canvas = document.getElementById("studio-canvas");
const ctx = canvas.getContext("2d");
const $ = (id) => document.getElementById(id);
const THREE = window.THREE || null;

const ui = {
  viewportMode: $("viewport-mode"),
  viewportStage: $("studio-viewport-stage"),
  viewport3d: $("studio-viewport-3d"),
  undo: $("undo-editor"),
  redo: $("redo-editor"),
  activeLayer: $("active-layer"),
  addLayer: $("add-layer"),
  layerList: $("layer-list"),
  selectionCount: $("selection-count"),
  focusSelection: $("focus-selection"),
  resetCamera: $("reset-camera"),
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
  paintCanvas: $("texture-paint-canvas"),
  paintBaseColor: $("paint-base-color"),
  paintColor: $("paint-color"),
  paintSize: $("paint-size"),
  paintClear: $("paint-clear"),
  paintSave: $("paint-save"),
  paintApply: $("paint-apply"),
  assetFiles: $("asset-files"),
  importAssets: $("import-assets"),
  modCode: $("mod-code"),
  saveMod: $("save-mod"),
  gameMode: $("game-mode"),
  testGraphics: $("test-graphics"),
  matchSize: $("match-size"),
  defaultWeapon: $("default-weapon"),
  storyGoalType: $("story-goal-type"),
  storyGoalTarget: $("story-goal-target"),
  storyGoalText: $("story-goal-text"),
  storyGoalCode: $("story-goal-code"),
  terrainWidth: $("terrain-width"),
  terrainHeight: $("terrain-height"),
  snapGrid: $("snap-grid"),
  defaultZ: $("default-z"),
  terrainColor: $("terrain-color"),
  ambientColor: $("ambient-color"),
  skyColor: $("sky-color"),
  fogDistance: $("fog-distance"),
  defaultTexture: $("default-texture"),
  moddingMode: $("modding-mode"),
  autosaveMap: $("autosave-map"),
  applyTerrain: $("apply-terrain"),
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
let selectedIds = new Set();
let drag = null;
let map = emptyMap();
let textures = loadJson("potatoStrikeStudioTextures", []);
let mods = loadJson("potatoStrikeStudioMods", []);
let files = loadJson("potatoStrikeStudioFiles", []);
let paintDown = false;
let editorMode = "objects";
let transformMode = "translate";
let activeLayerId = "default";
let history = [];
let future = [];
let clipboardObjects = [];
let pendingConnectionId = "";
const pressed3dKeys = new Set();
const view2d = { x: 0, y: 0, zoom: 0.55, initialized: false };
const studio3d = {
  ready: false,
  failed: false,
  renderer: null,
  scene: null,
  camera: null,
  content: null,
  selectionHelper: null,
  raycaster: null,
  pointer: null,
  yaw: 0.8,
  pitch: -0.52,
  speed: 520,
  lastFrame: performance.now(),
  animationFrame: 0,
  textureCache: new Map(),
};
let studioSettings = loadJson("potatoStrikeStudioSettings", {
  viewportMode: "2d",
  gameMode: "sandbox",
  testGraphics: "2d",
  matchSize: 5,
  defaultWeapon: "side-default",
});
studioSettings.viewportMode = studioSettings.viewportMode === "3d" ? "3d" : "2d";
studioSettings.testGraphics = ["2d", "3d"].includes(studioSettings.testGraphics) ? studioSettings.testGraphics : studioSettings.viewportMode;

const textureOptions = [
  ["white", "White wall"],
  ["concrete", "Concrete"],
  ["brick", "Brick"],
  ["crate", "Crate wood"],
  ["metal", "Metal"],
  ["glass", "Glass"],
  ["custom-color", "Custom color"],
];

const studioTexturePalette = {
  white: "#f1f1ea",
  concrete: "#d5d5cb",
  brick: "#c8b9a1",
  crate: "#a98255",
  metal: "#aeb7ba",
  glass: "#b8d2d8",
};

function allTextureOptions() {
  return [
    ...textureOptions,
    ...textures.map((item) => [item.id, item.name || item.id]),
  ];
}

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

function editorCollections() {
  const data = map.editorData || defaultEditorData();
  return [
    ["obstacle", map.obstacles],
    ["unit", data.units],
    ["trigger", data.triggers],
    ["waypoint", data.waypoints],
    ["marker", data.markers],
    ["system", data.systems],
    ["pickup", data.pickups],
  ];
}

function findEditorEntity(id) {
  if (!id) return null;
  for (const [kind, list] of editorCollections()) {
    const entity = list.find((item) => item.id === id);
    if (entity) return { kind, entity, list };
  }
  return null;
}

function selectedEntities() {
  return [...selectedIds].map(findEditorEntity).filter(Boolean);
}

function layerById(id) {
  return map.editorData?.layers?.find((layer) => layer.id === id) || map.editorData?.layers?.[0] || { id: "default", visible: true, locked: false };
}

function entityIsVisible(entity) {
  return entity.visible !== false && layerById(entity.layer).visible !== false;
}

function entityIsLocked(entity) {
  return Boolean(entity.locked || layerById(entity.layer).locked);
}

function setSelection(ids = [], primary = "") {
  selectedIds = new Set(ids.filter((id) => findEditorEntity(id)));
  selectedId = primary && selectedIds.has(primary) ? primary : [...selectedIds][0] || "";
  if (ui.selectionCount) ui.selectionCount.textContent = `${selectedIds.size} selected`;
}

function toggleSelection(id) {
  const next = new Set(selectedIds);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  setSelection([...next], id);
}

function recordHistory(label, snapshot = clone(map)) {
  history.push({ label, map: snapshot });
  if (history.length > 60) history.shift();
  future = [];
  updateHistoryButtons();
}

function updateHistoryButtons() {
  if (ui.undo) ui.undo.disabled = history.length === 0;
  if (ui.redo) ui.redo.disabled = future.length === 0;
}

function restoreMapSnapshot(snapshot, label) {
  map = normalizeStudioMap(clone(snapshot));
  setSelection([]);
  pendingConnectionId = "";
  renderUi();
  status(label);
}

function undoEditor() {
  const entry = history.pop();
  if (!entry) return;
  future.push({ label: entry.label, map: clone(map) });
  restoreMapSnapshot(entry.map, `Cofnieto: ${entry.label}`);
  updateHistoryButtons();
}

function redoEditor() {
  const entry = future.pop();
  if (!entry) return;
  history.push({ label: entry.label, map: clone(map) });
  restoreMapSnapshot(entry.map, `Ponowiono: ${entry.label}`);
  updateHistoryButtons();
}

function autosaveStudio() {
  if (map.meta?.autosave !== false) localStorage.setItem("potatoStrikeStudioLastMap", JSON.stringify(map));
}

function emptyMap() {
  return {
    name: "Studio Map",
    w: 2200,
    h: 1400,
    tSpawn: { x: 180, y: 1220 },
    ctSpawn: { x: 2020, y: 180 },
    sites: { A: { x: 1650, y: 1000, r: 115 }, B: { x: 560, y: 330, r: 110 } },
    meta: { gameMode: "sandbox", defaultWeapon: "side-default", matchSize: 5, snapGrid: 16, defaultZ: 96, terrainColor: "#303a2f", ambientColor: "#3d555d", skyColor: "#70858b", fogDistance: 3600, defaultTexture: "white", moddingMode: "safe", autosave: true, storyGoal: defaultStoryGoal() },
    editorData: defaultEditorData(),
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
      texture: i % 3 === 0 ? "crate" : "white",
      material: i % 3 === 0 ? "crate" : "white",
    });
  }
  return {
    name,
    w,
    h,
    tSpawn: { x: 180, y: h - 180 },
    ctSpawn: { x: w - 180, y: 180 },
    sites: { A: { x: Math.floor(w * 0.74), y: Math.floor(h * 0.72), r: 115 }, B: { x: Math.floor(w * 0.32), y: Math.floor(h * 0.26), r: 110 } },
    meta: { gameMode: "sandbox", defaultWeapon: "side-default", matchSize: 5, snapGrid: 16, defaultZ: 96, terrainColor: "#303a2f", ambientColor: "#3d555d", skyColor: "#70858b", fogDistance: 3600, defaultTexture: "white", moddingMode: "safe", autosave: true, storyGoal: defaultStoryGoal() },
    editorData: defaultEditorData(),
    obstacles,
  };
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function defaultStoryGoal() {
  return { type: "eliminate", target: 1, text: "Wyeliminuj wszystkich wrogow", code: "return ctx.enemiesAlive <= 0;" };
}

function normalizeStoryGoal(goal = {}) {
  const fallback = defaultStoryGoal();
  return {
    ...fallback,
    ...goal,
    type: goal.type || fallback.type,
    target: Math.max(1, Number(goal.target || fallback.target)),
    text: goal.text || fallback.text,
    code: goal.code || "",
  };
}

function defaultEditorData() {
  return {
    version: 2,
    layers: [{ id: "default", name: "Mapa", visible: true, locked: false }],
    units: [],
    groups: [],
    triggers: [],
    waypoints: [],
    markers: [],
    systems: [],
    pickups: [],
    connections: [],
  };
}

function normalizeEditorData(rawData, w, h) {
  const fallback = defaultEditorData();
  const source = rawData && typeof rawData === "object" ? rawData : fallback;
  const layers = (Array.isArray(source.layers) ? source.layers : fallback.layers)
    .map((layer, index) => ({
      id: String(layer.id || `layer-${index + 1}`),
      name: String(layer.name || `Layer ${index + 1}`),
      visible: layer.visible !== false,
      locked: Boolean(layer.locked),
    }));
  if (!layers.some((layer) => layer.id === "default")) layers.unshift(fallback.layers[0]);
  const layerIds = new Set(layers.map((layer) => layer.id));
  const pointEntity = (item, index, prefix) => ({
    ...item,
    id: String(item?.id || `${prefix}-${index}`),
    name: String(item?.name || `${prefix} ${index + 1}`),
    x: clamp(Number(item?.x) || w / 2, 0, w),
    y: clamp(Number(item?.y) || h / 2, 0, h),
    z: clamp(Number(item?.z) || 0, 0, 1024),
    layer: layerIds.has(item?.layer) ? item.layer : "default",
  });
  const units = (Array.isArray(source.units) ? source.units : []).map((item, index) => ({
    ...pointEntity(item, index, "unit"),
    side: item.side === "CT" ? "CT" : "T",
    role: item.role || "rifleman",
    playable: item.playable !== false,
    skill: clamp(Number(item.skill) || 0.5, 0, 1),
  }));
  const groups = (Array.isArray(source.groups) ? source.groups : []).map((item, index) => ({
    id: String(item.id || `group-${index}`),
    name: String(item.name || `Group ${index + 1}`),
    side: item.side === "CT" ? "CT" : "T",
    members: (Array.isArray(item.members) ? item.members : []).map(String),
    layer: layerIds.has(item.layer) ? item.layer : "default",
  }));
  const triggers = (Array.isArray(source.triggers) ? source.triggers : []).map((item, index) => ({
    ...pointEntity(item, index, "trigger"),
    w: clamp(Math.abs(Number(item.w) || 180), 16, w),
    h: clamp(Math.abs(Number(item.h) || 140), 16, h),
    height: clamp(Math.abs(Number(item.height) || 120), 4, 1024),
    shape: item.shape === "ellipse" ? "ellipse" : "rectangle",
    condition: String(item.condition || "true"),
    onActivation: String(item.onActivation || ""),
    repeatable: Boolean(item.repeatable),
  }));
  const waypoints = (Array.isArray(source.waypoints) ? source.waypoints : []).map((item, index) => ({
    ...pointEntity(item, index, "waypoint"),
    groupId: String(item.groupId || ""),
    type: String(item.type || "MOVE").toUpperCase(),
    order: Math.max(0, Number(item.order) || index),
    condition: String(item.condition || "true"),
    onActivation: String(item.onActivation || ""),
  }));
  const markers = (Array.isArray(source.markers) ? source.markers : []).map((item, index) => ({
    ...pointEntity(item, index, "marker"),
    text: String(item.text || item.name || `Marker ${index + 1}`),
    color: /^#[0-9a-f]{6}$/i.test(item.color || "") ? item.color : "#d7bd62",
    markerType: String(item.markerType || "mil_dot"),
  }));
  const systems = (Array.isArray(source.systems) ? source.systems : []).map((item, index) => ({
    ...pointEntity(item, index, "system"),
    systemType: String(item.systemType || "logic"),
    code: String(item.code || ""),
  }));
  const pickups = (Array.isArray(source.pickups) ? source.pickups : []).map((item, index) => ({
    ...pointEntity(item, index, "pickup"),
    weapon: String(item.weapon || "AK-47"),
    ammo: Math.max(0, Number(item.ammo) || 30),
  }));
  const connections = (Array.isArray(source.connections) ? source.connections : [])
    .map((item, index) => ({ id: String(item.id || `connection-${index}`), from: String(item.from || ""), to: String(item.to || ""), type: String(item.type || "sync") }))
    .filter((item) => item.from && item.to && item.from !== item.to);
  return { version: 2, layers, units, groups, triggers, waypoints, markers, systems, pickups, connections };
}

function normalizeStudioMap(rawMap) {
  const fallback = emptyMap();
  const source = rawMap && typeof rawMap === "object" ? rawMap : fallback;
  const w = clamp(Number(source.w) || fallback.w, 900, 5000);
  const h = clamp(Number(source.h) || fallback.h, 700, 4000);
  const editorData = normalizeEditorData(source.editorData, w, h);
  const layerIds = new Set(editorData.layers.map((layer) => layer.id));
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
      storyGoal: normalizeStoryGoal(source.meta?.storyGoal),
      skyColor: source.meta?.skyColor || fallback.meta.skyColor,
      fogDistance: clamp(Number(source.meta?.fogDistance) || fallback.meta.fogDistance, 600, 8000),
    },
    editorData,
    obstacles: (Array.isArray(source.obstacles) ? source.obstacles : []).map((obj, index) => ({
      id: obj.id || `obj-${Date.now().toString(36)}-${index}`,
      type: obj.type || "wall",
      x: clamp(Number(obj.x) || 0, 0, w - 12),
      y: clamp(Number(obj.y) || 0, 0, h - 12),
      w: clamp(Math.abs(Number(obj.w) || 96), 12, w),
      h: clamp(Math.abs(Number(obj.h) || 96), 12, h),
      z: clamp(Number(obj.z) || 64, 0, 512),
      elevation: clamp(Number(obj.elevation) || 0, 0, 1024),
      rot: Number(obj.rot) || 0,
      color: obj.color || "#56614d",
      texture: obj.texture || obj.material || source.meta?.defaultTexture || "white",
      material: obj.material || obj.texture || source.meta?.defaultTexture || "white",
      textureColor: obj.textureColor || obj.color || "",
      script: obj.script || "",
      layer: layerIds.has(String(obj.layer || "default")) ? String(obj.layer || "default") : "default",
      visible: obj.visible !== false,
      locked: Boolean(obj.locked),
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
  wrap.dataset.view = studioSettings.viewportMode === "3d" ? "SCENA 3D" : "PLAN 2D";
  wrap.classList.toggle("preview-3d", studioSettings.viewportMode === "3d");
  const stageRect = ui.viewportStage.getBoundingClientRect();
  const width = Math.max(320, Math.floor(stageRect.width || window.innerWidth));
  const height = Math.max(240, Math.floor(stageRect.height || window.innerHeight));
  const webglActive = studioSettings.viewportMode === "3d" && studio3d.ready && !studio3d.failed;
  canvas.classList.toggle("hidden", webglActive);
  ui.viewport3d.classList.toggle("hidden", !webglActive);
  if (webglActive) {
    resizeStudio3d(width, height);
    return;
  }
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
  canvas.style.width = "100%";
  canvas.style.height = "100%";
}

function draw() {
  if (studioSettings.viewportMode === "3d") {
    initStudio3d();
    fitCanvas();
    draw3dPreview();
    return;
  }
  fitCanvas();
  draw2dEditor();
}

function draw2dEditor() {
  if (!view2d.initialized) reset2dCamera();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#121712";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.setTransform(view2d.zoom, 0, 0, view2d.zoom, -view2d.x * view2d.zoom, -view2d.y * view2d.zoom);
  ctx.fillStyle = map.meta?.terrainColor || "#303a2f";
  ctx.fillRect(0, 0, map.w, map.h);
  const targetGrid = Math.max(Number(map.meta?.snapGrid || 16), 16);
  const grid = targetGrid * Math.max(1, Math.ceil(44 / Math.max(1, targetGrid * view2d.zoom)));
  ctx.strokeStyle = "rgba(242,240,223,0.09)";
  ctx.lineWidth = 1 / view2d.zoom;
  for (let x = 0; x <= map.w; x += grid) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, map.h); ctx.stroke();
  }
  for (let y = 0; y <= map.h; y += grid) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(map.w, y); ctx.stroke();
  }
  ctx.strokeStyle = "rgba(242,240,223,0.34)";
  ctx.lineWidth = 3 / view2d.zoom;
  ctx.strokeRect(0, 0, map.w, map.h);
  draw2dConnections();
  drawSite("A", map.sites.A, "#d7bd62");
  drawSite("B", map.sites.B, "#77b56f");
  drawSpawn("T", map.tSpawn, "#c48a45");
  drawSpawn("CT", map.ctSpawn, "#8ea9b8");
  for (const obj of map.obstacles) if (entityIsVisible(obj)) drawObject(obj);
  for (const [kind, list] of editorCollections().slice(1)) {
    for (const entity of list) if (entityIsVisible(entity)) drawEditorEntity2d(kind, entity);
  }
  if (drag?.kind === "marquee" && drag.current) {
    const left = Math.min(drag.start.x, drag.current.x);
    const top = Math.min(drag.start.y, drag.current.y);
    const width = Math.abs(drag.current.x - drag.start.x);
    const height = Math.abs(drag.current.y - drag.start.y);
    ctx.fillStyle = "rgba(119,181,111,0.12)";
    ctx.strokeStyle = "#77b56f";
    ctx.lineWidth = 2 / view2d.zoom;
    ctx.fillRect(left, top, width, height);
    ctx.strokeRect(left, top, width, height);
  }
  ctx.restore();
  drawViewLabel("PLAN 2D", `${Math.round(view2d.zoom * 100)}% / ${map.editorData.layers.length} warstw`);
}

function draw3dPreview() {
  if (studio3d.ready && !studio3d.failed) {
    rebuildStudio3dScene();
    renderStudio3d();
    return;
  }
  draw3dCanvasFallback();
}

function draw3dCanvasFallback() {
  const w = canvas.width;
  const h = canvas.height;
  const layout = isoLayout();
  const { originX, originY, scale } = layout;
  ctx.fillStyle = "#151916";
  ctx.fillRect(0, 0, w, h);
  const sky = ctx.createLinearGradient(0, 0, 0, h * 0.45);
  sky.addColorStop(0, map.meta?.ambientColor || "#3d555d");
  sky.addColorStop(0.7, "#27363a");
  sky.addColorStop(1, "#202620");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h * 0.45);
  drawIsoFloor(originX, originY, scale);
  const sorted = map.obstacles.filter(entityIsVisible).sort((a, b) => (a.x + a.y) - (b.x + b.y));
  for (const obj of sorted) drawIsoBox(obj, originX, originY, scale);
  drawIsoMarker("A", map.sites.A, "#d7bd62", originX, originY, scale);
  drawIsoMarker("B", map.sites.B, "#77b56f", originX, originY, scale);
  drawIsoMarker("T", map.tSpawn, "#c48a45", originX, originY, scale);
  drawIsoMarker("CT", map.ctSpawn, "#8ea9b8", originX, originY, scale);
  drawViewLabel("SCENA 3D SAFE", "software fallback");
}

function reset2dCamera() {
  const width = Math.max(320, ui.viewportStage?.clientWidth || 960);
  const height = Math.max(240, ui.viewportStage?.clientHeight || 640);
  view2d.zoom = clamp(Math.min((width - 100) / map.w, (height - 100) / map.h), 0.12, 2.5);
  view2d.x = map.w / 2 - width / (2 * view2d.zoom);
  view2d.y = map.h / 2 - height / (2 * view2d.zoom);
  view2d.initialized = true;
}

function screenToWorld2d(point) {
  return { x: point.x / view2d.zoom + view2d.x, y: point.y / view2d.zoom + view2d.y };
}

function draw2dConnections() {
  const data = map.editorData;
  const byId = (id) => findEditorEntity(id)?.entity;
  ctx.save();
  ctx.lineWidth = 2 / view2d.zoom;
  for (const connection of data.connections) {
    const from = byId(connection.from);
    const to = byId(connection.to);
    if (!from || !to || !entityIsVisible(from) || !entityIsVisible(to)) continue;
    ctx.strokeStyle = connection.type === "group" ? "#6ca6c8" : "#b48bd4";
    ctx.setLineDash([10 / view2d.zoom, 7 / view2d.zoom]);
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
  }
  for (const group of data.groups) {
    const members = group.members.map(byId).filter(Boolean);
    if (members.length < 2) continue;
    const leader = members[0];
    ctx.strokeStyle = "rgba(108,166,200,0.72)";
    ctx.setLineDash([]);
    for (const member of members.slice(1)) {
      ctx.beginPath(); ctx.moveTo(leader.x, leader.y); ctx.lineTo(member.x, member.y); ctx.stroke();
    }
  }
  const waypointsByGroup = new Map();
  for (const waypoint of data.waypoints) {
    if (!waypointsByGroup.has(waypoint.groupId)) waypointsByGroup.set(waypoint.groupId, []);
    waypointsByGroup.get(waypoint.groupId).push(waypoint);
  }
  ctx.strokeStyle = "rgba(242,240,223,0.68)";
  ctx.setLineDash([]);
  for (const points of waypointsByGroup.values()) {
    points.sort((a, b) => a.order - b.order);
    for (let index = 1; index < points.length; index += 1) {
      ctx.beginPath(); ctx.moveTo(points[index - 1].x, points[index - 1].y); ctx.lineTo(points[index].x, points[index].y); ctx.stroke();
    }
  }
  ctx.restore();
}

function drawEditorEntity2d(kind, entity) {
  const selected = selectedIds.has(entity.id);
  ctx.save();
  ctx.translate(entity.x, entity.y);
  ctx.lineWidth = (selected ? 4 : 2) / view2d.zoom;
  ctx.strokeStyle = selected ? "#77b56f" : "rgba(242,240,223,0.78)";
  if (kind === "trigger") {
    ctx.fillStyle = "rgba(127,107,212,0.18)";
    if (entity.shape === "ellipse") {
      ctx.beginPath(); ctx.ellipse(0, 0, entity.w / 2, entity.h / 2, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    } else {
      ctx.fillRect(-entity.w / 2, -entity.h / 2, entity.w, entity.h);
      ctx.strokeRect(-entity.w / 2, -entity.h / 2, entity.w, entity.h);
    }
  } else if (kind === "unit") {
    ctx.fillStyle = entity.side === "T" ? "#c48a45" : "#8ea9b8";
    ctx.beginPath(); ctx.moveTo(0, -18); ctx.lineTo(14, 14); ctx.lineTo(-14, 14); ctx.closePath(); ctx.fill(); ctx.stroke();
  } else if (kind === "waypoint") {
    ctx.fillStyle = "#f2f0df";
    ctx.beginPath(); ctx.arc(0, 0, 13, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = "#171812"; ctx.font = "800 10px Arial"; ctx.textAlign = "center"; ctx.fillText(String(entity.order + 1), 0, 4);
  } else if (kind === "marker") {
    ctx.fillStyle = entity.color;
    ctx.beginPath(); ctx.moveTo(0, -15); ctx.lineTo(15, 0); ctx.lineTo(0, 15); ctx.lineTo(-15, 0); ctx.closePath(); ctx.fill(); ctx.stroke();
  } else {
    ctx.fillStyle = kind === "system" ? "#5ca8a6" : "#bfc7c1";
    ctx.fillRect(-12, -12, 24, 24); ctx.strokeRect(-12, -12, 24, 24);
  }
  if (selected) {
    ctx.strokeStyle = "#77b56f";
    ctx.strokeRect(-22, -22, 44, 44);
  }
  ctx.restore();
}

function initStudio3d() {
  if (studio3d.ready || studio3d.failed) return studio3d.ready;
  if (!THREE || !ui.viewport3d) {
    studio3d.failed = true;
    status("Three.js niedostepny - wlaczono bezpieczny podglad 3D");
    return false;
  }
  try {
    studio3d.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "low-power", failIfMajorPerformanceCaveat: false });
    studio3d.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    studio3d.renderer.outputColorSpace = THREE.SRGBColorSpace;
    studio3d.renderer.shadowMap.enabled = false;
    studio3d.renderer.domElement.setAttribute("aria-label", "Scena 3D Potato Strike Studio");
    ui.viewport3d.replaceChildren(studio3d.renderer.domElement);
    studio3d.scene = new THREE.Scene();
    studio3d.camera = new THREE.PerspectiveCamera(58, 1, 2, 12000);
    studio3d.camera.up.set(0, 0, 1);
    studio3d.raycaster = new THREE.Raycaster();
    studio3d.pointer = new THREE.Vector2();
    studio3d.content = new THREE.Group();
    studio3d.scene.add(studio3d.content);
    const hemi = new THREE.HemisphereLight(0xdbe7e8, 0x3e4938, 2.15);
    studio3d.scene.add(hemi);
    const key = new THREE.DirectionalLight(0xfff1d0, 2.6);
    key.position.set(-800, -1100, 1800);
    studio3d.scene.add(key);
    const fill = new THREE.DirectionalLight(0x91b5c8, 0.8);
    fill.position.set(1200, 900, 700);
    studio3d.scene.add(fill);
    studio3d.ready = true;
    resetStudio3dCamera();
    attachStudio3dEvents();
    studio3d.animationFrame = requestAnimationFrame(animateStudio3d);
    studio3d.renderer.domElement.addEventListener("webglcontextlost", (event) => {
      event.preventDefault();
      studio3d.failed = true;
      studio3d.ready = false;
      status("WebGL zatrzymany - Studio przeszlo na tryb software");
      draw();
    });
    window.potatoNative?.log?.("editor:3d", `WebGL ready renderer=${studio3d.renderer.capabilities?.isWebGL2 ? "webgl2" : "webgl1"}`);
    return true;
  } catch (error) {
    console.error("Studio WebGL init", error);
    window.potatoNative?.log?.("editor:3d", `WebGL fallback ${error?.message || "unknown error"}`);
    studio3d.failed = true;
    status(`WebGL niedostepny: ${error?.message || "tryb software"}`);
    return false;
  }
}

function resizeStudio3d(width, height) {
  if (!studio3d.ready) return;
  studio3d.renderer.setSize(width, height, false);
  studio3d.camera.aspect = width / Math.max(1, height);
  studio3d.camera.updateProjectionMatrix();
}

function resetStudio3dCamera() {
  if (!studio3d.camera) return;
  const distance = Math.max(map.w, map.h) * 0.56;
  const target = new THREE.Vector3(map.w / 2, map.h / 2, 80);
  studio3d.camera.position.set(map.w * 0.14, map.h * 0.08, Math.max(680, distance * 0.62));
  const direction = target.clone().sub(studio3d.camera.position);
  studio3d.yaw = Math.atan2(direction.y, direction.x);
  studio3d.pitch = Math.atan2(direction.z, Math.hypot(direction.x, direction.y));
  updateStudio3dCameraDirection();
}

function updateStudio3dCameraDirection() {
  if (!studio3d.camera) return;
  const direction = new THREE.Vector3(
    Math.cos(studio3d.pitch) * Math.cos(studio3d.yaw),
    Math.cos(studio3d.pitch) * Math.sin(studio3d.yaw),
    Math.sin(studio3d.pitch),
  );
  studio3d.camera.lookAt(studio3d.camera.position.clone().add(direction));
}

function disposeStudioObject(root) {
  root?.traverse((node) => {
    node.geometry?.dispose?.();
    const materials = Array.isArray(node.material) ? node.material : [node.material];
    for (const material of materials) {
      if (!material) continue;
      if (material.userData?.ownedMap) material.map?.dispose?.();
      material.dispose?.();
    }
  });
}

function createProceduralTexture(key, baseColor) {
  const cacheKey = `${key}:${baseColor}`;
  if (studio3d.textureCache.has(cacheKey)) return studio3d.textureCache.get(cacheKey);
  const textureCanvas = document.createElement("canvas");
  textureCanvas.width = 64;
  textureCanvas.height = 64;
  const paint = textureCanvas.getContext("2d");
  paint.fillStyle = baseColor;
  paint.fillRect(0, 0, 64, 64);
  paint.lineWidth = 2;
  if (key === "brick") {
    paint.strokeStyle = "rgba(73,45,32,0.42)";
    for (let y = 0; y <= 64; y += 16) {
      paint.beginPath(); paint.moveTo(0, y); paint.lineTo(64, y); paint.stroke();
      const offset = (y / 16) % 2 ? 0 : 16;
      for (let x = offset; x <= 64; x += 32) { paint.beginPath(); paint.moveTo(x, y); paint.lineTo(x, y + 16); paint.stroke(); }
    }
  } else if (key === "crate") {
    paint.strokeStyle = "rgba(45,28,16,0.5)";
    paint.strokeRect(3, 3, 58, 58);
    paint.beginPath(); paint.moveTo(4, 4); paint.lineTo(60, 60); paint.moveTo(60, 4); paint.lineTo(4, 60); paint.stroke();
  } else if (key === "metal" || key === "hazard" || key === "stripe") {
    paint.strokeStyle = "rgba(25,28,25,0.38)";
    for (let x = -64; x < 96; x += 20) { paint.beginPath(); paint.moveTo(x, 64); paint.lineTo(x + 64, 0); paint.stroke(); }
  } else if (key === "tile") {
    paint.strokeStyle = "rgba(45,45,40,0.3)";
    for (let v = 0; v <= 64; v += 16) {
      paint.beginPath(); paint.moveTo(v, 0); paint.lineTo(v, 64); paint.moveTo(0, v); paint.lineTo(64, v); paint.stroke();
    }
  } else if (key === "terrain" || key === "asphalt" || key === "camo") {
    for (let index = 0; index < 42; index += 1) {
      const seed = (index * 37 + key.length * 19) % 61;
      paint.fillStyle = index % 2 ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.09)";
      paint.fillRect(seed, (index * 23) % 61, 3 + (index % 4), 2 + (index % 3));
    }
  } else {
    paint.strokeStyle = "rgba(35,35,31,0.22)";
    paint.strokeRect(2, 2, 60, 60);
    paint.beginPath(); paint.moveTo(0, 32); paint.lineTo(64, 32); paint.stroke();
  }
  const texture = new THREE.CanvasTexture(textureCanvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  studio3d.textureCache.set(cacheKey, texture);
  return texture;
}

function threeMaterialFor(entity, width = 128, height = 96) {
  const key = entity.texture || entity.material || "white";
  const custom = textures.find((item) => item.id === key);
  const base = custom?.baseColor || objectBaseColor(entity) || "#d5d5cb";
  let source;
  if (custom?.dataUrl) {
    const cacheKey = `upload:${custom.id}`;
    source = studio3d.textureCache.get(cacheKey);
    if (!source) {
      source = new THREE.TextureLoader().load(custom.dataUrl, () => renderStudio3d(), undefined, (error) => console.warn("Texture 3D", error));
      source.colorSpace = THREE.SRGBColorSpace;
      source.wrapS = THREE.RepeatWrapping;
      source.wrapT = THREE.RepeatWrapping;
      studio3d.textureCache.set(cacheKey, source);
    }
  } else {
    source = createProceduralTexture(studioTexturePalette[key] ? key : "white", base);
  }
  const texture = source.clone();
  texture.needsUpdate = true;
  texture.repeat.set(clamp(width / 180, 1, 12), clamp(height / 110, 1, 12));
  const material = new THREE.MeshLambertMaterial({ map: texture, color: 0xffffff });
  material.userData.ownedMap = true;
  return material;
}

function createEntityMesh(kind, entity) {
  let mesh;
  if (kind === "obstacle") {
    const height = Math.max(4, Number(entity.z || 64));
    mesh = new THREE.Mesh(new THREE.BoxGeometry(entity.w, entity.h, height), threeMaterialFor(entity, Math.max(entity.w, entity.h), height));
    mesh.position.set(entity.x + entity.w / 2, entity.y + entity.h / 2, Number(entity.elevation || 0) + height / 2);
    mesh.rotation.z = (Number(entity.rot || 0) * Math.PI) / 180;
  } else if (kind === "unit") {
    const color = entity.side === "T" ? 0xc48a45 : 0x7198ad;
    mesh = new THREE.Group();
    const body = new THREE.Mesh(new THREE.CapsuleGeometry(12, 34, 3, 6), new THREE.MeshLambertMaterial({ color }));
    body.rotation.x = Math.PI / 2;
    body.position.z = 34;
    const head = new THREE.Mesh(new THREE.SphereGeometry(10, 10, 8), new THREE.MeshLambertMaterial({ color: 0xd5b58d }));
    head.position.z = 65;
    mesh.add(body, head);
    mesh.position.set(entity.x, entity.y, entity.z || 0);
  } else if (kind === "trigger") {
    const geometry = entity.shape === "ellipse" ? new THREE.CylinderGeometry(entity.w / 2, entity.w / 2, entity.height, 24) : new THREE.BoxGeometry(entity.w, entity.h, entity.height);
    if (entity.shape === "ellipse") geometry.rotateX(Math.PI / 2);
    mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0x806bd4, transparent: true, opacity: 0.2, depthWrite: false, side: THREE.DoubleSide }));
    mesh.position.set(entity.x, entity.y, entity.z + entity.height / 2);
  } else if (kind === "waypoint") {
    mesh = new THREE.Mesh(new THREE.SphereGeometry(13, 12, 8), new THREE.MeshBasicMaterial({ color: 0xf2f0df }));
    mesh.position.set(entity.x, entity.y, entity.z + 14);
  } else if (kind === "marker") {
    mesh = new THREE.Mesh(new THREE.OctahedronGeometry(16, 0), new THREE.MeshBasicMaterial({ color: entity.color || "#d7bd62" }));
    mesh.position.set(entity.x, entity.y, entity.z + 18);
  } else {
    mesh = new THREE.Mesh(new THREE.BoxGeometry(24, 24, 24), new THREE.MeshLambertMaterial({ color: kind === "system" ? 0x5ca8a6 : 0xbfc7c1 }));
    mesh.position.set(entity.x, entity.y, entity.z + 12);
  }
  mesh.userData.entityId = entity.id;
  mesh.userData.entityKind = kind;
  mesh.traverse((child) => {
    child.userData.entityId = entity.id;
    child.userData.entityKind = kind;
  });
  return mesh;
}

function addStudioLine(points, color, dashed = false) {
  if (points.length < 2) return;
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = dashed
    ? new THREE.LineDashedMaterial({ color, dashSize: 26, gapSize: 14, transparent: true, opacity: 0.78 })
    : new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.72 });
  const line = new THREE.Line(geometry, material);
  if (dashed) line.computeLineDistances();
  studio3d.content.add(line);
}

function rebuildStudio3dScene() {
  if (!studio3d.ready) return;
  disposeStudioObject(studio3d.content);
  studio3d.scene.remove(studio3d.content);
  studio3d.content = new THREE.Group();
  studio3d.scene.add(studio3d.content);
  const sky = map.meta?.skyColor || "#70858b";
  studio3d.scene.background = new THREE.Color(sky);
  studio3d.scene.fog = new THREE.Fog(sky, Math.max(900, Number(map.meta?.fogDistance || 3600) * 0.42), Number(map.meta?.fogDistance || 3600));
  const floorTexture = createProceduralTexture("terrain", map.meta?.terrainColor || "#303a2f").clone();
  floorTexture.needsUpdate = true;
  floorTexture.repeat.set(Math.max(4, map.w / 240), Math.max(4, map.h / 240));
  const floorMaterial = new THREE.MeshLambertMaterial({ map: floorTexture, color: 0xffffff });
  floorMaterial.userData.ownedMap = true;
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(map.w, map.h), floorMaterial);
  floor.position.set(map.w / 2, map.h / 2, -1);
  floor.userData.ground = true;
  studio3d.content.add(floor);
  const grid = new THREE.GridHelper(Math.max(map.w, map.h), clamp(Math.round(Math.max(map.w, map.h) / Math.max(32, map.meta?.snapGrid || 32)), 12, 72), 0x7f927f, 0x526052);
  grid.rotation.x = Math.PI / 2;
  grid.position.set(map.w / 2, map.h / 2, 0.6);
  grid.material.transparent = true;
  grid.material.opacity = 0.28;
  studio3d.content.add(grid);
  for (const [kind, list] of editorCollections()) {
    for (const entity of list) {
      if (!entityIsVisible(entity)) continue;
      studio3d.content.add(createEntityMesh(kind, entity));
    }
  }
  const siteMaterialA = new THREE.MeshBasicMaterial({ color: 0xd7bd62, transparent: true, opacity: 0.22, depthWrite: false });
  const siteMaterialB = new THREE.MeshBasicMaterial({ color: 0x77b56f, transparent: true, opacity: 0.22, depthWrite: false });
  for (const [key, site] of Object.entries(map.sites)) {
    const siteMesh = new THREE.Mesh(new THREE.CylinderGeometry(site.r, site.r, 3, 36), key === "A" ? siteMaterialA : siteMaterialB);
    siteMesh.rotation.x = Math.PI / 2;
    siteMesh.position.set(site.x, site.y, 2);
    studio3d.content.add(siteMesh);
  }
  for (const [label, spawn, color] of [["T", map.tSpawn, 0xc48a45], ["CT", map.ctSpawn, 0x7198ad]]) {
    const marker = new THREE.Mesh(new THREE.CylinderGeometry(22, 22, 5, 18), new THREE.MeshBasicMaterial({ color }));
    marker.rotation.x = Math.PI / 2;
    marker.position.set(spawn.x, spawn.y, 4);
    marker.userData.label = label;
    studio3d.content.add(marker);
  }
  const data = map.editorData;
  for (const group of data.groups) {
    const members = group.members.map((id) => findEditorEntity(id)?.entity).filter(Boolean);
    if (members.length > 1) {
      const leader = members[0];
      for (const member of members.slice(1)) addStudioLine([new THREE.Vector3(leader.x, leader.y, (leader.z || 0) + 20), new THREE.Vector3(member.x, member.y, (member.z || 0) + 20)], 0x6ca6c8);
    }
  }
  const waypointGroups = new Map();
  for (const waypoint of data.waypoints) {
    if (!waypointGroups.has(waypoint.groupId)) waypointGroups.set(waypoint.groupId, []);
    waypointGroups.get(waypoint.groupId).push(waypoint);
  }
  for (const points of waypointGroups.values()) {
    points.sort((a, b) => a.order - b.order);
    addStudioLine(points.map((point) => new THREE.Vector3(point.x, point.y, point.z + 16)), 0xf2f0df, true);
  }
  for (const connection of data.connections) {
    const from = findEditorEntity(connection.from)?.entity;
    const to = findEditorEntity(connection.to)?.entity;
    if (from && to) addStudioLine([new THREE.Vector3(from.x, from.y, (from.z || 0) + 22), new THREE.Vector3(to.x, to.y, (to.z || 0) + 22)], 0xb48bd4, true);
  }
  const primaryMesh = findStudio3dMesh(selectedId);
  if (primaryMesh) {
    studio3d.selectionHelper = new THREE.BoxHelper(primaryMesh, 0x77d96f);
    studio3d.content.add(studio3d.selectionHelper);
    const axes = new THREE.AxesHelper(Math.max(70, studioEntitySize(findEditorEntity(selectedId)?.entity) * 0.75));
    axes.position.copy(primaryMesh.position);
    axes.userData.selectionWidget = true;
    studio3d.content.add(axes);
  }
}

function studioEntitySize(entity, kind = "") {
  if (!entity) return 64;
  if (kind === "obstacle" || ("w" in entity && "h" in entity && !entity.shape)) {
    return Math.max(Number(entity.w || 32), Number(entity.h || 32), Number(entity.z || 32));
  }
  if (kind === "trigger" || entity.shape) {
    return Math.max(Number(entity.w || 32), Number(entity.h || 32), Number(entity.height || 32));
  }
  if (kind === "unit" || entity.side) return 72;
  return 36;
}

function findStudio3dMesh(id) {
  if (!studio3d.content || !id) return null;
  let result = null;
  studio3d.content.traverse((node) => {
    if (!result && node.userData?.entityId === id && node.parent === studio3d.content) result = node;
  });
  return result;
}

function renderStudio3d() {
  if (!studio3d.ready || studioSettings.viewportMode !== "3d") return;
  updateStudio3dCameraDirection();
  studio3d.renderer.render(studio3d.scene, studio3d.camera);
}

function animateStudio3d(now) {
  if (!studio3d.ready) return;
  studio3d.animationFrame = requestAnimationFrame(animateStudio3d);
  const dt = Math.min(0.05, Math.max(0, now - studio3d.lastFrame) / 1000);
  studio3d.lastFrame = now;
  if (studioSettings.viewportMode !== "3d" || document.hidden) return;
  const forwardAmount = (pressed3dKeys.has("KeyW") ? 1 : 0) - (pressed3dKeys.has("KeyS") ? 1 : 0);
  const strafeAmount = (pressed3dKeys.has("KeyD") ? 1 : 0) - (pressed3dKeys.has("KeyA") ? 1 : 0);
  const verticalAmount = (pressed3dKeys.has("KeyQ") ? 1 : 0) - (pressed3dKeys.has("KeyZ") ? 1 : 0);
  if (forwardAmount || strafeAmount || verticalAmount) {
    const boost = pressed3dKeys.has("ShiftLeft") || pressed3dKeys.has("ShiftRight") ? 2.8 : 1;
    const speed = studio3d.speed * boost * dt;
    const forward = new THREE.Vector3(Math.cos(studio3d.yaw), Math.sin(studio3d.yaw), 0);
    const right = new THREE.Vector3(-Math.sin(studio3d.yaw), Math.cos(studio3d.yaw), 0);
    studio3d.camera.position.addScaledVector(forward, forwardAmount * speed);
    studio3d.camera.position.addScaledVector(right, strafeAmount * speed);
    studio3d.camera.position.z = clamp(studio3d.camera.position.z + verticalAmount * speed, 20, 4800);
  }
  renderStudio3d();
}

function studio3dNdc(event) {
  const rect = studio3d.renderer.domElement.getBoundingClientRect();
  studio3d.pointer.set(((event.clientX - rect.left) / rect.width) * 2 - 1, -((event.clientY - rect.top) / rect.height) * 2 + 1);
  studio3d.raycaster.setFromCamera(studio3d.pointer, studio3d.camera);
}

function pickStudio3dEntity(event) {
  studio3dNdc(event);
  const candidates = [];
  studio3d.content.traverse((node) => {
    if (node.isMesh && node.userData?.entityId) candidates.push(node);
  });
  const hit = studio3d.raycaster.intersectObjects(candidates, false)[0];
  return hit ? findEditorEntity(hit.object.userData.entityId || hit.object.parent?.userData?.entityId) : null;
}

function studio3dGroundPoint(event, elevation = 0) {
  studio3dNdc(event);
  const target = new THREE.Vector3();
  const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -elevation);
  if (!studio3d.raycaster.ray.intersectPlane(plane, target)) return null;
  return snapPoint({ x: target.x, y: target.y, z: target.z });
}

function focusStudioSelection() {
  if (!studio3d.ready) return;
  const found = findEditorEntity(selectedId);
  const selected = found?.entity;
  const size = studioEntitySize(selected, found?.kind);
  const baseZ = found?.kind === "obstacle" ? Number(selected?.elevation || 0) : Number(selected?.z || 0);
  const target = selected
    ? new THREE.Vector3(selected.x + Number(selected.w || 0) / 2, selected.y + Number(selected.h || 0) / 2, baseZ + size / 2)
    : new THREE.Vector3(map.w / 2, map.h / 2, 60);
  const distance = clamp(size * 4, 220, 900);
  studio3d.camera.position.set(target.x - distance * 0.72, target.y - distance * 0.72, target.z + distance * 0.58);
  const look = target.clone().sub(studio3d.camera.position);
  studio3d.yaw = Math.atan2(look.y, look.x);
  studio3d.pitch = Math.atan2(look.z, Math.hypot(look.x, look.y));
  renderStudio3d();
}

function attachStudio3dEvents() {
  const element = studio3d.renderer.domElement;
  element.addEventListener("contextmenu", (event) => event.preventDefault());
  element.addEventListener("mousedown", handleStudio3dMouseDown);
  element.addEventListener("mousemove", handleStudio3dMouseMove);
  element.addEventListener("wheel", (event) => {
    event.preventDefault();
    studio3d.speed = clamp(studio3d.speed * (event.deltaY > 0 ? 0.88 : 1.14), 80, 2400);
    status(`Predkosc kamery 3D: ${Math.round(studio3d.speed)}`);
  }, { passive: false });
}

function handleStudio3dMouseDown(event) {
  if (event.button === 2) {
    drag = { kind: "look3d", lastX: event.clientX, lastY: event.clientY };
    studio3d.renderer.domElement.style.cursor = "grabbing";
    return;
  }
  if (event.button !== 0) return;
  const hit = pickStudio3dEntity(event);
  if (activeTool === "sync") {
    if (hit) syncEntityClick(hit.entity.id);
    else status("Kliknij encje do synchronizacji");
    return;
  }
  if (activeTool === "delete") {
    if (hit) { setSelection([hit.entity.id], hit.entity.id); deleteSelection(); }
    return;
  }
  if (activeTool === "select") {
    if (!hit || entityIsLocked(hit.entity)) {
      if (!event.ctrlKey) setSelection([]);
      renderUi();
      return;
    }
    if (event.ctrlKey) toggleSelection(hit.entity.id);
    else setSelection([hit.entity.id], hit.entity.id);
    const centerX = hit.kind === "obstacle" ? hit.entity.x + hit.entity.w / 2 : hit.entity.x;
    const centerY = hit.kind === "obstacle" ? hit.entity.y + hit.entity.h / 2 : hit.entity.y;
    const planeZ = hit.kind === "obstacle" ? Number(hit.entity.elevation || 0) : Number(hit.entity.z || 0);
    const point = studio3dGroundPoint(event, planeZ);
    drag = {
      kind: "transform3d",
      id: hit.entity.id,
      mode: transformMode,
      startX: event.clientX,
      startY: event.clientY,
      point,
      offsetX: point ? point.x - centerX : 0,
      offsetY: point ? point.y - centerY : 0,
      snapshot: clone(map),
      original: clone(hit.entity),
    };
    renderUi();
    return;
  }
  const point = studio3dGroundPoint(event, 0);
  if (point) useEditorToolAt(activeTool, point.x, point.y, point.z || 0);
}

function handleStudio3dMouseMove(event) {
  if (!drag) return;
  if (drag.kind === "look3d") {
    studio3d.yaw -= (event.clientX - drag.lastX) * 0.005;
    studio3d.pitch = clamp(studio3d.pitch - (event.clientY - drag.lastY) * 0.004, -1.48, 1.25);
    drag.lastX = event.clientX;
    drag.lastY = event.clientY;
    renderStudio3d();
    return;
  }
  if (drag.kind !== "transform3d") return;
  const found = findEditorEntity(drag.id);
  if (!found) return;
  const entity = found.entity;
  if (drag.mode === "translate") {
    if (event.altKey) {
      const delta = (drag.startY - event.clientY) / 2;
      if (found.kind === "obstacle") entity.elevation = clamp(Number(drag.original.elevation || 0) + delta, 0, 1024);
      else entity.z = clamp(Number(drag.original.z || 0) + delta, 0, 1024);
    } else {
      const planeZ = found.kind === "obstacle" ? Number(entity.elevation || 0) : Number(entity.z || 0);
      const point = studio3dGroundPoint(event, planeZ);
      if (point) {
        if (found.kind === "obstacle") {
          entity.x = clamp(point.x - drag.offsetX - entity.w / 2, 0, map.w - entity.w);
          entity.y = clamp(point.y - drag.offsetY - entity.h / 2, 0, map.h - entity.h);
        } else {
          entity.x = clamp(point.x - drag.offsetX, 0, map.w);
          entity.y = clamp(point.y - drag.offsetY, 0, map.h);
        }
      }
    }
  } else if (drag.mode === "rotate") {
    entity.rot = ((Number(drag.original.rot || 0) + (event.clientX - drag.startX) * 0.45) % 360 + 360) % 360;
  } else if (drag.mode === "scale") {
    const factor = clamp(1 + (event.clientX - drag.startX - (event.clientY - drag.startY)) / 260, 0.15, 8);
    if (found.kind === "obstacle" || found.kind === "trigger") {
      entity.w = Math.max(12, Number(drag.original.w || 32) * factor);
      entity.h = Math.max(12, Number(drag.original.h || 32) * factor);
      if (found.kind === "obstacle") entity.z = Math.max(4, Number(drag.original.z || 32) * factor);
      else entity.height = Math.max(4, Number(drag.original.height || 32) * factor);
    }
  }
  rebuildStudio3dScene();
  renderStudio3d();
  renderProperties();
  renderObjects();
}

function isoPoint(x, y, originX, originY, scale) {
  return { x: originX + (x - y) * scale * 0.5, y: originY + (x + y) * scale * 0.25 };
}

function convertMapForViewport(mode) {
  map = normalizeStudioMap(map);
  map.meta = { ...(map.meta || {}), defaultTexture: map.meta?.defaultTexture || "white", editorViewport: mode, format: "potato-map-1.2", formatVersion: 2 };
  map.obstacles = map.obstacles.map((obj, index) => ({
    ...obj,
    id: obj.id || `obj-${Date.now().toString(36)}-${index}`,
    type: obj.type || "wall",
    x: Number(obj.x || 0),
    y: Number(obj.y || 0),
    w: Number(obj.w || 120),
    h: Number(obj.h || 80),
    z: Number(obj.z ?? (obj.type === "light" ? 10 : obj.type === "cover" ? 46 : obj.type === "crate" ? 64 : 96)),
    elevation: Number(obj.elevation || 0),
    rot: Number(obj.rot || 0),
    color: obj.color || "#56614d",
    material: obj.material || obj.texture || map.meta.defaultTexture,
    texture: obj.texture || obj.material || map.meta.defaultTexture,
    textureColor: obj.textureColor || obj.color || "",
    layer: obj.layer || "default",
    visible: obj.visible !== false,
    locked: Boolean(obj.locked),
    script: obj.script || "",
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
  floor.addColorStop(0, map.meta?.terrainColor || "#303a2f");
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
    .filter((obj) => entityIsVisible(obj) && !entityIsLocked(obj))
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
  const base = objectBaseColor(obj);
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
  if (selectedIds.has(obj.id)) {
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

function objectBaseColor(obj) {
  if (obj.texture === "custom-color") return obj.color || "#56614d";
  const custom = textures.find((item) => item.id === obj.texture || item.id === obj.material);
  if (custom) return custom.baseColor || obj.textureColor || obj.color || "#f1f1ea";
  return studioTexturePalette[obj.texture || obj.material] || obj.color || "#56614d";
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
  ctx.fillStyle = objectBaseColor(obj);
  ctx.fillRect(-obj.w / 2, -obj.h / 2, obj.w, obj.h);
  ctx.fillStyle = "rgba(255,255,255,0.12)";
  for (let x = -obj.w / 2; x < obj.w / 2; x += 18) ctx.fillRect(x, -obj.h / 2, 2, obj.h);
  if (selectedIds.has(obj.id)) {
    ctx.strokeStyle = "#77b56f";
    ctx.lineWidth = 5;
    ctx.strokeRect(-obj.w / 2, -obj.h / 2, obj.w, obj.h);
  }
  ctx.restore();
}

function canvasPoint(event) {
  const screen = eventCanvasPixel(event);
  const point = studioSettings.viewportMode === "3d" ? isoCanvasPoint(screen.x, screen.y) : screenToWorld2d(screen);
  return snapPoint(point);
}

function snapPoint(point) {
  const grid = Math.max(1, Number(map.meta?.snapGrid || 1));
  return {
    x: clamp(Math.round(point.x / grid) * grid, 0, map.w),
    y: clamp(Math.round(point.y / grid) * grid, 0, map.h),
    z: clamp(Math.round(Number(point.z || 0) / grid) * grid, 0, 1024),
  };
}

function hitObject(x, y) {
  return [...map.obstacles].reverse().find((obj) => {
    if (!entityIsVisible(obj) || entityIsLocked(obj)) return false;
    const cx = obj.x + obj.w / 2;
    const cy = obj.y + obj.h / 2;
    const angle = -(Number(obj.rot || 0) * Math.PI) / 180;
    const dx = x - cx;
    const dy = y - cy;
    const localX = dx * Math.cos(angle) - dy * Math.sin(angle);
    const localY = dx * Math.sin(angle) + dy * Math.cos(angle);
    return Math.abs(localX) <= obj.w / 2 && Math.abs(localY) <= obj.h / 2;
  });
}

function hitPointEntity(x, y) {
  const radius = 24 / Math.max(0.2, view2d.zoom);
  const hits = [];
  for (const [kind, list] of editorCollections().slice(1)) {
    for (const entity of list) {
      if (!entityIsVisible(entity) || entityIsLocked(entity)) continue;
      if (kind === "trigger") {
        if (x >= entity.x - entity.w / 2 && x <= entity.x + entity.w / 2 && y >= entity.y - entity.h / 2 && y <= entity.y + entity.h / 2) hits.push({ kind, entity, list });
      } else if (Math.hypot(x - entity.x, y - entity.y) <= radius) {
        hits.push({ kind, entity, list });
      }
    }
  }
  return hits[hits.length - 1] || null;
}

function hitObjectAtEvent(event) {
  if (studioSettings.viewportMode === "3d") {
    const screen = eventCanvasPixel(event);
    return hitIsoObject(screen.x, screen.y);
  }
  const p = canvasPoint(event);
  const pointHit = hitPointEntity(p.x, p.y);
  if (pointHit) return pointHit.entity;
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
  const texture = type === "crate" ? "crate" : map.meta?.defaultTexture || "white";
  const obj = { id: `obj-${Date.now().toString(36)}`, type, x: x - p[0] / 2, y: y - p[1] / 2, w: p[0], h: p[1], z: type === "wall" || type === "prop" ? Number(map.meta?.defaultZ || p[2]) : p[2], elevation: 0, rot: 0, color: p[3], texture, material: texture, layer: activeLayerId, visible: true, locked: false, script: "" };
  map.obstacles.push(obj);
  setSelection([obj.id], obj.id);
  renderUi();
}

function addEditorPointEntity(kind, x, y, z = 0, extras = {}) {
  const list = map.editorData[kind];
  const singular = kind.endsWith("s") ? kind.slice(0, -1) : kind;
  const entity = {
    id: `${singular}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 5)}`,
    name: `${singular} ${list.length + 1}`,
    x,
    y,
    z,
    layer: activeLayerId,
    ...extras,
  };
  list.push(entity);
  setSelection([entity.id], entity.id);
  return entity;
}

function activeWaypointGroupId() {
  const selectedUnit = selectedEntities().find((item) => item.kind === "unit");
  const group = map.editorData.groups.find((item) => selectedUnit && item.members.includes(selectedUnit.entity.id)) || map.editorData.groups[0];
  return group?.id || "";
}

function useEditorToolAt(tool, x, y, z = 0) {
  const before = clone(map);
  if (tool === "spawnT") map.tSpawn = { x, y };
  else if (tool === "spawnCT") map.ctSpawn = { x, y };
  else if (tool === "siteA") map.sites.A = { x, y, r: 115 };
  else if (tool === "siteB") map.sites.B = { x, y, r: 110 };
  else if (tool === "trigger") addEditorPointEntity("triggers", x, y, z, { w: 180, h: 140, height: 120, shape: "rectangle", condition: "true", onActivation: "", repeatable: false });
  else if (tool === "logic") addEditorPointEntity("systems", x, y, z, { systemType: "logic", code: "" });
  else if (tool === "weaponPickup") addEditorPointEntity("pickups", x, y, z, { weapon: "AK-47", ammo: 30 });
  else if (tool === "unitT" || tool === "unitCT") {
    const unit = addEditorPointEntity("units", x, y, z, { side: tool === "unitCT" ? "CT" : "T", role: "rifleman", playable: true, skill: 0.5 });
    let group = map.editorData.groups.find((item) => item.side === unit.side && item.layer === activeLayerId);
    if (!group) {
      group = { id: `group-${Date.now().toString(36)}`, name: `${unit.side} Group 1`, side: unit.side, members: [], layer: activeLayerId };
      map.editorData.groups.push(group);
    }
    group.members.push(unit.id);
  } else if (tool === "waypoint") {
    const groupId = activeWaypointGroupId();
    const order = map.editorData.waypoints.filter((item) => item.groupId === groupId).length;
    addEditorPointEntity("waypoints", x, y, z, { groupId, type: "MOVE", order, condition: "true", onActivation: "" });
  } else if (tool === "marker") addEditorPointEntity("markers", x, y, z, { text: "Marker", color: "#d7bd62", markerType: "mil_dot" });
  else if (tool === "sync") return status("W trybie Sync kliknij dwa istniejace obiekty");
  else addObject(tool, x, y);
  recordHistory(`Dodano ${tool}`, before);
  autosaveStudio();
  renderUi();
  status(`Dodano ${tool} / ${Math.round(x)}, ${Math.round(y)}, ${Math.round(z)}`);
}

function renderUi() {
  map = normalizeStudioMap(map);
  if (!map.editorData.layers.some((layer) => layer.id === activeLayerId)) activeLayerId = map.editorData.layers[0].id;
  setSelection([...selectedIds], selectedId);
  ui.name.value = map.name;
  map.meta = map.meta || {};
  ui.viewportMode.value = studioSettings.viewportMode;
  ui.gameMode.value = map.meta.gameMode || studioSettings.gameMode;
  studioSettings.testGraphics = ["2d", "3d"].includes(map.meta.testGraphics || studioSettings.testGraphics) ? (map.meta.testGraphics || studioSettings.testGraphics) : studioSettings.viewportMode;
  ui.testGraphics.value = studioSettings.testGraphics;
  ui.matchSize.value = String(map.meta.matchSize || studioSettings.matchSize);
  ui.defaultWeapon.value = map.meta.defaultWeapon || studioSettings.defaultWeapon;
  const storyGoal = normalizeStoryGoal(map.meta.storyGoal);
  ui.storyGoalType.value = storyGoal.type;
  ui.storyGoalTarget.value = String(storyGoal.target);
  ui.storyGoalText.value = storyGoal.text;
  ui.storyGoalCode.value = storyGoal.code;
  syncAdvancedFields();
  renderLayers();
  renderProperties();
  renderObjects();
  renderAssets();
  updateHistoryButtons();
  document.querySelectorAll("[data-editor-mode]").forEach((button) => button.classList.toggle("active", button.dataset.editorMode === editorMode));
  document.querySelectorAll("[data-transform]").forEach((button) => button.classList.toggle("active", button.dataset.transform === transformMode));
  try {
    draw();
  } catch (error) {
    console.error(error);
    map = normalizeStudioMap(emptyMap());
    draw();
    status(`Blad renderu Studio: ${error?.message || "naprawiono mape"}`);
  }
}

function syncAdvancedFields() {
  ui.terrainWidth.value = String(map.w);
  ui.terrainHeight.value = String(map.h);
  ui.snapGrid.value = String(map.meta.snapGrid || 16);
  ui.defaultZ.value = String(map.meta.defaultZ || 96);
  ui.terrainColor.value = map.meta.terrainColor || "#303a2f";
  ui.ambientColor.value = map.meta.ambientColor || "#3d555d";
  ui.skyColor.value = map.meta.skyColor || "#70858b";
  ui.fogDistance.value = String(map.meta.fogDistance || 3600);
  ui.defaultTexture.value = map.meta.defaultTexture || "white";
  ui.moddingMode.value = map.meta.moddingMode || "safe";
  ui.autosaveMap.checked = map.meta.autosave !== false;
}

function applyTerrainSettings() {
  const before = clone(map);
  const oldW = map.w;
  const oldH = map.h;
  map.w = clamp(Number(ui.terrainWidth.value) || map.w, 900, 5000);
  map.h = clamp(Number(ui.terrainHeight.value) || map.h, 700, 4000);
  const scaleX = oldW ? map.w / oldW : 1;
  const scaleY = oldH ? map.h / oldH : 1;
  for (const obj of map.obstacles) {
    obj.x = clamp(obj.x * scaleX, 0, map.w - obj.w);
    obj.y = clamp(obj.y * scaleY, 0, map.h - obj.h);
  }
  map.tSpawn = { x: clamp(map.tSpawn.x * scaleX, 24, map.w - 24), y: clamp(map.tSpawn.y * scaleY, 24, map.h - 24) };
  map.ctSpawn = { x: clamp(map.ctSpawn.x * scaleX, 24, map.w - 24), y: clamp(map.ctSpawn.y * scaleY, 24, map.h - 24) };
  map.sites.A = { ...map.sites.A, x: clamp(map.sites.A.x * scaleX, 24, map.w - 24), y: clamp(map.sites.A.y * scaleY, 24, map.h - 24) };
  map.sites.B = { ...map.sites.B, x: clamp(map.sites.B.x * scaleX, 24, map.w - 24), y: clamp(map.sites.B.y * scaleY, 24, map.h - 24) };
  for (const [, list] of editorCollections().slice(1)) {
    for (const entity of list) {
      entity.x = clamp(entity.x * scaleX, 0, map.w);
      entity.y = clamp(entity.y * scaleY, 0, map.h);
      if ("w" in entity) entity.w = clamp(entity.w * scaleX, 12, map.w);
      if ("h" in entity) entity.h = clamp(entity.h * scaleY, 12, map.h);
    }
  }
  map.meta = {
    ...(map.meta || {}),
    snapGrid: clamp(Number(ui.snapGrid.value) || 16, 1, 256),
    defaultZ: clamp(Number(ui.defaultZ.value) || 96, 0, 512),
    terrainColor: ui.terrainColor.value || "#303a2f",
    ambientColor: ui.ambientColor.value || "#3d555d",
    skyColor: ui.skyColor.value || "#70858b",
    fogDistance: clamp(Number(ui.fogDistance.value) || 3600, 600, 8000),
    defaultTexture: ui.defaultTexture.value || "white",
    moddingMode: ui.moddingMode.value || "safe",
    autosave: ui.autosaveMap.checked,
  };
  map = normalizeStudioMap(map);
  recordHistory("Zmieniono teren", before);
  renderUi();
  if (map.meta.autosave) localStorage.setItem("potatoStrikeStudioLastMap", JSON.stringify(map));
  status(`Teren ${map.w}x${map.h}, grid ${map.meta.snapGrid}`);
}

function renderProperties() {
  ui.properties.innerHTML = "";
  const selected = findEditorEntity(selectedId);
  const target = selected?.entity || map;
  const fieldMap = {
    obstacle: [["type", "text"], ["x", "number"], ["y", "number"], ["w", "number"], ["h", "number"], ["z", "number"], ["elevation", "number"], ["rot", "number"], ["texture", "texture"], ["color", "color"], ["layer", "layer"], ["locked", "checkbox"], ["script", "code"]],
    unit: [["name", "text"], ["side", "side"], ["role", "text"], ["x", "number"], ["y", "number"], ["z", "number"], ["skill", "number"], ["playable", "checkbox"], ["layer", "layer"]],
    trigger: [["name", "text"], ["x", "number"], ["y", "number"], ["z", "number"], ["w", "number"], ["h", "number"], ["height", "number"], ["shape", "shape"], ["condition", "code"], ["onActivation", "code"], ["repeatable", "checkbox"], ["layer", "layer"]],
    waypoint: [["name", "text"], ["x", "number"], ["y", "number"], ["z", "number"], ["type", "waypoint"], ["order", "number"], ["groupId", "group"], ["condition", "code"], ["onActivation", "code"], ["layer", "layer"]],
    marker: [["name", "text"], ["text", "text"], ["x", "number"], ["y", "number"], ["z", "number"], ["color", "color"], ["markerType", "text"], ["layer", "layer"]],
    system: [["name", "text"], ["systemType", "text"], ["x", "number"], ["y", "number"], ["z", "number"], ["code", "code"], ["layer", "layer"]],
    pickup: [["name", "text"], ["weapon", "text"], ["ammo", "number"], ["x", "number"], ["y", "number"], ["z", "number"], ["layer", "layer"]],
  };
  const fields = selected ? fieldMap[selected.kind] : [["name", "text"], ["w", "number"], ["h", "number"]];
  for (const [key, type] of fields) {
    const label = document.createElement("label");
    label.textContent = key;
    const isSelect = ["texture", "layer", "side", "shape", "waypoint", "group"].includes(type);
    const input = document.createElement(type === "code" ? "textarea" : isSelect ? "select" : "input");
    if (type === "texture") {
      for (const [value, text] of allTextureOptions()) {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = text;
        input.appendChild(option);
      }
    } else if (type === "layer") {
      for (const layer of map.editorData.layers) input.add(new Option(layer.name, layer.id));
    } else if (type === "side") {
      input.add(new Option("T", "T")); input.add(new Option("CT", "CT"));
    } else if (type === "shape") {
      input.add(new Option("Rectangle", "rectangle")); input.add(new Option("Ellipse", "ellipse"));
    } else if (type === "waypoint") {
      for (const value of ["MOVE", "HOLD", "GUARD", "DESTROY", "GET IN", "CYCLE", "SCRIPTED"]) input.add(new Option(value, value));
    } else if (type === "group") {
      input.add(new Option("No group", ""));
      for (const group of map.editorData.groups) input.add(new Option(group.name, group.id));
    } else if (type === "checkbox") {
      input.type = "checkbox";
    } else if (type === "code") {
      input.className = "code-box";
      input.spellcheck = false;
      input.rows = 3;
    } else {
      input.type = type;
    }
    if (type === "checkbox") input.checked = Boolean(target[key]);
    else input.value = target[key] ?? "";
    let beforeChange = null;
    input.addEventListener("focus", () => { beforeChange = clone(map); }, { once: true });
    input.addEventListener("input", () => {
      target[key] = type === "number" ? Number(input.value) : type === "checkbox" ? input.checked : input.value;
      if (key === "texture") {
        const custom = textures.find((item) => item.id === input.value);
        target.material = input.value;
        if (custom) {
          target.color = custom.baseColor || target.color;
          target.textureColor = custom.baseColor || target.textureColor || target.color;
        }
      }
      if (target === map && key === "name") ui.name.value = target[key];
      draw();
      renderObjects();
    });
    input.addEventListener("change", () => {
      if (beforeChange) recordHistory(`Zmieniono ${key}`, beforeChange);
      beforeChange = clone(map);
      autosaveStudio();
      renderUi();
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
  for (const [kind, list] of editorCollections()) {
    for (const entity of list) {
      const name = entity.name || entity.type || kind;
      addObjectRow(name, `${kind} / ${Math.round(entity.x)}, ${Math.round(entity.y)}`, entity.id);
    }
  }
  for (const group of map.editorData.groups) addObjectRow(group.name, `group / ${group.members.length}`, "", group.id);
}

function addObjectRow(name, value, id = "", groupId = "") {
  const row = document.createElement("button");
  row.className = `object-row${id && selectedIds.has(id) ? " active" : ""}`;
  row.innerHTML = `<span>${name}</span><span class="tag">${value}</span>`;
  if (id) row.addEventListener("click", (event) => { if (event.ctrlKey) toggleSelection(id); else setSelection([id], id); renderUi(); });
  if (groupId) row.addEventListener("click", () => {
    const group = map.editorData.groups.find((item) => item.id === groupId);
    setSelection(group?.members || []);
    renderUi();
  });
  ui.objects.appendChild(row);
}

function renderLayers() {
  ui.activeLayer.innerHTML = "";
  ui.layerList.innerHTML = "";
  for (const layer of map.editorData.layers) {
    ui.activeLayer.add(new Option(layer.name, layer.id));
    const row = document.createElement("div");
    row.className = `layer-row${layer.id === activeLayerId ? " active" : ""}`;
    const visible = document.createElement("input");
    visible.type = "checkbox";
    visible.checked = layer.visible !== false;
    visible.title = "Widocznosc";
    visible.addEventListener("change", () => { recordHistory("Widocznosc warstwy"); layer.visible = visible.checked; renderUi(); });
    const name = document.createElement("button");
    name.className = "secondary";
    name.textContent = layer.name;
    name.addEventListener("click", () => { activeLayerId = layer.id; renderUi(); });
    const lock = document.createElement("button");
    lock.className = "secondary";
    lock.textContent = layer.locked ? "LOCK" : "EDIT";
    lock.title = layer.locked ? "Odblokuj warstwe" : "Zablokuj warstwe";
    lock.addEventListener("click", () => { recordHistory("Blokada warstwy"); layer.locked = !layer.locked; renderUi(); });
    row.append(visible, name, lock);
    ui.layerList.appendChild(row);
  }
  ui.activeLayer.value = activeLayerId;
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

function paintContext() {
  return ui.paintCanvas.getContext("2d", { willReadFrequently: true });
}

function resetPaintTexture() {
  const paint = paintContext();
  paint.fillStyle = ui.paintBaseColor.value || "#f1f1ea";
  paint.fillRect(0, 0, ui.paintCanvas.width, ui.paintCanvas.height);
  paint.strokeStyle = "rgba(0,0,0,0.12)";
  paint.lineWidth = 1;
  for (let x = 0; x <= ui.paintCanvas.width; x += 16) {
    paint.beginPath();
    paint.moveTo(x, 0);
    paint.lineTo(x, ui.paintCanvas.height);
    paint.stroke();
  }
  for (let y = 0; y <= ui.paintCanvas.height; y += 16) {
    paint.beginPath();
    paint.moveTo(0, y);
    paint.lineTo(ui.paintCanvas.width, y);
    paint.stroke();
  }
}

function paintTextureAt(event) {
  const rect = ui.paintCanvas.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * ui.paintCanvas.width;
  const y = ((event.clientY - rect.top) / rect.height) * ui.paintCanvas.height;
  const paint = paintContext();
  paint.fillStyle = ui.paintColor.value || "#56614d";
  paint.beginPath();
  paint.arc(x, y, Number(ui.paintSize.value || 4), 0, Math.PI * 2);
  paint.fill();
}

function savePaintTexture() {
  const id = `paint-${Date.now().toString(36)}`;
  const name = ui.textureName.value || "paint-texture";
  const texture = {
    id,
    name,
    dataUrl: ui.paintCanvas.toDataURL("image/png"),
    baseColor: ui.paintBaseColor.value || "#f1f1ea",
    kind: "paint",
  };
  textures.push(texture);
  saveJson("potatoStrikeStudioTextures", textures);
  renderAssets();
  renderProperties();
  status(`Zapisano teksture paint: ${name}`);
  return texture;
}

function applyPaintTextureToSelected() {
  const selected = map.obstacles.find((obj) => obj.id === selectedId);
  if (!selected) return status("Najpierw wybierz obiekt");
  const texture = savePaintTexture();
  selected.texture = texture.id;
  selected.material = texture.id;
  selected.color = texture.baseColor;
  selected.textureColor = texture.baseColor;
  renderUi();
  status(`Tekstura ${texture.name} przypisana do ${selected.type}`);
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
    snapGrid: Number(ui.snapGrid.value || 16),
    defaultZ: Number(ui.defaultZ.value || 96),
    terrainColor: ui.terrainColor.value || "#303a2f",
    ambientColor: ui.ambientColor.value || "#3d555d",
    skyColor: ui.skyColor.value || "#70858b",
    fogDistance: clamp(Number(ui.fogDistance.value) || 3600, 600, 8000),
    defaultTexture: ui.defaultTexture.value || "white",
    moddingMode: ui.moddingMode.value || "safe",
    autosave: ui.autosaveMap.checked,
    storyGoal: normalizeStoryGoal({
      type: ui.storyGoalType.value,
      target: Number(ui.storyGoalTarget.value || 1),
      text: ui.storyGoalText.value,
      code: ui.storyGoalCode.value,
    }),
    license: "GNU GPL 3.0",
    format: "potato-map-1.2",
    formatVersion: 2,
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
  const before = clone(map);
  const [kind, id] = ui.list.value.split(":");
  if (kind === "base") map = normalizeStudioMap(clone(baseMaps[id]));
  else {
    const item = userMaps().find((entry) => entry.id === id);
    if (item) map = normalizeStudioMap(clone(item.map));
  }
  setSelection([]);
  view2d.initialized = false;
  recordHistory("Otworzono mape", before);
  renderUi();
  status(`Otwarta mapa: ${map.name}`);
}

function generateMap() {
  const before = clone(map);
  const seed = `${ui.name.value || "studio"}-${Date.now().toString(36)}`;
  map = makeMap(`Generated ${seed.slice(-6)}`, 2100, 1400, seed.length);
  setSelection([]);
  view2d.initialized = false;
  recordHistory("Wygenerowano mape", before);
  renderUi();
  status("Wygenerowano mape do dalszej edycji");
}

function exportMap() {
  const payload = { type: "potato-strike-map", version: 2, map: normalizeStudioMap(map), assets: { textures } };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
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
    const before = clone(map);
    map = normalizeStudioMap(data.map || data);
    if (Array.isArray(data.assets?.textures)) {
      const merged = new Map(textures.map((item) => [item.id, item]));
      for (const texture of data.assets.textures) if (texture?.id) merged.set(texture.id, texture);
      textures = [...merged.values()];
      saveJson("potatoStrikeStudioTextures", textures);
    }
    setSelection([]);
    view2d.initialized = false;
    recordHistory("Zaimportowano mape", before);
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
  textures.push({ id: `tex-${Date.now().toString(36)}`, name: ui.textureName.value || file.name, dataUrl, baseColor: ui.paintBaseColor.value || "#f1f1ea", kind: "upload" });
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

function removeEntityById(id) {
  const found = findEditorEntity(id);
  if (!found) return false;
  const index = found.list.findIndex((item) => item.id === id);
  if (index >= 0) found.list.splice(index, 1);
  for (const group of map.editorData.groups) group.members = group.members.filter((memberId) => memberId !== id);
  map.editorData.groups = map.editorData.groups.filter((group) => group.members.length > 0);
  map.editorData.connections = map.editorData.connections.filter((connection) => connection.from !== id && connection.to !== id);
  return true;
}

function deleteSelection(label = "Usunieto encje") {
  if (!selectedIds.size) return;
  const before = clone(map);
  for (const id of selectedIds) removeEntityById(id);
  recordHistory(label, before);
  setSelection([]);
  autosaveStudio();
  renderUi();
  status(label);
}

function copySelection() {
  clipboardObjects = selectedEntities().map((item) => ({ kind: item.kind, entity: clone(item.entity) }));
  status(`Skopiowano: ${clipboardObjects.length}`);
}

function pasteSelection() {
  if (!clipboardObjects.length) return status("Schowek edytora jest pusty");
  const before = clone(map);
  const offset = Math.max(16, Number(map.meta?.snapGrid || 16) * 2);
  const ids = [];
  for (const item of clipboardObjects) {
    const copy = clone(item.entity);
    copy.id = `${item.kind}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
    copy.x = clamp(Number(copy.x || 0) + offset, 0, map.w);
    copy.y = clamp(Number(copy.y || 0) + offset, 0, map.h);
    copy.layer = activeLayerId;
    const collection = item.kind === "obstacle" ? map.obstacles : map.editorData[`${item.kind}s`];
    if (!collection) continue;
    collection.push(copy);
    ids.push(copy.id);
  }
  recordHistory("Wklejono encje", before);
  setSelection(ids, ids[0]);
  autosaveStudio();
  renderUi();
}

function createGroupFromSelection() {
  const units = selectedEntities().filter((item) => item.kind === "unit").map((item) => item.entity);
  if (!units.length) return status("Zaznacz jednostki do grupy");
  const before = clone(map);
  const side = units[0].side;
  const group = {
    id: `group-${Date.now().toString(36)}`,
    name: `${side} Group ${map.editorData.groups.filter((item) => item.side === side).length + 1}`,
    side,
    members: units.map((unit) => unit.id),
    layer: activeLayerId,
  };
  for (const existing of map.editorData.groups) existing.members = existing.members.filter((id) => !group.members.includes(id));
  map.editorData.groups = map.editorData.groups.filter((item) => item.members.length > 0);
  map.editorData.groups.push(group);
  recordHistory("Utworzono grupe", before);
  autosaveStudio();
  renderUi();
  status(`${group.name}: ${group.members.length} jednostek`);
}

function syncEntityClick(id) {
  if (!pendingConnectionId) {
    pendingConnectionId = id;
    setSelection([id], id);
    renderUi();
    return status("Wybierz druga encje do synchronizacji");
  }
  if (pendingConnectionId === id) {
    pendingConnectionId = "";
    return status("Synchronizacja anulowana");
  }
  const before = clone(map);
  map.editorData.connections.push({ id: `connection-${Date.now().toString(36)}`, from: pendingConnectionId, to: id, type: "sync" });
  recordHistory("Dodano synchronizacje", before);
  setSelection([pendingConnectionId, id], id);
  pendingConnectionId = "";
  autosaveStudio();
  renderUi();
  status("Encje zsynchronizowane");
}

function setEditorMode(mode) {
  editorMode = mode;
  const tools = { objects: "select", groups: "select", triggers: "trigger", waypoints: "waypoint", sync: "sync", markers: "marker" };
  activeTool = tools[mode] || "select";
  document.querySelectorAll("[data-tool]").forEach((button) => button.classList.toggle("active", button.dataset.tool === activeTool));
  renderUi();
  status(`Tryb: ${mode}`);
}

function setTransformMode(mode) {
  transformMode = mode;
  activeTool = "select";
  document.querySelectorAll("[data-tool]").forEach((button) => button.classList.toggle("active", button.dataset.tool === "select"));
  renderUi();
  status(`Transformacja: ${mode}`);
}

function entitiesInsideRect(start, end) {
  const left = Math.min(start.x, end.x);
  const right = Math.max(start.x, end.x);
  const top = Math.min(start.y, end.y);
  const bottom = Math.max(start.y, end.y);
  return editorCollections().flatMap(([kind, list]) => list.filter((entity) => {
    if (!entityIsVisible(entity) || entityIsLocked(entity)) return false;
    const cx = kind === "obstacle" ? entity.x + entity.w / 2 : entity.x;
    const cy = kind === "obstacle" ? entity.y + entity.h / 2 : entity.y;
    return cx >= left && cx <= right && cy >= top && cy <= bottom;
  }).map((entity) => entity.id));
}

document.querySelectorAll("[data-tool]").forEach((button) => {
  button.addEventListener("click", () => {
    activeTool = button.dataset.tool;
    document.querySelectorAll("[data-tool]").forEach((item) => item.classList.toggle("active", item === button));
    status(`Tool: ${activeTool}`);
  });
});

document.querySelectorAll("[data-editor-mode]").forEach((button) => {
  button.addEventListener("click", () => setEditorMode(button.dataset.editorMode));
});

document.querySelectorAll("[data-transform]").forEach((button) => {
  button.addEventListener("click", () => setTransformMode(button.dataset.transform));
});

canvas.addEventListener("mousedown", (event) => {
  const p = canvasPoint(event);
  if (event.button === 2) {
    event.preventDefault();
    drag = { kind: "pan2d", lastX: event.clientX, lastY: event.clientY };
    canvas.style.cursor = "grabbing";
    return;
  }
  if (event.button !== 0) return;
  const hit = hitObjectAtEvent(event);
  const found = hit ? findEditorEntity(hit.id) : null;
  if (activeTool === "sync") {
    if (found) syncEntityClick(found.entity.id);
    else status("Kliknij encje do synchronizacji");
    return;
  }
  if (activeTool === "select") {
    if (!found) {
      if (!event.ctrlKey) setSelection([]);
      drag = { kind: "marquee", start: p, current: p, append: event.ctrlKey };
      draw();
      return;
    }
    if (event.ctrlKey) toggleSelection(found.entity.id);
    else if (!selectedIds.has(found.entity.id)) setSelection([found.entity.id], found.entity.id);
    else selectedId = found.entity.id;
    const centerX = found.kind === "obstacle" ? found.entity.x + found.entity.w / 2 : found.entity.x;
    const centerY = found.kind === "obstacle" ? found.entity.y + found.entity.h / 2 : found.entity.y;
    drag = {
      kind: "transform2d",
      id: found.entity.id,
      mode: transformMode,
      start: p,
      offsetX: p.x - centerX,
      offsetY: p.y - centerY,
      snapshot: clone(map),
      originals: selectedEntities().map((item) => ({ id: item.entity.id, kind: item.kind, entity: clone(item.entity) })),
    };
    status(`Wybrano ${found.entity.name || found.entity.type || found.kind}`);
    renderUi();
    return;
  }
  if (activeTool === "delete") {
    if (found) { setSelection([found.entity.id], found.entity.id); deleteSelection(); }
    return;
  }
  useEditorToolAt(activeTool, p.x, p.y, p.z || 0);
});

canvas.addEventListener("mousemove", (event) => {
  if (!drag) return;
  if (drag.kind === "pan2d") {
    view2d.x -= (event.clientX - drag.lastX) / view2d.zoom;
    view2d.y -= (event.clientY - drag.lastY) / view2d.zoom;
    drag.lastX = event.clientX;
    drag.lastY = event.clientY;
    draw();
    return;
  }
  const p = canvasPoint(event);
  if (drag.kind === "marquee") {
    drag.current = p;
    draw();
    return;
  }
  if (drag.kind !== "transform2d") return;
  const deltaX = p.x - drag.start.x;
  const deltaY = p.y - drag.start.y;
  for (const original of drag.originals) {
    const found = findEditorEntity(original.id);
    if (!found) continue;
    const entity = found.entity;
    if (drag.mode === "translate" || drag.mode === "select") {
      if (found.kind === "obstacle") {
        entity.x = clamp(original.entity.x + deltaX, 0, map.w - entity.w);
        entity.y = clamp(original.entity.y + deltaY, 0, map.h - entity.h);
      } else {
        entity.x = clamp(original.entity.x + deltaX, 0, map.w);
        entity.y = clamp(original.entity.y + deltaY, 0, map.h);
      }
    } else if (drag.mode === "rotate") {
      entity.rot = ((Number(original.entity.rot || 0) + deltaX * 0.35) % 360 + 360) % 360;
    } else if (drag.mode === "scale" && (found.kind === "obstacle" || found.kind === "trigger")) {
      const factor = clamp(1 + (deltaX - deltaY) / 240, 0.15, 8);
      entity.w = Math.max(12, Number(original.entity.w || 32) * factor);
      entity.h = Math.max(12, Number(original.entity.h || 32) * factor);
      if (found.kind === "obstacle") entity.z = Math.max(4, Number(original.entity.z || 32) * factor);
      else entity.height = Math.max(4, Number(original.entity.height || 32) * factor);
    }
  }
  draw();
  renderProperties();
  renderObjects();
});

canvas.addEventListener("wheel", (event) => {
  if (studioSettings.viewportMode !== "2d") return;
  event.preventDefault();
  const screen = eventCanvasPixel(event);
  const before = screenToWorld2d(screen);
  view2d.zoom = clamp(view2d.zoom * (event.deltaY > 0 ? 0.88 : 1.14), 0.08, 4.5);
  view2d.x = before.x - screen.x / view2d.zoom;
  view2d.y = before.y - screen.y / view2d.zoom;
  draw();
}, { passive: false });
canvas.addEventListener("contextmenu", (event) => event.preventDefault());

window.addEventListener("mouseup", () => {
  if (!drag) return;
  if (drag.kind === "marquee" && drag.current) {
    const ids = entitiesInsideRect(drag.start, drag.current);
    setSelection(drag.append ? [...new Set([...selectedIds, ...ids])] : ids, ids[0]);
    status(`Zaznaczono: ${selectedIds.size}`);
    drag = null;
    renderUi();
    return;
  }
  if ((drag.kind === "transform2d" || drag.kind === "transform3d") && drag.snapshot) {
    recordHistory("Transformacja encji", drag.snapshot);
    autosaveStudio();
  }
  drag = null;
  canvas.style.cursor = "crosshair";
  if (studio3d.renderer) studio3d.renderer.domElement.style.cursor = "crosshair";
  renderUi();
});
window.addEventListener("keydown", (event) => {
  pressed3dKeys.add(event.code);
  const editingText = ["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName);
  if (editingText) return;
  const command = event.ctrlKey || event.metaKey;
  if (command && event.code === "KeyZ") { event.preventDefault(); return event.shiftKey ? redoEditor() : undoEditor(); }
  if (command && event.code === "KeyY") { event.preventDefault(); return redoEditor(); }
  if (command && event.code === "KeyC") { event.preventDefault(); return copySelection(); }
  if (command && event.code === "KeyV") { event.preventDefault(); return pasteSelection(); }
  if (command && event.code === "KeyG") { event.preventDefault(); return createGroupFromSelection(); }
  if (command && event.code === "KeyA") {
    event.preventDefault();
    const ids = editorCollections().flatMap(([, list]) => list.filter((entity) => entityIsVisible(entity) && !entityIsLocked(entity)).map((entity) => entity.id));
    setSelection(ids, ids[0]);
    return renderUi();
  }
  const modeByKey = { F1: "objects", F2: "groups", F3: "triggers", F4: "waypoints", F5: "sync", F6: "markers" };
  if (modeByKey[event.code]) { event.preventDefault(); return setEditorMode(modeByKey[event.code]); }
  const transformByKey = { Digit1: "select", Digit2: "translate", Digit3: "rotate", Digit4: "scale" };
  if (transformByKey[event.code]) { event.preventDefault(); return setTransformMode(transformByKey[event.code]); }
  if (event.code === "KeyF") return focusStudioSelection();
  if (event.code === "Home") {
    if (studioSettings.viewportMode === "3d") resetStudio3dCamera();
    else { view2d.initialized = false; draw(); }
    return;
  }
  const found = findEditorEntity(selectedId);
  if (event.code === "Delete" || event.code === "Backspace") {
    event.preventDefault();
    return deleteSelection();
  }
  if (!found) return;
  if (studioSettings.viewportMode === "2d" && (event.code === "KeyQ" || event.code === "KeyE")) {
    recordHistory("Obrot encji");
    found.entity.rot = ((found.entity.rot || 0) + (event.code === "KeyE" ? 15 : -15) + 360) % 360;
    renderUi();
    status(`Rotacja: ${found.entity.rot}`);
    return;
  }
  if (event.key === "+" || event.key === "=" || event.key === "-") {
    recordHistory("Wysokosc encji");
    const key = found.kind === "obstacle" ? "elevation" : "z";
    found.entity[key] = Math.max(0, (found.entity[key] || 0) + (event.key === "-" ? -8 : 8));
    renderUi();
    status(`Wysokosc: ${found.entity[key]}`);
  }
});
window.addEventListener("keyup", (event) => pressed3dKeys.delete(event.code));
ui.name.addEventListener("input", () => { map.name = ui.name.value; });
ui.viewportMode.addEventListener("change", () => {
  studioSettings.viewportMode = ui.viewportMode.value === "3d" ? "3d" : "2d";
  convertMapForViewport(studioSettings.viewportMode);
  saveJson("potatoStrikeStudioSettings", studioSettings);
  renderUi();
  status(`Widok ${studioSettings.viewportMode === "3d" ? "Scena 3D" : "Plan 2D"} - dane mapy zachowane`);
});
ui.gameMode.addEventListener("change", () => { map.meta = { ...(map.meta || {}), gameMode: ui.gameMode.value }; });
ui.testGraphics.addEventListener("change", () => {
  studioSettings.testGraphics = ["2d", "3d"].includes(ui.testGraphics.value) ? ui.testGraphics.value : "2d";
  map.meta = { ...(map.meta || {}), testGraphics: studioSettings.testGraphics };
  saveJson("potatoStrikeStudioSettings", studioSettings);
  status(`Kamera testu: ${studioSettings.testGraphics}`);
});
ui.matchSize.addEventListener("change", () => { map.meta = { ...(map.meta || {}), matchSize: Number(ui.matchSize.value) }; });
ui.defaultWeapon.addEventListener("change", () => { map.meta = { ...(map.meta || {}), defaultWeapon: ui.defaultWeapon.value }; });
["storyGoalType", "storyGoalTarget", "storyGoalText", "storyGoalCode"].forEach((key) => {
  ui[key].addEventListener("input", () => {
    map.meta = {
      ...(map.meta || {}),
      storyGoal: normalizeStoryGoal({
        type: ui.storyGoalType.value,
        target: Number(ui.storyGoalTarget.value || 1),
        text: ui.storyGoalText.value,
        code: ui.storyGoalCode.value,
      }),
    };
  });
});
ui.applyTerrain.addEventListener("click", applyTerrainSettings);
["terrainWidth", "terrainHeight", "snapGrid", "defaultZ", "terrainColor", "ambientColor", "skyColor", "fogDistance", "defaultTexture", "moddingMode"].forEach((key) => {
  ui[key].addEventListener("change", () => {
    map.meta = { ...(map.meta || {}), autosave: ui.autosaveMap.checked };
    if (ui.autosaveMap.checked) applyTerrainSettings();
  });
});
ui.autosaveMap.addEventListener("change", () => { map.meta = { ...(map.meta || {}), autosave: ui.autosaveMap.checked }; });
ui.newMap.addEventListener("click", () => {
  const before = clone(map);
  map = emptyMap();
  setSelection([]);
  view2d.initialized = false;
  recordHistory("Nowa mapa", before);
  renderUi();
  status("Nowa mapa");
});
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
ui.paintCanvas.addEventListener("pointerdown", (event) => {
  paintDown = true;
  ui.paintCanvas.setPointerCapture?.(event.pointerId);
  paintTextureAt(event);
});
ui.paintCanvas.addEventListener("pointermove", (event) => {
  if (paintDown) paintTextureAt(event);
});
ui.paintCanvas.addEventListener("pointerup", () => { paintDown = false; });
ui.paintCanvas.addEventListener("pointercancel", () => { paintDown = false; });
ui.paintClear.addEventListener("click", resetPaintTexture);
ui.paintSave.addEventListener("click", savePaintTexture);
ui.paintApply.addEventListener("click", applyPaintTextureToSelected);
ui.paintBaseColor.addEventListener("input", resetPaintTexture);
ui.undo.addEventListener("click", undoEditor);
ui.redo.addEventListener("click", redoEditor);
ui.activeLayer.addEventListener("change", () => { activeLayerId = ui.activeLayer.value; renderUi(); });
ui.addLayer.addEventListener("click", () => {
  const name = window.prompt("Nazwa warstwy", `Layer ${map.editorData.layers.length + 1}`)?.trim();
  if (!name) return;
  const before = clone(map);
  const id = `layer-${Date.now().toString(36)}`;
  map.editorData.layers.push({ id, name, visible: true, locked: false });
  activeLayerId = id;
  recordHistory("Dodano warstwe", before);
  autosaveStudio();
  renderUi();
});
ui.focusSelection.addEventListener("click", () => {
  if (studioSettings.viewportMode === "3d") focusStudioSelection();
  else {
    const selected = findEditorEntity(selectedId)?.entity;
    if (!selected) return;
    view2d.x = selected.x - canvas.width / (2 * view2d.zoom);
    view2d.y = selected.y - canvas.height / (2 * view2d.zoom);
    draw();
  }
});
ui.resetCamera.addEventListener("click", () => {
  if (studioSettings.viewportMode === "3d") resetStudio3dCamera();
  else { view2d.initialized = false; draw(); }
});

try {
  map = normalizeStudioMap(JSON.parse(localStorage.getItem("potatoStrikeStudioLastMap") || "null") || emptyMap());
} catch {
  map = normalizeStudioMap(emptyMap());
}
convertMapForViewport(studioSettings.viewportMode);
resetPaintTexture();
refreshMapList();
renderUi();
document.querySelector('[data-tool="select"]').classList.add("active");
window.addEventListener("resize", () => requestAnimationFrame(draw));
