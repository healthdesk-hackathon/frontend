<template>
  <div class="form-step">
    <h1 class="title has-text-centered">{{ title }}</h1>
    <div class="columns">
      <div class="column is-half is-offset-one-quarter">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { required: true, type: String }
  }
};
</script>

<style lang="scss" scoped>
.form-step {
  padding: 3rem 1rem;
}
</style>
