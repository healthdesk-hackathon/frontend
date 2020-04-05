<template>
  <div>
    <section class="section">
      <b-table
        :loading="!admissions"
        :data="admissions"
        default-sort="created_at"
        hoverable
        paginated
        v-on:select="open_row"
      >
        <template slot-scope="props">
          <b-table-column field="local_barcode" label="Hospital ID">{{
            props.row.local_barcode
          }}</b-table-column>

          <b-table-column field="current_bed" label="Current Bed">{{
            props.row.current_bed
          }}</b-table-column>

          <b-table-column field="current_severity" label="Condition Severity">{{
            props.row.current_severity
          }}</b-table-column>

          <b-table-column field="admitted_at" label="Date" centered>
            <span class="tag is-success">{{
              new Date(props.row.date).toLocaleDateString()
            }}</span>
          </b-table-column>
        </template>
      </b-table>
    </section>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  computed: {
    ...mapState("admissions", ["admissions"])
  },
  mounted() {
    this.fetchAdmissions();
  },
  methods: {
    ...mapActions("admissions", ["fetchAdmissions"]),

    open_row(row) {
      this.$router.push({
        name: "backoffice.healthSnapshotFiltered",
        params: { admission_id: row.id }
      });
    }
  }
};
</script>

<style></style>
