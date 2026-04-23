import api from './api.ts'
import type { UpdateStatusRequest, CreateCategoryRequest, UpdateCategoryRequest} from '@/types/Request.ts'
import type { UpdateCategoryResponse, GetCategoriesResponse, CreateCategoryResponse, DeleteCategoryResponse } from '@/types/Response.ts'

export const getCategories = async():Promise<GetCategoriesResponse> =>{
    const res = await api.get<GetCategoriesResponse>('/categories')

    return res.data;
}

export const createCategory = async(data: CreateCategoryRequest):Promise<CreateCategoryResponse> =>{
    const res = await api.post<CreateCategoryResponse>('/categories',data)

    return res.data;
}

export const updateCategory = async(id:string, data: UpdateCategoryRequest):Promise<UpdateCategoryResponse> =>{
    const res = await api.put<UpdateCategoryResponse>(`/categories/${id}`,data)

    return res.data;
}

export const updateCategoryStatus = async(id:string, data: UpdateStatusRequest):Promise<UpdateCategoryResponse> =>{
    const res = await api.put<UpdateCategoryResponse>(`/categories/${id}/status`,data)

    return res.data;
}

export const deleteCategory = async(id:string):Promise<DeleteCategoryResponse> =>{
    const res = await api.delete<DeleteCategoryResponse>(`/categories/${id}`)

    return res.data;
}