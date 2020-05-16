import Vue from "vue";
import Vuex from "vuex";

// register modules below
import submission from "./submission";
import admission from "./admission";
import triage from "./triage";
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
    submission,
    triage,
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
