<template>
  <DefaultLayout>
    <b-row class="mb-3">
      <b-col md="6" lg="12">
        <ButtonGroup :buttons="buttons" @click-button="handleButtonClick" />
      </b-col>
    </b-row>
    <b-row class="justify-content-center">
      <StatWidgets :data="statData" />
    </b-row>
    <b-row>
      <b-col md="6" lg="8">
        <TableBasic title="Top Clientes" :rows="dashboard.getTopCustomers" :columns="columns" />
      </b-col>
    </b-row>
  </DefaultLayout>
</template>

<script setup>
import StatWidgets from "@/views/dashboards/loyalties/components/StatWidgets.vue";

import DefaultLayout from "@/layouts/DefaultLayout.vue";

import { useDashboardStore } from '@/stores/modules/cashback/dashboard'

import TableBasic from "@/components/TableBasic.vue"
import ButtonGroup from "@/components/ButtonGroup.vue";

import { useFormatData } from "@/composables/useFormatData"

import { onMounted, ref, reactive } from "vue";

const dashboard = useDashboardStore()
const formatData = useFormatData()

const columns = reactive([
  {
    label: 'Cliente',
    field: 'name',
  },
  {
    label: 'Frequência',
    field: 'transaction_count',
  },
  {
    label: 'Compras',
    field: 'total_value',
    formatFn: (value, row) => {
      return formatData.formatNumberToFloat(value)
    }
  },
  {
    label: 'Cashback',
    field: 'total_cashback',
    formatFn: (value, row) => {
      return formatData.formatNumberToFloat(value)
    }
  },
  {
    label: 'Resgate',
    field: 'total_rescue',
    formatFn: (value, row) => {
      return formatData.formatNumberToFloat(value)
    }
  },
  {
    label: 'Saldo',
    field: 'balance',
    formatFn: (value, row) => {
      return formatData.formatNumberToFloat(value)
    }
  }
])

let statData = ref([]);

const buttons = reactive([
  {
    label: 'Total',
    value: null
  },
  {
    label: 'Hoje',
    value: 0
  },
  {
    label: '1d',
    value: 1
  },
  {
    label: '7d',
    value: 7
  },
  {
    label: '30d',
    value: 30
  },
  {
    label: '12m',
    value: 365
  }
]);

async function handleButtonClick(e) {
  if (e !== null) {
    const currentDate = new Date();

    const startDate = new Date();
    startDate.setDate(currentDate.getDate() - e);

    const formattedStartDate = startDate.toISOString().split('T')[0];
    const formattedEndDate = e > 1 ? currentDate.toISOString().split('T')[0] : formattedStartDate;

    await dashboard.fetchLoyalties({
      start_date: formattedStartDate,
      end_date: formattedEndDate
    })
  } else {
    await dashboard.fetchLoyalties()
  }

  getStatData()
}

function getStatData() {
  statData.value = [
    {
      title: "CLIENTES NOVOS",
      stat: `${dashboard.getLoyalties.total_news}`,
      icon: "fas fa-user-friends",
      change: "8.5%",
      subTitle: "New Sessions Today",
      variant: "success",
    },
    {
      title: "CLIENTES FIDELIZADOS",
      stat: `${dashboard.getLoyalties.total_loyalties}`,
      icon: "fas fa-user-check",
      change: "1.5%",
      subTitle: "Weekly Avg.Sessions",
      variant: "success",
    },
  ];
}

onMounted(async () => {
  await dashboard.fetchLoyalties()

  getStatData()
})
</script>
