<script setup>
import {ref, onMounted} from 'vue'

const message  = ref("the first message on third app")

onMounted(()=>{
    console.log('the mount end')
})
</script>
<template>
    <h1>Message: {{message}}</h1>
</template>