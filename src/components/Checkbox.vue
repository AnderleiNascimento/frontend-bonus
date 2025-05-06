<template>
  <b-form-checkbox v-model="checked" @change="handleChange">
    {{ label }}
  </b-form-checkbox>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    name: {
        type: String
    },
    label: {
        type: String
    },
})

const emit = defineEmits(["change"]);

const checked = ref(false);

function handleChange() {
  emit('change',checked.value)
}

</script>