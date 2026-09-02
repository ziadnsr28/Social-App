import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import type { PostCardI } from "../../types/PostCard";
import PostCard from "../../components/Post/PostCard";
import { UserContext } from "../../components/Context/Usercontext";
import { getpost } from "../../Services/newsfeed.services";

export default function MyPosts() {
    const { userData } = useContext(UserContext)!;

    const { data: allPosts, isLoading } = useQuery({
        queryKey: ["getpost"],
        queryFn: getpost,
        select: (data) => data.data.posts as PostCardI[]
    });
    const myPosts = allPosts?.filter((post) => post.user._id === userData?._id);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!myPosts || myPosts.length === 0) {
        return (<div className="bg-white rounded-2xl shadow-sm p-10 flex items-center justify-center">
            <p className="text-gray-400 text-sm">
                No posts yet. Be the first one to publish.
            </p>
        </div>);
    }
    return (
        <>
            <div>
                {myPosts.map((singlePost) => (<PostCard key={singlePost._id} post={singlePost} />
                ))}
            </div>
        </>
    );
}

