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
        ),
    },
    // Triage
    {
      path: "triage/new",
      name: "backoffice.triageNew",
      component: () =>
        import(
          /* webpackChunkName: "backoffice" */ "../views/backoffice/triage/TriageSteps.vue"
        ),
    },
    {
      path: "triage/all",
      name: "backoffice.triageList",
      component: () =>
        import(
          /* webpackChunkName: "backoffice" */ "../views/backoffice/triage/TriageList.vue"
        ),
    },

    // Health Snapshots
    {
      path: "healthsnapshots/new",
      name: "backoffice.healthSnapshotNew",
      component: () =>
        import(
          /* webpackChunkName: "backoffice" */ "../views/backoffice/healthsnapshots/HealthSnapshotNew.vue"
        ),
    },
    {
      path: "healthsnapshots/:admission_id",
      name: "backoffice.healthSnapshotForAdmission",
      props: true,
      component: () =>
        import(
          /* webpackChunkName: "backoffice" */ "../views/backoffice/healthsnapshots/HealthSnapshotForAdmission.vue"
        ),
    },
    // Admissions list
    {
      path: "admissions/all",
      name: "backoffice.admissionsList",
      component: () =>
        import(
          /* webpackChunkName: "backoffice" */ "../views/backoffice/admissions/AdmissionsList.vue"
        ),
    },

    // Patient
    {
      path: "patients/:patient_id",
      name: "backoffice.patient",
      props: true,
      component: () =>
        import(
          /* webpackChunkName: "backoffice" */ "../views/backoffice/patients/Patient.vue"
        ),
    },

    // Patients list
    {
      path: "patients/all",
      name: "backoffice.patientsList",
      component: () =>
        import(
          /* webpackChunkName: "backoffice" */ "../views/backoffice/patients/PatientsList.vue"
        ),
    },

    // Bed management
    {
      path: "bedmanagement/all",
      name: "backoffice.bedList",
      component: () =>
        import(
          /* webpackChunkName: "backoffice" */ "../views/backoffice/bedmanagement/BedList.vue"
        ),
    },
    {
      path: "bedmanagement/types/all",
      name: "backoffice.bedTypeList",
      component: () =>
        import(
          /* webpackChunkName: "backoffice" */ "../views/backoffice/bedmanagement/BedTypeList.vue"
        ),
    },
  ],
};

export default routes;
