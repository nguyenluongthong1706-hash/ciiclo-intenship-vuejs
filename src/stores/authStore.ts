import {defineStore} from 'pinia';
import {login, logout} from '../services/authService';
import type { LoginRequest } from '@/types/Request';
import type { User } from '@/types/Object';

export const useAuthStore = defineStore('auth',{
    state : ()=>({
        user: JSON.parse(localStorage.getItem('user') || 'null') as User | null,
        token: localStorage.getItem('token') as string | null
    }),

    actions : {
        async login(data: LoginRequest){
            try {
                const res = await login(data);

                this.user = res.user || null;
                this.token = res.token || null;

                if(this.token){
                    localStorage.setItem('token',this.token);
                }
                if(this.user){
                    localStorage.setItem('user',JSON.stringify(this.user));
                }

                return res;
            } catch (error) {
                console.log("error: ", error)
                throw error;
            }
        },
        async logout(){
            try {
                await logout();
            } catch (error) {
                console.log("error: ", error)
                throw error;
            } finally{
                this.user = null;
                this.token = null;
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            }
        }
    }
})