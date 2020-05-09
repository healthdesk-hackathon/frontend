<template>
  <div>
    <div class="list-actions">
      <router-link
        :to="{ name: 'backoffice.admission', params: { admission_id: admission_id } }"
        class="card-footer-item"
        >Add Health Snapshot</router-link
      >
    </div>
    <section class="section">
      <b-table
        :data="healthSnapshots"
        :default-sort="['created_at', 'desc']"
        hoverable
        paginated
        :loading="!healthSnapshots"
      >
        <template slot-scope="props">
          <b-table-column field="created_at" label="Date/Time" sortable>
            {{ props.row.created_at | datetime }}
          </b-table-column>

          <b-table-column field="severity" label="Severity" sortable>
            {{ props.row.severity }}
          </b-table-column>

          <b-table-column field="heart_rate" label="HR" sortable>
            {{ props.row.heart_rate }}
          </b-table-column>

          <b-table-column field="breathing_rate" label="BR" sortable>{{ props.row.breathing_rate }}</b-table-column>

          <b-table-column field="blood_pressure_systolic" label="BPS" sortable>{{
            props.row.blood_pressure_systolic
          }}</b-table-column>

          <b-table-column field="blood_pressure_diastolic" label="BPD" sortable>{{
            props.row.blood_pressure_diastolic
          }}</b-table-column>

          <b-table-column label="GCS">
            {{ props.row.gcs_eye + props.row.gcs_motor + props.row.gcs_verbal }}
          </b-table-column>
        </template>
        <template slot="empty">
          <section class="section">
            <div class="content has-text-grey has-text-centered">
              <p>
                <b-icon icon="emoticon-sad" size="is-large"></b-icon>
              </p>
              <p>Nothing here.</p>
            </div>
          </section>
        </template>
      </b-table>
    </section>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  props: {
    admission_id: { type: String, required: false },
  },
  watch: {
    $route: "reloadHealthSnapshots",
  },

  computed: {
    ...mapState("health_snapshot", ["healthSnapshots"], "admission", ["admission"]),
  },
  mounted() {
    this.reloadHealthSnapshots();
  },
  methods: {
    ...mapActions("health_snapshot", ["fetchHealthSnapshots"]),
    reloadHealthSnapshots() {
      let hs = this.$store.state.healthSnapshots;

      if (this.admission_id && (!hs || !hs[0] || hs[0].admission_id != this.admission_id)) {
        this.$store.dispatch("health_snapshot/fetchHealthSnapshots", this.admission_id);
      }
    },
  },
};
</script>

<style></style>
