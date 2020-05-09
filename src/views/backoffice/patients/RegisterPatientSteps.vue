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
            <RegisterPatientStepPersonalData v-model="personalData" />
          </RegisterPatientStepContentWrapper>
        </b-step-item>

        <b-step-item label="Done" icon="account">
          <RegisterPatientStepContentWrapper title="Review">
            <RegisterPatientStepFinish />
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
                v-else
                expanded
                rounded
                class="has-text-weight-bold"
                type="is-primary is-medium"
                @click.prevent="registerPatient"
                >Submit</b-button
              >
              <br />
              <b-button type="is-text is-small" :disabled="previous.disabled" @click.prevent="previous.action"
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
    ...mapActions("workflow", ["createWorkflow", "resetState"], "patient", [
      "savePatientIdentifer",
      "savePersonalData",
    ]),

    async nextStep(next) {
      if (this.activeStep == 0) this.setupSteps();
      next.action();
    },

    async setupSteps() {
      try {
        await this.createWorkflow("register patient");
        await this.resetState;
        this.personalData = {};
        this.identification = {};
      } catch (e) {
        console.log(e);
      }
    },
    async registerPatient() {
      try {
        await Promise.all([this.savePatientIdentifier(this.identification), this.savePersonalData(this.personalData)]);
        await this.resetState;
        this.personalData = {};
        this.identification = {};
        this.activeStep = 0;
      } catch (e) {
        console.log(e);
      }
    },
  },
  computed: {
    ...mapState("workflow", ["workflow"]),
  },
  data() {
    return {
      activeStep: 0,
      // data
      personalData: {},
      identification: {},
    };
  },
};
</script>

<style></style>
