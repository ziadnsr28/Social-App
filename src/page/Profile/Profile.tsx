import { Mail, Users, FileText, Bookmark, Camera } from "lucide-react";
import { useContext } from "react";
import { UserContext } from "../../components/Context/Usercontext";

export default function Profile() {
   const { userData} = useContext(UserContext)!;
  return (
    <main>
      <div className="mx-auto max-w-7xl p-6">
        {/* Header card */}
        <div className="overflow-hidden rounded-3xl bg-white pb-10 shadow-lg">
          {/* Cover */}
          <div className="relative h-80 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-400">
            <button className="absolute right-6 top-6 flex items-center gap-2 rounded-xl bg-slate-900/50 px-4 py-2.5 text-sm font-bold text-white backdrop-blur hover:bg-slate-900/70">
              <Camera size={18} />
              Add cover
            </button>
          </div>

          {/* Profile card */}
          <div className="relative mx-0 sm:mx-6 lg:mx-12 -mt-20 sm:-mt-24 rounded-3xl bg-gradient-to-b from-slate-50 to-white p-4 sm:p-8 shadow-lg">
            {/* Identity + stats */}
            <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 text-center sm:text-left w-full lg:w-auto min-w-0">
                <div className="flex h-28 w-28 sm:h-32 sm:w-32 shrink-0 items-center justify-center rounded-full bg-slate-200 text-4xl sm:text-5xl font-bold text-slate-600 ring-4 sm:ring-8 ring-white overflow-hidden">
                  <img src={userData?.photo} alt="" className="w-full h-full object-cover" />
                </div>

                <div className="min-w-0">
                  <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 capitalize break-words">{userData?.name}</h2>
                  <p className="text-lg sm:text-xl text-slate-400">@{userData?.username}</p>

                  <span className="mt-2 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-sm font-bold text-blue-500">
                    <Users size={16} />
                    Route Posts member
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full lg:w-auto">
                <div className="rounded-2xl border border-slate-100 bg-white px-2 sm:px-6 py-3 sm:py-4 text-center shadow-sm min-w-0">
                  <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wide text-slate-600 truncate">
                    Followers
                  </p>
                  <p className="mt-1 text-xl sm:text-3xl font-bold text-slate-900">{userData?.followersCount ?? 0}</p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-white px-2 sm:px-6 py-3 sm:py-4 text-center shadow-sm min-w-0">
                  <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wide text-slate-600 truncate">
                    Following
                  </p>
                  <p className="mt-1 text-xl sm:text-3xl font-bold text-slate-900">{userData?.followingCount ?? 0}</p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-white px-2 sm:px-6 py-3 sm:py-4 text-center shadow-sm min-w-0">
                  <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wide text-slate-600 truncate">
                    Bookmarks
                  </p>
                  <p className="mt-1 text-xl sm:text-3xl font-bold text-slate-900">{userData?.bookmarksCount ?? 0}</p>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* About */}
              <div className="col-span-1 md:col-span-2 rounded-2xl border border-slate-100 bg-slate-100 p-5">
                <h3 className="font-bold text-slate-900">About</h3>

                <div className="mt-4 flex items-center gap-3 text-slate-700">
                  <Mail size={18} className="text-slate-500" />
                  {userData?.email}
                </div>

                <div className="mt-3 flex items-center gap-3 text-slate-700">
                  <Users size={18} className="text-slate-500" />
                  Active on Route Posts
                </div>
              </div>

              {/* Counters */}
              <div className="col-span-1 flex flex-col gap-5">
                <div className="flex-1 rounded-2xl border border-slate-100 bg-slate-100 p-5">
                  <p className="text-xs font-bold uppercase tracking-wide text-blue-900">
                    My posts
                  </p>
                  <p className="mt-1 text-3xl font-bold text-slate-900">0</p>
                </div>

                <div className="flex-1 rounded-2xl border border-slate-100 bg-slate-100 p-5">
                  <p className="text-xs font-bold uppercase tracking-wide text-blue-900">
                    Saved posts
                  </p>
                  <p className="mt-1 text-3xl font-bold text-slate-900">0</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-5 flex items-center justify-between rounded-3xl bg-white p-3 shadow-lg">
          <div className="flex items-center gap-1 rounded-2xl bg-slate-100 p-1">
            <button className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-base font-bold text-blue-500 shadow-sm">
              <FileText size={20} />
              My Posts
            </button>

            <button className="flex items-center gap-2 rounded-xl px-5 py-3 text-base font-bold text-slate-700 hover:bg-slate-200">
              <Bookmark size={20} />
              Saved
            </button>
          </div>

          <span className="mr-3 rounded-full bg-blue-50 px-3 py-1 text-sm font-bold text-blue-500">
            0
          </span>
        </div>

        {/* Posts */}
        <div className="mt-5 rounded-3xl bg-white p-6 text-slate-500 shadow-lg">
          You have not posted yet.
        </div>
      </div>
    </main>
  );
}
