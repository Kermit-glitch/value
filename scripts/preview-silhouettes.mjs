/**
 * Dev-only proofing tool: renders every silhouette in
 * src/components/scenery/paths.ts to PNG so the artwork can be reviewed.
 *
 *   node scripts/preview-silhouettes.mjs
 */
import { readFile, mkdir, writeFile } from "node:fs/promises";
import sharp from "sharp";

const source = await readFile(
  new URL("../src/components/scenery/paths.ts", import.meta.url),
  "utf8",
);

// Pull out `export const NAME: SilhouetteArt = { viewBox: "...", paths: [...] }`
const blocks = [
  ...source.matchAll(
    /export const (\w+): SilhouetteArt = \{\s*viewBox: "([^"]+)",\s*paths: \[([\s\S]*?)\],\s*\};/g,
  ),
];

await mkdir(new URL("../.preview", import.meta.url), { recursive: true });

for (const [, name, viewBox, body] of blocks) {
  const paths = [...body.matchAll(/`([\s\S]*?)`/g)].map((m) => m[1]);
  const [, , w, h] = viewBox.split(" ").map(Number);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="${w}" height="${h}">
    <rect width="100%" height="100%" fill="#cfd8c9"/>
    ${paths.map((d) => `<path d="${d}" fill="#0a1410"/>`).join("\n")}
  </svg>`;
  const out = new URL(`../.preview/${name}.png`, import.meta.url);
  await writeFile(out, await sharp(Buffer.from(svg)).png().toBuffer());
  console.log(`rendered ${name}`);
}
