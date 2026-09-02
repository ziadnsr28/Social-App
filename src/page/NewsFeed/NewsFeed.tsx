import { useState } from "react";
import { ChevronRight, Users, X } from "lucide-react";
import PostCard from "../../components/Post/PostCard";
import LodingSkeleton from "../../components/LodingSkeleton/LodingSkeleton";
import SuggestionSidebar from "../../components/SuggestionSidebar/SuggestionSidebar";
import { getpost } from "../../Services/newsfeed.services";
import type { PostCardI } from "../../types/PostCard";
import { useQuery } from "@tanstack/react-query";


export default function NewsFeed() {
  const [isSuggestedDrawerOpen, setIsSuggestedDrawerOpen] = useState<boolean>(false)
  const { data: post, isLoading } = useQuery({
    queryKey: ["getpost"],
    queryFn: getpost,
    select: (data) => data.data.posts as PostCardI[]
  })


  return (
    <div className="w-full">
      {/* Suggested Friends compact button - Mobile & Tablet only (< lg) */}
      <div className="block lg:hidden mb-4">
        <button
          type="button"
          onClick={() => setIsSuggestedDrawerOpen(true)}
          className="w-full flex items-center justify-between bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100 text-slate-800 hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users size={18} className="stroke-[2.2]" />
            </div>
            <span className="font-bold text-sm text-slate-900">Suggested Friends</span>
          </div>
          <ChevronRight size={18} className="text-slate-400" />
        </button>
      </div>

      {isLoading ? (
        <LodingSkeleton />
      ) : (
        post?.map((post) => {
          return <PostCard key={post._id} post={post} />
        })
      )}

      {/* Suggested Friends Mobile / Tablet Drawer Panel */}
      {isSuggestedDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex items-end sm:items-center justify-center p-0 sm:p-4">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsSuggestedDrawerOpen(false)}
          />

          {/* Drawer container */}
          <div className="relative w-full max-w-lg max-h-[85vh] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl p-4 z-10 overflow-y-auto">
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <Users size={20} className="text-blue-600" />
                <span>Suggested Friends</span>
              </div>
              <button
                type="button"
                onClick={() => setIsSuggestedDrawerOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                aria-label="Close panel"
              >
                <X size={20} />
              </button>
            </div>

            <SuggestionSidebar className="border-0 shadow-none p-0" />
          </div>
        </div>
      )}
    </div>
  );
}