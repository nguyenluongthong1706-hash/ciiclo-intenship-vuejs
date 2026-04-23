<script setup lang="ts">
import logo from '../assets/logo.svg'
</script>
<template>
    <header>
        <div class="left">
            <div class="logo">
                <img :src="logo">
            </div>
            <p>Demo Admin</p>
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
</style>