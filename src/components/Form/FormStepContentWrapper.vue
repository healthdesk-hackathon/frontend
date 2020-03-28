<template>
  <div class="form-step">
    <h1 class="title is-1 has-text-centered">{{ title }}</h1>
    <div class="columns is-centered">
      <div class="column is-half">
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
