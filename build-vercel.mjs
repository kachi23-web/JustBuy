/**
 * Post-build script: assembles Vercel Build Output API structure from
 * TanStack Start's dist/ output.
 *
 * Structure produced:
 *   .vercel/output/
 *     config.json
 *     static/                  ← dist/client contents
 *     functions/
 *       index.func/
 *         .vc-config.json
 *         package.json         ← "type":"module" so Node treats .js as ESM
 *         index.js             ← thin entry point
 *         server/              ← dist/server copied in (self-contained)
 */

import { cpSync, mkdirSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = __dirname;

const vercelOut = resolve(root, ".vercel/output");
const staticOut = resolve(vercelOut, "static");
const fnDir    = resolve(vercelOut, "functions/index.func");

// 1. Create output directories
mkdirSync(staticOut, { recursive: true });
mkdirSync(fnDir,    { recursive: true });

// 2. Copy static client assets → .vercel/output/static (served by CDN)
cpSync(resolve(root, "dist/client"), staticOut, { recursive: true });

// 3. Copy server bundle INTO the function directory so it's self-contained
cpSync(resolve(root, "dist/server"), resolve(fnDir, "server"), { recursive: true });

// 4. Thin entry point — imports from the local ./server copy
writeFileSync(
  resolve(fnDir, "index.js"),
  `import handler from "./server/server.js";\nexport default handler;\n`,
);

// 5. package.json inside the function so Node.js loads .js files as ESM
writeFileSync(
  resolve(fnDir, "package.json"),
  JSON.stringify({ type: "module" }, null, 2),
);

// 6. Vercel function config
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

// 7. Top-level routing config
writeFileSync(
  resolve(vercelOut, "config.json"),
  JSON.stringify(
    {
      version: 3,
      routes: [
        // Long-cache hashed assets
        {
          src: "^/assets/(.*)$",
          headers: { "cache-control": "public, max-age=31536000, immutable" },
          continue: true,
        },
        // Serve files that exist on the CDN directly (favicon, robots, etc.)
        { handle: "filesystem" },
        // Everything else → SSR function
        { src: "/(.*)", dest: "/index" },
      ],
    },
    null,
    2,
  ),
);

console.log("✓ Vercel Build Output assembled at .vercel/output");
