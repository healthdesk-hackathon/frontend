<template>
  <div id="app">
    <!-- <router-link to="/example">Example</router-link> -->
    <router-view />
    <div id="help-button">
      <b-button
        type="is-warning"
        size="is-medium"
        icon-right="help"
        rounded
        @click="isCardModalActive = true"
        ><span class="has-text-weight-bold">Help</span></b-button
      >
    </div>
    <b-modal :active.sync="isCardModalActive" :width="640" scroll="keep">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title is-centered">
            How to use this demo
          </p>
        </header>
        <div class="card-content">
          <h4 class="is-size-4">Public form</h4>
          <p>
            <span @click="isCardModalActive = false"
              ><router-link
                :to="{ name: 'Frontoffice.LandingPage' }"
                @click="isCardModalActive = false"
                >The public form</router-link
              ></span
            >
            is meant to be filled out by patients at home or anytime before they
            come to the field hospital.
          </p>
          <br />
          <h4 class="is-size-4">Nurse form</h4>
          <p>
            <span @click="isCardModalActive = false"
              ><router-link :to="{ name: 'Backoffice.TriageNew' }"
                >The nurse form</router-link
              ></span
            >
            is meant to be filled out by a nurse directly at the field hospital.
            It is the backoffice of the application, holds much more
            information, and serves as a triage for admission.
          </p>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      isCardModalActive: false
    };
  }
};
</script>

<style lang="scss">
// All custom theme variables are prepended automatically to every component (and thus usable in there without an import).
// Check vue.config.js and styles/theme.scss. Order below matters.

// Import custom styles
@import "@/assets/styles/styles.scss";

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";

body {
  height: 100vh;
}

#help-button {
  position: fixed;
  right: 10px;
  bottom: 10px;
}
</style>
