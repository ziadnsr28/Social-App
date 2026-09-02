import { NavLink } from "react-router-dom";
import { Newspaper, Sparkles, Globe, Bookmark, type LucideIcon } from "lucide-react";

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  href: string;
}

interface SidebarProps {
  className?: string;
}

const navItems: NavItem[] = [
  { id: "feed", label: "Feed", icon: Newspaper, href: "/newsfeed" },
  { id: "my-posts", label: "My Posts", icon: Sparkles, href: "/myposts" },
  { id: "community", label: "Community", icon: Globe, href: "/community" },
  { id: "saved", label: "Saved", icon: Bookmark, href: "/saved" },
];

export default function Sidebar({ className = "" }: SidebarProps) {
  return (
    <aside className={`bg-white rounded-3xl p-3 shadow-sm border border-slate-100/80 ${className}`}>
      <nav className="flex flex-col space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.id}
              to={item.href}
              className={({ isActive }) =>
                `w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-colors duration-150 text-left ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-5 h-5 shrink-0 stroke-[2.2] ${isActive ? "text-blue-600" : "text-slate-700"}`} />
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}