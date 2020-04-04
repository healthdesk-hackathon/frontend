<template>
  <div>
    <section class="section">
      <h1 class="title is-2">
        Health Snapshots
      </h1>
      <b-table :data="healthSnapshots" :columns="columns"></b-table>
    </section>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      columns: [
        {
          field: "created_at",
          label: "Date/Time"
        },
        {
          field: "admission",
          label: "Admission"
        },
        {
          field: "severity",
          label: "Severity"
        }
      ]
    };
  },
  computed: {
    ...mapState("healthsnapshots", ["healthSnapshots"])
  },
  mounted() {
    this.fetchHealthSnapshots();
  },
  methods: {
    ...mapActions("healthsnapshots", ["fetchHealthSnapshots"])
  }
};
</script>

<style></style>
