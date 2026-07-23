import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

/**
 * Standalone CDN build — React + engine + UI bundled into one IIFE
 * so remote pages can use `new SalecPivot(...)` like classic pivot embeds
 * (no npm / bundler required). Clean-room API; not WebDataRocks source.
 */
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.NODE_ENV": JSON.stringify("production")
  },
  build: {
    outDir: "dist/cdn",
    // Keep ESM/CJS entries from the main lib build in dist/cdn/
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, "src/cdn.ts"),
      name: "SalecPivotBundle",
      formats: ["iife"],
      fileName: () => "salec-pivot.min.js"
    },
    rollupOptions: {
      output: {
        exports: "named",
        inlineDynamicImports: true,
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith(".css")) return "salec-pivot.[ext]";
          return "assets/[name]-[hash][extname]";
        }
      }
    },
    cssCodeSplit: false,
    sourcemap: true,
    minify: "esbuild"
  },
  worker: {
    format: "es"
  }
});
