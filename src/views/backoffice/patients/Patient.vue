<template>
  <div>
    <section class="section">
      <h1 class="title is-2">Patient</h1>

      <div class="card" v-if="patient && patient.id">
        <div class="card-header">
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-96x96">
                  <img src="https://bulma.io/images/placeholders/96x96.png" alt="Patient photo" />
                </figure>
              </div>
              <div class="media-content">
                <p
                  class="title is-4"
                >{{ patient.personal_data.first_name || '-' }} {{ patient.personal_data.last_name || '-' }}</p>
                <p class="subtitle is-6 patient-dob">
                  <span>DOB:</span>
                  {{ patient.personal_data.date_of_birth || '-'}}
                  <span>Gender:</span>
                  {{ patient.personal_data && patient.personal_data.gender_display || '-' }}
                </p>
                <p class="record-created-at">
                  <span>Registered:</span>
                  {{ patient.created | date }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="card-header">
          <router-link :to="'/'" class="card-footer-item">Action 1</router-link>
          <router-link :to="'/'" class="card-footer-item">Action 2</router-link>
        </div>
        <div class="extra-content">
          <div class="card-content">
            <b-collapse aria-id="patientIdentifiers" class="card" animation="slide" :open="false">
              <div
                slot="trigger"
                slot-scope="props"
                class="card-header"
                role="button"
                aria-controls="patientIdentifiers"
                animation="slide"
              >
                <p class="card-header-title">
                  Identifiers ({{patient.patient_identifiers.length}})
                  <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"></b-icon>
                </p>
              </div>
              <div class="card-content">
                <div class="content">
                  <identifiers-list :patient="this.patient" />
                </div>
              </div>
            </b-collapse>
            <b-collapse aria-id="patientPhones" class="card" animation="slide" :open="false">
              <div
                slot="trigger"
                slot-scope="props"
                class="card-header"
                role="button"
                aria-controls="patientPhones"
              >
                <p class="card-header-title">
                  Phone ({{patient.phones.length}})
                  <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"></b-icon>
                </p>
              </div>
              <div class="card-content">
                <div class="content">
                  <phones-list :patient="this.patient" />
                </div>
              </div>
            </b-collapse>
            <b-collapse aria-id="patientNextOfKin" class="card" animation="slide" :open="false">
              <div
                slot="trigger"
                slot-scope="props"
                class="card-header"
                role="button"
                aria-controls="patientNextOfKin"
                animation="slide"
                open="false"
              >
                <p class="card-header-title">
                  Next of Kin ({{patient.next_of_kin_contacts.length}})
                  <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"></b-icon>
                </p>
              </div>
              <div class="card-content">
                <div class="content">
                  <next-of-kin-contacts-list :patient="this.patient" />
                </div>
              </div>
            </b-collapse>
          </div>
        </div>
        <div class="extra-content">
          <admissions-for-patient :patient-id="this.patient_id" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import AdmissionsForPatient from "@/components/Patients/AdmissionsForPatient.vue";
import PhonesList from "@/components/Patients/PhonesList.vue";
import IdentifiersList from "@/components/Patients/IdentifiersList.vue";
import NextOfKinContactsList from "@/components/Patients/NextOfKinContactsList.vue";

export default {
  components: {
    AdmissionsForPatient,
    PhonesList,
    IdentifiersList,
    NextOfKinContactsList
  },
  props: {
    patient_id: { type: String, required: true }
  },
  watch: {
    $route: "reloadPatient"
  },
  computed: {
    ...mapState("patients", ["patient"])
  },
  mounted() {
    this.reloadPatient();
  },
  methods: {
    ...mapActions("patients", ["fetchPatient"]),

    reloadPatient() {
      let patient = this.$store.state.patient;
      console.log(patient);
      if (this.patient_id && (!patient || patient.id != this.patient_id)) {
        this.$store.dispatch("patients/fetchPatient", this.patient_id);
      }
    }
  }
};
</script>

<style></style>
