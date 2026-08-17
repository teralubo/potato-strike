const fs = require("fs");
const path = require("path");

const outfile = path.resolve(__dirname, "..", "game", "vendor", "three.min.js");
const clean = fs.readFileSync(outfile, "utf8")
  .replace(/[ \t]+$/gm, "")
  .replace(/^ +(?=\t)/gm, "");
fs.writeFileSync(outfile, clean, "utf8");
console.log(`Studio 3D vendor ready: ${outfile} (${(fs.statSync(outfile).size / 1024).toFixed(1)} KiB)`);
