<template>
  <section class="section">
    <ValidationObserver ref="observer">
      <b-steps v-model="activeStep" :animated="true" :has-navigation="false">
        <b-step-item label="Identification" icon="account">
          <FormStepContentWrapper title="Identification">
            <FormStepIdentification v-model="identification" />
          </FormStepContentWrapper>
        </b-step-item>

        <b-step-item label="Personal data" icon="account">
          <FormStepContentWrapper title="Personal data">
            <FormStepPersonalData v-model="personalData" />
          </FormStepContentWrapper>
        </b-step-item>

        <b-step-item label="Symptoms" icon="alert-circle-outline">
          <FormStepContentWrapper title="Symptoms">
            <FormStepCommonSymptoms v-model="commonSymptoms" />
          </FormStepContentWrapper>
        </b-step-item>

        <b-step-item label="Additional information" icon="plus">
          <FormStepContentWrapper title="Additional information">
            <FormStepRelatedConditions v-model="relatedConditions" />
          </FormStepContentWrapper>
        </b-step-item>

        <b-step-item label="Done" icon="check">
          <FormStepContentWrapper title="Final review">
            <FormStepFinish :submissionReview="submissionReview" />
          </FormStepContentWrapper>
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
              >
                Next step</b-button
              >
              <b-button
                v-else
                expanded
                rounded
                class="has-text-weight-bold"
                type="is-primary is-medium"
                @click.prevent="createTriage"
              >
                Finish</b-button
              >
              <br />
              <b-button
                type="is-text is-small"
                :disabled="previous.disabled"
                @click.prevent="previous.action"
              >
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
import FormStepContentWrapper from "@/components/Triage/FormStepContentWrapper.vue";
import FormStepIdentification from "@/components/Triage/FormStepIdentification.vue";
import FormStepPersonalData from "@/components/Triage/FormStepPersonalData.vue";
import FormStepCommonSymptoms from "@/components/Triage/FormStepCommonSymptoms.vue";
import FormStepRelatedConditions from "@/components/Triage/FormStepRelatedConditions.vue";
import FormStepFinish from "@/components/Triage/FormStepFinish.vue";
import { mapState, mapActions, mapGetters } from "vuex";
import { ValidationObserver } from "vee-validate";

export default {
  components: {
    FormStepContentWrapper,
    FormStepIdentification,
    FormStepPersonalData,
    FormStepCommonSymptoms,
    FormStepRelatedConditions,
    FormStepFinish,
    ValidationObserver
  },
  methods: {
    ...mapActions("forms", [
      "createSubmission",
      "savePersonalData",
      "saveCommonSymptoms",
      "saveRelatedConditions",
      "saveOverallWellbeing",
      "resetState"
    ]),
    async createTriage() {
      try {
        await this.createSubmission(this.identification);
        await Promise.all([
          this.savePersonalData(this.personalData),
          this.saveCommonSymptoms(this.commonSymptoms),
          this.saveRelatedConditions(this.relatedConditions),
          this.saveOverallWellbeing(this.commonSymptoms.overall_wellbeing)
        ]);
        await this.resetState;
        this.personalData = {};
        this.commonSymptoms = { overall_wellbeing: {} };
        this.relatedConditions = {};
        this.identification = {};
        this.activeStep = 0;
      } catch (e) {
        console.log(e);
      }
    }
  },
  computed: {
    ...mapState("forms", ["submission"]),
    ...mapGetters("forms", ["submissionReview"])
  },
  data() {
    return {
      activeStep: 0,
      // data
      personalData: {},
      commonSymptoms: { overall_wellbeing: {} },
      relatedConditions: {},
      identification: {}
    };
  }
};
</script>

<style></style>
