<template>
  <b-steps v-model="activeStep" :animated="true" :has-navigation="false">
    <b-step-item label="Personal data" icon="account">
      <FormStepContent title="Personal data">
        Your personal data
      </FormStepContent>
    </b-step-item>

    <b-step-item label="Symptoms" icon="alert-circle-outline">
      <FormStepContent title="Symptoms">
        Your symptoms
      </FormStepContent>
    </b-step-item>

    <b-step-item label="Additional information" icon="plus">
      <FormStepContent title="Additional information">
        Your personal data
      </FormStepContent>
    </b-step-item>

    <b-step-item label="Finish" icon="check">
      <FormStepContent title="Finish">
        Finish the whole thing
      </FormStepContent>
    </b-step-item>
    <template slot="navigation" slot-scope="{ previous, next }">
      <div class="has-text-centered">
        <b-button
          expanded
          rounded
          class="has-text-weight-bold"
          type="is-primary is-large"
          :disabled="next.disabled"
          @click.prevent="next.action"
        >
          Next step</b-button
        ><br />
        <b-button
          type="is-text is-small"
          :disabled="previous.disabled"
          @click.prevent="previous.action"
        >
          Previous step
        </b-button>
      </div>
    </template>
  </b-steps>
</template>

<script>
import FormStepContent from "@/components/FormStepContent.vue";

export default {
  components: {
    FormStepContent
  },
  data() {
    return {
      activeStep: 0
    };
  }
};
</script>

<style></style>
