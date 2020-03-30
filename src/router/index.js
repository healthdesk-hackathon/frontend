import Vue from "vue";
import VueRouter from "vue-router";
// import Example from "../views/Example.vue";

Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/example",
  //   name: "Example",
  //   component: Example
  // },

  {
    path: "/backoffice",
    name: "Backoffice",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/backoffice"),
    redirect: { name: "Backoffice.TriageNew" },
    children: [
      {
        path: "triage/new",
        name: "Backoffice.TriageNew",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/backoffice/TriageSteps.vue"
          )
      },
      {
        path: "triage/all",
        name: "Backoffice.TriageList",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/backoffice/TriageList.vue"
          )
      }
    ]
  },
  {
    path: "/",

    name: "Frontoffice",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/frontoffice"),
    redirect: { name: "Frontoffice.LandingPage" },
    children: [
      {
        path: "",

        name: "Frontoffice.LandingPage",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/frontoffice/LandingPage.vue"
          )
      },
      {
        path: "/form/:id(.*)",
        name: "Form",
        props: true,
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/frontoffice/Form.vue"
          )
      },
      {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/frontoffice/About.vue"
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
