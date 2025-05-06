<template>
  <b-col md="6" lg="4">
    <b-card no-body>
      <b-card-header>
        <b-row class="align-items-center">
          <div class="col">
            <b-card-title>Vendas por lojas</b-card-title>
          </div>
        </b-row>
      </b-card-header>
      <b-card-body class="pt-0">
        <b-table-simple responsive class="mb-0">
          <b-tbody>
            <b-tr v-for="(item, idx) in items" :key="idx">
              <b-td class="px-0">
                <div class="d-flex align-items-center">
                  <div class="flex-grow-1 text-truncate">
                    <h6 class="m-0 text-truncate">{{ item.store_name }}</h6>
                    <div class="d-flex align-items-center">
                      <div
                        class="progress bg-primary-subtle w-100"
                        style="height: 5px"
                        role="progressbar"
                        aria-label="Success example"
                        :aria-valuenow="item.percent_of_total"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <div
                          class="progress-bar bg-primary"
                          :style="`width: ${item.percent_of_total}%`"
                        ></div>
                      </div>
                      <small class="flex-shrink-1 ms-1"
                        >{{ item.percent_of_total }}%</small
                      >
                    </div>
                  </div>
                </div>
              </b-td>
              <b-td class="px-0 text-end"
                ><span class="text-body ps-2 align-self-center text-end"
                  >{{ formatData.formatNumberToFloat(item.total_value) }}</span
                >
              </b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </b-card-body>
    </b-card>
  </b-col>
</template>
<script setup>
import { reactive } from "vue";
import { useDashboardStore } from '@/stores/modules/cashback/dashboard'
import { useFormatData } from '@/composables/useFormatData';

const formatData = useFormatData()
const dashboard = useDashboardStore()

let items = reactive(dashboard.getCashback?.total_orders_stores ?? [])
</script>
