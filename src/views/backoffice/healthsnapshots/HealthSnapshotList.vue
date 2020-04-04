<template>
  <div>
    <h1 class="title is-2">
      Health Snapshots
    </h1>
    <section class="section">
      <!-- <b-table :data="data" :columns="columns"></b-table> -->
      {{ healthSnapshots }}
      {{ admissions }}
    </section>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  computed: {
    ...mapState("healthsnapshots", ["healthSnapshots"]),
    ...mapState("admissions", ["admissions"])
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
