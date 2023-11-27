import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/full-stack-example/",
  server: {
    proxy: {
      "/api": "http://localhost:3001",
    },
  },
});
