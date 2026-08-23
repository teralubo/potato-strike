const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const root = process.cwd();
const releaseName = "PotatoStrike-V1.4-RELEASE-PATCH-1.0-BETA";
const distDir = path.join(root, "dist");
const releaseDir = path.join(distDir, releaseName);
const zipPath = path.join(root, `${releaseName}.zip`);

function copyFile(source, destination) {
  if (!fs.existsSync(source)) return;
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.copyFileSync(source, destination);
}

function copyDir(source, destination, include = () => true) {
  if (!fs.existsSync(source)) return;
  fs.mkdirSync(destination, { recursive: true });
  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const from = path.join(source, entry.name);
    const to = path.join(destination, entry.name);
    if (!include(from, entry)) continue;
    if (entry.isDirectory()) copyDir(from, to, include);
    else if (entry.isFile()) copyFile(from, to);
  }
}

require("./build-single-html");
fs.rmSync(releaseDir, { recursive: true, force: true });
fs.rmSync(zipPath, { force: true });
fs.mkdirSync(releaseDir, { recursive: true });

for (const file of [
  "PotatoStrike.html",
  "PotatoStrike.bat",
  "PotatoStrike-Window.bat",
  "PotatoStrike-Studio.bat",
  "PotatoStrike-Linux.sh",
  "BUILD-EXE.txt",
  "README.md",
  "LICENSE",
  "CHANGELOG.md",
  "PATCH-NOTES-1.2-FINAL.md",
  "PATCH-NOTES-1.3-BETA.md",
  "PATCH-NOTES-1.3-FINAL.md",
  "PATCH-NOTES-1.3-BETA-FINAL.md",
  "PATCH-NOTES-V1.4-FINAL-PATCH-1.0.md",
  "package.json",
  "package-lock.json",
  "main.js",
  "preload.js",
  "server.js",
]) copyFile(path.join(root, file), path.join(releaseDir, file));

copyDir(path.join(root, "game"), path.join(releaseDir, "game"));
copyFile(path.join(root, "configs", "default-config.json"), path.join(releaseDir, "configs", "default-config.json"));
copyDir(path.join(root, "mods"), path.join(releaseDir, "mods"), (from) => !["examples", "unreleased"].includes(path.basename(from)));

const zipArgs = process.platform === "win32"
  ? ["-NoProfile", "-Command", `Compress-Archive -Path '${releaseDir}\\*' -DestinationPath '${zipPath}' -CompressionLevel Optimal -Force`]
  : ["-lc", `cd "${distDir}" && zip -9qr "${zipPath}" "${releaseName}"`];
const result = spawnSync(process.platform === "win32" ? "powershell" : "sh", zipArgs, { stdio: "inherit" });
if (result.status !== 0) throw new Error("Cannot create compressed beta package");

const sizeKiB = Math.round(fs.statSync(zipPath).size / 1024);
console.log(`Compressed beta package ready: ${zipPath} (${sizeKiB} KiB)`);
