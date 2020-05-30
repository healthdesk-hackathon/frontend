import Vue from "vue";
import Vuex from "vuex";

// register modules below
// import triage_submission from "./triage_submission";
// import triage from "./triage";
import admission from "./admission";
import beds from "./beds";
import health_snapshot from "./health_snapshot";
import sidebarmenu from "./sidebarmenu";
import user from "./user";
import auth from "./auth";
import patient from "./patient";
import workflow from "./workflow";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    // triage_submission,
    // triage,
    admission,
    beds,
    auth,
    health_snapshot,
    sidebarmenu,
    patient,
    user,
    workflow,
  },
});
