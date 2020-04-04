import Vue from "vue";
import VueRouter from "vue-router";

import generic from "./generic";
import backoffice from "./backoffice";
import frontoffice from "./frontoffice";

Vue.use(VueRouter);

const routes = [generic, backoffice, frontoffice];

const router = new VueRouter({
  routes,
  linkExactActiveClass: "is-active"
});

export default router;
