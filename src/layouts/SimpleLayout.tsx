// src/layouts/SimpleLayout.tsx
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

export default function SimpleLayout() {
    return (
        <div className="min-h-screen bg-slate-100">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 pt-4">
                <Outlet />
            </div>
        </div>
    );
}