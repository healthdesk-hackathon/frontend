import { API } from "@/service/api";

const SUBMISSION_ENDPOINT = "submission";

const MUTATIONS = {
  SET_SUBMISSION: "SET_SUBMISSION"
};

const state = {
  submission: null
};

const getters = {};

const mutations = {
  [MUTATIONS.SET_SUBMISSION](state, submission) {
    state.submission = submission;
  }
};

const actions = {
  /**
   * Get a single submission by ID
   */
  async getSubmissionByID({ commit }, ID) {
    try {
      const response = await API.service.get(`SUBMISSION_ENDPOINT/${ID}`);
      commit(MUTATIONS.SET_SUBMISSION, response.data);
    } catch (e) {
      console.log(e);
    }
  },

  /**
   * Creates a new submission
   * Only done through the admin for nowm should be from backoffice later
   */
  // async createSubmission({ dispatch }, submission) {
  //   try {
  //     await API.service.post(SUBMISSION_ENDPOINT + "/", submission);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // },

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
