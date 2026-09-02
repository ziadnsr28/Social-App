import axios from "axios";
const base = import.meta.env.VITE_BASE_URL;
export async function getPostComments(postId: string) {
    const userToken = localStorage.getItem("userToken");
    const postData = await axios.get(`${base}/posts/${postId}/comments?page=1&limit=10`, {
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
    });
    return postData;
}
export async function createComments(postId: string, formdata: FormData) {
    const userToken = localStorage.getItem("userToken");
    const postComment = await axios.post(`${base}/posts/${postId}/comments`, formdata, {
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
    });

    return postComment;
}
export async function deleteComments(postId:string, commentId: string) {
    const userToken = localStorage.getItem("userToken");
    const deleteComment = await axios.delete(`${base}/posts/${[postId]}/comments/${commentId}`,
        {
            headers: {
                Authorization: `Bearer ${userToken}`,
                token: userToken || "",
            },
        }
    );

    return deleteComment;
}

export async function editComments(commentId: string, postId: string,formdata: FormData) {
    const userToken = localStorage.getItem("userToken");
    const updateComment = await axios.put(`${base}/posts/${postId}/comments/${commentId}`,  formdata ,
        {
            headers: {
                Authorization: `Bearer ${userToken}`,
                token: userToken || "",
            },
        }
    );

    return updateComment;
}