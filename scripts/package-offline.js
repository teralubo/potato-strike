const fs = require("fs");
const path = require("path");

const root = process.cwd();
const betaOut = path.join(root, "beta");
const packageJson = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
const files = [
  "index.html",
  "editor.html",
  "styles.css",
  "editor.css",
  "game.js",
  "editor.js",
  "main.js",
  "preload.js",
  "server.js",
  "package.json",
  "package-lock.json",
  "README.md",
  "launch-browser.bat",
  "launch-offline-window.bat",
];

fs.mkdirSync(path.join(root, "configs"), { recursive: true });
fs.mkdirSync(path.join(root, "mods"), { recursive: true });
fs.rmSync(betaOut, { recursive: true, force: true });
fs.mkdirSync(betaOut, { recursive: true });
fs.mkdirSync(path.join(betaOut, "configs"), { recursive: true });
fs.mkdirSync(path.join(betaOut, "mods"), { recursive: true });

for (const file of files) {
  fs.copyFileSync(path.join(root, file), path.join(betaOut, file));
}

fs.copyFileSync(path.join(root, "configs", "default-config.json"), path.join(betaOut, "configs", "default-config.json"));
fs.copyFileSync(path.join(root, "mods", "README.md"), path.join(betaOut, "mods", "README.md"));

fs.writeFileSync(path.join(root, "PotatoStrike.bat"), '@echo off\r\ncd /d "%~dp0"\r\nstart "" "index.html"\r\n');
fs.writeFileSync(path.join(root, "PotatoStrike-Window.bat"), '@echo off\r\ncd /d "%~dp0"\r\nif exist "node_modules\\electron\\dist\\electron.exe" (\r\n  start "" "node_modules\\electron\\dist\\electron.exe" .\r\n) else (\r\n  echo Electron runtime not found. Run npm install first.\r\n  pause\r\n)\r\n');
fs.writeFileSync(path.join(root, "PotatoStrike-Studio.bat"), '@echo off\r\ncd /d "%~dp0"\r\nif exist "node_modules\\electron\\dist\\electron.exe" (\r\n  start "" "node_modules\\electron\\dist\\electron.exe" . --editor\r\n) else (\r\n  start "" "editor.html"\r\n)\r\n');
fs.copyFileSync(path.join(root, "PotatoStrike.bat"), path.join(betaOut, "PotatoStrike.bat"));
fs.copyFileSync(path.join(root, "PotatoStrike-Window.bat"), path.join(betaOut, "PotatoStrike-Window.bat"));
fs.copyFileSync(path.join(root, "PotatoStrike-Studio.bat"), path.join(betaOut, "PotatoStrike-Studio.bat"));

const portableExe = path.join(root, "dist", `Potato Strike ${packageJson.version}.exe`);
if (fs.existsSync(portableExe)) {
  fs.copyFileSync(portableExe, path.join(root, "PotatoStrike.exe"));
  fs.copyFileSync(portableExe, path.join(betaOut, "PotatoStrike-Beta.exe"));
}

const linuxDir = path.join(root, "dist", "linux-unpacked");
if (fs.existsSync(linuxDir)) {
  fs.writeFileSync(path.join(root, "PotatoStrike-Linux.txt"), [
    "Potato Strike Linux build",
    "",
    "Build command:",
    "  npm run build:linux",
    "",
    "Run after build:",
    "  dist/linux-unpacked/potato-strike",
    "",
    "Studio:",
    "  dist/linux-unpacked/potato-strike --editor",
    "",
  ].join("\n"));
  fs.copyFileSync(path.join(root, "PotatoStrike-Linux.txt"), path.join(betaOut, "PotatoStrike-Linux.txt"));
}

fs.writeFileSync(path.join(root, "BUILD-EXE.txt"), [
  "Potato Strike offline folder",
  "",
  "Browser/local process:",
  "  Run PotatoStrike.bat",
  "",
  "Separate offline game window:",
  "  Run PotatoStrike-Window.bat after npm install",
  "",
  "Separate Studio editor window:",
  "  Run PotatoStrike-Studio.bat after npm install",
  "",
  "Full EXE file:",
  "  npm install",
  "  npm run build:win",
  "",
  "Linux build:",
  "  npm run build:linux",
  "",
  "The EXE build uses Electron and writes output to dist/.",
  "",
].join("\r\n"));
fs.copyFileSync(path.join(root, "BUILD-EXE.txt"), path.join(betaOut, "BUILD-EXE.txt"));

console.log(`Main game folder ready: ${root}`);
console.log(`Beta folder ready: ${betaOut}`);
