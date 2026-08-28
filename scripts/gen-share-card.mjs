/**
 * Builds the 1200x630 image that Facebook, LinkedIn, WhatsApp, Slack and X
 * show when someone shares a link to the site.
 *
 * Without one, those services pick whatever image they find first and crop it
 * to their own ratio, which for this site meant a squashed logo. This composes
 * the brand mark over the navy band the site already uses, at exactly the size
 * every one of them expects.
 *
 * Written against Node's own zlib rather than an image library: the input is
 * one known PNG, so decoding it is a short, readable piece of work and the
 * project keeps its dependency list at four packages.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { deflateSync, inflateSync } from "node:zlib";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const BRAND = join(HERE, "..", "public", "assets", "brand");

const WIDTH = 1200;
const HEIGHT = 630;
const BACKGROUND = [0x0a, 0x24, 0x47]; // --navy
const LOGO_WIDTH = 620;

/* ------------------------------------------------------------- decode --- */

/** Reads an 8-bit, non-interlaced, truecolour-with-alpha PNG into RGBA bytes. */
function decodePng(buffer) {
  if (buffer.readUInt32BE(0) !== 0x89504e47) throw new Error("not a PNG");

  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);
  const depth = buffer[24];
  const colorType = buffer[25];
  const interlace = buffer[28];

  if (depth !== 8 || colorType !== 6 || interlace !== 0) {
    throw new Error(`unsupported PNG: depth ${depth}, colour type ${colorType}`);
  }

  const parts = [];
  let offset = 8;
  while (offset < buffer.length) {
    const length = buffer.readUInt32BE(offset);
    const type = buffer.toString("ascii", offset + 4, offset + 8);
    if (type === "IDAT") parts.push(buffer.subarray(offset + 8, offset + 8 + length));
    if (type === "IEND") break;
    offset += 12 + length;
  }

  const raw = inflateSync(Buffer.concat(parts));
  const bpp = 4;
  const stride = width * bpp;
  const pixels = Buffer.alloc(height * stride);

  /* Each scanline is prefixed with the filter used to encode it, and is
     reconstructed from the bytes to its left and the line above. */
  for (let y = 0; y < height; y += 1) {
    const filter = raw[y * (stride + 1)];
    const line = raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1));
    const out = pixels.subarray(y * stride, (y + 1) * stride);
    const prev = y ? pixels.subarray((y - 1) * stride, y * stride) : null;

    for (let x = 0; x < stride; x += 1) {
      const left = x >= bpp ? out[x - bpp] : 0;
      const up = prev ? prev[x] : 0;
      const upLeft = prev && x >= bpp ? prev[x - bpp] : 0;
      let value = line[x];

      if (filter === 1) value += left;
      else if (filter === 2) value += up;
      else if (filter === 3) value += (left + up) >> 1;
      else if (filter === 4) value += paeth(left, up, upLeft);

      out[x] = value & 0xff;
    }
  }

  return { width, height, pixels };
}

function paeth(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  return pb <= pc ? b : c;
}

/* -------------------------------------------------------------- scale --- */

/** Box filter, which is what keeps a large logo from going ragged as it shrinks. */
function resize(source, targetWidth, targetHeight) {
  const out = Buffer.alloc(targetWidth * targetHeight * 4);
  const xRatio = source.width / targetWidth;
  const yRatio = source.height / targetHeight;

  for (let y = 0; y < targetHeight; y += 1) {
    const y0 = Math.floor(y * yRatio);
    const y1 = Math.min(source.height, Math.ceil((y + 1) * yRatio));

    for (let x = 0; x < targetWidth; x += 1) {
      const x0 = Math.floor(x * xRatio);
      const x1 = Math.min(source.width, Math.ceil((x + 1) * xRatio));
      let r = 0;
      let g = 0;
      let b = 0;
      let a = 0;
      let n = 0;

      for (let sy = y0; sy < y1; sy += 1) {
        for (let sx = x0; sx < x1; sx += 1) {
          const i = (sy * source.width + sx) * 4;
          const alpha = source.pixels[i + 3];
          // premultiplied, so transparent pixels cannot bleed their colour in
          r += source.pixels[i] * alpha;
          g += source.pixels[i + 1] * alpha;
          b += source.pixels[i + 2] * alpha;
          a += alpha;
          n += 1;
        }
      }

      const o = (y * targetWidth + x) * 4;
      if (a > 0) {
        out[o] = Math.round(r / a);
        out[o + 1] = Math.round(g / a);
        out[o + 2] = Math.round(b / a);
      }
      out[o + 3] = Math.round(a / Math.max(1, n));
    }
  }

  return { width: targetWidth, height: targetHeight, pixels: out };
}

/* ---------------------------------------------------------- composite --- */

function compose(logo) {
  const canvas = Buffer.alloc(WIDTH * HEIGHT * 3);
  for (let i = 0; i < WIDTH * HEIGHT; i += 1) {
    canvas[i * 3] = BACKGROUND[0];
    canvas[i * 3 + 1] = BACKGROUND[1];
    canvas[i * 3 + 2] = BACKGROUND[2];
  }

  const left = Math.round((WIDTH - logo.width) / 2);
  const top = Math.round((HEIGHT - logo.height) / 2);

  for (let y = 0; y < logo.height; y += 1) {
    for (let x = 0; x < logo.width; x += 1) {
      const s = (y * logo.width + x) * 4;
      const alpha = logo.pixels[s + 3] / 255;
      if (alpha === 0) continue;
      const d = ((top + y) * WIDTH + (left + x)) * 3;
      for (let c = 0; c < 3; c += 1) {
        canvas[d + c] = Math.round(logo.pixels[s + c] * alpha + canvas[d + c] * (1 - alpha));
      }
    }
  }

  return canvas;
}

/* ------------------------------------------------------------- encode --- */

function crc32(buffer) {
  let c = ~0;
  for (let i = 0; i < buffer.length; i += 1) {
    c ^= buffer[i];
    for (let k = 0; k < 8; k += 1) c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
  }
  return ~c >>> 0;
}

function chunk(type, data) {
  const head = Buffer.alloc(8);
  head.writeUInt32BE(data.length, 0);
  head.write(type, 4, "ascii");
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([head.subarray(4), data])), 0);
  return Buffer.concat([head, data, crc]);
}

function encodePng(rgb) {
  const stride = WIDTH * 3;
  const raw = Buffer.alloc(HEIGHT * (stride + 1));
  for (let y = 0; y < HEIGHT; y += 1) {
    raw[y * (stride + 1)] = 0; // no per-line filter; the image is mostly flat
    rgb.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(WIDTH, 0);
  ihdr.writeUInt32BE(HEIGHT, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // truecolour, no alpha
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

/* --------------------------------------------------------------- run ---- */

const source = decodePng(readFileSync(join(BRAND, "logo.png")));
const height = Math.round((LOGO_WIDTH / source.width) * source.height);
const card = encodePng(compose(resize(source, LOGO_WIDTH, height)));
const target = join(BRAND, "share-card.png");

writeFileSync(target, card);
console.log(`share-card.png  ${WIDTH}x${HEIGHT}  ${(card.length / 1024).toFixed(0)} kB`);
