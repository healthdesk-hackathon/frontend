import Vue from "vue";
import Vuex from "vuex";
import API from "../service/api";

Vue.use(Vuex);

const HEALTHCHECK_ENDPOINT = "/";

const MUTATIONS = {
  GET_HEALTCHECK: "GET_HEALTHCHECK"
};

export default new Vuex.Store({
  state: {
    healthCheck: false
  },
  mutations: {
    [MUTATIONS.GET_HEALTCHECK](state) {
      state.healthCheck = true;
    }
  },
  actions: {
    async getHealthCheck({ commit }) {
      try {
        await API.get(HEALTHCHECK_ENDPOINT, {
          headers: { 'X-HealthCheck': 'check' }
        });
        commit(MUTATIONS.GET_HEALTCHECK);
      } catch (e) {
        // Would usually set an error in state here
      }
    }
  },
  modules: {}
});
