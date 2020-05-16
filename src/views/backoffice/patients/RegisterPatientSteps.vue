<template>
  <section class="section">
    <ValidationObserver v-slot="{ invalid }">
      <b-steps v-model="activeStep" :animated="true" :has-navigation="false">
        <b-step-item label="Identification" icon="account-plus">
          <RegisterPatientStepContentWrapper title="Identification">
            <RegisterPatientStepIdentification :active="activeStep === 0" v-model="identification" />
          </RegisterPatientStepContentWrapper>
        </b-step-item>

        <b-step-item label="Personal data" icon="account">
          <RegisterPatientStepContentWrapper title="Personal data">
            <RegisterPatientStepPersonalData :active="activeStep === 1" v-model="personalData" />
          </RegisterPatientStepContentWrapper>
        </b-step-item>

        <b-step-item label="Done" icon="account">
          <RegisterPatientStepContentWrapper title="Review">
            <RegisterPatientStepFinish :personalData="personalData" :complete="complete" />
          </RegisterPatientStepContentWrapper>
        </b-step-item>

        <template slot="navigation" slot-scope="{ previous, next }">
          <div class="columns is-centered">
            <div class="column is-half has-text-centered">
              <b-button
                v-if="!next.disabled"
                expanded
                rounded
                class="has-text-weight-bold"
                type="is-primary is-medium"
                @click.prevent="nextStep(next)"
                :disabled="invalid"
                >Next step</b-button
              >
              <b-button
                v-if="next.disabled && !complete"
                expanded
                rounded
                class="has-text-weight-bold"
                type="is-primary is-medium"
                @click.prevent="registerPatient"
                >Submit</b-button
              >
              <br />
              <b-button
                v-if="!complete"
                type="is-text is-small"
                :disabled="previous.disabled"
                @click.prevent="previous.action"
                >Previous step</b-button
              >
            </div>
          </div>
        </template>
      </b-steps>
    </ValidationObserver>
  </section>
</template>

<script>
import RegisterPatientStepContentWrapper from "@/components/Patients/RegisterPatientStepContentWrapper.vue";
import RegisterPatientStepIdentification from "@/components/Patients/RegisterPatientStepIdentification.vue";
import RegisterPatientStepPersonalData from "@/components/Patients/RegisterPatientStepPersonalData.vue";
import RegisterPatientStepFinish from "@/components/Patients/RegisterPatientStepFinish.vue";
import { mapState, mapActions } from "vuex";
import { ValidationObserver } from "vee-validate";

export default {
  components: {
    RegisterPatientStepContentWrapper,
    RegisterPatientStepIdentification,
    RegisterPatientStepPersonalData,
    RegisterPatientStepFinish,
    ValidationObserver,
  },
  methods: {
    ...mapActions("patient", ["savePatientIdentifier", "savePersonalData"]),
    ...mapActions("workflow", ["createWorkflow", "resetState"]),

    nextStep(next) {
      if (this.activeStep === 0) {
        this.startWorkflow();
      }
      next.action();
    },

    setupSteps() {
      this.resetState();
      this.personalData = {};
      this.identification = {};
      this.complete = false;
    },

    async startWorkflow() {
      try {
        await this.createWorkflow("register patient");
      } catch (e) {
        console.log(e);
      }
    },

    async registerPatient() {
      try {
        await Promise.all([
          this.savePatientIdentifier({
            patientIdentifier: this.identification,
            workflow: this.workflow,
          }),
          this.savePersonalData({
            personalData: this.personalData,
            workflow: this.workflow,
          }),
        ]);

        this.$router.push({ name: "backoffice.patient", params: { patient_id: this.patient.id } });
        this.setupSteps();
        this.complete = true;
      } catch (e) {
        console.log(e);
      }
    },
  },
  computed: {
    ...mapState("workflow", ["workflow"]),
    ...mapState("patient", ["patient"]),
  },
  data() {
    return {
      activeStep: 0,
      // data
      personalData: {},
      identification: {},
      complete: false,
    };
  },
  watch: {
    $route: "setupSteps",
  },
  mounted() {
    this.setupSteps();
  },
};
</script>

<style></style>
