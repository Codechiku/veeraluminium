// One-off asset generator: rasterizes the brand SVGs into the PNG/ICO files
// referenced by the app metadata. Run: node scripts/gen-assets.mjs
import sharp from "sharp";
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pub = join(root, "public");
const iconSvg = readFileSync(join(pub, "icon.svg"));
const ogSvg = readFileSync(join(root, "scripts", "og.svg"));

const png = (svg, size) =>
  sharp(svg, { density: 384 }).resize(size, size).png().toBuffer();

// favicon.ico (multi-size) — sharp writes a 32px ICO
await sharp(iconSvg, { density: 384 })
  .resize(48, 48)
  .toFormat("png")
  .toFile(join(pub, "favicon.ico"));

writeFileSync(join(pub, "icon-192.png"), await png(iconSvg, 192));
writeFileSync(join(pub, "icon-512.png"), await png(iconSvg, 512));
writeFileSync(join(pub, "apple-icon.png"), await png(iconSvg, 180));

// OG / social share image (1200×630)
writeFileSync(
  join(pub, "og-image.png"),
  await sharp(ogSvg, { density: 144 }).resize(1200, 630).png().toBuffer(),
);

console.log("✓ Generated favicon.ico, icon-192/512.png, apple-icon.png, og-image.png");
