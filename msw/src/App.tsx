import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  useEffect(() => {
    // fetch("/api/v1/comments")
    fetch("https://emburse.com/hyderabad/api/v1/comments")
      .then((response) => response.json())
      .then((data) => setComments(data.data));
  }, []);

  return (
    <>
      <h1>Engineering Xchange Talk</h1>
      <button onClick={() => setShowComments(!showComments)}>
        {showComments ? "Hide comments" : "Show comments"}
      </button>
      <div id="center">
        {showComments &&
          comments.length > 0 &&
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
