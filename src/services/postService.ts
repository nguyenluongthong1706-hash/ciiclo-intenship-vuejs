import api from './api.ts'
import type { CreatePostResponse, UpdatePostResponse, DeletePostResponse, GetPostsResponse, MakeReactionResponse, RemoveReactionResponse } from '@/types/Response.ts'
import type {SubmitPostRequest, UpdatePostRequest, MakeReactionRequest} from '@/types/Request.ts'

export const getPosts = async():Promise<GetPostsResponse> =>{
    const res = await api.get<GetPostsResponse>('/posts')
    
    return res.data;
}

export const createPost = async(data:SubmitPostRequest):Promise<CreatePostResponse> =>{
    const res = await api.post<CreatePostResponse>('/posts',data)

    return res.data;
}

export const updatePost = async(id:string, data: UpdatePostRequest):Promise<UpdatePostResponse> =>{
    const res = await api.put<UpdatePostResponse>(`/posts/${id}`,data)

    return res.data;
}

export const deletePost = async(id:string):Promise<DeletePostResponse> =>{
    const res = await api.delete<DeletePostResponse>(`/posts/${id}`)
    
    return res.data;
}

export const makeReaction = async(id:string, data:MakeReactionRequest)=>{
    const res = await api.post(`posts/${id}/reactions`,data)

    return res.data
}

export const removeReaction = async (id:string)=>{
    const res = await api.delete(`posts/${id}/reactions`)

    return res.data
}
