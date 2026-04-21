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

export interface GetAccountResponse {
    message: string,
    data ?: User
}

export interface UpdateAccountResponse {
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

export interface MakeReactionResponse {
    message: string
}

export interface RemoveReactionResponse {
    message: string
}