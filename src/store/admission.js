import { API } from "@/service/api";

const ADMISSION_ENDPOINT = "admission";
const COMMON_SYMPTOMS_ENDPOINT = "common-symptoms";
const RELATED_CONDITIONS_ENDPOINT = "related-conditions";
const HEALTHCHECK_ENDPOINT = "health-snapshot";
const OVERALL_WELLBEING_ENDPOINT = "overall-wellbeing";

const MUTATIONS = {
  SET_ADMISSIONS: "ADMISSIONS",
  SET_ADMISSION: "ADMISSION",
  SET_COMMON_SYMPTOMS: "SET_COMMON_SYMPTOMS",
  SET_GRADED_SYMPTOMS: "SET_GRADED_SYMPTOMS",
  SET_RELATED_CONDITIONS: "SET_RELATED_CONDITIONS",
  SET_HEALTHCHECK: "SET_HEALTHCHECK",
  SET_OVERALL_WELLBEING: "SET_OVERALL_WELLBEING",
};

const state = {
  admission: {},
  admissions: [],
  commonSymptoms: {},
  gradedSymptoms: {},
  relatedConditions: {},
  healthSnapshot: {},
  overallWellbeing: {},
};

const getters = {};

const mutations = {
  [MUTATIONS.SET_ADMISSIONS](state, admissions) {
    state.admissions = admissions;
  },
  [MUTATIONS.SET_ADMISSION](state, admission) {
    state.admission = admission;
  },
  [MUTATIONS.SET_COMMON_SYMPTOMS](state, symptoms) {
    state.commonSymptoms = {
      ...state.commonSymptoms,
      ...symptoms,
      overall_wellbeing: state.overallWellbeing,
    };
  },
  [MUTATIONS.SET_GRADED_SYMPTOMS](state, symptoms) {
    state.gradedSymptoms = { ...state.gradedSymptoms, ...symptoms };
  },
  [MUTATIONS.SET_HEALTHCHECK](state, health_snapshot) {
    state.healthSnapshot = { ...state.healthSnapshot, ...health_snapshot };
  },
  [MUTATIONS.SET_OVERALL_WELLBEING](state, owObj) {
    state.overallWellbeing = { ...state.overallWellbeing, ...owObj };
    state.commonSymptoms.overall_wellbeing = owObj;
  },
  [MUTATIONS.SET_RELATED_CONDITIONS](state, conditions) {
    state.relatedConditions = { ...state.relatedConditions, ...conditions };
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
      const response = await API.service.get(ADMISSION_ENDPOINT + "/" + id + "/");
      const admission = { ...response.data };
      commit(MUTATIONS.SET_ADMISSION, admission);
    } catch (e) {
      console.log(e);
    }
  },

  async saveCommonSymptoms({ commit, state }, data) {
    try {
      if (data.workflow) {
        var workflow_id = data.workflow.id;
        var admission_id = data.workflow.related_data.admission.id;
      }

      const value = {
        ...state.commonSymptoms,
        workflow_id: workflow_id,
        admission_id: admission_id,
        ...data.commonSymptoms,
      };
      let response = null;
      if (value.id) {
        response = await API.service.put(`${COMMON_SYMPTOMS_ENDPOINT}/${value.id}/`, value);
      } else {
        response = await API.service.post(`${COMMON_SYMPTOMS_ENDPOINT}/`, value);
      }
      commit(MUTATIONS.SET_COMMON_SYMPTOMS, response.data);
    } catch (e) {
      console.error(e);
    }
  },

  async saveRelatedConditions({ commit, state }, data) {
    try {
      if (data.workflow) {
        var workflow_id = data.workflow.id;
        var admission_id = data.workflow.related_data.admission.id;
      }
      const value = {
        ...state.relatedConditions,
        workflow_id: workflow_id,
        admission_id: admission_id,
        ...data.relatedConditions,
      };
      let response = null;
      if (value.id) {
        response = await API.service.put(`${RELATED_CONDITIONS_ENDPOINT}/${value.id}/`, value);
      } else {
        response = await API.service.post(`${RELATED_CONDITIONS_ENDPOINT}/`, value);
      }
      commit(MUTATIONS.SET_RELATED_CONDITIONS, response.data);
    } catch (e) {
      console.error(e);
    }
  },

  async saveHealthcheck({ commit, state }, data) {
    try {
      if (data.workflow) {
        var workflow_id = data.workflow.id;
        var admission_id = data.workflow.related_data.admission.id;
      }
      const value = {
        ...state.healthSnapshot,
        workflow_id: workflow_id,
        admission_id: admission_id,
        ...data.healthSnapshot,
      };
      console.log(value);
      console.log(data);

      let response = null;
      if (value.id) {
        response = await API.service.put(`${HEALTHCHECK_ENDPOINT}/${value.id}/`, value);
      } else {
        response = await API.service.post(`${HEALTHCHECK_ENDPOINT}/`, value);
      }
      commit(MUTATIONS.SET_HEALTHCHECK, response.data);
    } catch (e) {
      console.error(e);
    }
  },

  async saveOverallWellbeing({ commit, state }, data) {
    if (data.workflow) {
      var workflow_id = data.workflow.id;
      var admission_id = data.workflow.related_data.admission.id;
    }

    const value = {
      ...state.overallWellbeing,
      workflow_id: workflow_id,
      admission_id: admission_id,
      ...data.overallWellbeing,
    };
    try {
      let response = null;
      if (value.id) {
        response = await API.service.put(`${OVERALL_WELLBEING_ENDPOINT}/${value.id}/`, value);
      } else {
        response = await API.service.post(`${OVERALL_WELLBEING_ENDPOINT}/`, value);
      }
      commit(MUTATIONS.SET_OVERALL_WELLBEING, response.data);
    } catch (e) {
      console.error(e);
    }
  },

  /**
   * Creates a new admission
   */
  async createAdmission({ commit, state }) {
    try {
      const response = await API.service.post(ADMISSION_ENDPOINT + "/", {
        patient_id: state.workflow.patient,
      });
      commit(MUTATIONS.SET_ADMISSION, response.data);
    } catch (e) {
      console.log(e);
    }
  },

  async setAdmission({ commit }, admission) {
    try {
      commit(MUTATIONS.SET_ADMISSION, { ...admission });
    } catch (e) {
      console.error(e);
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
