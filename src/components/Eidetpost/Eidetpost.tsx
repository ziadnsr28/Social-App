import { Send, Smile, Image, XCircleIcon } from "lucide-react"
import EmojiPicker from "emoji-picker-react"
import type { PostCardI } from "../../types/PostCard"
import { useState, useRef } from "react";
import { updatePost } from "../../Services/post.services";
import { Spinner } from "@heroui/react";
import { useQueryClient } from "@tanstack/react-query";

export default function Eidetpost({ showEidtPost, post }: { showEidtPost: (value: boolean) => void, post: PostCardI }) {
    const [useEidtpost, setuseEidtpost] = useState<string | null>(post.body)
    const [useEidtimg, setuseEidtimg] = useState<File | null | string>(post.image)
    const inputImage = useRef<HTMLInputElement>(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
    const [isLoding, setisLoding] = useState<boolean>(false)
       const  queryClient =useQueryClient()
    async function EidtPost() {
        const formdata = new FormData
        formdata.append("body", useEidtpost!)
        if (useEidtimg) {
            formdata.append("image", useEidtimg)
        }
        setisLoding(true)
        try {
            const { data } = await updatePost(formdata, post._id)
            console.log(data);
            setuseEidtpost(null)
            setuseEidtimg("")
            showEidtPost(false)
            queryClient.invalidateQueries({ queryKey: ["getpost"] })

        } catch (error) {
            console.log(error)
        } finally {
            setisLoding(false)
        }
    }

    function choosefile() {
        console.log(inputImage);
        inputImage.current?.click();
    }
    function showimg() {
        const file = inputImage.current?.files![0];
        setuseEidtimg(file!)
        console.log(file);
    }

    function addEmoji(emojiData: any) {
        setuseEidtpost((useEidtpost || "") + emojiData.emoji);
    }

    return (

        <>
            <div className="px-4 pb-3 mt-5" >
                <textarea
                    value={useEidtpost!}
                    onChange={(e) => { setuseEidtpost(e.target.value) }}
                    rows={4}
                    className="w-full resize-none rounded-2xl bg-slate-100 px-3 py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                />
            </div  >
            <div className="mx-4 border-t border-slate-200" />

            {useEidtimg && (
                <div className="relative mt-3 mx-4 mb-4 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <XCircleIcon
                        onClick={() => setuseEidtimg(null)}
                        className="absolute top-2 right-2 cursor-pointer text-slate-500 hover:text-slate-700 z-10"
                    />

                    <img
                        src={
                            typeof useEidtimg === "string" ? useEidtimg : URL.createObjectURL(useEidtimg)
                        } className="w-full h-[200px] object-contain rounded-xl"
                        alt="Post preview"
                    />
                </div>
            )}
            {/* Actions */}
            < div className="flex items-center justify-between px-2 py-2" >
                <div className="flex items-center">

                    <button onClick={choosefile} className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">
                        <input onChange={showimg} ref={inputImage} type="file" hidden />
                        <Image size={18} className="text-green-500" />
                        Photo/video
                    </button>


                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                            className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                        >
                            <Smile size={18} className="text-amber-400" />
                            Feeling/activity
                        </button>
                        {showEmojiPicker && (
                            <div className="absolute left-0 bottom-full mb-2 z-50 shadow-2xl rounded-2xl">
                                <EmojiPicker
                                    onEmojiClick={addEmoji}
                                    autoFocusSearch={false}
                                    width={320}
                                    height={380}
                                />
                            </div>
                        )}
                    </div>

                </div>

                <div className="flex">
                    <button onClick={() => {
                        showEidtPost(false)
                    }} className="mr-2 flex items-center gap-2 rounded-xl bg-danger px-4 py-2 text-sm font-semibold text-white">
                        <span className="flex justify-between items-center gap-2">
                            cansel
                        </span>
                    </button>
                    <button onClick={EidtPost} className="mr-2 flex items-center gap-2 rounded-xl bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600">
                        <span className="flex justify-between items-center gap-2">
                            {isLoding ? <Spinner className="text-white" /> : <span className="flex justify-between items-center gap-2"> <Send size={16} /> Eidt post</span>}

                        </span>
                    </button>
                </div>
            </ div>
        </>
    )
}