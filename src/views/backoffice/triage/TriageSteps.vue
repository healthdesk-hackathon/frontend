<template>
  <section class="section">
    <ValidationObserver v-slot="{ invalid }">
      <b-steps v-model="activeStep" :animated="true" :has-navigation="false">
        <b-step-item label="Identification" icon="account-plus">
          <TriageStepContentWrapper title="Identification">
            <TriageStepIdentification :active="activeStep === 0" v-model="identification" />
          </TriageStepContentWrapper>
        </b-step-item>

        <b-step-item label="Personal data" icon="account">
          <TriageStepContentWrapper title="Personal data">
            <TriageStepPersonalData :active="activeStep === 1" v-model="personalData" />
          </TriageStepContentWrapper>
        </b-step-item>

        <b-step-item label="Symptoms" icon="alert-circle-outline">
          <TriageStepContentWrapper title="Symptoms">
            <TriageStepCommonSymptoms v-model="commonSymptoms" />
          </TriageStepContentWrapper>
        </b-step-item>

        <b-step-item label="Additional information" icon="plus">
          <TriageStepContentWrapper title="Additional information">
            <TriageStepRelatedConditions v-model="relatedConditions" />
          </TriageStepContentWrapper>
        </b-step-item>

        <b-step-item label="Healthcheck" icon="head-check">
          <TriageStepContentWrapper title="Healthcheck">
            <TriageStepHealthcheck v-model="healthcheck" />
          </TriageStepContentWrapper>
        </b-step-item>

        <b-step-item label="Severity" icon="priority-high">
          <TriageStepContentWrapper title="Severity">
            <TriageStepSeverity v-model="healthcheck.severity" />
          </TriageStepContentWrapper>
        </b-step-item>

        <b-step-item label="Done" icon="check">
          <TriageStepContentWrapper title="Final review">
            <TriageStepFinish :submissionReview="submissionReview" />
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
                @click.prevent="next.action"
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
                @click.prevent="createTriage"
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
import TriageStepIdentification from "@/components/Triage/TriageStepIdentification.vue";
import TriageStepPersonalData from "@/components/Triage/TriageStepPersonalData.vue";
import TriageStepCommonSymptoms from "@/components/Triage/TriageStepCommonSymptoms.vue";
import TriageStepRelatedConditions from "@/components/Triage/TriageStepRelatedConditions.vue";
import TriageStepHealthcheck from "@/components/Triage/TriageStepHealthcheck.vue";
import TriageStepSeverity from "@/components/Triage/TriageStepSeverity.vue";
import TriageStepFinish from "@/components/Triage/TriageStepFinish.vue";
import { mapState, mapActions, mapGetters } from "vuex";
import { ValidationObserver } from "vee-validate";

export default {
  components: {
    TriageStepContentWrapper,
    TriageStepIdentification,
    TriageStepPersonalData,
    TriageStepCommonSymptoms,
    TriageStepRelatedConditions,
    TriageStepHealthcheck,
    TriageStepSeverity,
    TriageStepFinish,
    ValidationObserver,
  },
  methods: {
    ...mapActions("submission", [
      "createSubmission",
      "createAdmission",
      "savePersonalData",
      "saveCommonSymptoms",
      "saveRelatedConditions",
      "saveOverallWellbeing",
      "saveHealthcheck",
      "resetState",
    ]),
    async createTriage() {
      try {
        await this.createSubmission(this.identification);
        await this.createAdmission();
        await Promise.all([
          this.savePersonalData(this.personalData),
          this.saveCommonSymptoms(this.commonSymptoms),
          this.saveRelatedConditions(this.relatedConditions),
          this.saveOverallWellbeing(this.commonSymptoms.overall_wellbeing),
          this.saveHealthcheck(this.healthcheck),
        ]);
        await this.resetState;
        this.personalData = {};
        this.commonSymptoms = { overall_wellbeing: {} };
        this.relatedConditions = {};
        this.identification = {};
        this.healthcheck = { severity: "WHITE" };
        this.admission = {};
        this.activeStep = 0;
      } catch (e) {
        console.log(e);
      }
    },
  },
  computed: {
    ...mapState("submission", ["submission"]),
    ...mapGetters("submission", ["submissionReview"]),
  },
  data() {
    return {
      activeStep: 0,
      // data
      personalData: {},
      commonSymptoms: { overall_wellbeing: {} },
      relatedConditions: {},
      identification: {},
      healthcheck: { severity: "WHITE" },
      admission: {},
    };
  },
};
</script>

<style></style>
