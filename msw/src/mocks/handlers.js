import { http, HttpResponse } from "msw";

export const handlers = [
  // Intercept "GET request"
  //http.get("/api/v1/comments", () => {
  http.get("https://emburse.com/hyderabad/api/v1/comments", () => {
    // ...and respond to them using this JSON response.
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
  }),
];
