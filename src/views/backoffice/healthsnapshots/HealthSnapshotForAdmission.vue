<template>
  <div>
    <section class="section">
      <h1 class="title is-2">Health Snapshots</h1>
      <h1 class="subtitle">{{ admission.patient_display }}</h1>
      <b-table
        :data="healthSnapshots"
        :default-sort="['created_at', 'desc']"
        hoverable
        paginated
      >
        <template slot-scope="props">
          <b-table-column field="created_at" label="Date/Time" sortable>{{
            props.row.created_at | datetime
          }}</b-table-column>

          <b-table-column field="severity" label="Severity" sortable>{{
            props.row.severity
          }}</b-table-column>

          <b-table-column field="heart_rate" label="HR" sortable>{{
            props.row.heart_rate
          }}</b-table-column>

          <b-table-column field="breathing_rate" label="BR" sortable
            >{{ props.row.breathing_rate }}
          </b-table-column>

          <b-table-column field="blood_pressure_systolic" label="BPS" sortable
            >{{ props.row.blood_pressure_systolic }}
          </b-table-column>

          <b-table-column field="blood_pressure_diastolic" label="BPD" sortable
            >{{ props.row.blood_pressure_diastolic }}
          </b-table-column>

          <b-table-column label="GCS" sortable
            >{{
              props.row.gcs_eye + props.row.gcs_motor + props.row.gcs_verbal
            }}
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
    admission: { type: Object, required: true }
  },
  data() {
    return {};
  },
  computed: {
    ...mapState("healthsnapshots", ["healthSnapshots"])
  },
  mounted() {
    if (this.admission)
      this.fetchHealthSnapshots({ admission_id: this.admission.id });
    else this.fetchHealthSnapshots();
  },
  methods: {
    ...mapActions("healthsnapshots", ["fetchHealthSnapshots"])
  }
};
</script>

<style></style>
