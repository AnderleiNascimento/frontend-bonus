<template>
  <DefaultLayout>
    <UIComponentCard title="Consultar Cashback">
      <b-form @submit.prevent="handleSearching">
        <b-row>
          <b-col lg="3">
            <InputGroup
              name="document"
              placeholder="Consultar pelo cpf..." 
              v-model="document" 
              icon="fas fa-search"
              mask="999.999.999-99"
              @search="handleSearching"
              @update:modelValue="handleSearching"
            />
          </b-col>
        </b-row>
      </b-form>
    </UIComponentCard>
    <UIComponentCard title="Cupons">
        <TableBasic
          :rows="cashbacks.getCashbacks"
          :columns="columns"
          route-edit="/cadastros/clientes/alterar"
          :canRemove="false"
        >
          <template #field-status="{ row }">
            <b-badge :variant="getVariantStatus(row.status)">
              {{ row.status_text }}
            </b-badge>
          </template>
        </TableBasic>
    </UIComponentCard>
  </DefaultLayout>
</template>

<script setup>
import { reactive, onMounted, ref } from "vue";

import InputGroup from "@/components/InputGroup.vue";

import { useCashbackStore }  from "@/stores/modules/cashback/cashbacks.js"

import DefaultLayout from "@/layouts/DefaultLayout.vue"
import UIComponentCard from "@/components/UIComponentCard.vue";

import { useFormatData } from "@/composables/useFormatData"

const cashbacks = useCashbackStore()
const formatData = useFormatData()

const document = ref(null)

async function handleSearching(e) {
  if (e != null || e != undefined) {
    document.value = formatData.removeNonDigits(e)

    if (document.value.length === 11) {
      await cashbacks.getByDocument(document.value)
    }
  }
}

const columns = reactive([
  {
    label: 'Cliente',
    field: 'customer.name',
  },
  {
    label: 'Venda',
    field: 'value',
    formatFn: (value, row) => {
      return formatData.formatNumberToFloat(value)
    }
  },
  {
    label: 'Cashback',
    field: 'cashback_value',
    formatFn: (value, row) => {
      return formatData.formatNumberToFloat(value)
    }
  },
  {
    label: 'Data da Compra',
    field: 'transaction_date',
    formatFn: (value, row) => {
      return formatData.date(value)
    }
  },
  {
    label: 'Expiração em',
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
  