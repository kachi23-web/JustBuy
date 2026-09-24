import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// Note: @tailwindcss/vite must be added explicitly — it is NOT bundled inside tanstackStart.
// It handles Tailwind v4's CSS (including @import "tailwindcss" and source() syntax) in both
// client and SSR environments, which raw PostCSS cannot resolve.

export default defineConfig({
  build: {
    // lightningcss (Vite 8 default) doesn't support Tailwind v4's source() syntax.
    // Disable CSS minification to avoid the incompatibility.
    cssMinify: false,
  },
  environments: {
    // Bundle ALL dependencies into the server output so it is fully
    // self-contained — no node_modules needed at runtime on Vercel.
    ssr: {
      resolve: {
        noExternal: true,
      },
    },
  },
  plugins: [
    // Resolves the @/* path alias from tsconfig.json in Vite's module resolver.
    tsconfigPaths(),
    tailwindcss(),
    tanstackStart({
      // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
      server: { entry: "server" },
    }),
  ],
});
