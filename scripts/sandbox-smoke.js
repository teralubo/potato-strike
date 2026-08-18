const WebSocket = require("ws");

const endpoint = process.env.POTATO_CDP_URL || "http://127.0.0.1:9222/json";

async function connect() {
  const targets = await (await fetch(endpoint)).json();
  const target = targets.find((item) => item.type === "page" && item.url.includes("game/index.html"));
  if (!target) throw new Error("Potato Strike game target is not available");
  const socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.once("open", resolve);
    socket.once("error", reject);
  });
  let requestId = 0;
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const id = ++requestId;
    const receive = (raw) => {
      const message = JSON.parse(raw);
      if (message.id !== id) return;
      socket.off("message", receive);
      if (message.error) reject(new Error(message.error.message));
      else resolve(message.result);
    };
    socket.on("message", receive);
    socket.send(JSON.stringify({ id, method, params }));
  });
  return { socket, send };
}

async function evaluate(send, expression) {
  const response = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
  if (response.exceptionDetails) throw new Error(response.exceptionDetails.text || "Renderer evaluation failed");
  return response.result.value;
}

async function main() {
  const { socket, send } = await connect();
  try {
    await evaluate(send, `(() => {
      document.getElementById("menu").classList.remove("hidden");
      document.getElementById("menu-mode").value = "sandbox";
      document.getElementById("menu-mode").dispatchEvent(new Event("change"));
      document.getElementById("sandbox-width").value = "35";
      document.getElementById("sandbox-height").value = "25";
      document.getElementById("menu-graphics").value = "2d";
      document.getElementById("start").click();
    })()`);
    await new Promise((resolve) => setTimeout(resolve, 350));
    const result = await evaluate(send, `JSON.stringify({
      mode: state.gameMode,
      running: state.running,
      dimensions: [state.map.w, state.map.h],
      meters: [sandbox.widthMeters, sandbox.heightMeters],
      boundaries: state.map.obstacles.filter((item) => item.sandboxBoundary).length,
      spawned: state.map.obstacles.filter((item) => item.sandboxSpawned).length,
      bots: bots.length,
      allies: allies.length,
      weapon: activeWeapon().name,
      phase: state.phase,
      graphics: settings.graphicsMode,
    })`);
    const stateResult = JSON.parse(result);
    const expected = {
      mode: "sandbox",
      running: true,
      dimensions: [1120, 800],
      meters: [35, 25],
      boundaries: 4,
      spawned: 0,
      bots: 0,
      allies: 0,
      weapon: "Physics Gun",
      phase: "live",
      graphics: "2d",
    };
    if (JSON.stringify(stateResult) !== JSON.stringify(expected)) {
      throw new Error(`Sandbox state mismatch: ${JSON.stringify(stateResult)}`);
    }
    const interactionResult = JSON.parse(await evaluate(send, `(async () => {
      spawnSandboxObject(sandboxObjectCatalog[0]);
      spawnSandboxNpc(sandboxNpcCatalog[0]);
      spawnSandboxNpc(sandboxNpcCatalog[1]);
      spawnSandboxWeapon(weapons.find((item) => item.name === "AK-47"));
      const object = state.map.obstacles.find((item) => item.sandboxSpawned);
      const originalX = object.x;
      mouse.x = object.x + object.w / 2 - camera.x;
      mouse.y = object.y + object.h / 2 - camera.y;
      const grabbed = beginPhysicsGrab();
      mouse.x += 70;
      updatePhysicsGun();
      const movedX = object.x;
      releasePhysicsGrab();
      window.dispatchEvent(new KeyboardEvent("keydown", { code: "KeyQ" }));
      const qOpened = !document.getElementById("sandbox-spawn-panel").classList.contains("hidden");
      window.dispatchEvent(new KeyboardEvent("keyup", { code: "KeyQ" }));
      const qClosed = document.getElementById("sandbox-spawn-panel").classList.contains("hidden");
      window.dispatchEvent(new KeyboardEvent("keydown", { code: "KeyP" }));
      const pOpened = !document.getElementById("sandbox-world-panel").classList.contains("hidden");
      closePanels();
      setGraphicsMode("3d");
      renderGameView();
      const snapshot = sandboxSnapshot();
      const transfer = new DataTransfer();
      transfer.items.add(new File([JSON.stringify(snapshot)], "smoke.potato-sandbox.json", { type: "application/json" }));
      hud.sandboxWorldFile.files = transfer.files;
      await importSandboxWorldFile();
      const beforeRestrictedQ = document.getElementById("sandbox-spawn-panel").classList.contains("hidden");
      state.gameMode = "offline";
      window.dispatchEvent(new KeyboardEvent("keydown", { code: "KeyQ" }));
      const restrictedQ = beforeRestrictedQ && document.getElementById("sandbox-spawn-panel").classList.contains("hidden");
      state.gameMode = "sandbox";
      return JSON.stringify({
        objects: state.map.obstacles.filter((item) => item.sandboxSpawned).length,
        allies: allies.length,
        bots: bots.length,
        weapons: droppedWeapons.length,
        grabbed,
        moved: movedX > originalX + 40,
        qOpened,
        qClosed,
        pOpened,
        restrictedQ,
        graphics: settings.graphicsMode,
        importedFormat: snapshot.format,
        importedWeapon: activeWeapon().name,
      });
    })()`));
    const expectedInteraction = {
      objects: 1,
      allies: 1,
      bots: 1,
      weapons: 1,
      grabbed: true,
      moved: true,
      qOpened: true,
      qClosed: true,
      pOpened: true,
      restrictedQ: true,
      graphics: "3d",
      importedFormat: "potato-strike-sandbox",
      importedWeapon: "Physics Gun",
    };
    if (JSON.stringify(interactionResult) !== JSON.stringify(expectedInteraction)) {
      throw new Error(`Sandbox interaction mismatch: ${JSON.stringify(interactionResult)}`);
    }
    const classicResult = JSON.parse(await evaluate(send, `(() => {
      closePanels();
      hud.menuMode.value = "offline";
      hud.gameRules.value = "classic";
      hud.matchSize.value = "2";
      hud.menuTeam.value = "CT";
      hud.menuMap.value = "dustyard";
      hud.menuGraphics.value = "2d";
      newMatch();
      window.dispatchEvent(new KeyboardEvent("keydown", { code: "KeyQ" }));
      return JSON.stringify({
        mode: state.gameMode,
        weapon: activeWeapon().name,
        bots: bots.length,
        allies: allies.length,
        phase: state.phase,
        qRestricted: document.getElementById("sandbox-spawn-panel").classList.contains("hidden"),
        physicsOwned: weapons.find((item) => item.sandboxOnly).owned,
      });
    })()`));
    const expectedClassic = { mode: "offline", weapon: "USP-S", bots: 2, allies: 1, phase: "freeze", qRestricted: true, physicsOwned: false };
    if (JSON.stringify(classicResult) !== JSON.stringify(expectedClassic)) {
      throw new Error(`Classic regression mismatch: ${JSON.stringify(classicResult)}`);
    }
    console.log(`Sandbox smoke OK: ${JSON.stringify(stateResult)}`);
    console.log(`Sandbox interactions OK: ${JSON.stringify(interactionResult)}`);
    console.log(`Classic regression OK: ${JSON.stringify(classicResult)}`);
  } finally {
    socket.close();
  }
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
