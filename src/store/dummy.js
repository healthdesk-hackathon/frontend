import { API } from "@/service/api";

const DUMMY_ENDPOINT = "dummy";

const MUTATIONS = {
  SET_DUMMIES: "SET_DUMMIES",
  SET_DUMMIES_ERR: "SET_DUMMIES_ERR",
  SET_DUMMIES_LOADING: "SET_DUMMIES_LOADING"
};

const state = {
  items: [],
  error: null,
  loading: false
};

const getters = {};

const mutations = {
  [MUTATIONS.SET_DUMMIES](state, dummies) {
    state.items = dummies;
  },
  [MUTATIONS.SET_DUMMIES_LOADING](state, isLoading) {
    state.loading = isLoading;
  },
  [MUTATIONS.SET_DUMMIES_ERR](state, error) {
    state.error = error;
  }
};

const actions = {
  /**
   * Getting all dummies
   */
  async fetchDummies({ commit }) {
    commit(MUTATIONS.SET_DUMMIES_LOADING, true);

    try {
      const response = await API.service.get(DUMMY_ENDPOINT + "/");
      commit(MUTATIONS.SET_DUMMIES, response.data);
      commit(MUTATIONS.SET_DUMMIES_ERR, null);
    } catch (e) {
      commit(MUTATIONS.SET_DUMMIES_ERR, e.response.data);
    } finally {
      commit(MUTATIONS.SET_DUMMIES_LOADING, false);
    }
  },

  /**
   * Creates a new dummy and refreshes the list
   */
  async createDummy({ dispatch, commit }, dummy) {
    commit(MUTATIONS.SET_DUMMIES_LOADING, true);

    try {
      await API.service.post(DUMMY_ENDPOINT + "/", dummy);
      await dispatch("fetchDummies"); // Refetching the whole list
    } catch (e) {
      commit(MUTATIONS.SET_DUMMIES_ERR, e.response.data);
    } finally {
      commit(MUTATIONS.SET_DUMMIES_LOADING, false);
    }
  },

  /**
   * Updates a dummy and refreshes the list
   */
  async updateDummy({ dispatch, commit }, dummy) {
    commit(MUTATIONS.SET_DUMMIES_LOADING, true);

    try {
      await API.service.put(`${DUMMY_ENDPOINT}/${dummy.id}`, dummy);
      await dispatch("fetchDummies"); // Refetching the whole list
    } catch (e) {
      commit(MUTATIONS.SET_DUMMIES_ERR, e.response.data);
    } finally {
      commit(MUTATIONS.SET_DUMMIES_LOADING, false);
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
  async deleteDummy({ dispatch, commit }, dummy) {
    commit(MUTATIONS.SET_DUMMIES_LOADING, true);

    try {
      await API.service.delete(`${DUMMY_ENDPOINT}/${dummy.id}`);
      await dispatch("fetchDummies"); // Refetching the whole list
    } catch (e) {
      commit(MUTATIONS.SET_DUMMIES_ERR, e.response.data);
    } finally {
      commit(MUTATIONS.SET_DUMMIES_LOADING, false);
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
