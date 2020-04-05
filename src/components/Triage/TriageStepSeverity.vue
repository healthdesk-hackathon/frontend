<template>
  <div>
    <h4></h4>
    <section class="section">
      <div class="columns is-centered">
        <div class="column is-narrow">
          <b-field
            ><b-radio
              v-model="model"
              name="name"
              size="is-medium"
              native-value="WHITE"
            >
              White (dismissal)
            </b-radio></b-field
          >
          <b-field
            ><b-radio
              v-model="model"
              name="name"
              size="is-medium"
              native-value="GREEN"
            >
              Green
            </b-radio></b-field
          >
          <b-field
            ><b-radio
              v-model="model"
              name="name"
              size="is-medium"
              native-value="YELLOW"
            >
              Yellow
            </b-radio></b-field
          >
          <b-field
            ><b-radio
              v-model="model"
              name="name"
              size="is-medium"
              native-value="RED"
            >
              Red
            </b-radio></b-field
          >
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    value: { type: String, required: true }
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
