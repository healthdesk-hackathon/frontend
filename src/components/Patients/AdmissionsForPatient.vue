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
          <b-table-column field="local_barcode" label="Hospital ID" sortable>
            {{
            props.row.local_barcode
            }}
          </b-table-column>

          <b-table-column field="current_bed" label="Current Bed">
            {{
            props.row.current_bed
            }}
          </b-table-column>

          <b-table-column
            field="current_severity"
            label="Condition Severity"
            sortable
          >{{ props.row.current_severity }}</b-table-column>

          <b-table-column
            field="admitted_at"
            label="Date"
            centered
            sortable
          >{{ props.row.admitted_at | date }}</b-table-column>
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
    current: { type: Boolean, required: false }
  },
  watch: {
    $route: "reloadPatient"
  },
  computed: {
    ...mapState("admissions", ["admissions"], "patients", ["patient"])
  },
  mounted() {
    this.reloadPatient();
  },
  methods: {
    ...mapActions("admissions", ["fetchAdmissions"], "patients", [
      "fetchPatient"
    ]),

    open_row(row) {
      this.$router.push({
        name: "backoffice.healthSnapshotForAdmission",
        params: { admission: row, admission_id: row.id }
      });
    },

    reloadPatient() {
      let patient = this.$store.state.patient;
      console.log(patient);
      if (this.patient_id && (!patient || patient.id != this.patient_id)) {
        this.$store.dispatch("patients/fetchPatient", this.patient_id);
      }

      if (this.patient_id) {
        this.$store.dispatch("admissions/fetchAdmissions", {
          patient_id: this.patient_id
        });
      }
    }
  }
};
</script>

<style></style>
