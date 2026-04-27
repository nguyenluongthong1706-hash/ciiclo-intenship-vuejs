import api from './api.ts'
import type { GetUserResponse, GetUsersResponse, UpdateUserResponse, GetPostsResponse } from '@/types/Response.ts'
import type {UpdateAccountRequest, UpdateUserRequest, UpdateStatusRequest} from '@/types/Request.ts'

export const getAllUser = async():Promise<GetUsersResponse> =>{
    const res = await api.get<GetUsersResponse>('/users')
    return res.data;
}

export const updateUser = async(id:string, data:UpdateUserRequest):Promise<UpdateUserResponse> =>{
    const res = await api.put<UpdateUserResponse>(`/users/${id}`,data)
    return res.data;
}

export const updateUserStatus = async(id:string, data:UpdateStatusRequest):Promise<UpdateUserResponse> =>{
    const res = await api.put<UpdateUserResponse>(`/users/${id}/status`,data)
    return res.data;
}

export const getAccount = async():Promise<GetUserResponse> =>{
    const res = await api.get<GetUserResponse>('/users/me')
    return res.data;
}

export const getPostByAccount = async():Promise<GetPostsResponse> =>{
    const res = await api.get<GetPostsResponse>('/users/posts')
    return res.data;
}

export const updateAccount = async(data:UpdateAccountRequest):Promise<UpdateUserResponse> =>{
    const res = await api.put<UpdateUserResponse>('/users/me',data)
    return res.data;
}

export const uploadAvatar = async (file: File) => {
    const formData = new FormData()
    formData.append('avatar', file)

    const res = await api.put('/users/avatar', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })

    return res.data
}
