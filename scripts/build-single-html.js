const fs = require("fs");
const path = require("path");

const root = process.cwd();
const htmlPath = path.join(root, "game", "index.html");
const cssPath = path.join(root, "game", "styles.css");
const jsPath = path.join(root, "game", "game.js");
const outPath = path.join(root, "PotatoStrike.html");

const html = fs.readFileSync(htmlPath, "utf8");
const css = fs.readFileSync(cssPath, "utf8");
let js = fs.readFileSync(jsPath, "utf8");

js = js.replace(/assets\/weapons\/freedoom\/[a-z-]+\.png/g, (assetPath) => {
  const file = path.join(root, "game", ...assetPath.split("/"));
  if (!fs.existsSync(file)) return assetPath;
  return `data:image/png;base64,${fs.readFileSync(file).toString("base64")}`;
});

const single = html
  .replace('<link rel="stylesheet" href="styles.css">', `<style>\n${css}\n</style>`)
  .replace('<script src="game.js"></script>', `<script>\n${js}\n</script>`);

fs.writeFileSync(outPath, single);
const sizeKb = Math.round(fs.statSync(outPath).size / 1024);
console.log(`Single-file browser build ready: ${outPath} (${sizeKb} KB)`);
