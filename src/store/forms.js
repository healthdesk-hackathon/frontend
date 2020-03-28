import { API } from "@/service/api";

const SUBMISSION_ENDPOINT = "submission";

const MUTATIONS = {
  SET_SUBMISSION: "SET_SUBMISSION",
  SET_COMMON_SYMPTOMS: "SET_COMMON_SYMPTOMS",
  SET_GRADED_SYMPTOMS: "SET_GRADED_SYMPTOMS",
  SET_OVERALL_WELLBEING: "SET_OVERALL_WELLBEING",
  SET_RELATED_CONDITONS: "SET_RELATED_CONDITIONS",
  SET_PERSONAL_DATA: "SET_PERSONAL_DATA"
};

const state = {
  submission: {},
  commonSymptoms: {},
  gradedSymptoms: {},
  overallWellbeing: 0,
  personalData: {}
};

const getters = {};

const mutations = {
  [MUTATIONS.SET_SUBMISSION](state, submission) {
    state.submission = { ...state.submission, ...submission };
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

  async savePersonalData(info, personalData) {
    console.log(personalData);
  },

  async saveCommonSymptoms(info, symptoms) {
    console.log(symptoms);
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
