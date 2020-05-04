<template>
  <div>
    <section class="section">
      <h1 class="title is-2">Admission</h1>
      <div class="card" v-if="admission && admission.id">
        <div class="card-header">
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-96x96">
                  <img src="https://bulma.io/images/placeholders/96x96.png" alt="Patient photo" />
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4">{{ admission.patient_display || '-' }}</p>
                <p class>{{ admission.local_barcode }}</p>
                <p class>
                  <span>Admitted at:</span>
                  {{ admission.admitted_at | datetime }}
                </p>
                <p class>
                  <span>Bed:</span>
                  {{ admission.current_bed }}
                </p>
                <p class>
                  <span>Status:</span>
                  {{ admission.current_severity }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div v-if="admission.admitted" class="card-header">
          <router-link
            :to="{name: 'backoffice.admission', params: { admission_id: admission_id }}"
            class="card-footer-item"
          >Change Bed</router-link>
          <router-link
            :to="{name: 'backoffice.admission', params: { admission_id: admission_id }}"
            class="card-footer-item"
          >Discharge</router-link>
          <router-link
            :to="{name: 'backoffice.admission', params: { admission_id: admission_id }}"
            class="card-footer-item"
          >Transfer</router-link>
          <router-link
            :to="{name: 'backoffice.admission', params: { admission_id: admission_id }}"
            class="card-footer-item"
          >Deceased</router-link>
        </div>
        <div v-else class="card-header">
          <span class="card-footer-item">Previous Admission</span>
        </div>
        <div class="extra-content">
          <div class="card-content">
            <b-collapse aria-id="healthSnapshots" class="card" animation="slide" :open="false">
              <div
                slot="trigger"
                slot-scope="props"
                class="card-header"
                role="button"
                aria-controls="healthSnapshots"
                animation="slide"
              >
                <p class="card-header-title">
                  Health Snapshots
                  <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"></b-icon>
                </p>
              </div>
              <div class="card-content">
                <div class="content">
                  <health-snapshots-list :admission="admission" />
                </div>
              </div>
            </b-collapse>
            <b-collapse aria-id="admissionHealth" class="card" animation="slide" :open="false">
              <div
                slot="trigger"
                slot-scope="props"
                class="card-header"
                role="button"
                aria-controls="admissionHealth"
                animation="slide"
              >
                <p class="card-header-title">
                  Admission Conditions
                  <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"></b-icon>
                </p>
              </div>
              <div class="card-content">
                <div class="content">
                  <p>Overall Wellbeing</p>
                  <p>Common Symptons</p>
                  <p>Graded Symptons</p>
                  <p>Related Conditions</p>
                  <p>Admission Health Snapshot</p>
                </div>
              </div>
            </b-collapse>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import HealthSnapshotsList from "@/components/Admissions/HealthSnapshotsList.vue";

export default {
  components: {
    HealthSnapshotsList
  },
  props: {
    admission_id: { type: String, required: false }
  },
  watch: {
    $route: "reloadAdmission"
  },
  computed: {
    ...mapState("admissions", ["admission"])
  },

  mounted() {
    this.reloadAdmission();
  },
  methods: {
    ...mapActions("admissions", ["fetchAdmission"]),

    reloadAdmission() {
      let admission = this.$store.state.admission;
      if (
        this.admission_id &&
        (!admission || admission.id != this.admission_id)
      ) {
        this.$store.dispatch("admissions/fetchAdmission", this.admission_id);
      }
    }
  }
};
</script>

<style></style>
