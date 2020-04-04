import Vue from "vue";
import Vuex from "vuex";

// register modules below
import forms from "./forms";
import triage from "./triage";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    forms,
    triage
  }
});
