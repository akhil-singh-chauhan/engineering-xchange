import { useCallback, useEffect, useRef, useState } from "react";
import {
  CommentsController,
  FetchAbortedError,
} from "./controllers/commentsController";
import { StickyNote } from "./components/StickyNote";
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
    <div className="app">
      <header className="app-header">
        <p className="app-eyebrow">Engineering Xchange Talk</p>
        <h1>Wall of Gratitude</h1>
        <p className="app-subtitle">
          Messages of team members on the wall — fetched/intercepted live from
          the API
        </p>
        <button
          className="toggle-btn"
          onClick={() => setShowComments(!showComments)}
        >
          {showComments ? "Hide sticky notes" : "Show sticky notes"}
        </button>
      </header>

      {showComments && (
        <main className="wall">
          {isLoading && (
            <div className="wall-status">
              <span className="wall-spinner" aria-hidden="true" />
              <p>Loading comments...</p>
            </div>
          )}

          {!isLoading && error && (
            <div className="comments-error" role="alert">
              <p>{error}</p>
              <button type="button" onClick={() => fetchComments()}>
                Try again
              </button>
            </div>
          )}

          {!isLoading && !error && comments.length === 0 && (
            <p className="wall-status">
              No comments yet. Be the first to share!
            </p>
          )}

          {!isLoading && !error && comments.length > 0 && (
            <div className="sticky-wall">
              {comments.map((comment, index) => (
                <StickyNote key={comment.id} comment={comment} index={index} />
              ))}
            </div>
          )}
        </main>
      )}
    </div>
  );
}

export default App;
