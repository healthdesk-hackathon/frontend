<template>
  <div>
    <h4 class="subtitle is-4 has-text-centered">Proceed to healthcheck</h4>
    <section class="section">
      <b-field label="Heart rate">
        <b-input type="number" v-model="model.heart_rate"></b-input>
      </b-field>

      <b-field label="Breathing rate">
        <b-input type="number" v-model="model.breathing_rate"></b-input>
      </b-field>

      <b-field label="Temperature">
        <b-input type="number" v-model="model.temperature"></b-input>
      </b-field>

      <b-field label="Blood pressure">
        <b-field>
          <b-input
            type="number"
            placeholder="Systolic"
            v-model="model.blood_pressure_systolic"
          ></b-input>

          <b-input
            type="number"
            placeholder="Diastolic"
            v-model="model.blood_pressure_diastolic"
          ></b-input>
        </b-field>
      </b-field>

      <b-field label="Oxygen saturation">
        <b-input type="number" v-model="model.oxygen_saturation"></b-input>
      </b-field>

      <b-field label="Glasgow Coma Scale">
        <b-field>
          <b-input
            type="number"
            placeholder="Eye"
            v-model="model.gcs_eye"
            min="1"
            max="4"
          ></b-input>

          <b-input
            type="number"
            placeholder="Verbal"
            v-model="model.gcs_verbal"
            min="1"
            max="5"
          ></b-input>

          <b-input
            type="number"
            placeholder="Motor"
            v-model="model.gcs_motor"
            min="1"
            max="6"
          ></b-input
        ></b-field>
      </b-field>

      <b-field label="Observations">
        <b-input
          type="textarea"
          maxlength="200"
          v-model="model.observations"
        ></b-input>
      </b-field>
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
