
import React, { createContext, useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { UserProfileI } from "../../types/profile";
import { getMyprofile } from "../../Services/Profileservices";


type UserProfileContextType = {
    userData: UserProfileI | null;
    setUserData: Dispatch<SetStateAction<UserProfileI | null>>;
};

export const UserContext = createContext<UserProfileContextType | undefined>(undefined);

export default function UserContextProvider({ children }: { children: React.ReactNode }) {

    const [userData, setUserData] = useState<UserProfileI | null>(null);
    useEffect(() => {
        async function profile() {
            try {
                const { data } = await getMyprofile();
                console.log(data);
                const user = data.data.user;
                setUserData(user);
            } catch (error) {
                console.error("Failed to fetch profile:", error);
            }
        }

        profile();
    }, [])

    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserContext.Provider>
    );
}
