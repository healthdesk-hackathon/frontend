<template>
  <div>
    <section class="section">
      <h1 class="title is-2">
        Health Snapshots
      </h1>
      <b-table :data="healthSnapshots">
        <template slot-scope="props">
          <b-table-column field="created_at" label="Date/Time" sortable>
            {{ props.row.created_at | datetime }}
          </b-table-column>

          <b-table-column field="admission" label="Admission" searchable>
            {{ props.row.admission }}
          </b-table-column>

          <b-table-column field="severity" label="Severity" sortable>
            {{ props.row.severity }}
          </b-table-column>
        </template>
      </b-table>
    </section>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {};
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
