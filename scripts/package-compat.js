const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const root = process.cwd();
const releaseName = "PotatoStrike-1.1-BETA";
const distDir = path.join(root, "dist");
const releaseDir = path.join(distDir, releaseName);
const zipPath = path.join(root, `${releaseName}.zip`);

function copyFile(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

function copyDir(src, dest, ignore = () => false) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (ignore(from, entry)) continue;
    if (entry.isDirectory()) copyDir(from, to, ignore);
    else if (entry.isFile()) copyFile(from, to);
  }
}

function remove(target) {
  fs.rmSync(target, { recursive: true, force: true });
}

require("./package-offline");
require("./sync-phone-assets");

remove(releaseDir);
remove(zipPath);
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
  "PATCH-NOTES-1.1-BETA.md",
  "package.json",
  "package-lock.json",
  "main.js",
  "preload.js",
  "server.js",
]) {
  const src = path.join(root, file);
  if (fs.existsSync(src)) copyFile(src, path.join(releaseDir, file));
}

copyDir(path.join(root, "game"), path.join(releaseDir, "game"));
copyDir(path.join(root, "configs"), path.join(releaseDir, "configs"), (from) => from.includes(`${path.sep}players${path.sep}`));
copyDir(path.join(root, "mods"), path.join(releaseDir, "mods"));
copyDir(path.join(root, "DEV-tools"), path.join(releaseDir, "DEV-tools"));
copyDir(path.join(root, "phone"), path.join(releaseDir, "phone"), (from, entry) => {
  return entry.isDirectory() && ["build", ".gradle", "dist"].includes(entry.name);
});

const apk = path.join(root, "phone", "android", "app", "build", "outputs", "apk", "debug", "app-debug.apk");
if (fs.existsSync(apk)) copyFile(apk, path.join(releaseDir, "phone", "PotatoStrike-1.1-BETA-debug.apk"));

const flipperDist = path.join(root, "phone", "flipperzero", "dist");
if (fs.existsSync(flipperDist)) {
  for (const file of fs.readdirSync(flipperDist)) {
    if (file.endsWith(".fap")) copyFile(path.join(flipperDist, file), path.join(releaseDir, "phone", "flipperzero", file));
  }
}

const zipArgs = process.platform === "win32"
  ? ["-NoProfile", "-Command", `Compress-Archive -Path '${releaseDir}\\*' -DestinationPath '${zipPath}' -Force`]
  : ["-lc", `cd "${distDir}" && zip -qr "${zipPath}" "${releaseName}"`];
const zipCommand = process.platform === "win32" ? "powershell" : "sh";
const result = spawnSync(zipCommand, zipArgs, { stdio: "inherit" });
if (result.status !== 0) {
  console.warn("Zip creation skipped or failed. Release folder is still ready:");
  console.warn(releaseDir);
} else {
  console.log(`Compatibility zip ready: ${zipPath}`);
}
