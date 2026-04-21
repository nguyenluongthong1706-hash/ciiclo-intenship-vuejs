<script setup lang="ts">
import { ref } from 'vue'
import type { Post, ReactionType } from '@/types/Object'

const {post, isAction = false, isReaction = false} = defineProps<{
  post : Post,
  isAction ?: boolean
  isReaction ?: boolean
}>()

const emit = defineEmits<{
  (e: 'delete', id: string): void
  (e: 'edit', post: Post): void
  (e: 'react', payload: { id: string, type: ReactionType }): void
  (e: 'unreact', id: string): void
}>()

const expanded = ref<boolean>(false)


const tongLeReadmore = ()=>{
    expanded.value = !expanded.value
}

const handleReact = (type: ReactionType) => {
  emit('react', { id: post.id, type })
}

const handleRemoveReaction = () => {
  emit('unreact', post.id)
}
</script>

<template>
  <div class="card">
        
        <h2 class="card-title">{{ post.title }}</h2>

        <p class="card-content" :class="{expanded : expanded}">
          {{ post.content }}
        </p>

        <div class="meta">
          <span><b>Category: </b>{{ post.category.name }}</span>
          <span><b>Author: </b>{{ post.author.name }}</span>
        </div>

        <div class="date">
          <span>The lastes update: {{ post.updated_at }}</span>
        </div>

        <button @click="tongLeReadmore" class="btn">{{ expanded ? 'Show less' : 'Read more' }}</button>

        <div v-if="isAction" class="action">
            <button @click="emit('edit', post)">🖊</button>
            <button @click="emit('delete', post.id)">🗑</button>
        </div>
        <div v-if="isReaction" class="reaction">
          <button @click="handleReact('like' as ReactionType)">
            👍 {{ post.reaction_count.like }}
          </button>

          <button @click="handleReact('dislike' as ReactionType)">
            👎 {{ post.reaction_count.dislike }}
          </button>

          <button @click="handleReact('love' as ReactionType)">
            ❤️ {{ post.reaction_count.love }}
          </button>

          <button @click="handleReact('angry' as ReactionType)">
            😡 {{ post.reaction_count.angry }}
          </button>

          <button v-if="post.my_reaction" @click="handleRemoveReaction">
            ❌
          </button>
        </div>

    </div>
</template>

<style scoped>

.card {
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: 0.3s;
  display: flex;
  flex-direction: column;
  width: 700px;
  margin-bottom: 20px;
  position: relative;
}

.card:hover {
  box-shadow: 0 6px 18px rgba(0,0,0,0.12);
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
}


.card-content {
  font-size: 14px;
  color: #555;
  margin-bottom: 12px;
  word-break: break-word;
  overflow-wrap: break-word; 

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.card-content.expanded {
  display: block;
  -webkit-line-clamp: unset;
  overflow: visible;
}
.meta {
  font-size: 13px;
  color: #777;
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
}

.date {
  font-size: 12px;
  color: #aaa;
  margin-bottom: 12px;
}

.btn {
  margin-top: auto;
  padding: 8px;
  border: none;
  border-radius: 8px;
  background: #3498db;
  color: white;
  cursor: pointer;
  transition: 0.3s;
}

.btn:hover {
  background: #2980b9;
}
.action {
    position: absolute;
    display: flex;
    right: 10px;
    gap:10px
}
.reaction{
  display: flex;
  gap:10px;
  margin-top: 20px
}
</style>