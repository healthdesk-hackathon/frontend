import { API } from "@/service/api";
import dayjs from "dayjs";

const SUBMISSION_ENDPOINT = "submission";
const PERSONAL_DATA_ENDPOINT = "personal-data";
const COMMON_SYMPTOMS_ENDPOINT = "common-symptoms";
const OVERALL_WELLBEING_ENDPOINT = "overall-wellbeing";

const MUTATIONS = {
  SET_SUBMISSION: "SET_SUBMISSION",
  SET_COMMON_SYMPTOMS: "SET_COMMON_SYMPTOMS",
  SET_GRADED_SYMPTOMS: "SET_GRADED_SYMPTOMS",
  SET_OVERALL_WELLBEING: "SET_OVERALL_WELLBEING",
  SET_RELATED_CONDITIONS: "SET_RELATED_CONDITIONS",
  SET_PERSONAL_DATA: "SET_PERSONAL_DATA"
};

const state = {
  submission: {},
  commonSymptoms: {
    overall_wellbeing: {}
  },
  overallWellbeing: {},
  gradedSymptoms: {},
  personalData: {}
};

const getters = {};

const mutations = {
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
  [MUTATIONS.SET_OVERALL_WELLBEING](state, owObj) {
    state.overallWellbeing = { ...state.overallWellbeing, ...owObj };
    state.commonSymptoms.overall_wellbeing = owObj;
  },
  [MUTATIONS.SET_RELATED_CONDITIONS](state, conditions) {
    state.relatedConditions = { ...state.relatedConditions, ...conditions };
  }
};

const actions = {
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

  async saveCommonSymptoms({ commit }, symptoms) {
    try {
      const value = {
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

  async saveOverallWellbeing({ commit }, owObj) {
    const value = {
      submission: state.submission.id,
      ...owObj
    };
    try {
      let response = null;
      if (owObj.id) {
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
   * Only done through the admin for nowm should be from backoffice later
   */
  async createSubmission({ commit }) {
    try {
      const phoneNumber = prompt("What is your phone number?");
      const response = await API.service.post(SUBMISSION_ENDPOINT + "/", {
        identifier: phoneNumber,
        id_type: "PHONE"
      });
      commit(MUTATIONS.SET_SUBMISSION, response.data);
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
