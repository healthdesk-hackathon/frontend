const routes = {
  path: "/backoffice",
  name: "backoffice",
  component: () =>
    import(/* webpackChunkName: "backoffice" */ "../views/backoffice"), // lazy laoding using separate chunk
  redirect: { name: "backoffice.dashboard" },
  children: [
    // dashboard
    {
      path: "dashboard",
      name: "backoffice.dashboard",
      component: () =>
        import(
          /* webpackChunkName: "backoffice" */ "../views/backoffice/dashboard/Dashboard.vue"
        )
    },
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
    {
      path: "healthsnapshots/filtered",
      name: "backoffice.healthSnapshotFiltered",
      props: true,
      component: () =>
        import(
          /* webpackChunkName: "backoffice" */ "../views/backoffice/healthsnapshots/HealthSnapshotList.vue"
        )
    },
    // Admissions list
    {
      path: "admissions/all",
      name: "backoffice.admissionsList",
      component: () =>
        import(
          /* webpackChunkName: "backoffice" */ "../views/backoffice/admissions/AdmissionsList.vue"
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
    },
    {
      path: "bedmanagement/types/all",
      name: "backoffice.bedTypeList",
      component: () =>
        import(
          /* webpackChunkName: "backoffice" */ "../views/backoffice/bedmanagement/BedTypeList.vue"
        )
    }
  ]
};

export default routes;
