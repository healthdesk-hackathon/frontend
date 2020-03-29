<template>
  <div>
    <h4></h4>
    <section class="section">
      <div class="block">
        <b-radio v-model="model" name="name" native-value="WHITE">
          White (dismissal)
        </b-radio>
        <b-radio v-model="model" name="name" native-value="GREEN">
          Green
        </b-radio>
        <b-radio v-model="model" name="name" native-value="YELLOW">
          Yellow
        </b-radio>
        <b-radio v-model="model" name="name" native-value="RED" disabled>
          Red
        </b-radio>
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
