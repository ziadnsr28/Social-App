
import React, { createContext, useContext, useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { UserProfileI } from "../../types/profile";
import { getMyprofile } from "../../Services/Profileservices";
import { authContext } from "./AuthContext";

type UserProfileContextType = {
    userData: UserProfileI | null;
    setUserData: Dispatch<SetStateAction<UserProfileI | null>>;
};

export const UserContext = createContext<UserProfileContextType | undefined>(undefined);

export default function UserContextProvider({ children }: { children: React.ReactNode }) {
    const [userData, setUserData] = useState<UserProfileI | null>(null);
    const { Token } = useContext(authContext)!;

    useEffect(() => {
        async function profile() {
            if (!Token) {
                setUserData(null);
                return;
            }

            try {
                const { data } = await getMyprofile();
                const user = data?.user || data?.data?.user;
                if (user) {
                    setUserData(user);
                }
            } catch (error) {
                console.error("Failed to fetch profile:", error);
            }
        }

        profile();
    }, [Token]);

    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserContext.Provider>
    );
}
