import Vue from "vue";
import Vuex from "vuex";
import { API } from "@/service/api";

Vue.use(Vuex);

const HEALTHCHECK_ENDPOINT = "/";

const MUTATIONS = {
  SET_HEALTCHECK: "SET_HEALTHCHECK"
};

export default new Vuex.Store({
  state: {
    healthCheck: false
  },
  mutations: {
    [MUTATIONS.SET_HEALTCHECK](state) {
      state.healthCheck = true;
    }
  },
  actions: {
    async getHealthCheck({ commit }) {
      try {
        await API.service.get(HEALTHCHECK_ENDPOINT, {
          headers: { "X-HealthCheck": "check" }
        });
        commit(MUTATIONS.SET_HEALTCHECK);
      } catch (e) {
        // Would usually set an error in state here
      }
    }
  },
  modules: {}
});
