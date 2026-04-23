<script setup lang="ts">
import type { Category } from '@/types/Object';

const category = defineModel<Category>('category', { required: true })
const isEdit = defineModel<boolean>('isEdit')
const isClose = defineModel<boolean>('isClose')
const errors = defineModel<any>('errors')
const {categoryTemplate} = defineProps<{
    categoryTemplate: Category
}>()

const emit = defineEmits<{
    (e: 'submit') :void
}>()

</script>
<template>
    <div class="modal-overlay" v-if="!isClose">
        <div class="modal">
            <h1>{{ isEdit ? "Update category" : "Create category" }}</h1>

            <p v-if="errors?.name" class="error">{{ errors.name }}</p>
            <input class="input" v-model="category.name" type="text" placeholder="Nhập tên cho category">

            <div class="actions">
                <button 
                    class="btn cancel" 
                    @click="()=>{
                        isClose = !isClose
                        isEdit = false
                        category = categoryTemplate
                        errors = {}
                    }"
                >Cancel</button>
                <button class="btn submit" @click="$emit('submit')">{{ isEdit ? "Update" : "Create" }}</button>
            </div>
        </div>
    </div>
</template>
<style scoped>
.modal-overlay{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0.5);
}
.modal{
    width: 500px;
    background: white;
    padding: 20px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
}
.input{
    margin-top:0;
    margin-bottom: 20px;
    padding: 8px;
    border-radius: 8px;
    border: 1px solid #ccc;
}
.actions {
  display: flex;
  justify-content: space-between;
}
.btn{
    padding: 8px 12px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
}
.cancel {
  background: #ccc;
}

.submit {
  background: #3498db;
  color: white;
}
.error {
    font-size: 12px;
    color:red;
}
</style>