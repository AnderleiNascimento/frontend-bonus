<template>
  <Toast />
  <RouterView />
</template>

<script setup>
import { RouterView } from "vue-router";
import { useLayoutStore } from "@/stores/layout";
import { onMounted } from "vue";

onMounted(() => {
  useLayoutStore().init();
});
</script>
