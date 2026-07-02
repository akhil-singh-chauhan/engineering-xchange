import type { CSSProperties } from "react";
import type { Comment } from "../types/comment";

const STICKY_COLORS = ["yellow", "pink", "mint", "lavender", "peach"] as const;

type StickyNoteProps = {
  comment: Comment;
  index: number;
};

export function StickyNote({ comment, index }: StickyNoteProps) {
  const color = STICKY_COLORS[index % STICKY_COLORS.length];
  const rotation = index % 2 === 0 ? -2.5 : 2.5;

  return (
    <article
      className={`sticky-note sticky-note--${color}`}
      style={{ "--rotation": `${rotation}deg` } as CSSProperties}
    >
      <div className="sticky-note__pin" aria-hidden="true" />
      <p className="sticky-note__text">{comment.comment}</p>
      <footer className="sticky-note__author">— {comment.user}</footer>
    </article>
  );
}
