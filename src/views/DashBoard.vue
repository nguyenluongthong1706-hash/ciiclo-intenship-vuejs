<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getAllUser } from '@/services/userService';
import { getPosts } from '@/services/postService';
import { getCategories } from '@/services/categoryService';
import { useToast } from 'vue-toastification';

interface navType {
    name: string,
    count: number,
    path: string
}

const navItems = ref<navType[]>([
    {name: 'User',count:0,path:'/admin/user'},
    {name: 'Post',count:0,path:'/admin/post'},
    {name: 'Category',count:0,path:'/admin/category'},
])

const setCount = (name: string, count: number) => {
    const item = navItems.value.find(i => i.name === name)
    if (item) item.count = count
}

const router = useRouter()
const toast = useToast()

onMounted(async () => {
    try {
        const [userRes, postRes, categoryRes] = await Promise.all([
            getAllUser(),
            getPosts(),
            getCategories()
        ])

        setCount('User', userRes.data?.length || 0)
        setCount('Post', postRes.data?.length || 0)
        setCount('Category', categoryRes.data?.length || 0)

    } catch (error: any) {
        toast.error(error.response?.data?.message)
    }
})
</script>
<template>
    <div class="container">
        <h1>Dash board</h1>
        <div class="box-container">
            <h3>Items</h3>
            <div class="box">
                <button v-for="nav in navItems" class="box-item" @click="router.push(nav.path)">
                    <p class="item-name">{{nav.name}}</p>
                    <p class="item-count">{{nav.count}}</p>
                </button>
            </div>
        </div>
    </div>
</template>
<style scoped>
.container{
    display: block;
    padding: 20px;
}
.box-container{
    padding: 20px 0;
}
.box{
    display: flex;
    gap: 20px;
}
.box-item{
    display: block;
    width: 180px;
    padding: 5px 0px;
    background-color: inherit;
    border: none;
    border-radius: 20px;
    box-shadow: 2px 2px 10px;
}
.box-item:hover{
    background-color: rgb(217, 217, 217);
}
.item-name{
    text-align:center;
    font-size: 24px;
    font-weight: bolder;
    color: black;
}
.item-count{
    text-align: center;
    font-size: 18px;
    font-weight: bolder;
    color: orange;
}
</style>