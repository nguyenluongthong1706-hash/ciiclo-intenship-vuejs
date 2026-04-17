import api from './api.ts'
import type { GetAccountResponse, UpdateAccountResponse, GetPostsResponse } from '@/types/Response.ts'
import type {UpdateAccountRequest} from '@/types/Request.ts'

export const getAccount = async():Promise<GetAccountResponse> =>{
    const res = await api.get<GetAccountResponse>('/users/me')
    return res.data;
}

export const getPostByAccount = async():Promise<GetPostsResponse> =>{
    const res = await api.get<GetPostsResponse>('/users/posts')
    return res.data;
}

export const updateAccount = async(data:UpdateAccountRequest):Promise<UpdateAccountResponse> =>{
    const res = await api.put<UpdateAccountResponse>('/users/me',data)
    return res.data;
}
