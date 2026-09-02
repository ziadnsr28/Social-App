import axios from "axios";
import { useState } from "react";
import { Key } from "lucide-react";
import { toast } from "react-hot-toast";
import { changePassword } from "../../Services/auth.services";

export default function ChangePassword() {
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!password || !newPassword || !confirmPassword) {
            toast.error("Please fill in all fields");
            return;
        }
        if (newPassword !== confirmPassword) {
            toast.error("New passwords do not match");
            return;
        }
        const token = localStorage.getItem("userToken");
        if (!token) {
            toast.error("You must be logged in to change your password");
            return;
        }
        setIsLoading(true);
        try {
            await changePassword(password, newPassword);
            toast.success("Password updated successfully");
            setPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error) {
            console.log(error);
            if (axios.isAxiosError(error)) {
                const errorMsg = error.response?.data?.message || "Failed to update password";
                toast.error(errorMsg);
            } else if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Failed to update password");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full flex items-center justify-center py-6 sm:py-10 px-4">
            <div className="w-full max-w-xl rounded-3xl border border-slate-100 bg-white p-6 sm:p-10 shadow-sm">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                        <Key className="w-6 h-6 stroke-[2.2] -rotate-45" />
                    </div>
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                            Change Password
                        </h1>
                        <p className="text-sm text-slate-500 mt-0.5">
                            Keep your account secure by using a strong password.
                        </p>
                    </div>
                </div>

                {/* Form */}
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-bold text-slate-800 mb-2">
                            Current password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter current password"
                            className="w-full bg-[#f8fafc] border border-slate-200/90 rounded-2xl px-4 py-3.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 focus:bg-white transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-800 mb-2">
                            New password
                        </label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter new password"
                            className="w-full bg-[#f8fafc] border border-slate-200/90 rounded-2xl px-4 py-3.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 focus:bg-white transition-all"
                        />
                        <p className="text-xs text-slate-400 mt-2">
                            At least 8 characters with uppercase, lowercase, number, and special character.
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-800 mb-2">
                            Confirm new password
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Re-enter new password"
                            className="w-full bg-[#f8fafc] border border-slate-200/90 rounded-2xl px-4 py-3.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 focus:bg-white transition-all"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-[#5B96F7] hover:bg-blue-600 active:bg-blue-700 text-white font-semibold py-3.5 rounded-2xl shadow-xs transition-colors cursor-pointer mt-2 disabled:opacity-60"
                    >
                        {isLoading ? "Updating password..." : "Update password"}
                    </button>
                </form>
            </div>
        </div>
    );
}
