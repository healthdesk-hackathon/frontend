import { API } from "@/service/api";
import dayjs from "dayjs";

const PATIENT_ENDPOINT = "patient";
const PERSONAL_DATA_ENDPOINT = "personal-data";
const PATIENT_IDENTIFIER_ENDPOINT = "patient-identifier";
const PATIENT_GENDER = {
  M: "Male",
  F: "Female",
  O: "Other/Prefer not to disclose",
};

const MUTATIONS = {
  SET_PATIENTS: "SET_PATIENTS",
  SET_PATIENT: "SET_PATIENT",
  SET_PERSONAL_DATA: "SET_PERSONAL_DATA",
  SET_PATIENT_IDENTIFIER: "SET_PATIENT_IDENTIFIER",
};

const state = {
  patient: {},
  patients: [],
  personalData: {},
  patientIdentifier: {},
};

const getters = {};
const mutations = {
  [MUTATIONS.SET_PATIENTS](state, patients) {
    state.patients = patients;
  },
  [MUTATIONS.SET_PATIENT](state, patient) {
    state.patient = patient;
  },
  [MUTATIONS.SET_PERSONAL_DATA](state, data) {
    state.personalData = { ...state.personalData, ...data };
  },
  [MUTATIONS.SET_PATIENT_IDENTIFIER](state, data) {
    state.patientIdentifier = { ...state.patientIdentifier, ...data };
  },
};

const actions = {
  // Patients
  async fetchPatients({ commit }) {
    try {
      commit(MUTATIONS.SET_PATIENTS, []);
      const response = await API.service.get(PATIENT_ENDPOINT + "/");
      const patients = [...response.data];
      response.data.forEach((b) => {
        b.personal_data = b.personal_data || {};
        b.personal_data.gender_display = PATIENT_GENDER[b.personal_data.gender];
      });

      commit(MUTATIONS.SET_PATIENTS, patients);
    } catch (e) {
      console.log(e);
    }
  },

  async fetchPatient({ commit }, id) {
    try {
      commit(MUTATIONS.SET_PATIENT, {});
      console.log(PATIENT_ENDPOINT + "/" + id);
      const response = await API.service.get(PATIENT_ENDPOINT + "/" + id);
      const patient = { ...response.data };

      patient.personal_data = patient.personal_data || {};
      patient.personal_data.gender_display = PATIENT_GENDER[patient.personal_data.gender];

      commit(MUTATIONS.SET_PATIENT, patient);
    } catch (e) {
      console.log(e);
    }
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

  async setPatient({ commit }, patient) {
    try {
      commit(MUTATIONS.SET_PATIENT, { ...patient });
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
