<template>
    <AudienceOverview title="Crescimento Mensais" :items="owerviewSalesMonth" />
</template>

<script setup>
import { watch, reactive } from "vue";
import { useDashboardStore } from '@/stores/modules/cashback/dashboard'

const dashboard = useDashboardStore()

const owerviewSalesMonth = reactive({
  height: 280,
  type: "area",
  series: [],
  options: {
    chart: {
      height: 280,
      type: "area",
      toolbar: { show: false },
      dropShadow: {
        enabled: true,
        top: 12,
        left: 0,
        blur: 2,
        color: "rgba(132, 145, 183, 0.3)",
        opacity: 0.35,
      },
    },
    annotations: {
      xaxis: [
        {
          x: 312,
          strokeDashArray: 4,
          borderWidth: 1,
          borderColor: "var(--bs-secondary)",
        },
      ],
      points: [],
    },
    colors: ["#22c55e", "rgba(106, 155, 155, 0.3)"],
    dataLabels: { enabled: false },
    stroke: {
      show: true,
      curve: "smooth",
      width: [3, 3],
      dashArray: [0, 0],
      lineCap: "round",
    },
    labels: [
      "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
      "Jul", "Ago", "Set", "Out", "Nov", "Dez"
    ],
    yaxis: {
      labels: {
        offsetX: -12,
        offsetY: 0,
        formatter: value => `R$ ${value}`,
      },
    },
    grid: {
      strokeDashArray: 3,
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: false } },
    },
    legend: { show: false },
    fill: {
      type: "gradient",
      gradient: {
        type: "vertical",
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.05,
        opacityTo: 0.05,
        stops: [45, 100],
      },
    },
  },
});

function getSalesMonthChartSeries(monthlyData) {
  const salesAfterCashbackSeries = [];
  const salesIncreasePercentage = [];

  for (let i = 0; i < 12; i++) {
    const entry = monthlyData[i] || { sales_after_cashback: 0, sales_increase_percentage: 0 };
    salesAfterCashbackSeries.push(entry.sales_after_cashback);
    salesIncreasePercentage.push(entry.sales_increase_percentage);
  }

  return {
    series: [
      { name: "Vendas após cashback", data: salesAfterCashbackSeries },
      { name: "Aumento", data: salesIncreasePercentage }
    ],
  };
}

watch(
  () => dashboard.getCashback?.sales_increase,
  (val) => {
    if (val && val.length) {
      const { series } = getSalesMonthChartSeries(val);
      owerviewSalesMonth.series = series;
    }
  },
  { immediate: true }
);
</script>