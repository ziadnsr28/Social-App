import type { loginSchemaType, RegisterSchemaType } from "../lib/schema/auth.schema";
import axios from "axios";
const base = import.meta.env.VITE_BASE_URL
export async function registerUser(fromdata: RegisterSchemaType) {
    const postData = await axios.post(`${base}/users/signup`, fromdata);
    return postData;
}
export async function loginUser(fromdata: loginSchemaType) {
    const postData = await axios.post(`${base}/users/signin`, fromdata)
    return postData;
}

export async function changePassword(password: string, newPassword: string) {
    let userToken = localStorage.getItem("userToken");

    const postData = await axios.patch(
        `${base}/users/change-password`,   {
            password,
            newPassword,
        },
        {
            headers: {
                Authorization: `Bearer ${userToken}`,
                token: userToken,
            },
        }
    );
    return postData;
}