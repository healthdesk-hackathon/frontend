import { API } from "@/service/api";

const TRIAGE_SUBMISSION_ENDPOINT = "triage_submission";

const MUTATIONS = {
  SET_TRIAGE_SUBMISSIONS: "SET_TRIAGE_SUBMISSIONS",
};

const state = {
  submissions: [],
};

const getters = {};

const mutations = {
  [MUTATIONS.SET_TRIAGE_SUBMISSIONS](state, submissions) {
    state.submissions = submissions;
  },
};

const actions = {
  /**
   * Getting all submissions
   */
  async fetchTriageSubmissions({ commit }) {
    try {
      const response = await API.service.get(TRIAGE_SUBMISSION_ENDPOINT + "/");
      commit(MUTATIONS.SET_TRIAGE_SUBMISSIONS, response.data);
    } catch (e) {
      console.log(e);
    }
  },

  /**
   * Updates a triage_submission and refreshes the list
   */
  async updateTriageSubmission({ dispatch }, triage_submission) {
    try {
      await API.service.put(`${TRIAGE_SUBMISSION_ENDPOINT}/${triage_submission.id}`, triage_submission);
      await dispatch("fetchTriageSubmissions"); // Refetching the whole list
    } catch (e) {
      console.log(e);
    }
  },

  /**
   * Deletes triage_submission and refreshes the list
   */
  async deleteTriageSubmission({ dispatch }, triage_submission) {
    try {
      await API.service.delete(`${TRIAGE_SUBMISSION_ENDPOINT}/${triage_submission.id}`);
      await dispatch("fetchTriageSubmissions"); // Refetching the whole list
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
