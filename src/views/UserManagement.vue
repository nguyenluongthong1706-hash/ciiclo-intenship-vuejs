<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getAllUser, updateUserStatus } from '@/services/userService';
import { useToast } from 'vue-toastification';
import type { User } from '@/types/Object';

const users = ref<User[] | []>([])

const toast = useToast()

const handleActiveSubmit = async (id:string)=>{
    try {
        const selectedUserId = users.value.findIndex( i => i.id === id);
        if(selectedUserId== -1) return
        const user = users.value[selectedUserId]
        if (!user) return; 

        const newStatus = !user.is_active;

        const res = await updateUserStatus(id,{is_active: newStatus})

        user.is_active = newStatus

        toast.success(res.message)
    } catch (error:any) {
        toast.error(error.response?.data?.message)
    }
}

onMounted(async()=>{
    try {
        const res = await getAllUser()
        
        users.value = res.data || []
    } catch (error :any) {
        toast.error(error.response?.data?.message)
    }
})
</script>
<template>
    <div class="container">
        <h1>User Management</h1>
        <div class="box-container">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Avatar</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Active</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users">
                        <td>{{ user.id }}</td>
                        <td>{{ user.name }}</td>
                        <td>
                            <img class="avatar" src="https://sm.ign.com/ign_ap/cover/a/avatar-gen/avatar-generations_hugw.jpg" alt="">
                        </td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.role }}</td>
                        <td>
                            <button 
                                class="btn" 
                                :class="{'active': !user.is_active, 'block': user.is_active}"
                                @click="handleActiveSubmit(user.id)"
                            >
                                {{user.is_active? "Block" : "Active"}}
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
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
</style>