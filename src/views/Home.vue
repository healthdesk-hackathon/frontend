<template>
  <div class="home">
    <h1>Hello World!</h1>
    <div>
      <p v-for="item in items" :key="item.id">
        {{ item.greeting + " " + item.target }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Home",
  computed: {
    ...mapState("dummy", ["items", "loading", "error"])
  },
  mounted() {
    this.$store.dispatch("dummy/fetchDummies");
  }
};
</script>
