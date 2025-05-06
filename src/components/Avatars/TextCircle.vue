<template>
<span :class="`${size} justify-content-center d-flex align-items-center ${bg} ${textColor} rounded-circle me-2`">
    {{ text }}
</span>
</template>
<script setup>
const props = defineProps({
    text: {
        type: String
    },
    size: {
        type: String,
        default: 'thumb-xxl'
    },
    bg: {
        type: String,
        default: 'bg-success-subtle '
    },
    textColor: {
        type: String,
        default: 'text-success'
    }
})
</script>