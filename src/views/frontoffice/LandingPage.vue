<template>
  <section class="section">
    <FormIdentification
      v-if="formIdentificationActive"
      @submit="createSubmission($event)"
      @cancel="formIdentificationActive = false"
    />
    <div v-else>
      <h1 class="has-text-centered title is-1 is-spaced">
        Healthdesk
      </h1>
      <h1 class="has-text-centered subtitle is-4">
        Do you think you have COVID-19 (Corona Virus) Symptoms?<br />
        Let us help you by answering a few questions 👇
      </h1>
      <br />
      <div class="columns is-centered has-text-centered">
        <div class="column is-half">
          <b-button
            class="has-text-weight-bold cta-button"
            @click="formIdentificationActive = true"
            type="is-primary"
            rounded
            expanded
            size="is-medium"
            >Start
          </b-button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import FormIdentification from "@/components/Form/FormIdentification.vue";

export default {
  name: "LandingPage",
  components: {
    FormIdentification
  },
  computed: {
    ...mapState("forms", ["submission"])
  },
  data() {
    return {
      formIdentificationActive: false
    };
  },
  methods: {
    async createSubmission(identification) {
      try {
        this.formIdentificationActive = true;
        await this.$store.dispatch("forms/createSubmission", identification);
        this.$router.push({ name: "form", params: { id: this.submission.id } });
      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.links {
  margin-top: 1rem;
}
</style>
