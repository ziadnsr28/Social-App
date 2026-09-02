import { Image, Smile, Send, XCircleIcon } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import { useContext, useRef, useState } from "react";
import { createComments } from "../../Services/comments.services";
import { Spinner } from "@heroui/react";
import { UserContext } from "../Context/Usercontext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export default function CommentInput({ postId, refresh }: { postId: string, refresh?: React.Dispatch<React.SetStateAction<number>> }) {
    const [useComment, setuseComment] = useState<string | null>()
    const [useimg, setuseimg] = useState<File | null>()
    const inputImage = useRef<HTMLInputElement>(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
    const [isLoding, setisLoding] = useState<boolean>(false)
    const { userData } = useContext(UserContext)!;
    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: ({ postId, formdata }: { postId: string; formdata: FormData }) => createComments(postId, formdata),
        onSuccess: (data) => {
            console.log(data);
            queryClient.invalidateQueries({ queryKey: ["getpost"] })
            refresh?.((prev) => prev + 1)
            setisLoding(false)
        },
        onError: (error) => {
            console.log(error);
            setisLoding(false)
        }
    })
    async function addComment() {
        const formdata = new FormData
        formdata.append("content", useComment!)
        if (useimg) {
            formdata.append("img", useimg)
        }
        setisLoding(true)
        setuseComment("")
        setShowEmojiPicker(false)
        mutate({
            postId: postId,
            formdata: formdata
        })
        refresh?.((num) => num + 1);
    }
    function choosefile() {
        console.log(inputImage);
        inputImage.current?.click();
    }
    function showimg() {
        const file = inputImage.current?.files![0];
        setuseimg(file)
        console.log(file);
    }

    function addEmoji(emojiData: any) {
        setuseComment((useComment || "") + emojiData.emoji);
    }

    return (
        <>
            <div className="flex items-start gap-3 w-full max-w-2xl mx-auto p-2">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-slate-300 text-slate-700 font-semibold flex items-center justify-center shrink-0 text-sm">
                    <img src={userData?.photo} alt="" className="w-[32px] object-cover" />
                </div>
                {/* Comment Box */}
                <form className="flex-1 min-w-0 bg-slate-100 dark:bg-slate-800 rounded-2xl p-3 flex flex-col justify-between min-h-[100px] border border-slate-200/60 dark:border-slate-700 relative">

                    {/* Textarea */}
                    <textarea
                        value={useComment!}
                        onChange={(e) => {
                            setuseComment(e.target.value)
                        }}
                        placeholder={`Comment as ${userData?.name}...`}
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
                        {/* Send Button */}
                        <button
                            onClick={addComment}
                            type="button"
                            className="w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-all hover:scale-105"
                        >
                            {isLoding ? <Spinner /> : <Send className="w-4 h-4 translate-x-[-1px] translate-y-[1px]" />}
                        </button>
                    </div>
                </form>
                
            </div>
            {useimg && (
                <div className="mt-2 ml-12 bg-slate-100 rounded-xl p-2 w-[140px] relative border border-slate-200">
                    <XCircleIcon
                        onClick={() => setuseimg(null)}
                        className="absolute -top-2 -right-2 cursor-pointer bg-white rounded-full text-slate-600 hover:text-slate-900 shadow-sm"
                    />
                    <img src={URL.createObjectURL(useimg)} className="w-full h-auto rounded-lg object-cover" alt="Comment image preview" />
                </div>
            )}
        </>
    );
}