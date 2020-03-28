<template>
  <b-steps v-model="activeStep" :animated="true" :has-navigation="true">
    <b-step-item label="Account">
      <h1 class="title has-text-centered">Account</h1>
      Lorem ipsum dolor sit amet.
    </b-step-item>

    <b-step-item label="Profile">
      <h1 class="title has-text-centered">Profile</h1>
      Lorem ipsum dolor sit amet.
    </b-step-item>

    <b-step-item label="Finish">
      <h1 class="title has-text-centered">Finish</h1>
      Lorem ipsum dolor sit amet.
    </b-step-item>
  </b-steps>
</template>

<script>
export default {
  data() {
    return {
      activeStep: 0
    };
  }
};
</script>

<style></style>
