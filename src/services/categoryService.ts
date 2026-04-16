import api from './api.ts'
import type { GetCategoriesResponse } from '@/types/Response.ts'

export const getCategories = async():Promise<GetCategoriesResponse> =>{
    const res = await api.get<GetCategoriesResponse>('/categories')

    return res.data;
}