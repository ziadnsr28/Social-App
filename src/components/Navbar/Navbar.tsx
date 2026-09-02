import { Button, Dropdown, Label, Tabs } from "@heroui/react";
import route from "../../../public/route.svg";
import {
  Bell,
  ChevronDown,
  Home,
  LogOut,
  Settings,
  UserRound,
  Menu,
  X,
  Sparkles,
  Globe,
  Bookmark,
} from "lucide-react";
import { authContext } from "../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../Context/Usercontext";

export default function Navbar() {
  const { setToken } = useContext(authContext)!;
  const { userData } = useContext(UserContext)!;
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  function logoutUser() {
    localStorage.removeItem("userToken");
    setToken(null)
    navigate("/auth/login");


  }

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">

        {/* Logo & Mobile Menu Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Hamburger button - Mobile only */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex md:hidden items-center justify-center p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu size={24} />
          </button>
          <span>
            <img src={route} alt="" className="w-20" />
          </span>
        </div>

        {/* Navigation - في النص (center) */}
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2">
          <Tabs
            className="w-auto"
            defaultSelectedKey="feed"
            onSelectionChange={(key) => {
              if (key === "feed") navigate("/newsfeed");
              else if (key === "profile") navigate("/profile");
              else if (key === "notifications") navigate("/notifications");
            }}
          >
            <Tabs.ListContainer>
              <Tabs.List
                aria-label="Main Navigation"
                className="gap-1 rounded-2xl border border-gray-200 bg-white p-1"
              >
                {/* Feed */}
                <Tabs.Tab
                  key="feed" // ✅ أضفت الـ key بدل id (لأن id مش prop أصلي في Heroui Tabs)
                  className="flex items-center gap-2 rounded-xl px-5 py-3 text-gray-600"
                >
                  <Link to={"/newsfeed"} className="flex">
                    <Home size={21} />
                    Feed
                  </Link>
                  <Tabs.Indicator />
                </Tabs.Tab>

                {/* Profile */}
                <Tabs.Tab
                  key="profile"
                  className="flex items-center gap-2 rounded-xl px-5 py-3 text-gray-600"
                >
                  <Link to={"/profile"} className="flex ">
                    <UserRound size={21} />
                    Profile
                  </Link>
                  <Tabs.Indicator />
                </Tabs.Tab>

                {/* Notifications */}
                <Tabs.Tab
                  key="notifications"
                  className="flex items-center gap-2 rounded-xl px-5 py-3 text-gray-600"
                >
                  <Link to={"/notifications"} className="flex">
                    <Bell size={21} />
                    Notifications
                  </Link>
                  <Tabs.Indicator />
                </Tabs.Tab>
              </Tabs.List>
            </Tabs.ListContainer>
          </Tabs>
        </div>

        {/* User Menu - جهة الشمال */}
        <div className="ml-auto">
          <Dropdown>
            <Button
              aria-label="User Menu"
              className="flex h-12 items-center gap-3 rounded-full border border-gray-300 bg-white px-3 shadow-sm hover:bg-gray-50"
            >
              {!userData ? (
                <>
                  <div className="h-9 w-9 rounded-full bg-slate-200 animate-pulse shrink-0" />
                  <div className="h-4 w-20 bg-slate-200 rounded-md animate-pulse" />
                </>
              ) : (
                <>
                  <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-gray-400 shrink-0">
                    <img src={userData?.photo} alt={userData?.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="font-medium text-gray-800 capitalize max-w-[120px] truncate">{userData?.name}</span>
                </>
              )}
              <ChevronDown size={18} className="text-gray-600 shrink-0" />
            </Button>

            <Dropdown.Popover className="mt-2 w-56">
              <Dropdown.Menu
                aria-label="User Menu"
                onAction={(key) => {
                  if (key === "profile") navigate("/profile");
                  else if (key === "settings") navigate("/settings");
                  else if (key === "logout") logoutUser();
                }}
              >
                <Dropdown.Item
                  key="profile"
                  id="profile"
                  textValue="Profile"
                  className="flex items-center gap-3 px-4 py-3"
                >
                  <UserRound size={19} />
                  <Label>Profile</Label>
                </Dropdown.Item>

                <Dropdown.Item
                  key="settings"
                  id="settings"
                  textValue="Settings"
                  className="flex items-center gap-3 px-4 py-3"
                >
                  <Settings size={19} />
                  <Label>Settings</Label>
                </Dropdown.Item>

                <Dropdown.Item
                  key="logout"
                  id="logout"
                  textValue="Logout"
                  variant="danger"
                  className="flex items-center gap-3 px-4 py-3"
                >
                  <LogOut size={19} />
                  <Label>Logout</Label>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl p-5 flex flex-col z-10 overflow-y-auto">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <span className="text-xl font-bold text-[#172033]">Menu</span>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            {/* Main Navigation Links */}
            <div className="py-4 space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
                Navigation
              </p>
              <Link
                to="/newsfeed"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                <Home size={20} />
                <span>Feed</span>
              </Link>
              <Link
                to="/profile"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                <UserRound size={20} />
                <span>Profile</span>
              </Link>
              <Link
                to="/notifications"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                <Bell size={20} />
                <span>Notifications</span>
              </Link>
            </div>

            <div className="border-t border-slate-100 my-2" />

            {/* Left Sidebar Items */}
            <div className="py-2 space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
                Explore
              </p>
              <button
                type="button"
                onClick={() => {
                  navigate("/newsfeed");
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors text-left"
              >
                <Sparkles size={20} />
                <span>My Posts</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  navigate("/newsfeed");
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors text-left"
              >
                <Globe size={20} />
                <span>Community</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  navigate("/newsfeed");
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors text-left"
              >
                <Bookmark size={20} />
                <span>Saved</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}