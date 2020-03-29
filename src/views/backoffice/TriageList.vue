<template>
  <div>
    <h1 class="title is-2">
      {{ showTreatedOnly ? "Treated submissions" : "New submissions" }}
    </h1>
    <section class="section">
      <!-- <b-table :data="data" :columns="columns"></b-table> -->
    </section>
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
