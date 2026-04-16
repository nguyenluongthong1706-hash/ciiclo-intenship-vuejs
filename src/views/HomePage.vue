<script setup lang="ts">
import {ref, onMounted} from 'vue'
import { getPosts, makeReaction, removeReaction} from '@/services/postService'
import type { Post } from '@/types/Object'
import type { MakeReactionRequest } from '@/types/Request'
import type { ReactionType } from '@/types/Object'
import { useToast } from 'vue-toastification'
import PostItem from '@/components/Post.vue'
import {handleReact,handleUnreact} from '../composables/hadleReaction'

const posts = ref<Post[] | []>([])

const toast = useToast()

const handleReactWrapper = async ( {id, type}:{id:string, type:ReactionType} )=>{
    await handleReact({id,type})

    const resPost = await getPosts()

    posts.value = resPost.posts ?? []
}

const handleUnreactWrapper = async ( id:string )=>{
    await handleUnreact(id)

    const resPost = await getPosts()

    posts.value = resPost.posts ?? []
}

onMounted( async()=>{
    try {
        const res = await getPosts()

        posts.value = res.posts ?? []
        toast.success(res.message)
    } catch (error:any) {
        toast.error(error.response?.data?.message)
    }
})
</script>
<template>
    <div class="container">
        <div class="main">
            <div class="box-post">
                <h1>Posts</h1>
                <div v-if="posts.length === 0">
                    <h3>Post isn't exists</h3>
                </div>
                <PostItem 
                    v-else 
                    v-for="post in posts" 
                    :post="post" 
                    :key="post.id" 
                    :is-reaction="true"
                    @react="handleReactWrapper"
                    @unreact="handleUnreactWrapper"
                ></PostItem>
            </div>
        </div>
    </div>
</template>
<style scoped>
.container{
    display:fex;
    justify-items: center;
}
.main{
    width: 80%;
}
.box-post{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);;
}
</style>