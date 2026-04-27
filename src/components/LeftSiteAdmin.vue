<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useAuthStore } from '@/stores/authStore';

const navs =  ref([
    {name: 'Dashboard', path: '/admin/dashboard'},
    {name: 'User Management', path: '/admin/user'},
    {name: 'Post Management', path: '/admin/post'},
    {name: 'Category Management', path: '/admin/category'},
])

const router = useRouter()
const route = useRoute()
const toast = useToast()
const authStore = useAuthStore()

const handleLogout = async ()=>{
    try {
        const res = await authStore.logout()

        toast.success(res.message)
        router.push('/auth/login')
    } catch (error: any) {
        toast.error(error.response?.data?.message)
    }
}
</script>
<template>
  <div class="sidebar">
    <div 
      v-for="nav in navs" 
      :key="nav.path"
      class="nav-item"
      :class="{ active: route.path === nav.path }"
      @click="router.push( nav.path)"
    >
      {{ nav.name }}
    </div>
    <div class="actions">
      <button @click="handleLogout">Log out</button>
    </div>
  </div>
</template>
<style scoped>
.sidebar {
  width: 220px;
  background-color: #353535;
  padding: 10px 0;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.nav-item {
  padding: 12px 20px;
  color: #ccc;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 15px;
}

.nav-item:hover {
  background-color: #4a4a4a;
  color: #fff;
}

.nav-item.active {
  background-color: #1e90ff;
  color: #fff;
  font-weight: 500;
}
.actions{
  display: flex;
  margin:20px;
  justify-content: center;
}
</style>