<template>
  <pre class="rounded" :class="language"><code :class="language">{{ code }}</code></pre>
</template>

<script setup>
import * as Prism from "prismjs";
import { onMounted } from "vue";

const props = defineProps({
  language: {
    type: String,
    defaut: 'language-javascript'
  },
  code: {
    type: String,
  },
})

onMounted(() => {
  setTimeout(() => {
    Prism.highlightAll();
  });
});
</script>