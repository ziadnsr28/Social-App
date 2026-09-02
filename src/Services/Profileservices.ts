import axios from "axios";
const base = import.meta.env.VITE_BASE_URL;
export async function getMyprofile() {
    const userToken = localStorage.getItem("userToken");
    const postData = await axios.get(`${base}/users/profile-data`, {
        headers: {
            Authorization: `Bearer ${userToken}`,
            token: userToken || "",
        },
    });
    return postData;
}