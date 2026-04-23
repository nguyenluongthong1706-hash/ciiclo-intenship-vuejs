<script setup lang="ts"> 
import { onMounted, ref } from 'vue';
import { useToast } from 'vue-toastification';
import type { Post } from '@/types/Object';
import { getPosts, updatePostStatus } from '@/services/postService';
import PostItem from '@/components/Post.vue'
import {handleReact,handleDeactivate} from '../composables/handleReaction'
import type { ReactionType } from '@/types/Object';

const posts = ref<Post[] | []>([])
const isShow = ref<boolean>(false)
const postTemplate = ref<Post>({id:'', title: '', content:'', is_active:true,category:{id:'',name:''}, author:{id:'',name:''}, updated_at:'', created_at:'', reaction_count:'',my_reaction:''})
const selectedPost = ref<Post>({...postTemplate.value})

const toast = useToast()

const handleView = (id:string)=>{
    const found = posts.value.find(p => p.id === id)

    if (!found) {
        toast.error('Post not found')
        return
    }

    selectedPost.value = { ...found }
    isShow.value = true
}

const handleActiveSubmit = async (id:string)=>{
    try {
        const selectedPostId = posts.value.findIndex(p => p.id === id)
        if(selectedPostId  == -1) return
        const post = posts.value[selectedPostId]

        if(!post) return

        const newStatus = !post.is_active

        const res = await updatePostStatus(id, {'is_active' : newStatus })

        post.is_active = newStatus

        toast.success(res.message)
    } catch (error:any) {
        toast.error(error.response?.data?.message)
    }
}

const handleReactWrapper = async ( {id, type}:{id:string, type:ReactionType} )=>{
    await handleReact({id,type})

    const resPost = await getPosts()

    posts.value = resPost.data ?? []
}

const handleDeactivateWrapper = async ( id:string )=>{
    await handleDeactivate(id)

    const resPost = await getPosts()

    posts.value = resPost.data ?? []
}
onMounted(async()=>{
    try {
        const res = await getPosts()

        posts.value = res.data || []
    } catch (error:any) {
        toast.error(error.response?.data?.message)
    }  
})
</script>
<template>
    <div class="container">
        <h1>Post Management</h1>
        <div class="box-container">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Last update</th>
                        <th>Active</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="post in posts">
                        <td>{{ post.id }}</td>
                        <td>{{ post.title }}</td>
                        <td>{{ post.author.name }}</td>
                        <td>{{ post.updated_at }}</td>
                        <td>
                            <button 
                                class="btn" 
                                :class="{'active': !post.is_active, 'block': post.is_active}"
                                @click="handleActiveSubmit(post.id)"
                            >
                                {{post.is_active? "Block" : "Active"}}
                            </button>
                        </td>
                        <td>
                            <div class="actions">
                                <button @click="handleView(post.id)">View</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-if="isShow" class="modal-overlay" @click.self="isShow = false">
            <PostItem 
                v-if="selectedPost?.id"
                :post="selectedPost"
                :is-reaction="true"
                :is-admin = "true"
                @react="handleReactWrapper"
                @deactivate="handleDeactivateWrapper"
            ></PostItem>
        </div>
    </div>
</template>
<style scoped>
.container{
    display: block;
    width: 100%;
    padding: 20px;
}
.box-container{
    padding: 20px 0;
}
table {
    width: 100%;
    border-collapse:collapse;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    border-radius: 8px;
    overflow: hidden;
}
th, td {
    padding: 12px 15px;
    text-align: center;
    border-bottom: 1px solid #ddd;
}
th {
    background-color: #f4f4f4;
    font-weight: bold;
}
.avatar{
    width: 80px;
}
.btn{
    padding: 6px 20px;
    border-radius:6px;
    border:none;
}
.btn:hover{
    background-color: #ddd;
    color:black;
}
.active{
    background-color: green;
    color: white;
}
.block{
    background-color: red;
    color: white;
}
.actions{
    display: flex;
    justify-content: space-around;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>