<script setup lang="ts">
import {ref, onMounted} from 'vue'
import { useAuthStore } from '@/stores/authStore'
import {useToast} from 'vue-toastification'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const errors = ref<any>({})

const useAuth = useAuthStore()
const toast = useToast()
const router = useRouter()

const handleLogin = async ()=>{
    try{
        errors.value = {}
        
        const res = await useAuth.login({
            email: email.value,
            password: password.value
        })

        router.push('/')
        toast.success(res.message)
    }catch (error:any) {
        console.log(error)
        if (error.response?.data?.errors) {
            errors.value = error.response.data.errors
        }

        const msg = error.response?.data?.message
        toast.error(msg)
    }
}
</script>

<template>
    <div>
       <form @submit.prevent="handleLogin" class="form-login">
            <div>
                <button @click="router.push('/')" class="btn-nav">home</button>
            </div>
            <h1 :style="{textAlign:'center', paddingBottom: '50px', paddingTop: '0px', marginTop:'5px'}">Access your account in the system</h1>
            
            <p v-if="errors.email" class="error">
                {{errors.email[0]}}
            </p>
            <input class="input-login" v-model="email" placeholder="Enter your email">

            <p v-if="errors.password" class="error">
                {{errors.password[0]}}
            </p>
            <input class="input-login" v-model="password" placeholder="Enter your password">

            <div :style="{textAlign:'center'}">
                <button type="submit" class="btn-login">Log in </button>
            </div>
            <span>You don't have an account! <button @click="router.push('/auth/register')" class="btn-nav">Sign up</button></span>
       </form>
    </div>
</template>

<style scoped>
.form-login{
    display: flex;
    flex-direction: column;
    width: 600px;
    padding: 10px 30px;
    border: none;
    border-radius: 20px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    background-color: white;
}
.input-login{
    width:100%;
    font-size: 14px;
    margin-bottom: 40px;
    padding:20px;
    border-radius: 10px;
    box-sizing: border-box;
}
.btn-login{
    display: inline-block;
    padding: 15px 50px;
    margin: 20px;
    border: 3px solid rgb(55, 109, 1);
    border-radius: 10px;
    background-color: rgb(95, 191, 0);
    color:white;
}
.error {
    font-size: 12px;
    color:red;
}
.btn-nav{
    display:inline-block;
    background-color:inherit;
    border:none;
    color:rgb(40, 40, 255)
}
</style>