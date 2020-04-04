<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-half">
          <h1 class="title has-text-centered is-2">
            Login
          </h1>
          <ValidationObserver
            tag="form"
            @submit.prevent="login()"
            v-slot="{ invalid }"
          >
            <section class="section">
              <b-v-input rules="required" label="Username" v-model="username" />
              <b-v-input
                rules="required"
                label="Password"
                type="password"
                v-model="password"
              />
            </section>
            <div class="field is-centered has-text-centered">
              <div class="column is-offset-one-quarter is-half">
                <b-button
                  class="has-text-weight-bold"
                  type="is-primary"
                  native-type="submit"
                  rounded
                  expanded
                  :disabled="invalid"
                  size="is-medium"
                  >Start
                </b-button>
              </div>
            </div>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ValidationObserver } from "vee-validate";

export default {
  name: "Login",
  components: {
    ValidationObserver
  },
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    async login() {
      await this.$store.dispatch("auth/login", {
        username: this.username,
        password: this.password
      });

      await this.$router.push({ name: "backoffice.triageNew" });
    }
  }
};
</script>

<style scoped></style>
