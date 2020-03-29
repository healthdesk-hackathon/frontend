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
    redirect: { name: "Backoffice.Triage" },
    children: [
      {
        path: "triage",
        name: "Backoffice.Triage",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/backoffice/Triage.vue"
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

        name: "LandingPage",
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
  routes
});

export default router;
