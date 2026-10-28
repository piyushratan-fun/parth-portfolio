import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const timestamp = Date.now().toString();
const isoTime = new Date().toISOString();

const versionData = {
  version: timestamp,
  buildTime: isoTime,
};

// 1. Write public/version.json
const publicDir = path.join(rootDir, "public");
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}
fs.writeFileSync(path.join(publicDir, "version.json"), JSON.stringify(versionData, null, 2));

// 2. Write src/lib/buildVersion.ts
const libDir = path.join(rootDir, "src", "lib");
if (!fs.existsSync(libDir)) {
  fs.mkdirSync(libDir, { recursive: true });
}
const code = `// Auto-generated build version - DO NOT EDIT MANUALLY\nexport const BUILD_VERSION = "${timestamp}";\nexport const BUILD_TIME = "${isoTime}";\n`;
fs.writeFileSync(path.join(libDir, "buildVersion.ts"), code);

console.log(`[Version Generator] Generated build version: ${timestamp} (${isoTime})`);
