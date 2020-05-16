<template>
  <div>
    <section class="section">
      <h1 class="title is-2">Admissions</h1>
      <b-table
        :loading="!admissions"
        :data="admissions"
        default-sort="created_at"
        hoverable
        paginated
        @click="open_row"
      >
        <template slot-scope="props" sortable>
          <b-table-column field="patient_display" label="Patient" searchable>
            {{
            props.row.patient_display
            }}
          </b-table-column>

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
    patient_id: { type: String, required: false }
  },

  data: function() {
    return {
      patient: null
    };
  },

  computed: {
    ...mapState("admissions", ["admissions"])
  },
  mounted() {
    if (this.patient_id) this.fetchAdmissions({ patient_id: this.patient.id });
    this.fetchAdmissions();
  },
  methods: {
    ...mapActions("admission", ["fetchAdmissions"]),

    open_row(row) {
      this.$store.dispatch("user/setCurrentView", { admission: row });
      this.$router.push({
        name: "backoffice.admission",
        params: { admission: row, admission_id: row.id }
      });
    }
  }
};
</script>

<style></style>
