<script>
import {ref, onMounted} from 'vue'
export default{
    setup(){
        const message = ref("first message in fourth app")

        onMounted(()=>{
            console.log("mount end")
            }
        )

        return{
            message
        }
    }
}
</script>
<template>

</template>