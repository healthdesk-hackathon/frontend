import { API } from "@/service/api";

const ADMISSION_ENDPOINT = "admission";

const MUTATIONS = {
  SET_ADMISSIONS: "ADMISSIONS",
  SET_ADMISSION: "ADMISSION",
};

const state = {
  admission: {},
  admissions: [],
};

const getters = {};

const mutations = {
  [MUTATIONS.SET_ADMISSIONS](state, admissions) {
    state.admissions = admissions;
  },
  [MUTATIONS.SET_ADMISSION](state, admission) {
    state.admission = admission;
  },
};

const actions = {
  async fetchAdmissions({ commit }, data = null) {
    try {
      const response = await API.service.request({
        method: "get",
        url: ADMISSION_ENDPOINT + "/",
        params: data,
      });
      commit(MUTATIONS.SET_ADMISSIONS, response.data);
    } catch (e) {
      console.log(e);
    }
  },
  async fetchAdmission({ commit }, id) {
    try {
      commit(MUTATIONS.SET_ADMISSION, {});
      const response = await API.service.get(
        ADMISSION_ENDPOINT + "/" + id + "/"
      );
      const admission = { ...response.data };
      commit(MUTATIONS.SET_ADMISSION, admission);
    } catch (e) {
      console.log(e);
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};
