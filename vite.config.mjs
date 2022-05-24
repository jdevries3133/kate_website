/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import mdx from "@mdx-js/rollup";

export default defineConfig({
  plugins: [react(), tsconfigPaths(), mdx()],
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["./test/setupTestEnv.ts"],
    include: ["./app/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    watchIgnore: [".*\\/node_modules\\/.*", ".*\\/build\\/.*"],
  },
});
