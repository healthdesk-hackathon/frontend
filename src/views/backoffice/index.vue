<template>
  <div class="has-background-white-bis">
    <TheNavigation />
    <div class="columns">
      <div class="column is-narrow has-background-white" id="menu-column">
        <!-- TODO: fix this column on scroll -->
        <section class="section">
          <TheSideBar />
        </section>
      </div>
      <div class="column">
        <section class="section">
          <div class="box">
            <router-view />
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import TheSideBar from "@/components/Dashboard/TheSidebar";
import TheNavigation from "@/components/Dashboard/TheNavigation";

export default {
  components: {
    TheSideBar,
    TheNavigation,
  },
  computed: {
    ...mapState("auth", ["tokens"]),
    things() {
      return this.$store.state.triage.submissions;
    },
  },
  methods: {
    ...mapActions("triage", ["fetchTriageSubmissions"]),
    ...mapActions("admission", ["fetchAdmissions"]),
  },
  async mounted() {
    await this.$store.dispatch("auth/load");
    if (!this.tokens.access && this.$route.name !== "generic.login") {
      await this.$router.push({ name: "generic.login" });
    } else {
      // await this.fetchTriageSubmissions();
      // await this.fetchAdmissions();
    }
  },
  watch: {
    "tokens.access"(value) {
      if (!value && this.$route.name !== "generic.login") {
        this.$router.push({ name: "generic.login" });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#menu-column {
  min-height: 100vh;
  border-right: 1px solid $border;
}
</style>
