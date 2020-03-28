<template>
  <div>
    <h1 class="title is-1 is-spaced has-text-centered">Identification</h1>
    <div class="columns">
      <div class="column is-half is-offset-one-quarter">
        <h1 class="subtitle is-4 has-text-centered">
          We need a way to identify you.<br />
          Choose what's easiest for you but please make sure it's correct 🙏
        </h1>
        <section class="section">
          <b-field>
            <b-select
              placeholder="Choose ID, email, insurance number..."
              v-model="identification.identifierType"
              expanded
            >
              <option
                v-for="identifierTypeOption in identifierTypeOptions"
                :value="identifierTypeOption.key"
                :key="identifierTypeOption.key"
              >
                {{ identifierTypeOption.label }}
              </option>
            </b-select>
          </b-field>
          <b-field v-if="identification.identifierType">
            <b-input
              :placeholder="inputPlaceholder"
              v-model="identification.identifier"
            ></b-input>
          </b-field>
        </section>
        <br />
        <div class="section has-text-centered">
          <b-button
            expanded
            rounded
            class="has-text-weight-bold"
            type="is-primary is-medium"
            @click="$emit('submit', identification)"
          >
            Identify</b-button
          >
          <br />
          <b-button type="is-text is-small" @click="$emit('cancel')">
            Cancel
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FormIdentification",
  computed: {
    inputPlaceholder() {
      const selectedIdType = this.identification.identifierType;
      const match = this.identifierTypeOptions.find(
        ito => ito.key === selectedIdType
      );
      return match ? `Type in your ${match.label}` : "Nothing selected";
    }
  },
  data() {
    return {
      identification: {},
      identifierTypeOptions: [
        { key: "TEL", label: "Phone number" },
        { key: "EMAIL", label: "Email" },
        { key: "AHV", label: "AHV number" },
        { key: "INS", label: "Other Insurance number" },
        { key: "ID", label: "ID or Passport number" }
      ]
    };
  }
};
</script>

<style lang="scss"></style>
