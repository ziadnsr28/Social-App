import { createContext, type Dispatch, type SetStateAction } from "react";
export type AuthContextType = {
    Token: string | null;
    setToken: Dispatch<SetStateAction<string | null>>;
};
export const authContext = createContext<AuthContextType | null>(null);
