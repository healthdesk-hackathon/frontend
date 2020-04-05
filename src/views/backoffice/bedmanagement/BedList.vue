<template>
  <div>
    <h1 class="title is-2">
      Beds
    </h1>
    <section class="section">
      <b-table
        :loading="!beds"
        :data="beds"
        default-sort="id"
        hoverable
        paginated
      >
        <template slot-scope="props">
          <b-table-column label="ID" field="id" sortable searchable>
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
              >
                Unavailable
              </b-button>
              <b-button
                v-if="props.row.state === 0"
                @click="setAvailable(props.row)"
                size="is-small"
              >
                Available
              </b-button>
              <b-button
                v-if="props.row.state !== 0"
                @click="setEquipmentFailure(props.row)"
                size="is-small"
              >
                Equipment failure
              </b-button>
              <b-button
                v-if="props.row.state !== 0"
                @click="setCleaning(props.row)"
                size="is-small"
              >
                Cleaning
              </b-button>
            </div>
          </b-table-column>
        </template>
      </b-table>
    </section>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
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
