<template>
  <div>
    <section class="section">
      <b-table
        :loading="!patient.phones"
        :data="patient.phones"
        default-sort="created_at"
        hoverable
      >
        <template slot-scope="props" sortable>
          <b-table-column field="phone_type" label="Type">{{ props.row.phone_type || '-' }}</b-table-column>
          <b-table-column
            field="phone_number"
            label="Phone Number"
          >{{ props.row.phone_number || '-' }}</b-table-column>
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
