export type Comment = {
  id: string;
  user: string;
  comment: string;
};

export type CommentsResponse = {
  data: Comment[];
};
