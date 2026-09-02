import axios from "axios";
const base = import.meta.env.VITE_BASE_URL;
export async function getpost() {
    const userToken = localStorage.getItem("userToken");
    const {data} = await axios.get(`${base}/posts`, {
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
    });

    return data;
}