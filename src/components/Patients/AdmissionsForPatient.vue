<template>
  <div>
    <section class="section">
      <h4 class="title is-4">Admissions</h4>
      <b-table
        :loading="!admissions"
        :data="admissions"
        default-sort="created_at"
        hoverable
        paginated
        @click="open_row"
      >
        <template slot-scope="props" sortable>
          <b-table-column field="currently_admitted" label="Currently Admitted" sortable>
            <b-checkbox :disabled="true" :value="props.row.admitted" @click.native.prevent.stop="true" />
          </b-table-column>
          <b-table-column field="local_barcode" label="Hospital ID" sortable>
            {{ props.row.local_barcode }}
          </b-table-column>

          <b-table-column field="current_bed" label="Current Bed">
            {{ props.row.current_bed }}
          </b-table-column>

          <b-table-column field="current_severity" label="Condition Severity" sortable>
            {{ props.row.current_severity }}
          </b-table-column>

          <b-table-column field="admitted_at" label="Admission Date" centered sortable>
            {{ props.row.admitted_at | date }}
          </b-table-column>
        </template>
      </b-table>
    </section>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  props: {
    patient_id: { type: String, required: true },
    patient: { type: Object, required: false },
  },
  watch: {
    patient_id: "reloadPatient",
  },
  computed: {
    ...mapState("admission", ["admissions"]),
  },
  mounted() {
    this.reloadPatient();
  },
  methods: {
    ...mapActions("admission", ["fetchAdmissions"]),
    ...mapActions("patient", ["fetchPatient"]),

    open_row(row) {
      this.$router.push({
        name: "backoffice.admission",
        params: { admission: row, admission_id: row.id },
      });
    },

    reloadPatient() {
      if (this.patient_id) {
        this.$store.dispatch("admission/fetchAdmissions", {
          patient_id: this.patient_id,
        });
      }
    },
  },
};
</script>

<style></style>
