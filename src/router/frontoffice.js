const routes = {
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
        import(/* webpackChunkName: "about" */ "../views/frontoffice/Form.vue")
    }
  ]
};

export default routes;
