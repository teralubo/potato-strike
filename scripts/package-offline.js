const fs = require("fs");
const path = require("path");

const root = process.cwd();
const packageJson = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));

fs.mkdirSync(path.join(root, "configs"), { recursive: true });
fs.mkdirSync(path.join(root, "mods"), { recursive: true });
require("./build-single-html");

fs.writeFileSync(path.join(root, "PotatoStrike.bat"), '@echo off\r\ncd /d "%~dp0"\r\nstart "" "PotatoStrike.html"\r\n');
fs.writeFileSync(path.join(root, "PotatoStrike-Window.bat"), '@echo off\r\ncd /d "%~dp0"\r\nif exist "node_modules\\electron\\dist\\electron.exe" (\r\n  start "" "node_modules\\electron\\dist\\electron.exe" .\r\n) else (\r\n  echo Electron runtime not found. Run npm install first.\r\n  pause\r\n)\r\n');
fs.writeFileSync(path.join(root, "PotatoStrike-Studio.bat"), '@echo off\r\ncd /d "%~dp0"\r\nif exist "node_modules\\electron\\dist\\electron.exe" (\r\n  start "" "node_modules\\electron\\dist\\electron.exe" . --editor\r\n) else (\r\n  start "" "editor.html"\r\n)\r\n');

const portableExe = path.join(root, "dist", `Potato Strike ${packageJson.version}.exe`);
if (fs.existsSync(portableExe)) {
  fs.copyFileSync(portableExe, path.join(root, "PotatoStrike.exe"));
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
}

fs.writeFileSync(path.join(root, "BUILD-EXE.txt"), [
  "Potato Strike offline folder",
  "",
  "Browser/local process:",
  "  Run PotatoStrike.bat or open PotatoStrike.html",
  "",
  "One-file browser build:",
  "  PotatoStrike.html",
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

console.log(`Main game folder ready: ${root}`);
console.log("Beta builds are published through the GitHub beta branch, not a local beta folder.");
