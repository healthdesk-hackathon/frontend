import Vue from "vue";
import Vuex from "vuex";

// register modules below
// import example from "./example";
import forms from "./forms";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    forms
    // example
  }
});
