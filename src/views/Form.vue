<template>
  <section class="section">
    <b-steps v-model="activeStep" :animated="true" :has-navigation="false">
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
        <div class=" columns">
          <div class="column is-half is-offset-one-quarter has-text-centered">
            <b-button
              v-if="!next.disabled"
              expanded
              rounded
              class="has-text-weight-bold"
              type="is-primary is-medium"
              @click.prevent="save(next.action)"
            >
              Next step</b-button
            >
            <b-button
              v-else
              expanded
              rounded
              class="has-text-weight-bold"
              type="is-primary is-medium"
              @click.prevent="submissionOver"
            >
              Finish</b-button
            >
            <br />
            <b-button
              type="is-text is-small"
              :disabled="previous.disabled"
              @click.prevent="save(previous.action)"
            >
              Previous step
            </b-button>
          </div>
        </div>
      </template>
    </b-steps>
  </section>
</template>

<script>
import FormStepContentWrapper from "@/components/Form/FormStepContentWrapper.vue";
import FormStepPersonalData from "@/components/Form/FormStepPersonalData.vue";
import FormStepCommonSymptoms from "@/components/Form/FormStepCommonSymptoms.vue";
import FormStepRelatedConditions from "@/components/Form/FormStepRelatedConditions.vue";
import FormStepFinish from "@/components/Form/FormStepFinish.vue";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  props: {
    id: { type: String, required: true }
  },
  mounted() {
    this.getSubmissionByID(this.id);
  },
  methods: {
    ...mapActions("forms", [
      "getSubmissionByID",
      "savePersonalData",
      "saveCommonSymptoms",
      "saveRelatedConditions",
      "saveOverallWellbeing"
    ]),
    submissionOver() {
      alert(
        "Congrats, you reached the end of actual implemented features in frontend. See you next when further progress are made ;)"
      );
    },
    async save(cb) {
      switch (this.activeStep) {
        case 0:
          await this.savePersonalData(this.personalData);
          cb();
          break;
        case 1:
          await Promise.all([
            this.saveCommonSymptoms(this.commonSymptoms),
            this.saveOverallWellbeing(this.commonSymptoms.overall_wellbeing)
          ]);
          cb();
          break;
        case 2:
          await this.saveRelatedConditions(this.relatedConditions);
          cb();
          break;
        default:
          console.error("Unknown operation");
      }
    }
  },
  components: {
    FormStepContentWrapper,
    FormStepPersonalData,
    FormStepCommonSymptoms,
    FormStepRelatedConditions,
    FormStepFinish
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
      phone: {},
      commonSymptoms: { overall_wellbeing: {} },
      relatedConditions: {}
    };
  }
};
</script>

<style></style>
