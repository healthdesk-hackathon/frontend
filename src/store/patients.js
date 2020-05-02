import { API } from "@/service/api";

const PATIENT_ENDPOINT = "patient";
const PATIENT_GENDER = {
  M: "Male",
  F: "Female",
  O: "Other/Prefer not to disclose",
};

const MUTATIONS = {
  SET_PATIENTS: "PATIENTS",
  SET_PATIENT: "PATIENT",
};

const state = {
  patient: {},
  patients: [],
};

const getters = {};

const mutations = {
  [MUTATIONS.SET_PATIENTS](state, patients) {
    state.patients = patients;
  },
  [MUTATIONS.SET_PATIENT](state, patient) {
    state.patient = patient;
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
      patient.personal_data.gender_display =
        PATIENT_GENDER[patient.personal_data.gender];

      commit(MUTATIONS.SET_PATIENT, patient);
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
