<script setup lang="ts">
import {ref, onMounted} from 'vue'
import { getAccount, updateAccount, getPostByAccount } from '@/services/userService'
import { createPost, updatePost, deletePost } from '@/services/postService'
import type { User, Post, ReactionType } from '@/types/Object'
import type { SubmitPostRequest } from '@/types/Request'
import { useToast } from 'vue-toastification'
import PostItem from '@/components/Post.vue'
import PostModal from '@/components/PostModal.vue'
import UpdateUserForm from '@/components/UpdateUserForm.vue'
import {handleReact,handleUnreact} from '../composables/hadleReaction'
import { useAuthStore} from '@/stores/authStore'
import { useRouter } from 'vue-router'

const user = ref<User | null>(null)
const posts = ref<Post[] | []>([])
const showModal = ref<boolean>(false)
const showUserModal = ref<boolean>(false)
const isEdit = ref<boolean>(false)
const selectedPost = ref<Post | null>(null)

const toast = useToast()
const authStore = useAuthStore()
const router = useRouter()

const handleLogout = async ()=>{
    try {
        const res = await authStore.logout()

        toast.success(res.message)
        router.push('/auth/login')
    } catch (error: any) {
        toast.error(error.responce?.data?.message)
    }
}
const handleSubmitUserModel = async(data:any)=>{
    if(!user.value) return
    try {
        const res = await updateAccount(data)

        user.value.name = data.name

        authStore.updateAuthStore(user.value)

        toast.success(res.message)
    } catch (error:any) {
        toast.error(error.responce?.data?.message)
    } finally{
        showUserModal.value = false
    }
}

const handleSubmitPostModel = async (data: SubmitPostRequest)=>{
    if(isEdit.value && selectedPost.value){
        await handleUpdatePost(data)
    }else{
        await handleCreatePost(data)
    }
    showModal.value = false
    selectedPost.value = null
}

const handleDeletePost = async (id: string) => {
    try {
        await deletePost(id)

        posts.value = posts.value.filter(p => p.id !== id)

        toast.success('Delete success')
    } catch (error:any) {
        toast.error(error.response?.data?.message)
    }
}

const handleUpdatePost = async (data:SubmitPostRequest) => {
    if (!selectedPost.value) return
    selectedPost.value.title = data.title
    selectedPost.value.content = data.content
    selectedPost.value.category.id = data.category_id

    try {
        const res = await updatePost(
            selectedPost.value.id, 
            {
                title: selectedPost.value.title, 
                content: selectedPost.value.content, 
                category_id: selectedPost.value.category.id
            }
        )

        const index = posts.value.findIndex(p => p.id === selectedPost.value!.id)

        if (index !== -1) {
            posts.value[index] = selectedPost.value
        }

        toast.success(res.message)
        selectedPost.value = null
    } catch (error:any) {
        toast.error(error.response?.data?.message)
    }
}

const handleCreatePost = async (data:SubmitPostRequest) => {
    try {
        const res = await createPost(data)

        const postRes = await getPostByAccount()
        posts.value = postRes.posts ?? []

        toast.success(res.message)
    } catch (error:any) {
        toast.error(error.response?.data?.message)
    }
}

const openCreate = () => {
  isEdit.value = false
  selectedPost.value = null
  showModal.value = true
}

const openEdit = (post: Post) => {
  isEdit.value = true
  selectedPost.value = post
  showModal.value = true
}

const handleReactWrapper = async ( {id, type}:{id:string, type:ReactionType} )=>{
    await handleReact({id,type})

    const resPost = await getPostByAccount()

    posts.value = resPost.posts ?? []
}

const handleUnreactWrapper = async ( id:string )=>{
    await handleUnreact(id)

    const resPost = await getPostByAccount()

    posts.value = resPost.posts ?? []
}

onMounted( async()=>{
    try {
        const res = await getAccount()
        user.value = res.user ?? null
        toast.success(res.message)
    } catch (error:any) {
        toast.error(error.response?.data?.message)
    }
    if(user.value){
        try {
            const res = await getPostByAccount()
            posts.value = res.posts ?? []
            toast.success(res.message)
        } catch (error:any) {
            toast.error(error.response?.data?.message)
        }
    }
})
</script>
<template>
    <div class="container">
        <div class="main">
            <div class="box-info">
                <div class="box-info-left">
                    <div class="avatar">
                        <img :src="user?.avatar">
                    </div>
                    <div class="info">
                        <p>Name: {{ user?.name }}</p>
                        <p>Email: {{ user?.email }}</p>
                    </div>
                </div>
                <div class="action">
                    <button @click="showUserModal = true">Update profile</button>
                    <button @click="openCreate">Create new post</button>
                    <button @click="handleLogout">Log out</button>
                </div>
            </div>
            <div class="box-post">
                <h1>Your posts</h1>
                <div v-if="posts.length === 0">
                    <h3>You don't have any posts</h3>
                </div>
                <PostItem 
                    v-else 
                    v-for="post in posts" 
                    :post="post" 
                    :key="post.id" 
                    :is-action="true"
                    @delete="handleDeletePost"
                    @edit="openEdit"
                    :is-reaction="true"
                    @react="handleReactWrapper"
                    @unreact="handleUnreactWrapper"
                    
                ></PostItem>
            </div>
        </div>
        <PostModal
            :show="showModal"
            :post="selectedPost"
            :isEdit="isEdit"
            @close="showModal = false"
            @submit="handleSubmitPostModel"
        />
        <UpdateUserForm
            :show="showUserModal"
            :user="user"
            @close="showUserModal = false"
            @submit="handleSubmitUserModel"
        />
    </div>
</template >
<style scoped>
.container{
    display:fex;
    justify-items: center;
}
.main{
    width: 80%;
}
.box-info{
    display: flex;
    padding: 10px;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);;
}
.box-post{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);;
}
.box-info-left{
    display: flex;
    gap: 20px;
    align-items:center;
}
.avatar{
    width: 160px;
    height: 160px;
}
.avatar img{
    height: 100%;
    width: 100%;
}
.action{
    display: flex;
    flex-direction: column;
    gap:20px
}
</style>