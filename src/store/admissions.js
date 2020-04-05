import { API } from "@/service/api";

const ADMISSION_ENDPOINT = "admission";

const MUTATIONS = {
  SET_ADMISSIONS: "ADMISSIONS"
};

const state = {
  admissions: []
};

const getters = {};

const mutations = {
  [MUTATIONS.SET_ADMISSIONS](state, admissions) {
    state.admissions = admissions;
  }
};

const actions = {
  async fetchAdmissions({ commit }) {
    try {
      const response = await API.service.get(ADMISSION_ENDPOINT + "/");
      commit(MUTATIONS.SET_ADMISSIONS, response.data);
    } catch (e) {
      console.log(e);
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
