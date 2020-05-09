import { API } from "@/service/api";
import dayjs from "dayjs";
import { isEmpty, cloneDeep } from "lodash";

const PERSONAL_DATA_ENDPOINT = "personal-data";
const PATIENT_IDENTIFIER_ENDPOINT = "patient-identifier";
const COMMON_SYMPTOMS_ENDPOINT = "common-symptoms";
const RELATED_CONDITIONS_ENDPOINT = "related-conditions";
const HEALTHCHECK_ENDPOINT = "health-snapshot";
const ADMISSION_ENDPOINT = "admission";
const OVERALL_WELLBEING_ENDPOINT = "overall-wellbeing";

const MUTATIONS = {
  RESET_STATE: "RESET_STATE",
  SET_COMMON_SYMPTOMS: "SET_COMMON_SYMPTOMS",
  SET_GRADED_SYMPTOMS: "SET_GRADED_SYMPTOMS",
  SET_OVERALL_WELLBEING: "SET_OVERALL_WELLBEING",
  SET_RELATED_CONDITIONS: "SET_RELATED_CONDITIONS",
  SET_PERSONAL_DATA: "SET_PERSONAL_DATA",
  SET_PATIENT_IDENTIFIER: "SET_PATIENT_IDENTIFIER",
  SET_HEALTHCHECK: "SET_HEALTHCHECK",
  SET_ADMISSION: "SET_ADMISSION",
};

const getDefaultState = () => {
  return {
    commonSymptoms: {
      overall_wellbeing: {},
    },
    overallWellbeing: {},
    gradedSymptoms: {},
    personalData: {},
    patientIdentifier: {},
    relatedConditions: {},
    healthcheck: {},
    admission: {},
  };
};

const state = getDefaultState();

const getters = {
  submissionReview: (state) => {
    let personalData = cloneDeep(state.personalData);
    delete personalData.id;
    delete personalData.workflow;
    return isEmpty(personalData) ? null : personalData;
  },
};

const mutations = {
  [MUTATIONS.RESET_STATE](state) {
    Object.assign(state, getDefaultState());
  },
  [MUTATIONS.SET_ADMISSION](state, admission) {
    state.admission = { ...state.admission, ...admission };
  },
  [MUTATIONS.SET_PERSONAL_DATA](state, data) {
    state.personalData = { ...state.personalData, ...data };
  },
  [MUTATIONS.SET_PATIENT_IDENTIFIER](state, data) {
    state.patientIdentifier = { ...state.patientIdentifier, ...data };
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
  [MUTATIONS.SET_HEALTHCHECK](state, healthcheck) {
    state.healthcheck = { ...state.healthcheck, ...healthcheck };
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
  // Reset the store
  resetState({ commit }) {
    commit(MUTATIONS.RESET_STATE);
  },

  async savePersonalData({ commit, state }, personalData) {
    try {
      const value = {
        ...state.personalData,
        workflow: state.workflow.id,
        ...personalData,
        date_of_birth: dayjs(personalData.date_of_birth).format("YYYY-MM-DD"),
      };
      let response = null;
      if (value.id) {
        response = await API.service.put(`${PERSONAL_DATA_ENDPOINT}/${value.id}/`, value);
      } else {
        response = await API.service.post(`${PERSONAL_DATA_ENDPOINT}/`, value);
      }
      commit(MUTATIONS.SET_PERSONAL_DATA, response.data);
    } catch (e) {
      console.error(e);
    }
  },

  async savePatientIdentifier({ commit, state }, patientIdentifier) {
    try {
      const value = {
        ...state.patientIdentifier,
        workflow: state.workflow.id,
        ...patientIdentifier,
      };
      let response = null;
      if (value.id) {
        response = await API.service.put(`${PATIENT_IDENTIFIER_ENDPOINT}/${value.id}/`, value);
      } else {
        response = await API.service.post(`${PATIENT_IDENTIFIER_ENDPOINT}/`, value);
      }
      commit(MUTATIONS.SET_PATIENT_IDENTIFIER, response.data);
    } catch (e) {
      console.error(e);
    }
  },

  async saveCommonSymptoms({ commit, state }, symptoms) {
    try {
      const value = {
        ...state.commonSymptoms,
        workflow: state.workflow.id,
        ...symptoms,
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

  async saveRelatedConditions({ commit, state }, conditions) {
    try {
      const value = {
        ...state.relatedConditions,
        workflow: state.workflow.id,
        ...conditions,
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

  async saveHealthcheck({ commit, state }, healthcheck) {
    try {
      const value = {
        ...state.healthcheck,
        workflow: state.workflow.id,
        admission: state.admission.id,
        ...healthcheck,
      };
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

  async saveOverallWellbeing({ commit, state }, owObj) {
    const value = {
      ...state.overallWellbeing,
      workflow: state.workflow.id,
      ...owObj,
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
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};
