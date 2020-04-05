<template>
  <div>
    <h1 class="title is-2">
      Dashboard
    </h1>
    <div class="columns" v-if="dashboardData">
      <div class="column is-3">
        <h4 class="title is-5">New admissions per day</h4>
        <BarChart
          :chart-data="admissionsPerDay"
          :options="{
            scales: {
              yAxes: [{ stacked: true }],
              xAxes: [{ type: 'time', time: { unit: 'day' }, stacked: true }]
            }
          }"
        />
      </div>
      <div class="column is-3">
        <h4 class="title is-5">Bed availability</h4>
        <BarChart
          :chart-data="bedAvailability"
          :options="{
            scales: {
              yAxes: [{ stacked: true }],
              xAxes: [
                {
                  type: 'category',
                  labels: bedAvailabilityCatgories,
                  stacked: true
                }
              ]
            }
          }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BarChart from "../../../components/Charts/BarChart";
import { API } from "../../../service/api";

const colors = [
  "#93ff35",
  "#ff4871",
  "#4ad5ff",
  "#ba89ff",
  "#97ffd2",
  "#ffd6a6"
];

export default {
  name: "Dashboard",
  components: { BarChart },
  data() {
    return {
      dashboardData: null,
      admissionsPerDayData: {}
    };
  },
  async mounted() {
    const response = await API.service.get("dashboard/");
    this.dashboardData = response.data;
    console.log(this.dashboardData);
  },
  computed: {
    admissionsPerDay() {
      if (!this.dashboardData) return {};
      const admissions = this.dashboardData.admissions_per_day;

      const datasets = {};

      admissions.forEach(entry => {
        const date = entry.date;
        for (let { label, value } of entry.count) {
          if (!datasets[label]) datasets[label] = [];
          datasets[label].push({ x: date, y: value });
        }
      });

      const barDatasets = [];

      let iColor = 0;

      for (let key in datasets) {
        barDatasets.push({
          backgroundColor: colors[iColor++],
          label: key,
          data: datasets[key]
        });
      }

      return {
        datasets: barDatasets
      };
    },
    bedAvailabilityCatgories() {
      if (!this.dashboardData) return {};
      const rawAvailability = this.dashboardData.bed_availability;
      return [...new Set(rawAvailability.map(av => av.label))];
    },
    bedAvailability() {
      if (!this.dashboardData) return {};
      const rawAvailability = this.dashboardData.bed_availability;

      const datasets = {
        available: [],
        unavailable: []
      };

      rawAvailability.forEach(({ value, label }) => {
        const available = value;
        const unavailable = 1 - available;
        datasets["available"].push({ x: label, y: available });
        datasets["unavailable"].push({ x: label, y: unavailable });
      });

      const barDatasets = [];

      let iColor = 0;

      for (let key in datasets) {
        barDatasets.push({
          backgroundColor: colors[iColor++],
          label: key,
          data: datasets[key]
        });
      }

      return {
        datasets: barDatasets
      };
    }
  }
};
</script>

<style scoped></style>
