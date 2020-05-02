const MUTATIONS = {
  SET_CURRENT_VIEW: "SET_CURRENT_VIEW",
};

const state = {
  groups: [
    "triage",
    "bedside",
    "patients",
    "specialist",
    "pharmacy",
    "laboratory",
    "ward-support",
    "mgt-dashboard",
    "manage",
  ],
  current_view: {
    patient: {},
    admission: {},
  },
};

const getters = {};

const mutations = {
  [MUTATIONS.SET_CURRENT_VIEW](state, data) {
    state.current_view = data;
  },
};

const actions = {
  async setCurrentView({ commit }, data) {
    commit(MUTATIONS.SET_CURRENT_VIEW, { ...data });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};
