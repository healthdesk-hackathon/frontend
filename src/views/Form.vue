<template>
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

    <b-step-item label="Finish" icon="check">
      <FormStepContentWrapper title="Finish">
        Finish the whole thing
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
            type="is-primary is-large"
            @click.prevent="save(next.action)"
          >
            Next step</b-button
          >
          <b-button
            v-else
            expanded
            rounded
            class="has-text-weight-bold"
            type="is-primary is-large"
            @click.prevent="saveSubmission"
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
</template>

<script>
import FormStepContentWrapper from "@/components/Form/FormStepContentWrapper.vue";
import FormStepPersonalData from "@/components/Form/FormStepPersonalData.vue";
import FormStepCommonSymptoms from "@/components/Form/FormStepCommonSymptoms.vue";
import FormStepRelatedConditions from "@/components/Form/FormStepRelatedConditions.vue";
import { mapState, mapActions } from "vuex";

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
      "saveSubmission",
      "savePersonalData",
      "saveCommonSymptoms"
    ]),
    async save(cb) {
      switch (this.activeStep) {
        case 0:
          await this.savePersonalData(this.personalData);
          cb();
          break;
        case 1:
          await this.saveCommonSymptoms(this.commonSymptoms);
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
    FormStepRelatedConditions
  },
  computed: {
    ...mapState("forms", ["submission"])
  },
  data() {
    return {
      activeStep: 0,
      // data
      personalData: {},
      phone: {},
      commonSymptoms: {},
      relatedConditions: {}
    };
  }
};
</script>

<style></style>
