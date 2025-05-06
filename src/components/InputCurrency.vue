<template>
    <b-form-group
        :label="label"
        :label-for="name"
    >
      <input
        ref="inputRef"
        type="text"
        :placeholder="placeholder"
        :disabled="disabled"
        class="form-control"
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
  import { useCurrencyInput } from 'vue-currency-input'
  
  const labelIconRef = ref(null)
  
  const props = defineProps({
    placeholder: {
      type: String,
      default: 'Search'
    },
    label: String,
    name: String,
    modelValue: [String, Number],
    options: {
      type: Object,
      default: () => ({ currency: 'BRL', precision: 2 })
    },
    disabled: {
      type: Boolean,
      default: false
    },
    validateMessage: {
      type: String,
      default: null
    },
    description: {
      type: String,
      default: null
    },
  })
  
  const { inputRef, setOptions, setValue } = useCurrencyInput(props.options)
  
  watch(
    () => props.modelValue,
    (value) => {
      setValue(value)
    }
  )
  
  watch(
    () => props.options,
    (options) => {
      setOptions(options)
    }
  )
  </script>
  