import axios from "axios";
const base = import.meta.env.VITE_BASE_URL;
export async function getSinglepost(postId:string) {
    const userToken = localStorage.getItem("userToken");
  
    
    const postData = await axios.get(`${base}/posts/${postId}`, {
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
    });

    return postData;
}
export async function createPost( formdata: FormData) {
    const userToken = localStorage.getItem("userToken");
    const addpost = await axios.post(`${base}/posts/`, formdata, {
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
    });
    return addpost;
}

export async function updatePost( formdata: FormData ,id:string) {
    const userToken = localStorage.getItem("userToken");
    const updatepost = await axios.put(`${base}/posts/${id}`, formdata, {
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
    });
    return updatepost;
}
export async function DeletePost(id:string) {
    const userToken = localStorage.getItem("userToken");
    const Deletepost = await axios.delete(`${base}/posts/${id}`, {
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
    });
    return Deletepost;
}
export async function likecount(id: string) {
    const userToken = localStorage.getItem("userToken");
    const updatepost = await axios.put(`${base}/posts/${id}/like`, {}, {
        headers: { Authorization: `Bearer ${userToken}` },
    });
    return updatepost;
}