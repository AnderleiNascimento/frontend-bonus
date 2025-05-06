<template>
    <b-col cols="12">
      <UIComponentCard :title="title">
        <b-row class="g-2">
            <slot name="fields"></slot>
        </b-row>
      </UIComponentCard>
    </b-col>
</template>
<script setup>
  import UIComponentCard from "@/components/UIComponentCard.vue";

  const props = defineProps({
    title: {
        type: String,
        default: 'Filtros'
    },
  })

  const emit = defineEmits(["filtered"]);

  async function handleClickFilter(e) {
    emit('filtered')
    // await store.get(e)
  }
</script>
  