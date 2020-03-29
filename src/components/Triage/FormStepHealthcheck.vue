<template>
  <div>
    <h4 class="subtitle is-4 has-text-centered">Proceed to healthcheck</h4>
    <section class="section">
      <b-v-input
        type="number"
        label="Heart rate"
        v-model="model.heart_rate"
        rules="required"
      ></b-v-input>

      <b-v-input
        type="number"
        label="Breathing rate"
        v-model="model.breathing_rate"
        rules="required"
      ></b-v-input>

      <b-v-input
        type="number"
        label="Blood pressure"
        v-model="model.blood_pressure"
        rules="required"
      ></b-v-input>

      <b-v-input
        type="number"
        label="Oxygen situation"
        v-model="model.oxygen_situtation"
        rules="required"
      ></b-v-input>

      <b-v-input
        type="number"
        label="GCS"
        v-model="model.gcs"
        rules="required"
      ></b-v-input>

      <b-v-input
        type="number"
        label="Temperature"
        v-model="model.temperature"
        rules="required"
      ></b-v-input>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    value: { type: Object, required: true }
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  }
};
</script>

<style></style>
