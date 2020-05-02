<template>
  <div>
    <section class="section">
      <b-table
        :loading="!patient.next_of_kin_contacts"
        :data="patient.next_of_kin_contacts"
        default-sort="created_at"
        hoverable
      >
        <template slot-scope="props" sortable>
          <b-table-column field="first_name" label="First Name">{{ props.row.first_name || '-' }}</b-table-column>
          <b-table-column field="last_name" label="Last Name">{{ props.row.last_name || '-' }}</b-table-column>
          <b-table-column field="title" label="Title">{{ props.row.title || '-' }}</b-table-column>
          <b-table-column
            field="relationship"
            label="Relationship"
          >{{ props.row.relationship || '-' }}</b-table-column>
          <b-table-column
            field="other_relationship"
            label="(other)"
            v-if="props.row.relationship == 'OTHER'"
          >{{ props.row.other_relationship || '-' }}</b-table-column>
          <b-table-column
            field="phone_number"
            label="Phone Number"
          >{{ props.row.phone_number || '-' }}</b-table-column>
          <b-table-column field="notes" label="Notes">{{ props.row.notes || '-' }}</b-table-column>
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
