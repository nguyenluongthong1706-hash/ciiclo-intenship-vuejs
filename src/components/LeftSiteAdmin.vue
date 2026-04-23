<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const navs =  ref([
    {name: 'Dashboard', path: '/admin/dashboard'},
    {name: 'User Management', path: '/admin/user'},
    {name: 'Post Management', path: '/admin/post'},
    {name: 'Category Management', path: '/admin/category'},
])

const router = useRouter()
const route = useRoute()
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
</style>