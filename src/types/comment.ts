import type { ParentComment } from "./PostCard";

export interface PostCommentI {
  _id: string;
  content: string;
  commentCreator: CommentCreator;
  post: string;
  parentComment?: ParentComment;
  likes?: string[] | string;
  createdAt: string;
  repliesCount?: number;
  image?: string;
}

export interface CommentCreator {
  _id: string;
  name: string;
  username: string;
  photo: string;
}