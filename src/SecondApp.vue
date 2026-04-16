<script>
    export default {
        data(){
            return {
                message: "the first message on second APP"
            }
        },
        mounted(){
            console.log('the mount end')
        },

        methods:{
            showMessage(){
                return this.message
            }
        }
    }
</script>
<template>
    <h1> Message: {{ message}} </h1>
</template>