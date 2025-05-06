<template>
  <b-form-group
    :label="label"
    :label-for="name"
  >
    <InputMask 
      v-if="mask" 
      :id="name" 
      :mask="mask"
      :value="_value"
      @input.prevent.stop="handleInput"
      :placeholder="placeholder"
      :auto-complete="autoComplete"
      :disabled="disabled"
    />
    <b-form-input
      v-if="!mask"
      :type="type"
      :id="name"
      :placeholder="placeholder"
      :value="_value"
      @input.prevent.stop="handleInput"
      :auto-complete="autoComplete"
      :disabled="disabled"
    />
    <div v-if="validateMessage" class="text-danger">
      {{ validateMessage }}
    </div>
    <small v-if="description" class="form-text text-muted">
      {{ description }}
    </small>
  </b-form-group>
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
  },
  mask: {
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
  disabled: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
  },
})

const emit = defineEmits(["update:modelValue"]);

const _value = ref(props.modelValue)

function handleInput(event) {
  _value.value = event.target.value
  emit('update:modelValue', event.target.value)
}

watch(
  () => props.modelValue,
    (newValue) => {
      _value.value = newValue
    }
)
</script>