<template>
  <section class="section">
    <ValidationObserver v-slot="{ invalid }">
      <b-steps v-model="activeStep" :animated="true" :has-navigation="false">
        <b-step-item label="Symptoms" icon="alert-circle-outline">
          <AdmitPatientStepContentWrapper title="Symptoms">
            <AdmitPatientStepCommonSymptoms v-model="commonSymptoms" :overall_wellbeing="overallWellbeing" />
          </AdmitPatientStepContentWrapper>
        </b-step-item>

        <b-step-item label="Additional information" icon="plus">
          <AdmitPatientStepContentWrapper title="Additional information">
            <AdmitPatientStepRelatedConditions v-model="relatedConditions" />
          </AdmitPatientStepContentWrapper>
        </b-step-item>

        <b-step-item label="HealthSnapshot" icon="head-check">
          <AdmitPatientStepContentWrapper title="HealthSnapshot">
            <AdmitPatientStepHealthcheck v-model="healthSnapshot" />
          </AdmitPatientStepContentWrapper>
        </b-step-item>

        <b-step-item label="Severity" icon="priority-high">
          <AdmitPatientStepContentWrapper title="Severity">
            <AdmitPatientStepSeverity v-model="healthSnapshot.severity" />
          </AdmitPatientStepContentWrapper>
        </b-step-item>

        <b-step-item label="Done" icon="account">
          <AdmitPatientStepContentWrapper title="Review">
            <AdmitPatientStepFinish :complete="complete" />
          </AdmitPatientStepContentWrapper>
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
                @click.prevent="admitPatient"
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
import AdmitPatientStepContentWrapper from "@/components/Admissions/AdmitPatientStepContentWrapper.vue";
import AdmitPatientStepCommonSymptoms from "@/components/Admissions/AdmitPatientStepCommonSymptoms.vue";
import AdmitPatientStepRelatedConditions from "@/components/Admissions/AdmitPatientStepRelatedConditions.vue";
import AdmitPatientStepHealthcheck from "@/components/Admissions/AdmitPatientStepHealthcheck.vue";
import AdmitPatientStepSeverity from "@/components/Admissions/AdmitPatientStepSeverity.vue";
import AdmitPatientStepFinish from "@/components/Admissions/AdmitPatientStepFinish.vue";
import { mapState, mapActions } from "vuex";
import { ValidationObserver } from "vee-validate";

export default {
  components: {
    AdmitPatientStepContentWrapper,
    AdmitPatientStepCommonSymptoms,
    AdmitPatientStepRelatedConditions,
    AdmitPatientStepHealthcheck,
    AdmitPatientStepSeverity,

    AdmitPatientStepFinish,
    ValidationObserver,
  },
  methods: {
    ...mapActions("admission", [
      "saveCommonSymptoms",
      "saveRelatedConditions",
      "saveOverallWellbeing",
      "saveHealthcheck",
    ]),
    ...mapActions("workflow", ["createWorkflow", "resetState"]),

    nextStep(next) {
      if (this.activeStep === 0) {
        this.startWorkflow();
      }
      next.action();
    },

    setupSteps() {
      this.resetState();
      this.commonSymptoms = {};
      this.relatedConditions = {};
      this.overallWellbeing = {};
      this.healthSnapshot = { severity: "WHITE" };
      this.complete = false;
    },

    async startWorkflow() {
      try {
        await this.createWorkflow({
          workflow_type: "admit patient",
          patient: this.patient,
        });
      } catch (e) {
        console.log(e);
      }
    },

    async admitPatient() {
      try {
        await Promise.all([
          this.saveCommonSymptoms({ commonSymptoms: this.commonSymptoms, workflow: this.workflow }),
          this.saveRelatedConditions({ relatedConditions: this.relatedConditions, workflow: this.workflow }),
          this.saveOverallWellbeing({ overallWellbeing: this.overallWellbeing, workflow: this.workflow }),
          this.saveHealthcheck({ healthSnapshot: this.healthSnapshot, workflow: this.workflow }),
        ]);

        this.$router.push({ name: "backoffice.admission", params: { admission_id: this.admission.id } });
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
    ...mapState("admission", ["admission"]),
  },
  data() {
    return {
      activeStep: 0,
      // data
      commonSymptoms: {},
      overallWellbeing: {},
      relatedConditions: {},
      healthSnapshot: { severity: "WHITE" },
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
