import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/backoffice",
    name: "backoffice",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/backoffice"), // lazy laoding using separate chunk
    redirect: { name: "backoffice.triageNew" },
    children: [
      {
        path: "triage/new",
        name: "backoffice.triageNew",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/backoffice/triage/TriageSteps.vue"
          )
      },
      {
        path: "triage/all",
        name: "backoffice.triageList",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/backoffice/triage/TriageList.vue"
          )
      }
    ]
  },
  {
    path: "/",

    name: "frontoffice",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/frontoffice"),
    redirect: { name: "frontoffice.landingPage" },
    children: [
      {
        path: "",

        name: "frontoffice.landingPage",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/frontoffice/LandingPage.vue"
          )
      },
      {
        path: "/form/:id(.*)",
        name: "form",
        props: true,
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/frontoffice/Form.vue"
          )
      }
    ]
  }
];

const router = new VueRouter({
  routes,
  linkExactActiveClass: "is-active"
});

export default router;
