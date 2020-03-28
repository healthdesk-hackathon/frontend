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
    path: "/form",
    name: "Form",
    component: () => import(/* webpackChunkName: "about" */ "../views/Form.vue")
  },
  {
    path: "/about/:id",
    name: "About",
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
