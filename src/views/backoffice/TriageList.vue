<template>
  <div>
    <h1>{{ showTreatedOnly }}</h1>
    <router-view />
  </div>
</template>

<script>
export default {
  props: {
    showTreatedOnly: { type: Boolean, required: false, default: false }
  }
};
</script>

<style></style>
