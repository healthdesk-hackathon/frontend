const routes = {
  path: "/login",
  name: "generic.login",
  component: () =>
    import(/* webpackChunkName: "about" */ "../views/generic/Login.vue")
};

export default routes;
