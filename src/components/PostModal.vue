<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import type { Post, Category } from '@/types/Object'
import type { SubmitPostRequest } from '@/types/Request';
import { getCategories } from '@/services/categoryService';
import { useToast } from 'vue-toastification';

const props = defineProps<{
  show: boolean
  post?: Post | null
  isEdit?: boolean
  errors : any
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit', data: any): void
}>()

const form = ref<SubmitPostRequest>({
  title: '',
  content: '',
  category_id: ''
})

const categories = ref<Category[]|[]>([])

const toast = useToast()

const resetForm = () => {
  form.value = {
    title: '',
    content: '',
    category_id: ''
  }
}

// change form data when props.post chance
watch(
  () => props.post,
  (newPost) => {
    if (newPost && props.isEdit) {
      form.value.title = newPost.title
      form.value.content = newPost.content
      form.value.category_id = newPost.category?.id ?? null
    } else {
      resetForm()
    }
  },
  { immediate: true }
)

const handleSubmit = () => {
  emit('submit', form.value)
}

onMounted (async ()=>{
  try {
    const res = await getCategories()

    categories.value = res.data ?? []

    toast.success(res.message)
  } catch (error:any) {
    toast.error(error.response?.data?.message)
  }
})
</script>

<template>
  <div v-show="show" class="modal-overlay">
    <div class="modal">
      <h2>{{ isEdit ? 'Edit Post' : 'Create Post' }}</h2>

      <p v-if="errors.title" class="error">
          {{errors?.title[0]}}
      </p>
      <input
        v-model="form.title"
        placeholder="Title"
        class="input"
      />

      <p v-if="errors.category_id" class="error">
          {{errors.category_id[0]}}
      </p>
      <select v-model="form.category_id">
        <option v-if="categories.length === 0" value="null">Category isn't exists</option>
        <option v-else v-for="category in categories" :value="category.id">{{ category.name }}</option>
      </select>

      <p v-if="errors.content" class="error">
          {{errors.content[0]}}
      </p>
      <textarea
        v-model="form.content"
        placeholder="Content"
        class="textarea"
      ></textarea>

      <div class="actions">
        <button @click="emit('close')" class="btn cancel">Cancel</button>
        <button @click="handleSubmit" class="btn submit">
          {{ isEdit ? 'Update' : 'Create' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 12px;
  width: 400px;
  display: flex;
  flex-direction: column;
}
.input, .textarea, select{
  margin-top:0;
  margin-bottom: 20px;
}
.input, .textarea {
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.textarea {
  min-height: 100px;
}

.actions {
  display: flex;
  justify-content: space-between;
}

.btn {
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