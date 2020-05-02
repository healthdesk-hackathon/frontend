import { API } from "@/service/api";

const HEALTHSNAPSHOT_ENDPOINT = "health-snapshot";

const MUTATIONS = {
  SET_HEALTH_SNAPSHOTS: "SET_HEALTH_SNAPSHOTS",
};

const state = {
  healthSnapshots: [],
};

const getters = {};

const mutations = {
  [MUTATIONS.SET_HEALTH_SNAPSHOTS](state, healthSnapshots) {
    state.healthSnapshots = healthSnapshots;
  },
};

const actions = {
  async createHealthSnapshot({ dispatch }, healthSnapshot) {
    try {
      await API.service.post(HEALTHSNAPSHOT_ENDPOINT + "/", healthSnapshot);
      await dispatch("fetchHealthSnapshots");
    } catch (e) {
      console.log(e);
    }
  },

  async fetchHealthSnapshots({ commit }, data = null) {
    try {
      const response = await API.service.request({
        method: "get",
        url: HEALTHSNAPSHOT_ENDPOINT + "/",
        params: data,
      });
      commit(MUTATIONS.SET_HEALTH_SNAPSHOTS, response.data);
    } catch (e) {
      console.log(e);
    }
  },

  async updateHealthSnapshot({ dispatch }, healthSnapshot) {
    try {
      await API.service.put(
        `${HEALTHSNAPSHOT_ENDPOINT}/${healthSnapshot.id}`,
        healthSnapshot
      );
      await dispatch("fetchHealthSnapshots");
    } catch (e) {
      console.log(e);
    }
  },

  async deleteHealthSnapshot({ dispatch }, healthSnapshot) {
    try {
      await API.service.delete(
        `${HEALTHSNAPSHOT_ENDPOINT}/${healthSnapshot.id}`
      );
      await dispatch("fetchHealthSnapshots");
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
