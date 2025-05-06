<template>
    <b-spinner :variant="variant" />
</template>
<script setup>
const props = defineProps({
    variant: {
        type: String,
        default: 'primary'
    }
})
</script>