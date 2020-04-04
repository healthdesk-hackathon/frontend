import { API } from "@/service/api";

const BED_ENDPOINT = "beds";

const MUTATIONS = {
  SET_BEDS: "SET_BEDS"
};

const state = {
  beds: []
};

const getters = {};

const mutations = {
  [MUTATIONS.SET_BEDS](state, beds) {
    state.beds = beds;
  }
};

const actions = {
  /**
   * Getting all beds
   */
  async fetchBeds({ commit }) {
    try {
      const response = await API.service.get(BED_ENDPOINT + "/");
      commit(MUTATIONS.SET_BEDS, response.data);
    } catch (e) {
      console.log(e);
    }
  },

  /**
   * Updates a bed and refreshes the list
   */
  async updateBed({ dispatch }, bed) {
    try {
      await API.service.put(`${BED_ENDPOINT}/${bed.id}`, bed);
      await dispatch("fetchBeds"); // Refetching the whole list
    } catch (e) {
      console.log(e);
    }
  },

  /**
   * Deletes bed and refreshes the list
   */
  async deleteBed({ dispatch }, bed) {
    try {
      await API.service.delete(`${BED_ENDPOINT}/${bed.id}`);
      await dispatch("fetchBeds"); // Refetching the whole list
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
