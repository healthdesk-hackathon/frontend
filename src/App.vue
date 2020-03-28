<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
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
</style>
