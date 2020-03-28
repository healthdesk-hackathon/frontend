<template>
  <div class="home">
    <h1>Hello World!</h1>
    <div v-if="loading">
      Loading...
    </div>
    <div v-else-if="error">
      {{ error }}
    </div>
    <div v-else>
      <table
        style="margin: auto; margin-bottom: 2rem; border-collapse: collapse"
      >
        <thead>
          <tr>
            <th style="border-bottom: 1px solid black">Value</th>
            <th style="border-bottom: 1px solid black">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>
              {{ item.greeting + " " + item.target }}
            </td>
            <td>
              <button @click="deleteDummy(item)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <form @submit.prevent="create">
        <input v-model="model.greeting" placeholder="Greeting" />
        <input v-model="model.target" placeholder="Target" />
        <button type="submit">Create</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      model: {
        id: null,
        greeting: "",
        target: ""
      }
    };
  },
  computed: {
    ...mapState("dummy", ["items", "loading", "error"])
  },
  methods: {
    ...mapActions("dummy", ["saveDummy", "deleteDummy"]),
    async create() {
      await this.saveDummy(this.model);
      this.model = { id: null, greeting: "", target: "" };
    }
  },
  mounted() {
    this.$store.dispatch("dummy/fetchDummies");
  }
};
</script>

<style scoped>
table td,
table th {
  padding: 0.5rem;
}
</style>
