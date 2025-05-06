<template>
  <b-input-group class="mb-3">
    <b-input-group-text v-if="icon" class="btn btn-secondary" @click="handleIconClick">
      <i :class="icon" />
    </b-input-group-text>
    <InputMask 
      v-if="mask" 
      :id="name" 
      :mask="mask"
      :value="_value"
      @input.prevent.stop="handleInput"
      @keyup.enter="emit('search', _value.value)"
      :placeholder="placeholder"
      :auto-complete="autoComplete"
    />
    <b-form-input 
      v-else
      :type="type"
      :id="name"
      :placeholder="placeholder"
      :value="_value"
      @input.prevent.stop="handleInput"
      :auto-complete="autoComplete" 
    />
  </b-input-group>
  <div v-if="validateMessage" class="text-danger">
    {{ validateMessage }}
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import InputMask from "@/components/InputMask.vue";

const props = defineProps({
  name: {
    type: String,
    requird: true
  },
  label: {
    type: String,
    requird: true
  },
  placeholder: {
    type: String,
    requird: true
  },
  validateMessage: {
    type: String,
    default: null
  },
  modelValue: {
    type: [String, Number],
    default: ''
  },
  icon: {
    type: String,
  },
  type: {
    type: String,
    default: 'text'
  },
  autoComplete: {
    type: String,
    default: 'on'
  },
  mask: {
    type: String,
  },
})

const emit = defineEmits(["update:modelValue", "search"]);

const _value = ref(props.modelValue)

function handleInput(event) {
  _value.value = event.target.value
  emit('update:modelValue', _value.value)
}

function handleIconClick() {
  emit('search', _value.value)
}

watch(
  () => props.modelValue,
    (newValue) => {
      _value.value = newValue
    }
)
</script>