import { API } from "@/service/api";
import dayjs from "dayjs";
import { isEmpty, cloneDeep } from "lodash";

const SUBMISSION_ENDPOINT = "submission";
const PERSONAL_DATA_ENDPOINT = "personal-data";
const COMMON_SYMPTOMS_ENDPOINT = "common-symptoms";
const RELATED_CONDITIONS_ENDPOINT = "related-conditions";
const HEALTHCHECK_ENDPOINT = "health-snapshot";
const ADMISSION_ENDPOINT = "admission";
const OVERALL_WELLBEING_ENDPOINT = "overall-wellbeing";

const MUTATIONS = {
  RESET_STATE: "RESET_STATE",
  SET_SUBMISSION: "SET_SUBMISSION",
  SET_COMMON_SYMPTOMS: "SET_COMMON_SYMPTOMS",
  SET_GRADED_SYMPTOMS: "SET_GRADED_SYMPTOMS",
  SET_OVERALL_WELLBEING: "SET_OVERALL_WELLBEING",
  SET_RELATED_CONDITIONS: "SET_RELATED_CONDITIONS",
  SET_PERSONAL_DATA: "SET_PERSONAL_DATA",
  SET_HEALTHCHECK: "SET_HEALTHCHECK",
  SET_ADMISSION: "SET_ADMISSION"
};

const getDefaultState = () => {
  return {
    submission: {},
    commonSymptoms: {
      overall_wellbeing: {}
    },
    overallWellbeing: {},
    gradedSymptoms: {},
    personalData: {},
    relatedConditions: {},
    healthcheck: {},
    admission: {}
  };
};

const state = getDefaultState();

const getters = {
  submissionReview: state => {
    let personalData = cloneDeep(state.personalData);
    delete personalData.id;
    delete personalData.submission;
    return isEmpty(personalData) ? null : personalData;
  }
};

const mutations = {
  [MUTATIONS.RESET_STATE](state) {
    Object.assign(state, getDefaultState());
  },
  [MUTATIONS.SET_ADMISSION](state, admission) {
    state.admission = { ...state.admission, ...admission };
  },
  [MUTATIONS.SET_SUBMISSION](state, submission) {
    state.submission = { ...state.submission, ...submission };
  },
  [MUTATIONS.SET_PERSONAL_DATA](state, data) {
    state.personalData = { ...state.personalData, ...data };
  },
  [MUTATIONS.SET_COMMON_SYMPTOMS](state, symptoms) {
    state.commonSymptoms = {
      ...state.commonSymptoms,
      ...symptoms,
      overall_wellbeing: state.overallWellbeing
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
  }
};

const actions = {
  // Reset the store
  resetState({ commit }) {
    commit(MUTATIONS.RESET_STATE);
  },
  /**
   * Get a single submission by ID
   */
  async getSubmissionByID({ commit }, ID) {
    try {
      const response = await API.service.get(`${SUBMISSION_ENDPOINT}/${ID}`);
      commit(MUTATIONS.SET_SUBMISSION, response.data);
    } catch (e) {
      console.log(e);
    }
  },

  async savePersonalData({ commit, state }, personalData) {
    try {
      const value = {
        ...state.personalData,
        submission: state.submission.id,
        ...personalData,
        date_of_birth: dayjs(personalData.date_of_birth).format("YYYY-MM-DD")
      };
      let response = null;
      if (value.id) {
        response = await API.service.put(
          `${PERSONAL_DATA_ENDPOINT}/${value.id}/`,
          value
        );
      } else {
        response = await API.service.post(`${PERSONAL_DATA_ENDPOINT}/`, value);
      }
      commit(MUTATIONS.SET_PERSONAL_DATA, response.data);
    } catch (e) {
      console.error(e);
    }
  },

  async saveCommonSymptoms({ commit, state }, symptoms) {
    try {
      const value = {
        ...state.commonSymptoms,
        submission: state.submission.id,
        ...symptoms
      };
      let response = null;
      if (value.id) {
        response = await API.service.put(
          `${COMMON_SYMPTOMS_ENDPOINT}/${value.id}/`,
          value
        );
      } else {
        response = await API.service.post(
          `${COMMON_SYMPTOMS_ENDPOINT}/`,
          value
        );
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
        submission: state.submission.id,
        ...conditions
      };
      let response = null;
      if (value.id) {
        response = await API.service.put(
          `${RELATED_CONDITIONS_ENDPOINT}/${value.id}/`,
          value
        );
      } else {
        response = await API.service.post(
          `${RELATED_CONDITIONS_ENDPOINT}/`,
          value
        );
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
        submission: state.submission.id,
        admission: state.admission.id,
        ...healthcheck
      };
      let response = null;
      if (value.id) {
        response = await API.service.put(
          `${HEALTHCHECK_ENDPOINT}/${value.id}/`,
          value
        );
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
      submission: state.submission.id,
      ...owObj
    };
    try {
      let response = null;
      if (value.id) {
        response = await API.service.put(
          `${OVERALL_WELLBEING_ENDPOINT}/${value.id}/`,
          value
        );
      } else {
        response = await API.service.post(
          `${OVERALL_WELLBEING_ENDPOINT}/`,
          value
        );
      }
      commit(MUTATIONS.SET_OVERALL_WELLBEING, response.data);
    } catch (e) {
      console.error(e);
    }
  },

  /**
   * Creates a new submission
   */
  async createSubmission({ commit }, { identifier, identifierType }) {
    try {
      const response = await API.service.post(SUBMISSION_ENDPOINT + "/", {
        identifier: identifier,
        id_type: identifierType
      });
      commit(MUTATIONS.SET_SUBMISSION, response.data);
    } catch (e) {
      console.log(e);
    }
  },

  /**
   * Creates a new admission
   */
  async createAdmission({ commit, state }) {
    try {
      const response = await API.service.post(ADMISSION_ENDPOINT + "/", {
        patient_id: state.submission.patient
      });
      commit(MUTATIONS.SET_ADMISSION, response.data);
    } catch (e) {
      console.log(e);
    }
  },

  /**
   * Updates a submission and refreshes the list
   */
  async updateSubmission(context, submission) {
    try {
      await API.service.put(
        `${SUBMISSION_ENDPOINT}/${submission.id}`,
        submission
      );
    } catch (e) {
      console.log(e);
    }
  },

  /**
   * Updates or creates a submission depending on its id
   */
  async saveSubmission({ dispatch }, submission) {
    dispatch("updatesubmission", submission);
  }

  /**
   * Deletes submission and refreshes the list
   */
  // async deleteSubmission({ dispatch }, submission) {
  //   try {
  //     await API.service.delete(`${SUBMISSION_ENDPOINT}/${submission.id}`);
  //     await dispatch("fetchDummies"); // Refetching the whole list
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
};
