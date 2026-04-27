<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter()
</script>
<template>
    <div class="container">
        <h1 class="title">404</h1>
        <button class="btn-nav" @click="router.push('./')">Home</button>
    </div>
</template>
<style scoped>
.container{
    display: flex;
    width: 100%;
    height: 100vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.title{
    font-size: 180px;
    font-weight: 900;
    color: red;
    margin:10px;
}
.btn-nav{
    font-size: 16px;
    color: blue;
    background-color: inherit;
    border: none;
}
</style>