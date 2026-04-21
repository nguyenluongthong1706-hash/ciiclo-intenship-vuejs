<script setup lang="ts">
import { useAuthStore } from "@/stores/authStore";
import {useRouter, useRoute} from 'vue-router'
import logo from '../assets/logo.svg'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

</script>
<template>
    <header>
        <div class="left">
            <div class="logo">
                <img :src="logo">
            </div>
            <p>Demo</p>
            <div class="nav">
                <button class="button-nav" :class="{active : route.path === '/'}" @click="router.push('/')">Home</button>
                <button v-if="authStore?.user" class="button-nav" :class="{active : route.path === '/profile'}" @click="router.push('/profile')">Profile</button>
            </div>
        </div>
        <div class="user-info" v-if="authStore.user">
            <div class="avatar">
                <img :src="authStore?.user?.avatar">
            </div>
            <p>{{authStore?.user?.name}}</p>
        </div>
        <div v-else>
            <button class="button-nav" @click="router.push('/auth/login')">Login</button>
            <button class="button-nav" @click="router.push('/auth/register')">Register</button>
        </div>
    </header>
</template>
<style scoped>
header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: rgb(53, 53, 53);
    padding: 10px;
}
.left{
    display: flex;
    align-items: center;
    gap:20px
}
.left p{
    color: white;
    font-size: 21px;
    font-weight: bold;
}
.logo{
    width: 40px;
    height: 40px;
}
.logo img {
    width: 100%;
    height: 100%;
}
.nav{
    display: flex;
    gap:10px;
}
.user-info{
    display: flex;
    justify-content: center;
    align-items: center;
    gap:20px
}
.user-info p {
    color: white;
    font-size: 16px;
}
.avatar {
    width: 60px;
    height: 60px;
}
.avatar img{
    height: 100%;
    width: 100%;
}
.button-nav{
    background-color: inherit;
    border:none;
    color: rgb(211, 211, 211);
}
.button-nav:hover{
    color: white;
}
.active{
    color: white;
}
</style>