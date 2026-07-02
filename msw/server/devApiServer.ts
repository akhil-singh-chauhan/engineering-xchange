import type { Plugin } from "vite";
import { createApiRouter } from "./apiRouter.ts";

export function devApiServer(): Plugin {
  return {
    name: "dev-api-server",
    configureServer(server) {
      server.middlewares.use(createApiRouter());
    },
  };
}
