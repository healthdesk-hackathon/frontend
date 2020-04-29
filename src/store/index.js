import Vue from "vue";
import Vuex from "vuex";

// register modules below
import forms from "./forms";
import admissions from "./admissions";
import triage from "./triage";
import beds from "./beds";
import healthsnapshots from "./healthsnapshots";
import sidebarmenu from "./sidebarmenu";
import user from "./user";
import auth from "./auth";
import patient from "./patient";
import admission from "./admission";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    forms,
    admissions,
    triage,
    beds,
    auth,
    healthsnapshots,
    sidebarmenu,
    patient,
    admission,
    user,
  },
});
