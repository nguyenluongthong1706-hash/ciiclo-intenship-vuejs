import type { LoginRequest, RegisterRequest } from "@/types/Request";
import type { LoginResponse, RegisterResponse } from "@/types/Response";

import api from './api.ts';

export const register = async (data:RegisterRequest):Promise<RegisterResponse> =>{
    const res = await api.post<RegisterResponse>('auth/register', data);
    return res.data;
}

export const login = async (data:LoginRequest):Promise<LoginResponse>  => {
    const res = await api.post<LoginResponse>('auth/login', data);
    return res.data;
}

export const logout = async ()=>{
    const res = await api.post('auth/logout');
    return res.data;
}
