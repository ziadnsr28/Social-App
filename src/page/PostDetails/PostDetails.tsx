import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NewComment from "../../components/Post/NewComment";
import {
  MoreHorizontal,
  Globe,
  ArrowLeft,
  ThumbsUp,
  MessageSquare,
  Share2,
  EllipsisVertical,
  Pencil,
  Trash2,
} from "lucide-react";


import { getSinglepost } from "../../Services/post.services";
import { deleteComments, getPostComments } from "../../Services/comments.services";

import type { PostCardI } from "../../types/PostCard";
import type { PostCommentI } from "../../types/comment";
import { UserContext } from "../../components/Context/Usercontext";
import DetailsSkeleton from "../../components/DetailsSkeleton/DetailsSkeleton";
import { Button, Description, Dropdown, Label } from "@heroui/react";
import EidtComment from "../../components/EditComment/EidtComment";

export default function PostDetails() {
  const { postId } = useParams<{ postId: string }>();
  const [postDetails, setPostDetails] = useState<PostCardI | null>(null);
  const [postComments, setPostComments] = useState<PostCommentI[]>([]);
  const { userData } = useContext(UserContext)!;
  const [commentAdded, setCommentAdded] = useState(0);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  // =========================
  // Get Single Post
  // =========================
  useEffect(() => {
    async function getSinglePostData(postId: string) {
      try {
        const { data } = await getSinglepost(postId);
        const details: PostCardI = data.data.post;
        setPostDetails(details);
      } catch (error) {
        console.error("Failed to fetch post:", error);
      }
    }
    if (postId) {
      getSinglePostData(postId);
    }
  }, [postId]);
  // =========================
  // Get Post Comments
  // =========================
  async function deletcooment(postId: string, commentId: string) {
    console.log("Deleting comment with id:", commentId);
    // Optimistically update UI so comment disappears immediately
    setPostComments((prev) => prev.filter((c) => c._id !== commentId));
    try {
      await deleteComments(postId, commentId);
      setCommentAdded((prev) => prev + 1);
    } catch (error) {
      console.error("Failed to delete comment:", error);
      // If error occurs, re-fetch comments to restore accurate state
      if (postId) {
        try {
          const { data } = await getPostComments(postId);
          setPostComments(data.data.comments);
        } catch (fetchErr) {
          console.error("Failed to refresh comments:", fetchErr);
        }
      }
    }
  }

  useEffect(() => {
    async function getComments(postId: string) {
      try {
        const { data } = await getPostComments(postId);

        const comments: PostCommentI[] = data.data.comments;

        setPostComments(comments);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      }
    }
    getComments(postId!);
  }, [postId, commentAdded]);


  if (!postDetails) {
    return <DetailsSkeleton />;
  }

  return (
    <div className="relative h-[calc(100vh-80px)] w-full flex flex-col lg:flex-row bg-slate-100 font-sans text-slate-900 overflow-hidden">
      {/* Back to News Feed */}
      <Link
        to="/newsfeed"
        className="absolute left-4 top-4 z-50 flex items-center gap-2 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-white text-xs font-semibold px-3.5 py-2.5 shadow-lg backdrop-blur-md transition-all border border-slate-700/50 hover:scale-105 active:scale-95"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to News Feed</span>
      </Link>

      {/* =========================
          LEFT SIDE: POST IMAGE
      ========================= */}
      <section className="flex-1 bg-slate-950 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden min-h-[300px] lg:min-h-0 select-none">
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={postDetails.image}
            alt="Post details visual"
            className="max-h-full max-w-full w-auto h-auto object-contain rounded-2xl shadow-2xl"
          />
        </div>
      </section>

      {/* =========================
          RIGHT SIDE
      ========================= */}
      <aside className="w-full lg:w-[420px] xl:w-[460px] flex flex-col h-full bg-white border-t lg:border-t-0 lg:border-l border-slate-200/80 shrink-0 min-w-0 overflow-hidden">
        {/* =========================
            AUTHOR HEADER
        ========================= */}
        <header className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between gap-3 shrink-0 bg-white">
          <div className="flex items-center gap-3 min-w-0">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-sm shrink-0 overflow-hidden ring-2 ring-slate-100">
              <img
                src={postDetails.user.photo}
                alt={postDetails.user.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* User Info */}
            <div className="min-w-0">
              <h1 className="text-sm font-bold text-slate-900 leading-snug truncate">
                {postDetails.user.name}
              </h1>

              <p className="text-xs text-slate-500 truncate">
                {postDetails.user.name}
              </p>

              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-0.5">
                <span>
                  {new Date(postDetails.createdAt).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </span>

                <span>•</span>

                <span className="inline-flex items-center gap-1">
                  <Globe className="w-3 h-3 text-slate-400" />
                  <span>{postDetails.privacy}</span>
                </span>
              </div>
            </div>
          </div>

          {/* More */}
          <button
            type="button"
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors shrink-0"
            aria-label="More options"
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </header>

        {/* =========================
            POST BODY
        ========================= */}
        <div className="p-4 sm:p-5 border-b border-slate-100 bg-white shrink-0">
          <p className="text-sm text-slate-800 leading-relaxed font-normal whitespace-pre-line break-words">
            {postDetails.body}
          </p>

          {/* Engagement Stats */}
          <div className="flex items-center justify-between text-xs text-slate-500 pt-3.5 pb-2.5 mt-3 border-t border-slate-100">
            <div className="flex items-center gap-1.5">
              <span className="flex items-center justify-center w-4 h-4 rounded-full bg-blue-600 text-white shadow-xs">
                <ThumbsUp className="w-2.5 h-2.5 fill-current" />
              </span>

              <span className="font-semibold text-slate-700">
                20 likes
              </span>
            </div>

            <div className="flex items-center gap-2 text-slate-500 font-medium">
              <span>{postComments.length} comments</span>

              <span>•</span>

              <span>2 shares</span>
            </div>
          </div>

          {/* =========================
              ACTIONS - UI ONLY
          ========================= */}
          <div className="grid grid-cols-3 gap-1 pt-1.5 border-t border-slate-100">
            {/* Like */}
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors"
            >
              <ThumbsUp className="w-4 h-4" />
              <span>Like</span>
            </button>
            {/* Comment */}
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Comment</span>
            </button>
            {/* Share */}
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </div>
        {/* =========================
            COMMENTS
        ========================= */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 min-h-0">
          {postComments.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-sm text-slate-400">
                No comments yet.
              </p>
            </div>
          ) : (
            postComments.map((comment) => (
              <div key={comment._id} className="flex items-start gap-2.5" >
                {/* Avatar */}
                <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5 overflow-hidden ring-1 ring-slate-200/60">
                  {comment.commentCreator?.photo ? (
                    <img
                      src={comment.commentCreator.photo}
                      alt={comment.commentCreator.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>
                      {comment.commentCreator?.name?.charAt(0).toUpperCase()}
                    </span>
                  )}

                </div>
                {/* Comment */}
                <div className="flex-1 min-w-0">
                  {editingCommentId === comment._id ? (
                    <EidtComment
                      comment={comment}
                      postId={postId!}   // ← ضيف السطر ده
                      showEditComment={() => setEditingCommentId(null)}
                      onUpdated={() => setCommentAdded((prev) => prev + 1)}
                    />
                  ) : (
                    <div className="flex items-start justify-between gap-1 bg-slate-50 rounded-2xl px-3.5 py-2.5 max-w-[calc(100%-35px)] border border-slate-100">
                      {/* Comment */}
                      <div className="inline-block">
                        <span className="text-xs font-bold text-slate-900 block leading-tight">
                          {comment.commentCreator?.name}
                        </span>
                        <p className="text-xs text-slate-700 mt-1 leading-relaxed whitespace-pre-wrap break-words">
                          {comment.content}
                        </p>
                      </div>
                      {/* Dropdown */}
                      {userData?._id === comment.commentCreator?._id && (
                        <Dropdown>
                          <Button
                            isIconOnly
                            aria-label="Menu"
                            variant="ghost"
                            className="shrink-0 -mt-1"
                          >
                            <EllipsisVertical className="size-4" />
                          </Button>
                          <Dropdown.Popover>
                            <Dropdown.Menu
                              onAction={(key) => {
                                 console.log(`Selected: ${key}`);
                                 const keyStr = String(key);
                                 if (key === "delete-Comment" || keyStr.includes("delete-Comment")) {
                                   if (postId) deletcooment(postId, comment._id);
                                 }
                                 if (key === "edit-Comment" || keyStr.includes("edit-Comment")) {
                                   setEditingCommentId(comment._id);
                                 }
                               }}
                            >
                              <Dropdown.Section>
                                <Dropdown.Item
                                  key="edit-Comment"
                                  id="edit-Comment"
                                  textValue="Edit Comment"
                                  onClick={() => setEditingCommentId(comment._id)}
                                >
                                  <div className="flex h-8 items-start justify-center pt-px">
                                    <Pencil className="size-4 shrink-0 text-muted" />
                                  </div>
                                  <div className="flex flex-col">
                                    <Label>Edit MyComment</Label>
                                    <Description>Make changes</Description>
                                  </div>
                                </Dropdown.Item>
                              </Dropdown.Section>

                              <Dropdown.Section>
                                <Dropdown.Item
                                  key="delete-Comment"
                                  id="delete-Comment"
                                  textValue="Delete Comment"
                                  variant="danger"
                                  onClick={() => { if (postId) deletcooment(postId, comment._id); }}
                                >
                                  <div className="flex h-8 items-start justify-center pt-px">
                                    <Trash2 className="size-4 shrink-0 text-danger" />
                                  </div>

                                  <div className="flex flex-col">
                                    <Label>Delete Comment</Label>
                                    <Description>Move to trash</Description>
                                  </div>
                                </Dropdown.Item>
                              </Dropdown.Section>
                            </Dropdown.Menu>
                          </Dropdown.Popover>
                        </Dropdown>
                      )}
                    </div>
                  )}
                  {/* Comment Actions */}
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1 px-2 font-medium">
                    <span>
                      {new Date(comment.createdAt).toLocaleString("en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                    <button
                      type="button"
                      className="hover:text-blue-600 hover:underline transition-colors"
                    >
                      Like
                      {Boolean(comment.repliesCount && comment.repliesCount > 0) &&
                        ` (${comment.repliesCount})`}
                    </button>
                    <button
                      type="button"
                      className="hover:text-slate-600 hover:underline transition-colors"
                    >
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* =========================
            COMMENT INPUT - UI ONLY
        ========================= */}
        <NewComment postId={postId!} refresh={setCommentAdded} />
      </aside >
    </div >
  );
}