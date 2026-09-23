/**
 * Post-build script: assembles Vercel Build Output API structure from
 * TanStack Start's dist/ output.
 *
 * Structure produced:
 *   .vercel/output/
 *     config.json          — Vercel routing config
 *     static/              — copied from dist/client (served by CDN)
 *     functions/
 *       index.func/        — SSR catch-all serverless function
 *         .vc-config.json
 *         index.js         — re-exports dist/server/server.js handler
 */

import { cpSync, mkdirSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = __dirname;

const vercelOut = resolve(root, ".vercel/output");
const staticOut = resolve(vercelOut, "static");
const fnDir = resolve(vercelOut, "functions/index.func");

// 1. Create directories
mkdirSync(staticOut, { recursive: true });
mkdirSync(fnDir, { recursive: true });

// 2. Copy static client assets → .vercel/output/static
cpSync(resolve(root, "dist/client"), staticOut, { recursive: true });

// 3. Write the serverless function entry that re-exports the SSR handler
writeFileSync(
  resolve(fnDir, "index.js"),
  `import handler from "../../dist/server/server.js";
export default handler;
`,
);

// 4. Write function config — Node.js 20, edge-compatible fetch handler
writeFileSync(
  resolve(fnDir, ".vc-config.json"),
  JSON.stringify(
    {
      runtime: "nodejs20.x",
      handler: "index.js",
      launcherType: "Nodejs",
      experimentalResponseStreaming: true,
    },
    null,
    2,
  ),
);

// 5. Write top-level Vercel routing config:
//    - Static files (assets, public files) served directly from CDN
//    - Everything else → SSR function
writeFileSync(
  resolve(vercelOut, "config.json"),
  JSON.stringify(
    {
      version: 3,
      routes: [
        // Static assets (hashed, long cache)
        {
          src: "^/assets/(.*)$",
          headers: { "cache-control": "public, max-age=31536000, immutable" },
          continue: true,
        },
        // Public files (favicon, robots, etc.)
        {
          handle: "filesystem",
        },
        // SSR catch-all
        {
          src: "/(.*)",
          dest: "/index",
        },
      ],
    },
    null,
    2,
  ),
);

console.log("✓ Vercel output assembled at .vercel/output");
