import { COMMENTS_URL } from "../api";
import type { Comment } from "../types/comment";

export class FetchAbortedError extends Error {
  constructor() {
    super("Fetch aborted");
    this.name = "FetchAbortedError";
  }
}

export class CommentsController {
  private abortController: AbortController | null = null;

  cancel() {
    this.abortController?.abort();
    this.abortController = null;
  }

  async fetchComments(): Promise<Comment[]> {
    this.cancel();

    const controller = new AbortController();
    this.abortController = controller;

    try {
      const response = await fetch(COMMENTS_URL, {
        signal: controller.signal,
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        const message =
          body && typeof body.message === "string"
            ? body.message
            : `Failed to load comments (${response.status})`;
        throw new Error(message);
      }

      const data = await response.json();
      return data.data ?? [];
    } catch (err) {
      if (controller.signal.aborted) {
        throw new FetchAbortedError();
      }

      console.log("Failed to fetch comments:", err);
      throw err;
    } finally {
      if (this.abortController === controller) {
        this.abortController = null;
      }
    }
  }
}
