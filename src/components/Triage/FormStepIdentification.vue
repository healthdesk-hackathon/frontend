<template>
  <ValidationObserver ref="observer">
    <div>
      <h1 class="title is-1 is-spaced has-text-centered">Identification</h1>
      <div class="columns is-centered">
        <div class="column is-half">
          <h1 class="subtitle is-4 has-text-centered">
            Identify the patient
          </h1>
          <section class="section">
            <b-v-select
              placeholder="Choose ID, email, insurance number..."
              v-model="identification.identifierType"
              expanded
              rules="required"
            >
              <option
                v-for="identifierTypeOption in identifierTypeOptions"
                :value="identifierTypeOption.key"
                :key="identifierTypeOption.key"
              >
                {{ identifierTypeOption.label }}
              </option>
            </b-v-select>
            <b-v-input
              v-if="identification.identifierType"
              :rules="idRules"
              :placeholder="inputPlaceholder"
              v-model="identification.identifier"
            ></b-v-input>
          </section>
        </div>
      </div>
    </div>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver } from "vee-validate";

export default {
  name: "FormIdentification",
  components: { ValidationObserver },
  props: { value: { type: Object, required: true } },
  computed: {
    identification: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", this.value);
      }
    },
    inputPlaceholder() {
      const selectedIdType = this.identification.identifierType;
      const match = this.identifierTypeOptions.find(
        ito => ito.key === selectedIdType
      );
      return match ? `Type in your ${match.label}` : "Nothing selected";
    },
    idRules() {
      const rules = ["required"];
      const type = this.identification.identifierType
        ? this.identification.identifierType
        : null;
      if (type) {
        const opt = this.identifierTypeOptions.find(o => o.key === type);
        if (opt.rules) {
          rules.push(...opt.rules);
        }
      }

      return rules.reduce((acc, value) => ({ ...acc, [value]: true }), {});
    }
  },
  data() {
    return {
      identifierTypeOptions: [
        { key: "TEL", label: "Phone number", rules: ["phoneNumber"] },
        { key: "EMAIL", label: "Email", rules: ["email"] },
        { key: "AHV", label: "AHV number" },
        { key: "INS", label: "Other Insurance number" },
        { key: "ID", label: "ID or Passport number" }
      ]
    };
  }
};
</script>

<style lang="scss"></style>
