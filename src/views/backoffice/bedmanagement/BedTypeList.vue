<template>
  <div>
    <h1 class="title is-2">
      Bed Types
    </h1>
    <section class="section">
      <b-table
        :loading="!bedTypes"
        :data="bedTypes"
        default-sort="name"
        :row-class="row => (row.is_available ? '' : 'is-danger')"
      >
        <template slot-scope="props">
          <b-table-column label="ID" field="id" sortable searchable>
            {{ props.row.id }}
          </b-table-column>
          <b-table-column label="Name" field="name" sortable searchable>
            {{ props.row.name }}
          </b-table-column>
          <b-table-column label="Available" field="is_available">
            {{ props.row.is_available ? "Yes" : "No" }}
          </b-table-column>
          <b-table-column
            label="# Assigned"
            field="number_assigned"
            numeric
            sortable
          >
            {{ props.row.number_assigned }}
          </b-table-column>
          <b-table-column
            label="# Available"
            field="number_available"
            numeric
            sortable
          >
            {{ props.row.number_available }}
          </b-table-column>
          <b-table-column
            label="# Out of service"
            field="number_out_of_service"
            numeric
            sortable
          >
            {{ props.row.number_out_of_service }}
          </b-table-column>
          <b-table-column label="Total" field="total" numeric sortable>
            {{ props.row.total }}
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
    ...mapState("beds", ["bedTypes"])
  },
  async mounted() {
    await this.fetchBedTypes();

    this.pollingInterval = setInterval(() => {
      this.fetchBedTypes();
    }, 10 * 1000);
  },
  destroyed() {
    clearInterval(this.pollingInterval);
  },
  methods: {
    ...mapActions("beds", [
      "fetchBeds",
      "fetchBedTypes",
      "setAvailable",
      "setUnavailable",
      "setCleaning",
      "setEquipmentFailure"
    ])
  }
};
</script>

<style lang="scss">
tr.is-danger {
  color: $danger-invert;
  background-color: $danger;
}
</style>