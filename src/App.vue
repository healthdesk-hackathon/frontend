<template>
  <div id="app">
    <!-- <router-link to="/example">Example</router-link> -->
    <div class="section">
      <div class="container">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App"
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
</style>
