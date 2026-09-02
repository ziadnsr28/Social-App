import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef, useState, useContext } from 'react';
import EmojiPicker from "emoji-picker-react";
import { Image, Smile, Send, XCircleIcon } from "lucide-react";
import { Spinner } from "@heroui/react";
import { UserContext } from "../Context/Usercontext";
import { editComments } from "../../Services/comments.services";
import type { PostCommentI } from "../../types/comment";

interface EditCommentProps {
    comment?: PostCommentI;
    showEditComment?: (value: boolean) => void;
    onUpdated?: () => void;
    postId: string; // أو string | undefined لو optional
}

export default function EidtComment({ comment, showEditComment, onUpdated, postId }: EditCommentProps) {
    const [useComment, setuseComment] = useState<string>(comment?.content || "");
    const [useimg, setuseimg] = useState<File | null>(null);
    const inputImage = useRef<HTMLInputElement>(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
    const [isLoding, setisLoding] = useState<boolean>(false);
    const { userData } = useContext(UserContext)!;
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: ({ commentId, postId, formdata }: { commentId: string; postId: string; formdata: FormData }) => editComments(commentId, postId, formdata),
        onSuccess: (data) => {
            console.log(data);
            queryClient.invalidateQueries({ queryKey: ["getpost"] });
            setisLoding(false);
            showEditComment?.(false);
            onUpdated?.();
        },
        onError: (error) => {
            console.log(error);
            setisLoding(false);
        }
    });

    async function handleEditComment() {
        if (!comment?._id || !useComment.trim()) return;
        setisLoding(true);
        const formData = new FormData();
        if (useimg) {
            formData.append("image", useimg);
        }
        if (useComment) {
            formData.append("content", useComment);
        }
        mutate({ commentId: comment._id, postId: postId, formdata: formData });
    }

    function choosefile() {
        inputImage.current?.click();
    }

    function showimg() {
        const file = inputImage.current?.files?.[0];
        if (file) {
            setuseimg(file);
        }
    }

    function addEmoji(emojiData:unknown) {
        setuseComment(useComment + (emojiData as { emoji: string }).emoji);
    }

    return (
        <div className="w-full">
            <form className="w-full bg-slate-100 dark:bg-slate-800 rounded-2xl p-3 flex flex-col justify-between min-h-[90px] border border-slate-200/60 dark:border-slate-700 relative">
                {/* Textarea */}
                <textarea
                    value={useComment}
                    onChange={(e) => {
                        setuseComment(e.target.value);
                    }}
                    placeholder={`Comment as ${userData?.name || "user"}...`}
                    rows={2}
                    className="w-full bg-transparent resize-none outline-none text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 font-normal"
                />

                {/* Bottom Actions */}
                <div className="flex items-center justify-between pt-2">
                    {/* Left Actions */}
                    <div className="flex items-center gap-3 text-slate-500">
                        <button
                            type="button"
                            onClick={choosefile}
                            className="p-1 hover:bg-slate-200/60 dark:hover:bg-slate-700 rounded-full transition-colors"
                            title="Add image"
                        >
                            <input onChange={showimg} ref={inputImage} type="file" hidden />
                            <Image className="w-5 h-5 stroke-[1.75]" />
                        </button>
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                className="p-1 hover:bg-slate-200/60 dark:hover:bg-slate-700 rounded-full transition-colors"
                                title="Add emoji"
                            >
                                <Smile className="w-5 h-5 stroke-[1.75]" />
                            </button>
                            {showEmojiPicker && (
                                <div className="absolute left-0 bottom-full mb-2 z-50 shadow-2xl rounded-2xl">
                                    <EmojiPicker
                                        onEmojiClick={addEmoji}
                                        autoFocusSearch={false}
                                        width={300}
                                        height={350}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Buttons */}
                    <div className="flex items-center gap-2">
                        {showEditComment && (
                            <button
                                type="button"
                                onClick={() => showEditComment(false)}
                                className="px-3 py-1 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
                            >
                                Cancel
                            </button>
                        )}
                        <button
                            onClick={handleEditComment}
                            type="button"
                            className="w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-all hover:scale-105"
                        >
                            {isLoding ? <Spinner /> : <Send className="w-4 h-4 translate-x-[-1px] translate-y-[1px]" />}
                        </button>
                    </div>
                </div>
            </form>

            {useimg && (
                <div className="mt-2 ml-4 bg-slate-100 rounded-xl p-2 w-[140px] relative border border-slate-200">
                    <XCircleIcon
                        onClick={() => setuseimg(null)}
                        className="absolute -top-2 -right-2 cursor-pointer bg-white rounded-full text-slate-600 hover:text-slate-900 shadow-sm"
                    />
                    <img src={URL.createObjectURL(useimg)} className="w-full h-auto rounded-lg object-cover" alt="Comment image preview" />
                </div>
            )}
        </div>
    );
}
