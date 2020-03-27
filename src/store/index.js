import Vue from "vue";
import Vuex from "vuex";

// register modules below
import healthcheck from "./healthcheck";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    healthcheck
  }
});
