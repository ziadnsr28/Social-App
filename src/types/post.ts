import type { PostCardI } from "./PostCard"

export interface PostI {
    data: PostCardI[],
    message: string,
    success: boolean,
    meta: {
        pagination: {
            currentPage: number,
            limit: number,
            nextPage: number,
            numberOfPages: number,
            total: number
        }
    }
}