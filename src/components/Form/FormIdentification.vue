<template>
  <div class="container">
    <h1 class="title is-1 has-text-centered">Identification</h1>
    <div class="columns">
      <div class="column is-half is-offset-one-quarter">
        <h1 class="subtitle is-4 has-text-centered">
          We need something to identify you
        </h1>
        <p>
          Please choose from one of the identification types below and provide
          us the correct input for it. We will use this to get back to you.
        </p>
        <section class="subsection">
          <b-field label="Identifier type">
            <b-select v-model="identification.identifierType">
              <option
                v-for="identifierTypeOption in identifierTypeOptions"
                :value="identifierTypeOption.key"
                :key="identifierTypeOption.key"
              >
                {{ identifierTypeOption.label }}
              </option>
            </b-select>
          </b-field>
          <b-field>
            <b-input v-model="identification.identifier"></b-input>
          </b-field>
        </section>
        <br />
        <section class="subsection">
          <b-button
            expanded
            rounded
            class="has-text-weight-bold"
            type="is-primary is-large"
            @click="$emit('submit', identification)"
          >
            Start</b-button
          >
          <br />
          <b-button type="is-text is-small" @click="$emit('cancel')">
            Cancel
          </b-button>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FormIdentification",
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

<style lang="scss">
.subsection {
  padding-top: 3rem;
}
</style>
