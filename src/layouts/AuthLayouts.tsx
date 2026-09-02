import { Outlet } from "react-router-dom";
import AuthComponent from "../components/AuthComponent/AuthComponent";

export default function AuthLayouts() {
  return (
    <main className="min-h-screen bg-[#F8F9FF] px-4 sm:px-6 lg:px-8 py-8 lg:py-0 flex items-center justify-center">
      <div className="mx-auto grid h-full w-full max-w-7xl grid-cols-1 lg:grid-cols-5 items-center gap-8 lg:gap-10">
        <div className="col-span-1 lg:col-span-3 order-2 lg:order-1 flex justify-center lg:justify-start">
          <AuthComponent />
        </div>
        <div className="col-span-1 lg:col-span-2 order-1 lg:order-2 flex justify-center items-center">
          <Outlet />
        </div>
      </div>
    </main>
  );
}