import { UserPlus, Search } from "lucide-react";

interface SuggestedUser {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  followers: string;
  mutual?: string;
}

const suggestedUsers: SuggestedUser[] = [
  {
    id: "1",
    name: "abdalla diaa",
    handle: "@abdalla_diaa",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    followers: "108 followers",
    mutual: "2 mutual",
  },
  {
    id: "2",
    name: "Jade",
    handle: "@jade",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
    followers: "85 followers",
  },
  {
    id: "3",
    name: "Galal",
    handle: "@galalmohamed",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80",
    followers: "68 followers",
  },
  {
    id: "4",
    name: "Engy",
    handle: "@erino",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80",
    followers: "61 followers",
  },
  {
    id: "5",
    name: "mohamed",
    handle: "@khairy",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    followers: "54 followers",
  },
];

export default function SuggestionSidebar({ className = "" }: { className?: string }) {
  return (
    <aside className={`bg-white rounded-3xl p-4 shadow-sm border border-slate-100 ${className}`}>
      {/* Header */}
      <header className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2">
          <UserPlus className="w-5 h-5 text-blue-600 stroke-[2.2]" />
          <h2 className="text-base font-bold text-slate-900">
            Suggested Friends
          </h2>
        </div>
        <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 text-xs font-bold flex items-center justify-center">
          5
        </span>
      </header>

      {/* Search Bar */}
      <div className="relative mb-3.5">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          placeholder="Search friends..."
          className="w-full bg-slate-50 text-xs text-slate-800 placeholder-slate-400 rounded-xl pl-9 pr-4 py-2.5 border border-transparent focus:border-slate-200 focus:bg-white focus:outline-hidden transition-all"
        />
      </div>

      {/* Suggested Users List */}
      <div className="space-y-3">
        {suggestedUsers.map((user) => (
          <div
            key={user.id}
            className="rounded-2xl border border-slate-100 p-3 bg-white"
          >
            {/* Top row: Avatar, Info, Follow Button */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover shrink-0"
                />
                <div className="min-w-0">
                  <h3 className="text-xs font-bold text-slate-900 truncate leading-tight">
                    {user.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">
                    {user.handle}
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="shrink-0 bg-blue-50 text-blue-600 hover:bg-blue-100 font-semibold text-xs px-3 py-1.5 rounded-full flex items-center gap-1 transition-colors"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Follow</span>
              </button>
            </div>

            {/* Bottom row: Badges */}
            <div className="flex items-center gap-1.5 mt-2.5 flex-wrap">
              <span className="bg-slate-100 text-slate-600 text-[11px] font-medium px-2.5 py-0.5 rounded-full">
                {user.followers}
              </span>
              {user.mutual && (
                <span className="bg-blue-50 text-blue-600 text-[11px] font-medium px-2.5 py-0.5 rounded-full">
                  {user.mutual}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
