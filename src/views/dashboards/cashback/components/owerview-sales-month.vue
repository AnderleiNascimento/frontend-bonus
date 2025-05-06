<template>
    <AudienceOverview v-if="dashboard.getCashback?.total_by_monthly" title="Vendas Mensais" :items="owerviewSalesMonth" />
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
    colors: ["#22c55e", "rgba(106, 155, 155, 0.3)", "#ff0000"],
    tooltip: {
        y: {
            formatter: function (value) {
            return new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 2
            }).format(value);
            }
        }
    },
    dataLabels: {
    enabled: false,
    formatter: function (value) {
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
          minimumFractionDigits: 2
          }).format(value);
      }
    },
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
  const dataMap = {};

  monthlyData.forEach(item => {
    const monthStr = item.month;
    const monthIndex = parseInt(monthStr.split("-")[1], 10) - 1;

    dataMap[monthIndex] = {
      total: parseFloat(item.total_value),
      cashback: parseFloat(item.total_cashback),
      rescue: parseFloat(item.total_cashback_rescue)
    };
  });

  const totalSeries = [];
  const cashbackSeries = [];
  const rescueSeries = [];

  for (let i = 0; i < 12; i++) {
    const entry = dataMap[i] || { total: 0, cashback: 0, rescue: 0 };
    totalSeries.push(entry.total);
    cashbackSeries.push(entry.cashback);
    rescueSeries.push(entry.rescue);
  }

  return {
    series: [
      { name: "Total", data: totalSeries },
      { name: "Cashback", data: cashbackSeries },
      { name: "Resgate", data: rescueSeries }
    ],
  };
}

watch(
  () => dashboard.getCashback?.total_by_monthly,
  (val) => {
    if (val && val.length) {
      const { series } = getSalesMonthChartSeries(val);
      owerviewSalesMonth.series = series;
    }
  },
  { immediate: true }
);
</script>