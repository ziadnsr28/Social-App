import React, { useState } from "react";
import { authContext } from "./AuthContext";

export default function AuthContextProvider({ children }: { children: React.ReactNode; }) {
    const [Token, setToken] = useState<string | null>(() => {
        const stored = localStorage.getItem("userToken");
        if (!stored || stored === "undefined" || stored === "null" || stored.trim() === "") {
            localStorage.removeItem("userToken");
            return null;
        }
        return stored.trim();
    });

    return (
        <authContext.Provider value={{ Token, setToken }}>
            {children}
        </authContext.Provider>
    );
}

