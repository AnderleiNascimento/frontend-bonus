<template>
  <div v-show="toast.getMessage" class="p-1 toast-container position-fixed top-0 end-0 align-items-end">
    <div
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      ref="toastRef"
      :class="`toast d-flex align-items-center text-white ${toast.getBg} border-0 end-0 position-fixed m-1`"
    >
      <div class="toast-body">
        {{ toast.getMessage }}
      </div>
      <button
        type="button"
        class="btn-close btn-close-white ms-auto me-2"
        data-bs-dismiss="toast"
        aria-label="Close"
        @click="handleClose"
      ></button>
    </div>
  </div>
</template>
  
<script setup>
import { ref, watch } from 'vue'
import { useToastStore } from '@/stores/toast'

const toast = useToastStore()

const delay = ref(5000)
const autohide = ref(true)
const toastRef = ref(null)
  
function handleClose() {
  toast.setMessage(null)
}

watch(
  () => toast.getMessage,
  (newVal) => {
    if (newVal && autohide.value) {
      setTimeout(() => {
        handleClose()
      }, delay.value)
    }
  }
)
</script>
  