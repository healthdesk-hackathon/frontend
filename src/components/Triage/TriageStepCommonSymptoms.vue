<template>
  <div>
    <h4 class="subtitle is-4 has-text-centered">
      Describe the patient's general condition
    </h4>

    <section class="section">
      <h5 class="subtitle is-5 has-text-centered">
        How does the patient feel overall?
      </h5>
      <b-slider
        :min="1"
        :max="10"
        ticks
        v-model="model.overall_wellbeing.overall_value"
        size="is-medium"
      ></b-slider>
      <h5 class="subtitle is-5 has-text-centered">
        0 (very bad) to 10 (very good)
      </h5>
    </section>
    <section class="section">
      <h5 class="subtitle is-5 has-text-centered">
        Which symptoms does the patient have?
      </h5>
      <br />

      <div class="columns">
        <div class="column">
          <b-switch size="is-medium" v-model="model.chills">Chills</b-switch
          ><br />
          <b-switch size="is-medium" v-model="model.achy_joints_muscles"
            >Achy joints & muscles</b-switch
          ><br />
          <b-switch size="is-medium" v-model="model.lost_taste_smell"
            >Loss of taste or smell</b-switch
          ><br />

          <b-switch size="is-medium" v-model="model.runny_nose"
            >Runny nose</b-switch
          ><br />

          <b-switch size="is-medium" v-model="model.stomach_disturbance"
            >Stomach disturbance</b-switch
          ><br />

          <b-switch size="is-medium" v-model="model.nauseous">Nauseous</b-switch
          ><br />
          <b-switch size="is-medium" v-model="model.short_of_breath"
            >Short of breath</b-switch
          >
        </div>
        <div class="column">
          <b-switch size="is-medium" v-model="model.congestion"
            >Congestion</b-switch
          ><br />
          <b-switch size="is-medium" v-model="model.hedache">Headache</b-switch
          ><br />
          <b-switch size="is-medium" v-model="model.tiredness"
            >Tiredness</b-switch
          ><br />

          <b-switch size="is-medium" v-model="model.fever">Fever</b-switch
          ><br />

          <b-switch size="is-medium" v-model="model.dry_cough"
            >Dry cough</b-switch
          ><br />
          <b-switch size="is-medium" v-model="model.cough_with_sputum"
            >Cough with sputum</b-switch
          ><br />
          <b-switch size="is-medium" v-model="model.sore_throat"
            >Sore throat</b-switch
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
