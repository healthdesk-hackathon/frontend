<template>
  <div>
    <h4 class="subtitle is-4 has-text-centered">Tell us more about yourself</h4>
    <section class="section">
      <b-v-input
        label="First Name"
        v-model="model.first_name"
        rules="required"
      ></b-v-input>

      <b-v-input
        label="Last Name"
        v-model="model.last_name"
        rules="required"
      ></b-v-input>

      <b-v-select
        label="Gender"
        v-model="model.gender"
        rules="required"
        expanded
      >
        <option
          v-for="genderOption in genderOptions"
          :value="genderOption.key"
          :key="genderOption.key"
        >
          {{ genderOption.label }}
        </option>
      </b-v-select>

      <b-v-date
        label="Date of birth"
        expanded
        v-model="model.date_of_birth"
      ></b-v-date>

      <!-- <b-field label="Street and number">
  <b-input v-model="model.street_and_number"></b-input>
  </b-field>

  <b-field grouped>
  <b-field label="Postal code">
  <b-input v-model="model.postal_code" type="Number"></b-input>
  </b-field>

  <b-field label="City" expanded>
  <b-input v-model="model.city" type="City"></b-input>
  </b-field>
  </b-field>

  <b-field label="Country">
  <b-input v-model="model.country" type="Country"></b-input>
  </b-field> -->
    </section>
  </div>
</template>

<script>
export default {
  props: {
    value: { type: Object, required: true }
  },
  data() {
    return {
      genderOptions: [
        { key: "M", label: "Male" },
        { key: "F", label: "Female" },
        { key: "O", label: "Other / Prefer not to say" }
      ]
    };
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
