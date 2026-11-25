/**
 * Gallery builder for the Zoneout sites.
 *
 * Media sets (one per business):
 *   main  → public/media/gallery → src/data/gallery.json        (Zoneout Customs)
 *   fleet → public/media/fleet   → src/data/fleet-gallery.json  (Smart Fleet Tech)
 *
 *   npm run gallery               scan both folders
 *   npm run gallery:import -- "C:/path/to/instagram-export"
 *   npm run fleet:import   -- "C:/path/to/instagram-export"
 *
 * The import takes the unzipped folder from Instagram's "Download your
 * information" (format JSON, media quality high), copies every post and reel
 * into the set's folder with its caption and date, then scans.
 * Labels, tags, and `featured` you edit in the JSON are kept on re-scan.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const SETS = {
  main: { dir: path.join(root, "public", "media", "gallery"), out: path.join(root, "src", "data", "gallery.json") },
  fleet: { dir: path.join(root, "public", "media", "fleet"), out: path.join(root, "src", "data", "fleet-gallery.json") },
};

const IMAGE = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".heic"]);
const VIDEO = new Set([".mp4", ".webm", ".mov", ".m4v"]);
const kind = (file) => {
  const ext = path.extname(file).toLowerCase();
  if (IMAGE.has(ext)) return "image";
  if (VIDEO.has(ext)) return "video";
  return null;
};

async function walk(dir) {
  let entries = [];
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }
  const out = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

/** Instagram exports store UTF-8 text as latin-1 escapes. Undo that when it applies. */
function fixText(text = "") {
  const codes = [...text].map((ch) => ch.codePointAt(0));
  const hasHigh = codes.some((code) => code >= 0x80);
  const allLatin1 = codes.every((code) => code <= 0xff);
  if (!hasHigh || !allLatin1) return text;
  const decoded = Buffer.from(text, "latin1").toString("utf8");
  return decoded.includes(String.fromCharCode(0xfffd)) ? text : decoded;
}

function captionParts(caption = "") {
  const text = fixText(caption).trim();
  const tags = [...new Set((text.match(/#[\p{L}\p{N}_]+/gu) || []).map((t) => t.slice(1).toLowerCase()))];
  const firstLine = text
    .split("\n")
    .map((line) => line.replace(/#[\p{L}\p{N}_]+/gu, "").replace(/@[\w.]+/g, "").trim())
    .find(Boolean);
  let label = firstLine || "";
  if (label.length > 48) label = `${label.slice(0, 45).trim()}...`;
  return { caption: text, label, tags };
}

function labelFromFile(file) {
  const base = path.basename(file, path.extname(file));
  const words = base
    .replace(/^\d{4}-\d{2}(-\d{2})?[-_]?/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\d{6,}\b/g, "")
    .trim();
  if (!words || /^[a-z0-9]{12,}$/i.test(words.replace(/\s/g, ""))) return "";
  return words.replace(/\b\w/g, (c) => c.toUpperCase());
}

async function readJson(file, fallback) {
  try {
    return JSON.parse(await fs.readFile(file, "utf8"));
  } catch {
    return fallback;
  }
}

/** Collect every {uri, title, creation_timestamp} media record in an export. */
function collectMedia(node, inherited = {}, out = []) {
  if (Array.isArray(node)) {
    node.forEach((child) => collectMedia(child, inherited, out));
    return out;
  }
  if (!node || typeof node !== "object") return out;
  const context = {
    title: node.title || inherited.title || "",
    time: node.creation_timestamp || inherited.time || 0,
  };
  if (typeof node.uri === "string" && kind(node.uri)) {
    out.push({ uri: node.uri, title: context.title, time: context.time });
  }
  for (const value of Object.values(node)) {
    if (value && typeof value === "object") collectMedia(value, context, out);
  }
  return out;
}

async function importExport(set, exportDir) {
  const base = path.resolve(exportDir);
  const files = await walk(base);
  const jsonFiles = files.filter(
    (file) => file.endsWith(".json") && /(posts|reels|igtv)/i.test(path.basename(file)),
  );
  if (!jsonFiles.length) {
    throw new Error(`No posts_*.json or reels.json found under ${base}. Pick the JSON format when requesting the export.`);
  }

  const metaFile = path.join(set.dir, "captions.json");
  const meta = await readJson(metaFile, {});
  const seen = new Set();
  let copied = 0;
  await fs.mkdir(set.dir, { recursive: true });

  for (const jsonFile of jsonFiles) {
    for (const record of collectMedia(await readJson(jsonFile, []))) {
      if (seen.has(record.uri)) continue;
      seen.add(record.uri);
      const wanted = record.uri.replace(/^\/+/, "");
      const source = files.find((file) => file.replace(/\\/g, "/").endsWith(wanted));
      if (!source) continue;
      const date = record.time ? new Date(record.time * 1000) : null;
      const stamp = date ? date.toISOString().slice(0, 10) : "undated";
      const name = `${stamp}-${path.basename(source)}`.toLowerCase();
      const target = path.join(set.dir, name);
      try {
        await fs.access(target);
      } catch {
        await fs.copyFile(source, target);
        copied += 1;
      }
      meta[name] = { caption: fixText(record.title), date: date ? date.toISOString() : null };
    }
  }

  await fs.writeFile(metaFile, `${JSON.stringify(meta, null, 2)}\n`);
  console.log(`Imported ${copied} new file(s) from ${jsonFiles.length} export file(s).`);
}

async function scan(name, set) {
  const previous = await readJson(set.out, { items: [] });
  const kept = new Map(previous.items.map((item) => [item.src, item]));
  const meta = await readJson(path.join(set.dir, "captions.json"), {});
  const files = (await walk(set.dir)).filter(kind);

  const items = [];
  for (const file of files) {
    const rel = path.relative(path.join(root, "public"), file).split(path.sep).join("/");
    const src = `/${rel}`;
    const base = path.basename(file).toLowerCase();
    const stat = await fs.stat(file);
    const info = meta[base] || meta[path.basename(file)] || {};
    const parts = captionParts(info.caption);
    const old = kept.get(src) || {};
    const type = kind(file);
    items.push({
      id: old.id || base.replace(/\.[^.]+$/, "").replace(/[^a-z0-9]+/g, "-"),
      type,
      src,
      label: old.label || parts.label || labelFromFile(file) || (type === "video" ? "Reel" : "Photo"),
      caption: old.caption ?? parts.caption,
      tags: old.tags || parts.tags,
      date: old.date || info.date || stat.mtime.toISOString(),
      featured: old.featured || false,
    });
  }

  items.sort((a, b) => String(b.date).localeCompare(String(a.date)));
  await fs.mkdir(path.dirname(set.out), { recursive: true });
  await fs.writeFile(set.out, `${JSON.stringify({ items }, null, 2)}\n`);
  const videos = items.filter((item) => item.type === "video").length;
  console.log(`${path.basename(set.out)}: ${items.length - videos} photo(s), ${videos} video(s).`);
}

const args = process.argv.slice(2);
const setFlag = args.indexOf("--set");
const only = setFlag >= 0 ? args[setFlag + 1] : null;
const positional = args.filter((_, index) => setFlag < 0 || (index !== setFlag && index !== setFlag + 1));
const [command, target] = positional;

try {
  if (only && !SETS[only]) throw new Error(`Unknown set "${only}". Use one of: ${Object.keys(SETS).join(", ")}`);
  if (command === "import") {
    if (!target) throw new Error('Usage: npm run gallery:import -- "path/to/instagram-export"');
    await importExport(SETS[only || "main"], target);
  }
  for (const [name, set] of Object.entries(SETS)) {
    if (!only || only === name) await scan(name, set);
  }
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
