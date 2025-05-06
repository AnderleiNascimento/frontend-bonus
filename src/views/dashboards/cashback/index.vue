<template>
  <DefaultLayout>
    <b-row class="mb-3">
      <b-col md="6" lg="12">
        <ButtonGroup :buttons="buttons" @click-button="handleButtonClick" />
      </b-col>
    </b-row>
    <b-row class="justify-content-center">
      <StatWidgets v-if="statData" :data="statData" />
    </b-row>
    <b-row class="justify-content-center">
      <b-col md="6" lg="12">
        <OwerviewSalesMonth />
      </b-col>
      <b-col md="6" lg="6">
        <!-- <OwevuewSalesIncrease /> -->
      </b-col>
    </b-row>
    <b-row v-if=" dashboard.getCashback?.total_orders_stores && canView">
      <TopSelling />
      <TopCashback />
      <TopCashbackRescued />
    </b-row>
  </DefaultLayout>
</template>
<script setup>
import StatWidgets from "@/views/dashboards/cashback/components/StatWidgets.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import { useDashboardStore } from '@/stores/modules/cashback/dashboard'
import { onMounted, ref, reactive, computed } from "vue";
import ButtonGroup from "@/components/ButtonGroup.vue";
import TopSelling from "@/views/dashboards/cashback/components/TopSelling.vue";
import TopCashback from "@/views/dashboards/cashback/components/TopCashback.vue";
import TopCashbackRescued from "@/views/dashboards/cashback/components/TopCashbackRescued.vue";
import OwerviewSalesMonth from "@/views/dashboards/cashback/components/owerview-sales-month.vue";
import OwevuewSalesIncrease from "@/views/dashboards/cashback/components/owerview-sales-increase.vue";
import MeService from '@/services/MeService';

const user = ref(MeService.getUser());
const userRoles = ref(user.value?.roles || []);

const canView = computed(() => {
  return ['super_admin', 'admin'].some(role => userRoles.value.includes(role))
});

const dashboard = useDashboardStore()

let statData = ref([]);

const buttons = reactive([
  { label: 'Total', value: null },
  { label: 'Hoje', value: 0 },
  { label: '1d', value: 1 },
  { label: '7d', value: 7 },
  { label: '30d', value: 30 },
  { label: '12m', value: 365 }
]);

function getStatData() {
  statData.value = [
    {
      title: canView.value ? "VENDAS" : 'Minhas Vendas',
      stat: `R$ ${dashboard.getCashback.total}`,
      icon: "icofont-money-bag",
      change: "8.5%",
      subTitle: "New Sessions Today",
      variant: "success",
    },
    {
      title: "CASHBACK",
      stat: `R$ ${dashboard.getCashback.total_cashback}`,
      icon: "fa fa-hand-holding-usd",
      change: "1.5%",
      subTitle: "Weekly Avg.Sessions",
      variant: "success",
    },
    {
      title: "RESGATE",
      stat: `R$ ${dashboard.getCashback.total_cashback_rescue}`,
      icon: "fas fa-piggy-bank",
      change: "8%",
      subTitle: "Up Bounce Rate Weekly",
      variant: "danger",
    },
  ];

  if (canView.value) {
    statData.value.push({
      title: "ROI",
      stat: `R$ ${dashboard.getCashback.roi}`,
      icon: "fas fa-chart-line",
      change: "8%",
      subTitle: "Up Bounce Rate Weekly",
      variant: "danger",
    });
  }
}

async function handleButtonClick(e) {
  if (e !== null) {
    const currentDate = new Date();
    const startDate = new Date();
    startDate.setDate(currentDate.getDate() - e);

    const formattedStartDate = startDate.toISOString().split('T')[0];
    const formattedEndDate = e > 1 ? currentDate.toISOString().split('T')[0] : formattedStartDate;

    await dashboard.fetchCashback({
      start_date: formattedStartDate,
      end_date: formattedEndDate
    });
  } else {
    await dashboard.fetchCashback();
  }

  getStatData();
}

onMounted(async () => {
  await dashboard.fetchCashback();

  getStatData();
});
</script>
