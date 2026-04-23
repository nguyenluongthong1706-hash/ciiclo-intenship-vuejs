<script setup lang="ts"> 
import { onMounted, ref } from 'vue';
import { useToast } from 'vue-toastification';
import type { Category } from '@/types/Object';
import { getCategories, updateCategoryStatus, createCategory, updateCategory, deleteCategory } from '@/services/categoryService';
import CategoryModal from '@/components/CategoryModal.vue';

const categories = ref<Category[] | []>([])
const categoryTemplate = ref<Category>({'id': '', 'name':'','is_active':true,'updated_at':'','created_at':''})
const newCategory = ref<Category>(categoryTemplate.value)
const isEdit = ref<boolean>(false)
const isClose = ref <boolean>(true)
const errors = ref<any>({})

const toast = useToast()

const handleSubmit = async()=>{
    if(isEdit.value){
        await handleUpdate()
    }else{
        await handleCreate()
    }
}

const handleCreate = async()=>{
    try {
        errors.value = {}

        const res = await createCategory({name: newCategory.value.name})

        isClose.value = true
        newCategory.value = categoryTemplate.value
        toast.success(res.message)
    } catch (error:any) {
        if(error.response?.data?.errors){
            errors.value = error.response.data.errors
        }
        toast.error(error.response?.data?.message)
    }
}

const handleUpdate = async()=>{
    try {
        if(!newCategory.value ||!newCategory.value.id || !newCategory.value.name) return

        const res = await updateCategory(newCategory.value.id, {name: newCategory.value.name})

        const index = categories.value.findIndex(c => c.id == newCategory.value.id)

        categories.value[index] = newCategory.value

        isClose.value = true
        isEdit.value = false
        newCategory.value = categoryTemplate.value

        toast.success(res.message)
    } catch (error:any) {
        if(error.response?.data?.errors){
            errors.value = error.response.data.errors
        }
        toast.error(error.response?.data?.message)
    }
}

const handleDelete = async(id:string)=>{
    try {
        const res = await deleteCategory(id)
        categories.value = categories.value.filter(c => c.id !== id)

        toast.success(res.message)
    } catch (error:any) {
        toast.error(error.response?.data?.error)
    }
}

const handleActiveSubmit = async (id:string)=>{
    try {
        const selectedCategoryIndex = categories.value.findIndex(p=> p.id === id)
        if (selectedCategoryIndex == -1) return
        const category = categories.value[selectedCategoryIndex]
        if(!category) return

        const newStatus = !category?.is_active
        const res = await updateCategoryStatus(id,{'is_active':newStatus})

        category.is_active = newStatus

        toast.success(res.message)
    } catch (error:any) {
        toast.error(error.response?.data?.message)
    }
}

const handleEdit = (id:string)=>{
    const category = categories.value.find(c => c.id === id)
    if (category) {
        newCategory.value = { ...category }
        isEdit.value = true
        isClose.value = false
    }
}

onMounted(async()=>{
    try {
        const res = await getCategories()

        categories.value = res.data || []
    } catch (error:any) {
        toast.error(error.response?.data?.message)
    }  
})
</script>
<template>
    <div class="container">
        <div class="box-title">
            <h1>Category Management</h1>
            <button class="btn create" @click="isClose=false">Create</button>
        </div>
        <div class="box-container">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Last update</th>
                        <th>Active</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="category in categories">
                        <td>{{ category.id }}</td>
                        <td>{{ category.name }}</td>
                        <td>{{ category.updated_at }}</td>
                        <td>
                            <button 
                                class="btn" 
                                :class="{'active': !category.is_active, 'block': category.is_active}"
                                @click="handleActiveSubmit(category.id)"
                            >
                                {{category.is_active? "Block" : "Active"}}
                            </button>
                        </td>
                        <td>
                            <div class="actions">
                                <button 
                                    class="btn, edit"
                                    @click="handleEdit(category.id)"
                                >
                                    {{"Edit"}}
                                </button>
                                <button 
                                    class="btn, delete"
                                    @click="handleDelete(category.id)"
                                >
                                    {{"Delete"}}
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <CategoryModal 
            v-model:category="newCategory" 
            v-model:is-close="isClose"
            v-model:is-edit="isEdit"
            v-model:errors="errors"
            :categoryTemplate="categoryTemplate"
            @submit="handleSubmit"
        />
    </div>
</template>
<style scoped>
.container{
    display: block;
    width: 100%;
    padding: 20px;
}
.box-title{
    display: flex;
    justify-content: space-between;
    align-items: center;
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
.create{
    padding: 8px 16px;
    border:1px solid black;
}
.active, .edit{
    background-color: green;
    color: white;
}
.block, .delete{
    background-color: red;
    color: white;
}
.actions{
    display: flex;
    justify-content: space-around;
}
</style>