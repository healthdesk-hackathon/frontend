import { API } from "@/service/api";

const BED_ENDPOINT = "bed";
const BEDTYPE_ENDPOINT = "bed-type";

const MUTATIONS = {
  SET_BEDS: "SET_BEDS",
  SET_BEDTYPES: "SET_BEDTYPES"
};

const state = {
  beds: [],
  bedtypes: []
};

const getters = {};

const mutations = {
  [MUTATIONS.SET_BEDS](state, beds) {
    state.beds = beds;
  },
  [MUTATIONS.SET_BEDTYPES](state, bedtypes) {
    state.bedtypes = bedtypes;
  }
};

const actions = {
  // Bed types
  async fetchBedtypes({ commit }) {
    try {
      const response = await API.service.get(BEDTYPE_ENDPOINT + "/");
      commit(MUTATIONS.SET_BEDS, response.data);
    } catch (e) {
      console.log(e);
    }
  },

  async updateBedtype({ dispatch }, bedType) {
    try {
      await API.service.put(`${BEDTYPE_ENDPOINT}/${bedType.id}`, bedType);
      await dispatch("fetchBedtypes");
    } catch (e) {
      console.log(e);
    }
  },

  async deleteBedtype({ dispatch }, bedType) {
    try {
      await API.service.delete(`${BEDTYPE_ENDPOINT}/${bedType.id}`);
      await dispatch("fetchBedtypes");
    } catch (e) {
      console.log(e);
    }
  },

  // Beds
  async fetchBeds({ commit }) {
    try {
      const response = await API.service.get(BED_ENDPOINT + "/");
      commit(MUTATIONS.SET_BEDS, response.data);
    } catch (e) {
      console.log(e);
    }
  },

  async updateBed({ dispatch }, bed) {
    try {
      await API.service.put(`${BED_ENDPOINT}/${bed.id}`, bed);
      await dispatch("fetchBeds"); // Refetching the whole list
    } catch (e) {
      console.log(e);
    }
  },

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
