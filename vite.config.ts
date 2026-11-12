import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const projectPath = fileURLToPath(new URL(".", import.meta.url));
const pathWithoutDrive =
  process.platform === "win32" ? projectPath.slice(2) : projectPath;

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    hmr: process.env.DISABLE_HMR !== "true",
    fs: {
      // Vite rejects colons even inside the allowed root. The local dev command binds to loopback.
      strict: !pathWithoutDrive.includes(":"),
    },
  },
  build: {
    minify: "esbuild",
    chunkSizeWarningLimit: 1200,
    rolldownOptions: { input: { index: "index.html", notFound: "404.html" } },
  },
});
