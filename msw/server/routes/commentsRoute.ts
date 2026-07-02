import type { IncomingMessage, ServerResponse } from "node:http";
import { CommentsServerController } from "../controllers/commentsController.ts";

const commentsController = new CommentsServerController();

export function handleCommentsRoute(
  req: IncomingMessage,
  res: ServerResponse,
): void {
  if (req.method !== "GET") {
    res.statusCode = 405;
    res.setHeader("content-type", "application/json");
    res.end(JSON.stringify({ message: "Method not allowed" }));
    return;
  }

  commentsController.getComments(req, res);
}
