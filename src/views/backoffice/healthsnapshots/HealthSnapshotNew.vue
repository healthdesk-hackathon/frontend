<template>
  <div>
    <section class="section">
      <h1 class="title is-2">
        New Health Snapshot
      </h1>

      <b-field label="Admission">
        <b-select
          placeholder="Select an admission"
          v-model="healthSnapshot.admission"
        >
          <option
            v-for="admission in admissions"
            :value="admission.id"
            :key="admission.id"
          >
            Patient: {{ admission.patient }}
          </option>
        </b-select>
      </b-field>

      <b-field label="Heart rate">
        <b-input type="number" v-model="healthSnapshot.heart_rate"></b-input>
      </b-field>

      <b-field label="Breathing rate">
        <b-input
          type="number"
          v-model="healthSnapshot.breathing_rate"
        ></b-input>
      </b-field>

      <b-field label="Temperature">
        <b-input
          type="number"
          step="0.1"
          v-model="healthSnapshot.temperature"
        ></b-input>
      </b-field>

      <b-field label="Blood pressure">
        <b-field>
          <b-input
            expanded
            type="number"
            placeholder="Systolic"
            v-model="healthSnapshot.blood_pressure_systolic"
          ></b-input>

          <b-input
            expanded
            type="number"
            placeholder="Diastolic"
            v-model="healthSnapshot.blood_pressure_diastolic"
          ></b-input>
        </b-field>
      </b-field>

      <b-field label="Oxygen saturation">
        <b-input
          type="number"
          v-model="healthSnapshot.oxygen_saturation"
        ></b-input>
      </b-field>

      <b-field label="Glasgow Coma Scale">
        <b-field>
          <b-input
            type="number"
            placeholder="Eye"
            v-model="healthSnapshot.gcs_eye"
            min="1"
            max="4"
            expanded
          ></b-input>

          <b-input
            type="number"
            placeholder="Verbal"
            v-model="healthSnapshot.gcs_verbal"
            min="1"
            max="5"
            expanded
          ></b-input>

          <b-input
            type="number"
            placeholder="Motor"
            v-model="healthSnapshot.gcs_motor"
            min="1"
            max="6"
            expanded
          ></b-input
        ></b-field>
      </b-field>

      <b-field label="Observations">
        <b-input
          type="textarea"
          maxlength="200"
          v-model="healthSnapshot.observations"
        ></b-input>
      </b-field>
      <p class="is-size-6 has-text-weight-bold" style="padding-bottom: 0.5rem">
        Severity
      </p>
      <b-field>
        <b-radio
          v-model="healthSnapshot.severity"
          name="name"
          size="is-medium"
          native-value="WHITE"
        >
          White (dismissal) </b-radio
        ><b-radio
          v-model="healthSnapshot.severity"
          name="name"
          size="is-medium"
          native-value="GREEN"
        >
          Green
        </b-radio>
        <b-radio
          v-model="healthSnapshot.severity"
          name="name"
          size="is-medium"
          native-value="YELLOW"
        >
          Yellow
        </b-radio>
        <b-radio
          v-model="healthSnapshot.severity"
          name="name"
          size="is-medium"
          native-value="RED"
        >
          Red
        </b-radio></b-field
      >
    </section>
    <section class="section">
      <b-button
        expanded
        rounded
        class="has-text-weight-bold"
        type="is-primary is-medium"
        @click.prevent="createHealthSnapshot(healthSnapshot)"
      >
        Submit
      </b-button>
    </section>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      healthSnapshot: {}
    };
  },
  computed: {
    ...mapState("admissions", ["admissions"])
  },
  methods: {
    ...mapActions("healthsnapshots", ["createHealthSnapshot"])
  }
};
</script>

<style></style>
