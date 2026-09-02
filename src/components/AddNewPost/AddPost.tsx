import { Spinner } from "@heroui/react";
import { Lock, ChevronDown, Image, Smile, Send, XCircleIcon } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import { useContext, useRef, useState } from "react";
import { createPost } from "../../Services/post.services";
import { UserContext } from "../Context/Usercontext";
import { useQueryClient } from "@tanstack/react-query";

export default function AddPost() {
  const [useAddPostContent, setuseAddPostContent] = useState<string | null>()
  const [usePostImg, setusePostImg] = useState<File | null>()
  const inputImage = useRef<HTMLInputElement>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [isLoding, setisLoding] = useState<boolean>(false)
  const { userData } = useContext(UserContext)!
  const queryClient = useQueryClient()

  async function addpost() {
    if (!useAddPostContent?.trim()) {
      console.log("لازم تكتب نص للبوست")
      return
    }

    const formdata = new FormData
    formdata.append("body", useAddPostContent!)
    if (usePostImg) {
      formdata.append("image", usePostImg)
    }
    setisLoding(true)
    try {
      const { data } = await createPost(formdata)
      console.log(data);
      setisLoding(false);
      setuseAddPostContent("")
      setusePostImg(null)
      setShowEmojiPicker(false)
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
    setusePostImg(file)
    console.log(file);
  }

  function addEmoji(emojiData: any) {
    setuseAddPostContent((useAddPostContent || "") + emojiData.emoji);
  }

  return (
    <div className="rounded-3xl mt-5 bg-white shadow-lg mb-5">
      {/* Header */}
      <div className="flex items-start gap-3 p-4 pb-3">
        <img
          src={userData?.photo}
          alt="mostafa"
          className="h-10 w-10 shrink-0 rounded-full object-cover"
        />

        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-slate-900 capitalize">{userData?.name}</p>

          {/* Privacy */}
          <button className="mt-1 flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-200">
            <Lock size={12} />
            Only me
            <ChevronDown size={14} />
          </button>
        </div>
      </div>

      {/* Composer */}
      <div className="px-4 pb-3">
        <textarea
          value={useAddPostContent!}
          onChange={(e) => { (setuseAddPostContent(e.target.value)) }}
          placeholder={`What's on your mind, ${userData?.name || "there"}?`}
          rows={4}
          className="w-full resize-none rounded-2xl bg-slate-100 px-3 py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400"
        />
      </div>

      <div className="mx-4 border-t border-slate-200" />

      {/* Actions */}
      <div className="flex items-center justify-between px-2 py-2">
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

        <button onClick={addpost} className="mr-2 flex items-center gap-2 rounded-xl bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600">
          {isLoding ? <Spinner /> : <span className="flex justify-between items-center gap-2"> <Send size={16} /> post</span>}

        </button>
      </div>
      {usePostImg && (
        <div className="relative mt-3 mx-4 mb-4 p-3 bg-slate-50 rounded-2xl border border-slate-100">
          <XCircleIcon
            onClick={() => setusePostImg(null)}
            className="absolute top-2 right-2 cursor-pointer text-slate-500 hover:text-slate-700 z-10"
          />

          <img
            src={URL.createObjectURL(usePostImg)}
            className="w-full h-[200px] object-contain rounded-xl"
            alt="Post preview"
          />
        </div>
      )}
    </div>


  );
}
