<template>
  <div>
    <section class="section">
      <h1 class="title is-2">Patients</h1>
      <b-table :loading="!patients" :data="patients" default-sort="created_at" hoverable paginated @click="open_row">
        <template slot-scope="props" sortable>
          <b-table-column field="personal_data.first_name" label="First Name" sortable searchable>{{
            props.row.personal_data.first_name || "-"
          }}</b-table-column>
          <b-table-column field="personal_data.last_name" label="Last Name" sortable searchable>{{
            props.row.personal_data.last_name || "-"
          }}</b-table-column>
          <b-table-column field="personal_data.date_of_birth" label="Date of Birth" sortable searchable>{{
            props.row.personal_data.date_of_birth || "-"
          }}</b-table-column>
          <b-table-column field="personal_data.gender_display" label="Gender" sortable searchable>{{
            (props.row.personal_data && props.row.personal_data.gender_display) || "-"
          }}</b-table-column>
          <b-table-column field="created" label="Created" centered sortable>{{
            props.row.created | date
          }}</b-table-column>
        </template>
      </b-table>
    </section>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  computed: {
    ...mapState("patient", ["patients"], "user", ["current_view"]),
  },
  mounted() {
    this.fetchPatients();
  },
  methods: {
    ...mapActions("patient", ["fetchPatients"]),

    open_row(row) {
      this.$router.push({
        name: "backoffice.patient",
        params: { patient: row, patient_id: row.id },
      });
    },
  },
};
</script>

<style></style>
