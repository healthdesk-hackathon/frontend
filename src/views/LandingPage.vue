<template>
  <div class="landing-page container is-multiline columns">
    <template v-if="formIdentificationActive">
      <FormIdentification
        @submit="createSubmission($event)"
        @cancel="formIdentificationActive = false"
      />
    </template>
    <template v-else>
      <div class="column is-full">
        <h1 class="has-text-primary has-text-centered title is-1">
          Healthdesk
        </h1>
      </div>
      <div class="has-text-centered has-text-grey column is-full">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
        consectetur ante vitae ligula tincidunt condimentum. Suspendisse
        potenti. Aliquam imperdiet tellus dui, vel ultricies enim tempus vitae.
        Curabitur eget turpis lobortis magna elementum dignissim ac ac lacus.
      </div>
      <div class="columns is-multiline links column is-full">
        <div class="column is-full has-text-centered">
          How can we help you?
        </div>
        <div class="column is-full">
          <b-button
            @click="formIdentificationActive = true"
            type="is-primary"
            rounded
            expanded
          >
            Find a medical center
          </b-button>
        </div>
      </div>
    </template>
  </div>
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
        this.$router.push({ name: "Form", params: { id: this.submission.id } });
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
