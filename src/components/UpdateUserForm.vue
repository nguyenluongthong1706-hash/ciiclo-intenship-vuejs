<script setup lang="ts">
import { ref, watch } from 'vue';
import type { User } from '@/types/Object';

// declare props for component
const {user, show, errors} = defineProps<{
    user : User | null,
    show : boolean
    errors : any
}>()

// declare emit submiting and canceling form for component
// const emits = defineEmits(['submit','close'])
const emits = defineEmits<{
    (e: 'close') : void
    (e:'submit', data:any) :void
}>()

const form = ref({
    name: user?.name
})

watch(
    () => user,
    (newUser)=>{
        form.value.name = newUser?.name
    },
    {immediate : true}
)
</script>
<template>
    <div v-show="show" class="modal-overlay">
        <div class="modal">
            <h1>Update your profile</h1>

            <p v-if="errors.name" class="error">
              {{errors.name[0]}}
          </p>
            <input
                v-model="form.name"
                placeholder="Name"
                class="input"
            />
            <div class="actions">
                <button @click="emits('close')"  class="btn cancel">Cancel</button>
                <button @click="emits('submit', form)"  class="btn submit">Update</button>
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