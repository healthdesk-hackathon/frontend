import Vue from "vue";
import VueRouter from "vue-router";

import backoffice from "./backoffice";
import frontoffice from "./frontoffice";

Vue.use(VueRouter);

const routes = [backoffice, frontoffice];

const router = new VueRouter({
  routes,
  linkExactActiveClass: "is-active"
});

export default router;
