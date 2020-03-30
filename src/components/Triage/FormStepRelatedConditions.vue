<template>
  <div>
    <h4 class="subtitle is-4 has-text-centered">
      Does the patient have any preexisting condition?
    </h4>
    <section class="section">
      <div class="columns">
        <div class="column">
          <b-switch size="is-medium" v-model="model.heart_condition"
            >Heart condition</b-switch
          ><br />
          <b-switch size="is-medium" v-model="model.high_blood_pressure"
            >High blood pressure</b-switch
          ><br />
          <b-switch size="is-medium" v-model="model.asthma">Asthma</b-switch
          ><br />

          <b-switch size="is-medium" v-model="model.chronic_lung_problems"
            >Chronic lung problems</b-switch
          ><br />

          <b-switch size="is-medium" v-model="model.mild_diabetes"
            >Mild diabetes</b-switch
          ><br />
          <b-switch size="is-medium" v-model="model.take_immunosuppressants"
            >Taking Immunosuppressants</b-switch
          ><br />
        </div>
        <div class="column">
          <b-switch size="is-medium" v-model="model.past_chemo"
            >Past chemo</b-switch
          ><br />
          <b-switch size="is-medium" v-model="model.current_chemo"
            >Current chemo</b-switch
          ><br />
          <b-switch size="is-medium" v-model="model.pregnant">Pregnant</b-switch
          ><br />
          <b-switch size="is-medium" v-model="model.chronic_diabetes"
            >Chronic diabetes</b-switch
          ><br />

          <b-switch size="is-medium" v-model="model.smoke">Smoker</b-switch
          ><br />
        </div>
      </div>
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

<style lang="scss" scoped>
.column .switch {
  margin-bottom: 1rem;
}
</style>
