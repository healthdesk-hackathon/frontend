<template>
  <section class="section">
    <h1 class="title is-2">
      Beds
    </h1>
    <b-table
      :loading="loading"
      :data="beds"
      default-sort="id"
      hoverable
      paginated
    >
      <template slot-scope="props">
        <b-table-column
          width="40"
          label="ID"
          field="id"
          numeric
          sortable
          searchable
        >
          {{ props.row.id }}
        </b-table-column>
        <b-table-column label="Bed type" field="bed_type">
          {{ props.row.bed_type_display }}
        </b-table-column>
        <b-table-column label="State" field="state">
          {{ props.row.state_display }}
        </b-table-column>
        <b-table-column label="Reason" field="reason">
          {{ props.row.reason_display }}
        </b-table-column>
        <b-table-column label="Actions">
          <div class="buttons">
            <b-button
              v-if="props.row.state !== 0"
              @click="setUnavailable(props.row)"
              size="is-small"
              type="is-warning"
            >
              Unavailable
            </b-button>
            <b-button
              v-if="props.row.state === 0"
              @click="setAvailable(props.row)"
              size="is-small"
              type="is-success"
            >
              Available
            </b-button>
            <b-button
              v-if="props.row.state !== 0"
              @click="setEquipmentFailure(props.row)"
              size="is-small"
              type="is-danger"
            >
              Equipment failure
            </b-button>
            <b-button
              v-if="props.row.state !== 0"
              @click="setCleaning(props.row)"
              size="is-small"
              type="is-info"
            >
              Cleaning
            </b-button>
          </div>
        </b-table-column>
      </template>
      <template slot="empty">
        <section class="section">
          <div class="content has-text-grey has-text-centered">
            <p>
              <b-icon icon="emoticon-sad" size="is-large"> </b-icon>
            </p>
            <p>Nothing here.</p>
          </div>
        </section>
      </template>
    </b-table>
  </section>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      loading: true,
      columns: [
        {
          field: "bed_type",
          label: "Bed type"
        },
        {
          field: "state",
          label: "State"
        },
        {
          field: "reason",
          label: "Reason"
        }
      ]
    };
  },
  computed: {
    ...mapState("beds", ["beds"])
  },
  async mounted() {
    await this.fetchBedTypes();
    await this.fetchBeds();
    this.loading = false;
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

<style></style>
