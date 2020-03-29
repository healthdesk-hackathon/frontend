<template>
  <div>
    <h4 class="subtitle is-4 has-text-centered">
      Please review your data and confirm
    </h4>
    <section class="section">
      <div class="columns is-centered" v-if="submissionReview">
        <div class="column is-narrow">
          <table class="table">
            <tbody>
              <tr v-if="submissionReview.first_name">
                <td class="has-text-weight-semibold">First Name</td>
                <td>{{ submissionReview.first_name }}</td>
              </tr>
              <tr v-if="submissionReview.last_name">
                <td class="has-text-weight-semibold">Last Name</td>
                <td>{{ submissionReview.last_name }}</td>
              </tr>
              <tr v-if="submissionReview.gender">
                <td class="has-text-weight-semibold">Gender</td>
                <td>{{ submissionReview.gender }}</td>
              </tr>
              <tr v-if="submissionReview.date_of_birth">
                <td class="has-text-weight-semibold">Date of Birth</td>
                <td>{{ submissionReview.date_of_birth }}</td>
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
    submissionReview: { type: Object, required: false, default: null }
  }
};
</script>

<style></style>
