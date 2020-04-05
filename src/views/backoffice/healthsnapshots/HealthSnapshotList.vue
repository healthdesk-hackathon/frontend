<template>
  <div>
    <section class="section">
      <h1 class="title is-2">Health Snapshots</h1>
      <b-table :data="healthSnapshots" :columns="columns"></b-table>
    </section>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  props: ["admission_id"],
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
    // this.fetchHealthSnapshots();
  },
  methods: {
    ...mapActions("healthsnapshots", ["fetchHealthSnapshots"])
  },
  watch: {
    admission_id: {
      // the callback will be called immediately after the start of the observation
      immediate: true,
      handler(admission_id) {
        if (admission_id) {
          var data = { admission_id: admission_id };
        } else {
          data = null;
        }

        this.fetchHealthSnapshots(data);
      }
    }
  }
};
</script>

<style></style>
