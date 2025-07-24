import type { Comment } from "./Model";
import axios from "axios";

const APP_URL = 'http://localhost:4000'

export async function getCommentsForPostWithAxios(id: string): Promise<Comment[]> {

    const response = await axios.get<Comment[]>(`${APP_URL}/comments/` + id ,{
        params: {
            id: id
        }
    })
    return response.data
}

export async function getCommentsForPost(id: string): Promise<Comment[]> {
    console.log(`getting comments for post ${id}`)
    const comments: Comment[] = []
    comments.push({
        content: 'This is awesome!',
    })
    comments.push({
        content: 'Nice car!',
    })
    return comments;
}