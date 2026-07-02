import type { Connect } from "vite";
import { handleCommentsRoute } from "./routes/commentsRoute.ts";

export function createApiRouter(): Connect.NextHandleFunction {
  return (req, res, next) => {
    const url = req.url?.split("?")[0];

    if (url === "/api/v1/comments") {
      handleCommentsRoute(req, res);
      return;
    }

    next();
  };
}
