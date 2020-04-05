import { API } from "@/service/api";

const BED_ENDPOINT = "bed";
const BEDTYPE_ENDPOINT = "bed-type";

const BED_REASONS = {
  cleaning: "Cleaning",
  "equip fail": "Equipment failure",
  unavailable: "Unavailable"
};

const BED_STATES = ["Out of service", "Assigned", "Available"];

const MUTATIONS = {
  SET_BEDS: "SET_BEDS",
  SET_BEDTYPES: "SET_BEDTYPES"
};

const state = {
  beds: [],
  bedTypes: []
};

const getters = {};

const mutations = {
  [MUTATIONS.SET_BEDS](state, beds) {
    state.beds = beds;
  },
  [MUTATIONS.SET_BEDTYPES](state, bedTypes) {
    state.bedTypes = bedTypes;
  }
};

const actions = {
  // Bed types
  async fetchBedTypes({ commit }) {
    try {
      const response = await API.service.get(BEDTYPE_ENDPOINT + "/");
      commit(MUTATIONS.SET_BEDTYPES, response.data);
    } catch (e) {
      console.log(e);
    }
  },

  async updateBedType({ dispatch }, bedType) {
    try {
      await API.service.put(`${BEDTYPE_ENDPOINT}/${bedType.id}`, bedType);
      await dispatch("fetchBedTypes");
    } catch (e) {
      console.log(e);
    }
  },

  async deleteBedType({ dispatch }, bedType) {
    try {
      await API.service.delete(`${BEDTYPE_ENDPOINT}/${bedType.id}`);
      await dispatch("fetchBedTypes");
    } catch (e) {
      console.log(e);
    }
  },

  // Beds
  async fetchBeds({ commit, state }) {
    const bedTypes = state.bedTypes;
    try {
      const response = await API.service.get(BED_ENDPOINT + "/");
      const beds = response.data.map(b => ({
        ...b,
        bed_type_display: bedTypes.find(bt => bt.id === b.bed_type).name,
        state_display: BED_STATES[b.state],
        reason_display: b.reason ? BED_REASONS[b.reason] : null
      }));
      commit(MUTATIONS.SET_BEDS, beds);
    } catch (e) {
      console.log(e);
    }
  },

  async setAvailable({ dispatch }, bed) {
    bed.state = 2;
    bed.reason = null;
    await dispatch("updateBed", bed);
  },

  async setUnavailable({ dispatch }, bed) {
    bed.state = 0;
    bed.reason = "unavailable";
    await dispatch("updateBed", bed);
  },

  async setCleaning({ dispatch }, bed) {
    bed.state = 0;
    bed.reason = "cleaning";
    await dispatch("updateBed", bed);
  },

  async setEquipmentFailure({ dispatch }, bed) {
    bed.state = 0;
    bed.reason = "equip fail";
    await dispatch("updateBed", bed);
  },

  async updateBed({ dispatch }, bed) {
    try {
      await API.service.put(`${BED_ENDPOINT}/${bed.id}/`, bed);
      await dispatch("fetchBeds"); // Refetching the whole list
    } catch (e) {
      console.log(e);
    }
  },

  async deleteBed({ dispatch }, bed) {
    try {
      await API.service.delete(`${BED_ENDPOINT}/${bed.id}/`);
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
