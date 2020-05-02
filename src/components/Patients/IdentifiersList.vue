<template>
  <div>
    <section class="section">
      <b-table
        :loading="!patient.patient_identifiers"
        :data="patient.patient_identifiers"
        default-sort="created_at"
        hoverable
      >
        <template slot-scope="props" sortable>
          <b-table-column field="id_type" label="Type">{{ props.row.id_type || '-' }}</b-table-column>
          <b-table-column field="Identifer" label="Identifer">{{ props.row.identifer || '-' }}</b-table-column>
        </template>
      </b-table>
    </section>
  </div>
</template>

<script>
// import { mapState } from "vuex";

export default {
  props: {
    patient: { type: Object, required: true }
  },
  computed: {}
};
</script>

<style></style>
