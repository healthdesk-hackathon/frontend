const state = {
  sidebarMenuList: [
    {
      label: "Triage",
      group: "triage",
      menu_items: [
        {
          to: { name: "backoffice.triageNew" },

          icon: "plus",
          label: "Admit a patient",
        },
        {
          to: { name: "backoffice.triageList" },

          icon: "bed",
          label: "Recently triaged",
        },
      ],
    },

    {
      label: "Patient Admin",
      group: "patients",
      menu_items: [
        {
          to: { name: "backoffice.patientSearch" },

          icon: "magnify",
          label: "Search patient",
        },
        {
          to: { name: "backoffice.registerPatient" },
          icon: "plus",
          label: "Register a patient",
        },
        {
          to: { name: "backoffice.admitPatient" },
          context: "patient",
          icon: "import",
          label: "Admit this patient",
        },
        {
          to: { name: "backoffice.patientsList" },

          icon: "account-group",
          label: "Recent patient registrations",
        },
        {
          to: { name: "backoffice.admissionsList" },
          icon: "clipboard-list",
          label: "Recent admissions",
        },
        {
          to: { name: "backoffice.patientDetails" },
          context: "patient",
          icon: "card-account-details",
          label: "View / edit patient details",
        },
        {
          to: { name: "backoffice.admissionMoveToPatient" },
          context: "admission",
          icon: "folder-move",
          label: "Move admission to existing patient",
        },
      ],
    },

    {
      label: "Bedside Care",
      group: "bedside",
      menu_items: [
        {
          to: { name: "backoffice.bedsideSearch" },

          icon: "magnify",
          label: "Search patient",
        },
      ],
    },

    {
      label: "Specialist Care",
      group: "specialist",
      menu_items: [
        {
          to: { name: "backoffice.patientSpecialistSearch" },

          icon: "magnify",
          label: "Search patient",
        },
      ],
    },

    {
      label: "Pharmacy",
      group: "pharmacy",
      menu_items: [
        {
          to: { name: "backoffice.prescriptionsList" },

          icon: "script-text",
          label: "Recent prescriptions",
        },
        {
          to: { name: "backoffice.prescriptionsSearch" },

          icon: "magnify",
          label: "Search prescription",
        },
      ],
    },

    {
      label: "Laboratory",
      group: "laboratory",
      menu_items: [
        {
          to: { name: "backoffice.labRequestsList" },

          icon: "tray-full",
          label: "Recent requests",
        },
        {
          to: { name: "backoffice.labRequestsSearch" },

          icon: "magnify",
          label: "Search requests",
        },
      ],
    },

    {
      label: "Ward support",
      group: "ward-support",
      menu_items: [
        {
          to: { name: "backoffice.patientMoveList" },

          icon: "vector-polyline",
          label: "Move patient",
        },
        {
          to: { name: "backoffice.cleaningList" },

          icon: "bed-empty",
          label: "Cleaning required",
        },
        {
          to: { name: "backoffice.equipmentDeliveryList" },

          icon: "washing-machine",
          label: "Deliver equipment",
        },
        {
          to: { name: "backoffice.mealsRequestList" },

          icon: "silverware-fork-knife",
          label: "Meals required",
        },
      ],
    },
    {
      label: "Dashboard",
      group: "mgt-dashboard",
      menu_items: [
        {
          to: { name: "backoffice.dashboard" },

          icon: "chart-line",
          label: "View Dashboard",
        },
      ],
    },

    {
      label: "Manage",
      group: "manage",
      menu_items: [
        {
          to: { name: "backoffice.bedTypeList" },

          icon: "bed-empty",
          label: "Manage bed types",
        },
        {
          to: { name: "backoffice.bedList" },

          icon: "bed-empty",
          label: "See all beds",
        },
        {
          to: { name: "backoffice.equipmentTypeList" },

          icon: "washing-machine",
          label: "Manage equipment types",
        },
        {
          to: { name: "backoffice.equipmentList" },

          icon: "washing-machine",
          label: "See all equipment",
        },
        {
          to: { name: "backoffice.userManage" },

          icon: "account-multiple-outline",
          label: "Manage users",
        },
      ],
    },
  ],
};

export default {
  state,
  namespaced: true,
};
