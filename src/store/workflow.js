import { API } from "@/service/api";

const WORKFLOW_ENDPOINT = "workflow";

const RELATED_ACTIONS = {
  patient: "patient/setPatient",
};

const MUTATIONS = {
  RESET_STATE: "RESET_STATE",
  SET_WORKFLOW: "SET_WORKFLOW",
};

const getDefaultState = () => {
  return {
    workflow: {},
  };
};

const state = getDefaultState();

const getters = {};

const mutations = {
  [MUTATIONS.RESET_STATE](state) {
    Object.assign(state, getDefaultState());
  },
  [MUTATIONS.SET_WORKFLOW](state, workflow) {
    state.workflow = { ...state.workflow, ...workflow };
  },
};

const actions = {
  // Reset the store
  resetState({ commit }) {
    commit(MUTATIONS.RESET_STATE);
  },
  /**
   * Get a single workflow by ID
   */
  async getWorkflowByID({ commit }, ID) {
    try {
      const response = await API.service.get(`${WORKFLOW_ENDPOINT}/${ID}`);
      commit(MUTATIONS.SET_WORKFLOW, response.data);
    } catch (e) {
      console.log(e);
    }
  },

  /**
   * Fetch workflows (optionally filtered by params)
   * typically: patient_id, workflow_type
   */
  async fetchWorkflows({ commit }, data = null) {
    try {
      const response = await API.service.request({
        method: "get",
        url: `${WORKFLOW_ENDPOINT}/`,
        params: data,
      });
      commit(MUTATIONS.SET_WORKFLOW, response.data);
    } catch (e) {
      console.log(e);
    }
  },

  /**
   * Creates a new workflow
   * A workflow represents a multistep workflow. The workflowType indicates
   * the type of workflow to be run.
   * By creating this at the start of the workflow, and posting the request to
   * the backend, any initialisation work can be done.
   */
  async createWorkflow({ dispatch, commit }, workflowType) {
    try {
      const response = await API.service.post(WORKFLOW_ENDPOINT + "/", {
        workflow_type: workflowType,
      });
      commit(MUTATIONS.SET_WORKFLOW, response.data);

      for (let [k, v] of Object.entries(response.data.related_data)) {
        dispatch(RELATED_ACTIONS[k], v, { root: true });
      }
    } catch (e) {
      console.log(e);
    }
  },

  /**
   * Updates a workflow and refreshes the list
   */
  async updateWorkflow(context, workflow) {
    try {
      await API.service.put(`${WORKFLOW_ENDPOINT}/${workflow.id}`, workflow);
    } catch (e) {
      console.log(e);
    }
  },

  /**
   * Updates or creates a workflow depending on its id
   */
  async saveWorkflow({ dispatch }, workflow) {
    dispatch("updateworkflow", workflow);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};
