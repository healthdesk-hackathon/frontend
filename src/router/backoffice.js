const routes = {
  path: "/backoffice",
  name: "backoffice",
  component: () =>
    import(/* webpackChunkName: "backoffice" */ "../views/backoffice"), // lazy laoding using separate chunk
  redirect: { name: "backoffice.triageNew" },
  children: [
    // Triage
    {
      path: "triage/new",
      name: "backoffice.triageNew",
      component: () =>
        import(
          /* webpackChunkName: "backoffice" */ "../views/backoffice/triage/TriageSteps.vue"
        )
    },
    {
      path: "triage/all",
      name: "backoffice.triageList",
      component: () =>
        import(
          /* webpackChunkName: "backoffice" */ "../views/backoffice/triage/TriageList.vue"
        )
    },

    // Health Snapshots
    {
      path: "healthsnapshots/new",
      name: "backoffice.healthSnapshotNew",
      component: () =>
        import(
          /* webpackChunkName: "backoffice" */ "../views/backoffice/healthsnapshots/HealthSnapshotNew.vue"
        )
    },
    {
      path: "healthsnapshots/all",
      name: "backoffice.healthSnapshotList",
      component: () =>
        import(
          /* webpackChunkName: "backoffice" */ "../views/backoffice/healthsnapshots/HealthSnapshotList.vue"
        )
    },

    // Bed management
    {
      path: "bedmanagement/all",
      name: "backoffice.bedList",
      component: () =>
        import(
          /* webpackChunkName: "backoffice" */ "../views/backoffice/bedmanagement/BedList.vue"
        )
    }
  ]
};

export default routes;
