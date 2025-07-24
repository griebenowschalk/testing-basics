import type { Comment } from "./ModelTDD";

export async function getCommentsForPost(id: string): Promise<Comment[]> {
    console.log(`getting comments for post ${id}`)
    const comments: Comment[] = []
    return comments;
}

export async function postComment(id: string, comment: string, date:number) {
    console.log(`posted comment for post ${id} at ${date}: ${comment}`)
}