<template>
  <div>
    <section class="section">
      <h1 class="title is-2">
        Health Snapshots
      </h1>
      <b-table
        :data="healthSnapshots"
        :default-sort="['created_at', 'desc']"
        hoverable
        paginated
      >
        <template slot-scope="props">
          <b-table-column field="created_at" label="Date/Time" sortable>
            {{ props.row.created_at | datetime }}
          </b-table-column>

          <b-table-column field="admission" label="Admission" searchable>
            {{ props.row.admission }}
          </b-table-column>

          <b-table-column field="severity" label="Severity" sortable>
            {{ props.row.severity }}
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
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  props: ["admission_id"],
  data() {
    return {};
  },
  computed: {
    ...mapState("healthsnapshots", ["healthSnapshots"])
  },
  mounted() {
    // this.fetchHealthSnapshots();
  },
  methods: {
    ...mapActions("healthsnapshots", ["fetchHealthSnapshots"])
  },
  watch: {
    admission_id: {
      // the callback will be called immediately after the start of the observation
      immediate: true,
      handler(admission_id) {
        if (admission_id) {
          var data = { admission_id: admission_id };
        } else {
          data = null;
        }

        this.fetchHealthSnapshots(data);
      }
    }
  }
};
</script>

<style></style>
