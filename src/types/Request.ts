import type {ReactionType} from './Object'

export interface RegisterRequest{
    name : string,
    email: string,
    password: string,
    password_confirmation: string
}

export interface LoginRequest {
    email: string,
    password: string
}

export interface UpdateAccountRequest {
    name ?: string,
    avatar ?: string
}

export interface UpdateUserRequest {
    name ?: string,
    avatar ?: string,
    is_active ?: boolean
}

export interface SubmitPostRequest {
    title : string,
    content : string,
    category_id : string
}

export interface UpdatePostRequest {
    title : string,
    content : string,
    category_id : string
}

export interface MakeReactionRequest {
    type : ReactionType
}

export interface UpdateStatusRequest {
    is_active : boolean
}

export interface CreateCategoryRequest {
    name : string
}

export interface UpdateCategoryRequest {
    name : string
}