import type { IncomingMessage, ServerResponse } from "node:http";
import { comments } from "../data/comments.ts";

export class CommentsServerController {
  getComments(_req: IncomingMessage, res: ServerResponse) {
    res.statusCode = 200;
    console.log("getComments", comments);
    res.setHeader("content-type", "application/json");
    res.end(JSON.stringify({ data: comments }));
  }
}
