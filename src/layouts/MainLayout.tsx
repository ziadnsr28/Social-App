import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import SuggestionSidebar from "../components/SuggestionSidebar/SuggestionSidebar";
import Sidebar from "../components/Sidebar/Sidebar";
import AddPost from "../components/AddNewPost/AddPost";

export default function MainLayout() {
  return (
    <>
      <Navbar />

      <div className="w-full">
        <div className="mx-auto grid h-full w-full max-w-7xl grid-cols-1 lg:grid-cols-12 gap-6 items-start px-4 sm:px-6 lg:px-8 py-6">

          {/* Left Sidebar */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-[5.5rem]">
              <Sidebar />
            </div>
          </div>

          {/* Main Posts */}
          <main className="col-span-1 lg:col-span-6 w-full">
            <AddPost />
            <Outlet />
          </main>

          {/* Right Sidebar */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-[5.5rem]">
              <SuggestionSidebar />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}