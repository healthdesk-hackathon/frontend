const routes = {
  path: "/backoffice",
  name: "backoffice",
  component: () =>
    import(/* webpackChunkName: "about" */ "../views/backoffice"), // lazy laoding using separate chunk
  redirect: { name: "backoffice.triageNew" },
  children: [
    {
      path: "login",
      name: "backoffice.login",
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/backoffice/Login.vue")
    },
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
};

export default routes;
