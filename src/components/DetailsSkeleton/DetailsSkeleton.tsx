export default function DetailsSkeleton() {
    return (
        <div className="relative h-[calc(100vh-80px)] w-full flex flex-col lg:flex-row bg-slate-100 font-sans overflow-hidden">
            {/* Back to News Feed Skeleton Button */}
            <div className="absolute left-4 top-4 z-50 flex items-center gap-2 rounded-xl bg-slate-800/80 px-3.5 py-2.5 shadow-lg backdrop-blur-md border border-slate-700/50 animate-pulse">
                <div className="w-4 h-4 bg-slate-600 rounded-md" />
                <div className="w-24 h-3.5 bg-slate-600 rounded-md" />
            </div>

            {/* =========================
          LEFT SIDE: POST IMAGE SKELETON
      ========================= */}
            <section className="flex-1 bg-slate-950 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden min-h-[300px] lg:min-h-0 select-none">
                <div className="w-full h-full max-h-[550px] max-w-[700px] bg-slate-800/80 rounded-2xl shadow-2xl animate-pulse flex items-center justify-center">
                    <div className="w-16 h-16 rounded-2xl bg-slate-700/50 flex items-center justify-center">
                        <div className="w-8 h-8 bg-slate-600/60 rounded-lg" />
                    </div>
                </div>
            </section>

            {/* =========================
          RIGHT SIDE: DETAILS SKELETON
      ========================= */}
            <aside className="w-full lg:w-[420px] xl:w-[460px] flex flex-col h-full bg-white border-t lg:border-t-0 lg:border-l border-slate-200/80 shrink-0 min-w-0 overflow-hidden">
                {/* =========================
            AUTHOR HEADER SKELETON
        ========================= */}
                <header className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between gap-3 shrink-0 bg-white">
                    <div className="flex items-center gap-3 min-w-0">
                        {/* Avatar */}
                        <div className="w-10 h-10 rounded-full bg-slate-200 animate-pulse shrink-0 ring-2 ring-slate-100" />

                        {/* User Info */}
                        <div className="space-y-1.5 min-w-0">
                            <div className="h-3.5 w-28 bg-slate-200 rounded-md animate-pulse" />
                            <div className="h-2.5 w-20 bg-slate-200 rounded-md animate-pulse" />
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <div className="h-2 w-16 bg-slate-200 rounded-md animate-pulse" />
                                <div className="w-1 h-1 rounded-full bg-slate-300" />
                                <div className="h-2 w-10 bg-slate-200 rounded-md animate-pulse" />
                            </div>
                        </div>
                    </div>

                    {/* More options button */}
                    <div className="w-8 h-8 rounded-full bg-slate-100 animate-pulse shrink-0" />
                </header>

                {/* =========================
            POST BODY SKELETON
        ========================= */}
                <div className="p-4 sm:p-5 border-b border-slate-100 bg-white shrink-0 space-y-4">
                    {/* Post text content lines */}
                    <div className="space-y-2">
                        <div className="h-3.5 w-full bg-slate-200 rounded-md animate-pulse" />
                        <div className="h-3.5 w-11/12 bg-slate-200 rounded-md animate-pulse" />
                        <div className="h-3.5 w-4/5 bg-slate-200 rounded-md animate-pulse" />
                    </div>

                    {/* Engagement Stats */}
                    <div className="flex items-center justify-between pt-3.5 pb-2.5 border-t border-slate-100">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-slate-200 animate-pulse" />
                            <div className="h-3 w-14 bg-slate-200 rounded-md animate-pulse" />
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="h-3 w-20 bg-slate-200 rounded-md animate-pulse" />
                            <div className="w-1 h-1 rounded-full bg-slate-300" />
                            <div className="h-3 w-14 bg-slate-200 rounded-md animate-pulse" />
                        </div>
                    </div>

                    {/* Action Buttons (Like / Comment / Share) */}
                    <div className="grid grid-cols-3 gap-2 pt-1.5 border-t border-slate-100">
                        <div className="h-9 bg-slate-100 rounded-xl animate-pulse" />
                        <div className="h-9 bg-slate-100 rounded-xl animate-pulse" />
                        <div className="h-9 bg-slate-100 rounded-xl animate-pulse" />
                    </div>
                </div>

                {/* =========================
            COMMENTS SKELETON LIST
        ========================= */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 min-h-0">
                    {[1, 2, 3].map((comment) => (
                        <div key={comment} className="flex items-start gap-2.5">
                            {/* Commenter Avatar */}
                            <div className="w-8 h-8 rounded-full bg-slate-200 animate-pulse shrink-0 mt-0.5 ring-1 ring-slate-200/60" />

                            {/* Comment Bubble & Actions */}
                            <div className="flex-1 min-w-0 space-y-1.5">
                                <div className="bg-slate-50 border border-slate-100 rounded-2xl px-3.5 py-2.5 space-y-2">
                                    <div className="h-3 w-24 bg-slate-200 rounded-md animate-pulse" />
                                    <div className="h-2.5 w-full bg-slate-200 rounded-md animate-pulse" />
                                    <div className="h-2.5 w-3/4 bg-slate-200 rounded-md animate-pulse" />
                                </div>

                                {/* Comment footer actions */}
                                <div className="flex items-center gap-3 px-2">
                                    <div className="h-2 w-14 bg-slate-200 rounded-md animate-pulse" />
                                    <div className="h-2 w-8 bg-slate-200 rounded-md animate-pulse" />
                                    <div className="h-2 w-8 bg-slate-200 rounded-md animate-pulse" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* =========================
            COMMENT INPUT SKELETON
        ========================= */}
                <footer className="p-3 sm:p-4 border-t border-slate-100 bg-white shrink-0">
                    <div className="flex items-center gap-2">
                        {/* User Avatar */}
                        <div className="w-8 h-8 rounded-full bg-slate-200 animate-pulse shrink-0" />

                        {/* Input field skeleton */}
                        <div className="flex-1 h-9 bg-slate-100 rounded-2xl animate-pulse" />

                        {/* Send button skeleton */}
                        <div className="w-8 h-8 rounded-full bg-slate-200 animate-pulse shrink-0" />
                    </div>
                </footer>
            </aside>
        </div>
    );
}
