import { http, HttpResponse } from "msw";

const COMMENTS_PATH = "/api/v1/comments";

const successHandler = http.get(COMMENTS_PATH, () => {
  return HttpResponse.json({
    data: [
      {
        id: "1",
        user: "John",
        comment: "Awesome Leader",
      },
      {
        id: "2",
        user: "Alice",
        comment: "Nice Place to work",
      },
    ],
  });
});

const errorHandler = http.get(COMMENTS_PATH, () => {
  return HttpResponse.json(
    { message: "Unable to load comments. Please try again later." },
    { status: 503 },
  );
});

export const handlers = [
  import.meta.env.VITE_MSW_SCENARIO === "error" ? errorHandler : successHandler,
];
