import { useCallback, useEffect, useRef, useState } from "react";
import {
  CommentsController,
  FetchAbortedError,
} from "./controllers/commentsController";
import type { Comment } from "./types/comment";
import "./App.css";

function App() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [showComments, setShowComments] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const commentsControllerRef = useRef(new CommentsController());

  const fetchComments = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await commentsControllerRef.current.fetchComments();
      setComments(data);
    } catch (err) {
      if (err instanceof FetchAbortedError) return;

      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";
      setError(message);
      setComments([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchComments();

    return () => {
      commentsControllerRef.current.cancel();
    };
  }, [fetchComments]);

  return (
    <>
      <h1>Engineering Xchange Talk</h1>
      <h2>Wall of Gratitude Comments</h2>
      <button onClick={() => setShowComments(!showComments)}>
        {showComments ? "Hide comments" : "Show comments"}
      </button>
      <div id="center">
        {showComments && isLoading && (
          <p className="comments-status">Loading comments...</p>
        )}
        {showComments && !isLoading && error && (
          <div className="comments-error" role="alert">
            <p>{error}</p>
            <button type="button" onClick={() => fetchComments()}>
              Try again
            </button>
          </div>
        )}
        {showComments && !isLoading && !error && comments.length === 0 && (
          <p className="comments-status">No comments yet.</p>
        )}
        {showComments &&
          !isLoading &&
          !error &&
          comments.map((comment) => (
            <div key={comment.id}>
              <p>{comment.user}</p>
              <p>{comment.comment}</p>
            </div>
          ))}
      </div>
    </>
  );
}

export default App;
