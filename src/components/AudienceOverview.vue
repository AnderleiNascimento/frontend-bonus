<template>
  <b-col md="6" lg="12">
    <b-card no-body>
      <b-card-header>
        <b-row class="align-items-center">
          <div class="col">
            <b-card-title>
              {{ title }}
            </b-card-title>
          </div>
          <div v-if="hasFilterMonth" class="col-auto">
            <b-dropdown variant="light" menu-class="dropdown-menu-end">
              <template #button-content>
                <i class="icofont-calendar fs-5 me-1"></i> This Year<i
                  class="las la-angle-down ms-1"
                ></i>
              </template>
              <b-dropdown-item>Today</b-dropdown-item>
              <b-dropdown-item>Last Week</b-dropdown-item>
              <b-dropdown-item>Last Month</b-dropdown-item>
              <b-dropdown-item>This Year</b-dropdown-item>
            </b-dropdown>
          </div>
        </b-row>
      </b-card-header>
      <b-card-body class="pt-0">
        <ApexChart
          :chart="items"
          class="apex-charts"
          id="audience_overview"
        />
      </b-card-body>
    </b-card>
  </b-col>
</template>
<script setup>
import ApexChart from "@/components/ApexChart.vue";

defineProps({
  items: {
    type: Object,
    required: true,
  },
  title: {
    type: String
  },
  hasFilterMonth: {
    type: Boolean,
    default: false
  }
});
</script>
