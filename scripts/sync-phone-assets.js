const fs = require("fs");
const path = require("path");

const root = process.cwd();
const source = path.join(root, "PotatoStrike.html");
const assetsDir = path.join(root, "phone", "android", "app", "src", "main", "assets");
const target = path.join(assetsDir, "PotatoStrike.html");

if (!fs.existsSync(source)) {
  require("./build-single-html");
}

fs.mkdirSync(assetsDir, { recursive: true });
fs.copyFileSync(source, target);
console.log(`Android asset synced: ${target}`);
