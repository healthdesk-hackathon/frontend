const routes = {
  path: "/backoffice",
  name: "backoffice",
  component: () => import(/* webpackChunkName: "backoffice" */ "../views/backoffice"), // lazy laoding using separate chunk
  redirect: { name: "backoffice.dashboard" },
  children: [
    // dashboard
    {
      path: "dashboard",
      name: "backoffice.dashboard",
      component: () => import(/* webpackChunkName: "backoffice" */ "../views/backoffice/dashboard/Dashboard.vue"),
    },
    // Triage
    {
      path: "triage/new",
      name: "backoffice.triageNew",
      component: () => import(/* webpackChunkName: "backoffice" */ "../views/backoffice/triage/TriageSteps.vue"),
    },
    {
      path: "triage/all",
      name: "backoffice.triageList",
      component: () => import(/* webpackChunkName: "backoffice" */ "../views/backoffice/triage/TriageList.vue"),
    },

    // 0 Snapshots
    {
      path: "health_snapshot/new",
      name: "backoffice.healthSnapshotNew",
      component: () =>
        import(/* webpackChunkName: "backoffice" */ "../views/backoffice/health_snapshots/HealthSnapshotNew.vue"),
    },
    {
      path: "health_snapshot/:admission_id",
      name: "backoffice.healthSnapshotForAdmission",
      props: true,
      component: () =>
        import(
          /* webpackChunkName: "backoffice" */ "../views/backoffice/health_snapshots/HealthSnapshotForAdmission.vue"
        ),
    },

    // Admission
    {
      path: "admissions/:admission_id",
      name: "backoffice.admission",
      component: () => import(/* webpackChunkName: "backoffice" */ "../views/backoffice/admissions/Admission.vue"),
    },

    // Admissions list
    {
      path: "admissions/all",
      name: "backoffice.admissionsList",
      component: () => import(/* webpackChunkName: "backoffice" */ "../views/backoffice/admissions/AdmissionsList.vue"),
    },
    // Register patient
    {
      path: "patients/new",
      name: "backoffice.registerPatient",
      component: () =>
        import(/* webpackChunkName: "backoffice" */ "../views/backoffice/patients/RegisterPatientSteps.vue"),
    },

    // Patient
    {
      path: "patients/:patient_id",
      name: "backoffice.patient",
      props: true,
      component: () => import(/* webpackChunkName: "backoffice" */ "../views/backoffice/patients/Patient.vue"),
    },

    // Patients list
    {
      path: "patients/all",
      name: "backoffice.patientsList",
      component: () => import(/* webpackChunkName: "backoffice" */ "../views/backoffice/patients/PatientsList.vue"),
    },

    // Bed management
    {
      path: "bedmanagement/all",
      name: "backoffice.bedList",
      component: () => import(/* webpackChunkName: "backoffice" */ "../views/backoffice/bedmanagement/BedList.vue"),
    },
    {
      path: "bedmanagement/types/all",
      name: "backoffice.bedTypeList",
      component: () => import(/* webpackChunkName: "backoffice" */ "../views/backoffice/bedmanagement/BedTypeList.vue"),
    },
  ],
};

export default routes;
