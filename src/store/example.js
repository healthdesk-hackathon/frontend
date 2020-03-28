import { API } from "@/service/api";

const DUMMY_ENDPOINT = "dummy";

const MUTATIONS = {
  SET_DUMMIES: "SET_DUMMIES"
};

const state = {
  items: []
};

const getters = {};

const mutations = {
  [MUTATIONS.SET_DUMMIES](state, dummies) {
    state.items = dummies;
  }
};

const actions = {
  /**
   * Getting all dummies
   */
  async fetchDummies({ commit }) {
    try {
      const response = await API.service.get(DUMMY_ENDPOINT + "/");
      commit(MUTATIONS.SET_DUMMIES, response.data);
    } catch (e) {
      console.log(e);
    }
  },

  /**
   * Creates a new dummy and refreshes the list
   */
  async createDummy({ dispatch }, dummy) {
    try {
      await API.service.post(DUMMY_ENDPOINT + "/", dummy);
      await dispatch("fetchDummies"); // Refetching the whole list
    } catch (e) {
      console.log(e);
    }
  },

  /**
   * Updates a dummy and refreshes the list
   */
  async updateDummy({ dispatch }, dummy) {
    try {
      await API.service.put(`${DUMMY_ENDPOINT}/${dummy.id}`, dummy);
      await dispatch("fetchDummies"); // Refetching the whole list
    } catch (e) {
      console.log(e);
    }
  },

  /**
   * Updates or creates a dummy depending on its id
   */
  async saveDummy({ dispatch }, dummy) {
    if (dummy.id === undefined || dummy.id === null) {
      dispatch("createDummy", dummy);
    } else {
      dispatch("updateDummy", dummy);
    }
  },

  /**
   * Deletes dummy and refreshes the list
   */
  async deleteDummy({ dispatch }, dummy) {
    try {
      await API.service.delete(`${DUMMY_ENDPOINT}/${dummy.id}`);
      await dispatch("fetchDummies"); // Refetching the whole list
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
