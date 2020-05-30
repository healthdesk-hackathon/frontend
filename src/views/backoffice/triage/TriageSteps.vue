<template>
  <section class="section">
    <ValidationObserver v-slot="{ invalid }">
      <b-steps v-model="activeStep" :animated="true" :has-navigation="false">
        <b-step-item label="Identification" icon="account-plus">
          <TriageStepContentWrapper title="Identification">
            <RegisterPatientStepIdentification :active="activeStep === 0" v-model="identification" />
          </TriageStepContentWrapper>
        </b-step-item>

        <b-step-item label="Personal data" icon="account">
          <TriageStepContentWrapper title="Personal data">
            <RegisterPatientStepPersonalData :active="activeStep === 1" v-model="personalData" />
          </TriageStepContentWrapper>
        </b-step-item>

        <b-step-item label="Symptoms" icon="alert-circle-outline">
          <TriageStepContentWrapper title="Symptoms">
            <AdmitPatientStepCommonSymptoms v-model="commonSymptoms" :overall_wellbeing="overallWellbeing" />
          </TriageStepContentWrapper>
        </b-step-item>

        <b-step-item label="Additional information" icon="plus">
          <TriageStepContentWrapper title="Additional information">
            <AdmitPatientStepRelatedConditions v-model="relatedConditions" />
          </TriageStepContentWrapper>
        </b-step-item>

        <b-step-item label="HealthSnapshot" icon="head-check">
          <TriageStepContentWrapper title="HealthSnapshot">
            <AdmitPatientStepHealthcheck v-model="health_snapshot" />
          </TriageStepContentWrapper>
        </b-step-item>

        <b-step-item label="Severity" icon="priority-high">
          <TriageStepContentWrapper title="Severity">
            <AdmitPatientStepSeverity v-model="health_snapshot.severity" />
          </TriageStepContentWrapper>
        </b-step-item>

        <b-step-item label="Done" icon="check">
          <TriageStepContentWrapper title="Final review">
            <TriageStepFinish :complete="complete" />
          </TriageStepContentWrapper>
        </b-step-item>
        <template slot="navigation" slot-scope="{ previous, next }">
          <div class=" columns is-centered">
            <div class="column is-half has-text-centered">
              <b-button
                v-if="!next.disabled"
                expanded
                rounded
                class="has-text-weight-bold"
                type="is-primary is-medium"
                @click.prevent="nextStep(next)"
                :disabled="invalid"
              >
                Next step
              </b-button>
              <b-button
                v-else
                expanded
                rounded
                class="has-text-weight-bold"
                type="is-primary is-medium"
                @click.prevent="triageSubmission"
              >
                Submit
              </b-button>
              <br />
              <b-button type="is-text is-small" :disabled="previous.disabled" @click.prevent="previous.action">
                Previous step
              </b-button>
            </div>
          </div>
        </template>
      </b-steps>
    </ValidationObserver>
  </section>
</template>

<script>
import TriageStepContentWrapper from "@/components/Triage/TriageStepContentWrapper.vue";
import RegisterPatientStepIdentification from "@/components/Patients/RegisterPatientStepIdentification.vue";
import RegisterPatientStepPersonalData from "@/components/Patients/RegisterPatientStepPersonalData.vue";
import AdmitPatientStepCommonSymptoms from "@/components/Admissions/AdmitPatientStepCommonSymptoms.vue";
import AdmitPatientStepRelatedConditions from "@/components/Admissions/AdmitPatientStepRelatedConditions.vue";
import AdmitPatientStepHealthcheck from "@/components/Admissions/AdmitPatientStepHealthcheck.vue";
import AdmitPatientStepSeverity from "@/components/Admissions/AdmitPatientStepSeverity.vue";
import TriageStepFinish from "@/components/Triage/TriageStepFinish.vue";
import { mapState, mapActions } from "vuex";
import { ValidationObserver } from "vee-validate";

export default {
  components: {
    TriageStepContentWrapper,
    RegisterPatientStepIdentification,
    RegisterPatientStepPersonalData,
    AdmitPatientStepCommonSymptoms,
    AdmitPatientStepRelatedConditions,
    AdmitPatientStepHealthcheck,
    AdmitPatientStepSeverity,
    TriageStepFinish,
    ValidationObserver,
  },
  methods: {
    ...mapActions("workflow", ["createWorkflow", "resetState"]),
    ...mapActions("patient", ["savePatientIdentifier", "savePersonalData"]),
    ...mapActions("admission", [
      "saveCommonSymptoms",
      "saveRelatedConditions",
      "saveOverallWellbeing",
      "saveHealthcheck",
    ]),

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
      this.commonSymptoms = {};
      this.relatedConditions = {};
      this.overallWellbeing = {};
      this.healthSnapshot = { severity: "WHITE" };
      this.complete = false;
    },

    async startWorkflow() {
      try {
        await this.createWorkflow({
          workflow_type: "triage submission",
        });
      } catch (e) {
        console.log(e);
      }
    },

    async triageSubmission() {
      try {
        await Promise.all([
          this.savePatientIdentifier({ patientIdentifier: this.identification, workflow: this.workflow }),
          this.savePersonalData({ personalData: this.personalData, workflow: this.workflow }),
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
      complete: false,
      // data
      personalData: {},
      commonSymptoms: {},
      overallWellbeing: {},
      relatedConditions: {},
      identification: {},
      health_snapshot: { severity: "WHITE" },
    };
  },
};
</script>

<style></style>
