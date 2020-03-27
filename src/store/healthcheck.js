import { API } from "@/service/api";

const HEALTHCHECK_ENDPOINT = "/";
const MUTATIONS = {
  SET_HEALTCHECK_RESULT: "SET_HEALTHCHECK"
};

const state = {
  healthcheckResult: false
};

const getters = {};

const mutations = {
  [MUTATIONS.SET_HEALTCHECK_RESULT](state) {
    state.healthcheckResult = true;
  }
};

const actions = {
  async getHealthcheckResult({ commit }) {
    try {
      await API.service.get(HEALTHCHECK_ENDPOINT, {
        headers: { "X-HealthCheck": "check" }
      });
      commit(MUTATIONS.SET_HEALTCHECK_RESULT);
    } catch (e) {
      // Would usually set an error in state here
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
};
