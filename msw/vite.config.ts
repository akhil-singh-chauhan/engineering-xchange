import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { devApiServer } from "./server/devApiServer.ts";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), devApiServer()],
});
