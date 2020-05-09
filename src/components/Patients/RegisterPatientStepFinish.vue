<template>
  <div>
    <h4 class="subtitle is-4 has-text-centered">
      If everything is in order, you now the submit the admission.
    </h4>
    <section class="section">
      <div class="columns is-centered" v-if="personalData">
        <div class="column is-narrow">
          <table class="table">
            <tbody>
              <tr v-if="personalData.first_name">
                <td class="has-text-weight-semibold">First Name</td>
                <td>{{ personalData.first_name }}</td>
              </tr>
              <tr v-if="personalData.last_name">
                <td class="has-text-weight-semibold">Last Name</td>
                <td>{{ personalData.last_name }}</td>
              </tr>
              <tr v-if="personalData.gender">
                <td class="has-text-weight-semibold">Gender</td>
                <td>{{ personalData.gender }}</td>
              </tr>
              <tr v-if="personalData.date_of_birth">
                <td class="has-text-weight-semibold">Date of Birth</td>
                <td>{{ personalData.date_of_birth }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="has-text-centered" v-else>
        <h5 class="is-size-5">
          Nothing to review, please add some data first.
        </h5>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    personalData: { type: Object, required: false, default: null },
  },
};
</script>

<style></style>
