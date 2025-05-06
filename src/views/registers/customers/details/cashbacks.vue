<template>
<TableBasic
  v-if="cashbacks.getCashbacks"
  title="Cashbacks"
  :rows="cashbacks.getCashbacks" 
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
import { useCashbackStore }  from "@/stores/modules/cashback/cashbacks.js"
import { useCustomerStore }  from "@/stores/modules/registers/customers.js"

const cashbacks = useCashbackStore()
const customers = useCustomerStore()
const formatData = useFormatData()

const columns = reactive([
  {
    label: 'Valor',
    field: 'value',
    formatFn: (value, row) => {
      return formatData.formatNumberToFloat(value)
    }
  },
  {
    label: 'Data de expiração',
    field: 'expires_at',
    formatFn: (value, row) => {
      return formatData.date(value)
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
      await cashbacks.get({
        customer: newCustomer.id
      })
    }
  },
  { immediate: true }
)

function getVariantStatus(status) {
  if (status === 'available') {
    return 'primary'
  } else if (status === 'used') {
    return 'success'
  } else if (status === 'expired') {
    return 'danger'
  }
}
</script>
  