import { http, HttpResponse } from "msw";

const COMMENTS_PATH = "/api/v1/comments";

const successHandler = http.get(COMMENTS_PATH, () => {
  return HttpResponse.json({
    data: [
      {
        id: "1",
        user: "Unknown",
        comment:
          "Thank you Apporva for your efforts in building Team Hyderabad",
      },
      {
        id: "2",
        user: "Alice",
        comment: "Nice Place to work",
      },
      {
        id: "3",
        user: "Unknown",
        comment: "Thank you Chintan for being so Proactive",
      },
      {
        id: "4",
        user: "Unknown",
        comment:
          "THANK YOU HYDERABAD TEAM FOR MAKING EMBURSE A FUN PLACE TO WORK",
      },
      {
        id: "5",
        user: "Bhupender",
        comment:
          "Thank you Enterprise Mobile and Emburse Team for the warm welcome",
      },
      {
        id: "6",
        user: "Unknown",
        comment: "Thank you for the warm welcome",
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
