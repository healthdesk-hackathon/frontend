import { API } from "@/service/api";

const SUBMISSION_ENDPOINT = "submission";

const MUTATIONS = {
  SET_SUBMISSIONS: "SET_SUBMISSIONS"
};

const state = {
  submissions: []
};

const getters = {};

const mutations = {
  [MUTATIONS.SET_SUBMISSIONS](state, submissions) {
    state.submissions = submissions;
  }
};

const actions = {
  /**
   * Getting all submissions
   */
  async fetchSubmissions({ commit }) {
    try {
      const response = await API.service.get(SUBMISSION_ENDPOINT + "/");
      commit(MUTATIONS.SET_SUBMISSIONS, response.data);
    } catch (e) {
      console.log(e);
    }
  },

  /**
   * Updates a submission and refreshes the list
   */
  async updateSubmission({ dispatch }, submission) {
    try {
      await API.service.put(
        `${SUBMISSION_ENDPOINT}/${submission.id}`,
        submission
      );
      await dispatch("fetchSubmissions"); // Refetching the whole list
    } catch (e) {
      console.log(e);
    }
  },

  /**
   * Deletes submission and refreshes the list
   */
  async deleteSubmission({ dispatch }, submission) {
    try {
      await API.service.delete(`${SUBMISSION_ENDPOINT}/${submission.id}`);
      await dispatch("fetchSubmissions"); // Refetching the whole list
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
