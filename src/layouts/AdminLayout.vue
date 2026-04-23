<script setup lang="ts">
import HeaderAdmin from '../components/HeaderAdmin.vue'
import LeftSiteAdmin from '../components/LeftSiteAdmin.vue'
</script>
<template>
    <div>
        <HeaderAdmin/>
        <div class="container">
            <LeftSiteAdmin/>
            <router-view></router-view>
        </div>
    </div>
</template>
<style scoped>
.container{
    display: flex;
    height: 100vh;
}
</style>