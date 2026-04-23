import type {User, Post} from './Object'
import type { Category } from './Object'
export interface RegisterResponse{
    message : string
}

export interface LoginResponse {
    message: string,
    data ?: User,
    token ?: string
}

export interface GetUserResponse {
    message: string,
    data ?: User
}

export interface GetUsersResponse {
    message: string,
    data ?: User[]
}

export interface UpdateUserResponse {
    message: string
}

export interface GetPostsResponse {
    message: string,
    data ?: Post[]
}

export interface CreatePostResponse {
    message: string
}

export interface UpdatePostResponse {
    message: string
}

export interface DeletePostResponse {
    message: string
}

export interface GetCategoriesResponse {
    message: string,
    data ?: Category[]
}

export interface CreateCategoryResponse {
    message: string
}

export interface UpdateCategoryResponse {
    message: string
}

export interface DeleteCategoryResponse {
    message: string
}

export interface MakeReactionResponse {
    message: string
}

export interface RemoveReactionResponse {
    message: string
}