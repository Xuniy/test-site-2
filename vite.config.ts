import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "node:path"

export default defineConfig(({ command }) => ({
  base: command === "build" ? "/test-site-2/" : "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}))
