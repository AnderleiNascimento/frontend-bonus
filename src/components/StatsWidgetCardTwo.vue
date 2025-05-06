<template>
    <b-card no-body class="shadow-none border mb-3 mb-lg-0">
        <b-card-body>
          <div class="d-flex align-items-center">
            <i class="fs-24 align-self-center me-2" :class="item.icon"></i>
            <div class="flex-grow-1 text-truncate">
              <p class="text-dark mb-0 fw-semibold fs-13">{{ item.title }}</p>
              <h3 class="mt-1 mb-0 fs-18 fw-bold">
                {{ item.stat }}
              </h3>
            </div>
          </div>
        </b-card-body>
      </b-card>
</template>
<script setup>
const props = defineProps({
    item: {
        type: Object,
        required: true,
    }
})
</script>