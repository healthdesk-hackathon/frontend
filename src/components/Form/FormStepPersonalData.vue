<template>
  <section>
    <b-field label="First Name">
      <b-input v-model="model.first_name"></b-input>
    </b-field>

    <b-field label="Last Name">
      <b-input v-model="model.last_name"></b-input>
    </b-field>

    <b-field grouped>
      <b-field label="Gender">
        <b-select v-model="model.gender">
          <option
            v-for="genderOption in genderOptions"
            :value="genderOption.key"
            :key="genderOption.key"
          >
            {{ genderOption.label }}
          </option>
        </b-select>
      </b-field>

      <b-field label="Date of birth" expanded>
        <b-datepicker v-model="model.date_of_birth"></b-datepicker>
      </b-field>
    </b-field>

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
