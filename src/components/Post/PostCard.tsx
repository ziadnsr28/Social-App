import {
  Globe,
  ThumbsUp,
  MessageSquare,
  Share2,
  EllipsisVertical,
  Pencil,
  Trash2,
} from "lucide-react";
import type { PostCardI } from "../../types/PostCard";
import NewComment from "../../components/Post/NewComment";
import Eidetpost from "../../components/Eidetpost/Eidetpost";
import { useContext, useState } from "react";
import { AlertDialog, Button, Description, Dropdown, Label } from "@heroui/react";
import { UserContext } from "../Context/Usercontext";
import { DeletePost, likecount } from "../../Services/post.services";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { deleteComments } from "../../Services/comments.services";
import EidtComment from "../EditComment/EidtComment";

export default function PostCard({ post }: { post: PostCardI }) {
  const [showCommentpost, setshowCommentpost] = useState<boolean>()
  const { userData } = useContext(UserContext)!;
  console.log(userData);
  
  const [showeEidetpost, setshoweEidetpost] = useState<boolean>()
  const [showDelete, setshowDelete] = useState<boolean>(false)
  const [editingTopComment, setEditingTopComment] = useState<boolean>(false)

  const queryClient = useQueryClient()
  async function deletcooment(commentId: string) {
    await deleteComments(post._id, commentId); // post._id هو الـ postId
    queryClient.invalidateQueries({ queryKey: ["getpost"] });
  }

  async function deletepost(postId: string) {
    try {
      await DeletePost(postId)
      queryClient.invalidateQueries({ queryKey: ["getpost"] })
      setshowDelete(false)

    } catch (error) {
      console.log(error)
    }
  }
  async function likepost() {
    try {
      await likecount(post._id)
      queryClient.invalidateQueries({ queryKey: ["getpost"] })

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
<article className="w-full mt-5 bg-white rounded-2xl p-4 shadow-sm border border-slate-100">        {/* Header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-sm shrink-0">
              <img
                src={post.user.photo}
                alt={post.user.name}
                className="w-8 h-8 rounded-full object-cover"
              />
            </div>

            <div className="min-w-0">
              <div className="flex flex-col gap-1.5 min-w-0">
                <h3 className="text-sm font-bold text-slate-900 leading-none truncate">
                  {post.user.name}
                </h3>
                <span className=" text-xs text-slate-500 truncate">@ {post.user.name}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-400 mt-1">
                <span>{new Date(post.createdAt).toLocaleString("en-US",
                  {
                    dateStyle: "medium",
                    timeStyle: "short"
                  }
                )}</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Globe className="w-3 h-3 text-slate-400" />
                  <span>{post.privacy}</span>
                </span>
              </div>
            </div>
          </div>

          {userData?._id == post.user._id && <Dropdown>
            <Button isIconOnly aria-label="Menu" variant="ghost">
              <EllipsisVertical className="outline-none" />
            </Button>
            <Dropdown.Popover>
              <Dropdown.Menu onAction={(key) => {
                if (key === "edit-post") setshoweEidetpost(true)
                if (key === "delete-post") setshowDelete(true)
              }}>
                <Dropdown.Section>
                  <Dropdown.Item id="edit-post" textValue="Edit post">
                    <div className="flex h-8 items-start justify-center pt-px">
                      <Pencil className="size-4 shrink-0 text-muted" />
                    </div>
                    <div className="flex flex-col">
                      <Label>Edit MyPost</Label>
                      <Description>Make changes</Description>
                    </div>
                  </Dropdown.Item>
                </Dropdown.Section>
                <Dropdown.Section>
                  <Dropdown.Item id="delete-post" textValue="Delete post" variant="danger">
                    <div className="flex h-8 items-start justify-center pt-px">
                      <Trash2 className="size-4 shrink-0 text-danger" />
                    </div>
                    <div className="flex flex-col">
                      <Label>Delete post</Label>
                      <Description>Move to trash</Description>
                    </div>
                  </Dropdown.Item>
                </Dropdown.Section>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>}
        </header>

        <AlertDialog isOpen={showDelete}>
          <AlertDialog.Backdrop>
            <AlertDialog.Container>
              <AlertDialog.Dialog className="sm:max-w-[400px]">
                <AlertDialog.CloseTrigger />
                <AlertDialog.Header>
                  <AlertDialog.Icon status="danger" />
                  <AlertDialog.Heading>Delete post permanently?</AlertDialog.Heading>
                </AlertDialog.Header>
                <AlertDialog.Body>
                  <p>
                    This will permanently delete <strong>this post</strong> and all of its
                    comments and likes. This action cannot be undone.
                  </p>
                </AlertDialog.Body>
                <AlertDialog.Footer>
                  <Button onClick={() => {
                    setshowDelete(false)
                  }} slot="close" variant="tertiary">
                    Cancel
                  </Button>
                  <Button onClick={() => deletepost(post._id)} slot="close" variant="danger">
                    Delete Post
                  </Button>
                </AlertDialog.Footer>
              </AlertDialog.Dialog>
            </AlertDialog.Container>
          </AlertDialog.Backdrop>
        </AlertDialog>

        {showeEidetpost ? <Eidetpost post={post} showEidtPost={setshoweEidetpost} /> : <>
          <p className="text-sm text-slate-800 mt-3 leading-relaxed break-words">
            {post.body}
          </p>

          <div className="mt-3 rounded-xl overflow-hidden border border-slate-100 bg-slate-50">
            {post.image && <img
              src={post.image}
              alt={post.image}
              className="w-full h-auto max-h-[380px] object-cover"
            />}
          </div>
        </>}

        <div className="flex items-center justify-between text-xs text-slate-500 py-3 border-b border-slate-100">
          <div className="flex items-center gap-1.5">
            <span className="flex items-center justify-center w-4 h-4 rounded-full bg-blue-600 text-white">
              <ThumbsUp className="w-2.5 h-2.5 fill-current" />
            </span>
            <span className="font-medium text-slate-600">{post.likesCount} likes</span>
          </div>

          <div className="flex items-center gap-3">
            <span>{post.commentsCount} comments</span>
            <span>•</span>
            <span>{post.sharesCount} shares</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-1 py-1.5 border-b border-slate-100">
          <button
            onClick={likepost}
            type="button"
            className={`flex items-center justify-center gap-2 py-2 rounded-xl text-xs sm:text-sm font-semibold ${post.likes.includes(userData?._id || "") ? "bg-blue-500 text-white" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"} transition-colors`}
          >            <ThumbsUp className="w-4 h-4" />
            <span>Like</span>
          </button>

          <button
            onClick={() => setshowCommentpost(!showCommentpost)}
            type="button"
            className="flex items-center justify-center gap-2 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Comment</span>
          </button>

          <button type="button" className="flex items-center justify-center gap-2 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>

        {post.topComment && (
          <div className="flex-1 min-w-0">
            {editingTopComment ? (
              <EidtComment
                comment={post.topComment}
                postId={post._id}
                showEditComment={() => setEditingTopComment(false)}
                onUpdated={() => queryClient.invalidateQueries({ queryKey: ["getpost"] })}
              />
            ) : (
              <>
                <div className="bg-slate-50 rounded-2xl px-3.5 py-2 max-w-full flex items-start gap-2">
                  <div className="min-w-0 flex-1">
                    <span className="text-xs font-bold text-slate-900 block truncate">
                      {post.topComment.commentCreator?.name}
                    </span>
                    <p className="text-xs text-slate-700 mt-0.5 break-words">
                      {post.topComment.content}
                    </p>
                  </div>

                  {userData?._id == post.topComment.commentCreator._id && (
                    <Dropdown>
                      <Button isIconOnly aria-label="Menu" variant="ghost" className="shrink-0 -mt-1">
                        <EllipsisVertical className="size-4 outline-none" />
                      </Button>
                      <Dropdown.Popover>
                        <Dropdown.Menu onAction={(key) => {
                          const keyStr = String(key);
                          if (keyStr.includes("delete-Comment")) {
                            deletcooment(post.topComment._id);
                          }
                          if (keyStr.includes("edit-Comment")) {
                            setEditingTopComment(true);
                          }
                        }}>
                          <Dropdown.Section>
                            <Dropdown.Item id="edit-Comment" textValue="Edit Comment">
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
                            <Dropdown.Item id="delete-Comment" textValue="Delete Comment" variant="danger">
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

                <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1 px-2 font-medium">
                  <span>
                    {new Date(post.topComment.createdAt).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </span>
                  <button type="button" className="hover:text-slate-600 hover:underline">Like</button>
                  <button type="button" className="hover:text-slate-600 hover:underline">Reply</button>
                </div>
              </>
            )}
          </div>
        )}
        <Link
          to={`/PostDetails/${post._id}`}
          className="mt-2 flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs sm:text-sm font-semibold text-blue-600 hover:bg-blue-50 transition-colors"
        >
          View full post
        </Link>
        {showCommentpost && <NewComment postId={post._id} />}
      </article >
    </>
  );
}