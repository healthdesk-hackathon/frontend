import Vue from "vue";
import Vuex from "vuex";

// register modules below
// import example from "./example";
import forms from "./forms";
import triage from "./triage";
import auth from "./auth";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    forms,
    triage,
    auth
    // example
  }
});
