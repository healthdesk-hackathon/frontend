import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BVInput from "./components/Form/Inputs/BVInput";
import BVSelect from "./components/Form/Inputs/BVSelect";
import BVDate from "./components/Form/Inputs/BVDate";
import "./vee-validate";
import "./filters";

import Buefy from "buefy";

Vue.config.productionTip = false;

Vue.use(Buefy);

Vue.component("BVInput", BVInput);
Vue.component("BVSelect", BVSelect);
Vue.component("BVDate", BVDate);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
