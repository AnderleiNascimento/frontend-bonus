<template>
<TableBasic
  v-if="orders.getOrders"
  title="Pedidos"
  :rows="orders.getOrders" 
  :columns="columns"
  :canRemove="false"
>
  <template #field-status="{ row }">
    <b-badge :variant="getVariantStatus(row.status)">
      {{ row.status_text }}
    </b-badge>
  </template>
</TableBasic>
</template>
<script setup>
import { onMounted, watch, reactive } from 'vue' 
import { useFormatData } from "@/composables/useFormatData"
import { useOrderStore }  from "@/stores/modules/cashback/order.js"
import { useCustomerStore }  from "@/stores/modules/registers/customers.js"

const orders = useOrderStore()
const customers = useCustomerStore()
const formatData = useFormatData()

const columns = reactive([
  {
    label: 'Data',
    field: 'transaction_date',
    formatFn: (value, row) => {
      return formatData.date(value)
    }
  },
  {
    label: 'Total',
    field: 'total',
    formatFn: (value, row) => {
      return formatData.formatNumberToFloat(value)
    }
  },
  {
    label: 'Desconto',
    field: 'discount',
    formatFn: (value, row) => {
      return formatData.formatNumberToFloat(value)
    }
  },
  {
    label: 'Status',
    field: 'status',
  }
])

watch(
  () => customers.getCustomer,
  async (newCustomer) => {
    if (
      (newCustomer && newCustomer.id != null) || 
      (newCustomer && newCustomer.id != undefined)
    ) {
      await orders.get({
        customer: newCustomer.id
      })
    }
  },
  { immediate: true }
)

function getVariantStatus(status) {
  if (status === 'done') {
    return 'primary'
  } else if (status === 'cancelled') {
    return 'danger'
  }
}
</script>
  