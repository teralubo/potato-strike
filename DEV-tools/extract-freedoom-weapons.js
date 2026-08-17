const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const root = path.resolve(__dirname, "..");
const sourceCandidates = [
  path.join(root, "texture", "freedoom2.wad"),
  path.join(root, "texture", "freedoom1.wad"),
];
const outputDir = path.join(root, "game", "assets", "weapons", "freedoom");
const spriteExports = [
  ["punch", "PUNGA0"],
  ["pistol", "PISGA0"],
  ["shotgun", "SHTGA0"],
  ["super-shotgun", "SHT2A0", "SHTGA0"],
  ["chaingun", "CHGGA0"],
  ["launcher", "MISGA0"],
  ["saw", "SAWGA0"],
  ["plasma", "PLSGA0"],
  ["bfg", "BFGGA0"],
];

function readWad(file) {
  const data = fs.readFileSync(file);
  if (!["IWAD", "PWAD"].includes(data.toString("ascii", 0, 4))) throw new Error(`${file} is not a WAD`);
  const count = data.readInt32LE(4);
  const directory = data.readInt32LE(8);
  const lumps = new Map();
  for (let index = 0; index < count; index += 1) {
    const entry = directory + index * 16;
    const offset = data.readInt32LE(entry);
    const size = data.readInt32LE(entry + 4);
    const name = data.toString("ascii", entry + 8, entry + 16).replace(/\0/g, "");
    lumps.set(name, data.subarray(offset, offset + size));
  }
  return { data, lumps };
}

function decodePatch(patch, palette) {
  if (!patch || patch.length < 12) throw new Error("Invalid Doom patch");
  const width = patch.readUInt16LE(0);
  const height = patch.readUInt16LE(2);
  if (!width || !height || width > 1024 || height > 1024) throw new Error(`Invalid patch dimensions ${width}x${height}`);
  const rgba = Buffer.alloc(width * height * 4);
  for (let column = 0; column < width; column += 1) {
    let cursor = patch.readUInt32LE(8 + column * 4);
    let previousTop = -1;
    while (cursor < patch.length && patch[cursor] !== 255) {
      let top = patch[cursor];
      const length = patch[cursor + 1];
      cursor += 3;
      if (top <= previousTop) top += previousTop;
      previousTop = top;
      for (let row = 0; row < length && cursor + row < patch.length; row += 1) {
        const y = top + row;
        if (y < 0 || y >= height) continue;
        const color = patch[cursor + row] * 3;
        const target = (y * width + column) * 4;
        rgba[target] = palette[color];
        rgba[target + 1] = palette[color + 1];
        rgba[target + 2] = palette[color + 2];
        rgba[target + 3] = 255;
      }
      cursor += length + 1;
    }
  }
  return { width, height, rgba };
}

const crcTable = Array.from({ length: 256 }, (_, value) => {
  let crc = value;
  for (let bit = 0; bit < 8; bit += 1) crc = (crc & 1) ? 0xedb88320 ^ (crc >>> 1) : crc >>> 1;
  return crc >>> 0;
});

function crc32(data) {
  let crc = 0xffffffff;
  for (const value of data) crc = crcTable[(crc ^ value) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function pngChunk(type, data) {
  const name = Buffer.from(type, "ascii");
  const size = Buffer.alloc(4);
  size.writeUInt32BE(data.length);
  const checksum = Buffer.alloc(4);
  checksum.writeUInt32BE(crc32(Buffer.concat([name, data])));
  return Buffer.concat([size, name, data, checksum]);
}

function encodePng({ width, height, rgba }) {
  const header = Buffer.alloc(13);
  header.writeUInt32BE(width, 0);
  header.writeUInt32BE(height, 4);
  header[8] = 8;
  header[9] = 6;
  const scanlines = Buffer.alloc((width * 4 + 1) * height);
  for (let y = 0; y < height; y += 1) rgba.copy(scanlines, y * (width * 4 + 1) + 1, y * width * 4, (y + 1) * width * 4);
  return Buffer.concat([
    Buffer.from("89504e470d0a1a0a", "hex"),
    pngChunk("IHDR", header),
    pngChunk("IDAT", zlib.deflateSync(scanlines, { level: 9 })),
    pngChunk("IEND", Buffer.alloc(0)),
  ]);
}

const source = sourceCandidates.find(fs.existsSync);
if (!source) throw new Error("Place freedoom2.wad or freedoom1.wad in texture/ before running this tool");
const wad = readWad(source);
const palette = wad.lumps.get("PLAYPAL")?.subarray(0, 768);
if (!palette || palette.length < 768) throw new Error("PLAYPAL palette is missing");
fs.mkdirSync(outputDir, { recursive: true });

const manifest = {
  source: path.basename(source),
  sourceVersion: wad.lumps.get("FREEDOOM")?.toString("ascii").trim() || "unknown",
  sourceSha256: crypto.createHash("sha256").update(wad.data).digest("hex"),
  license: "BSD-3-Clause",
  generatedBy: "DEV-tools/extract-freedoom-weapons.js",
  sprites: [],
};

for (const [name, requestedLump, fallbackLump] of spriteExports) {
  const lumpName = wad.lumps.has(requestedLump) ? requestedLump : fallbackLump;
  const patch = decodePatch(wad.lumps.get(lumpName), palette);
  const file = `${name}.png`;
  fs.writeFileSync(path.join(outputDir, file), encodePng(patch));
  manifest.sprites.push({ name, file, lump: lumpName, width: patch.width, height: patch.height });
}
fs.writeFileSync(path.join(outputDir, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Exported ${manifest.sprites.length} FreEDoom weapon sprites from ${path.basename(source)} to ${path.relative(root, outputDir)}`);
