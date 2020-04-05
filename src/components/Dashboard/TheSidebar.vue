<template>
  <b-menu>
    <b-menu-list>
      <b-menu-item
        :to="{ name: 'backoffice.dashboard' }"
        tag="router-link"
        icon="chart-line"
        label="View Dashboard"
      ></b-menu-item>
    </b-menu-list>

    <b-menu-list label="Triage">
      <b-menu-item
        :to="{ name: 'backoffice.triageNew' }"
        tag="router-link"
        icon="plus"
        label="Admit a patient"
      ></b-menu-item>
    </b-menu-list>

    <b-menu-list label="Admitted Patients">
      <b-menu-item
        :to="{ name: 'backoffice.admissionsList' }"
        tag="router-link"
        icon="bed"
        label="Admitted patients"
      ></b-menu-item>
    </b-menu-list>

    <b-menu-list label="Bed Management">
      <b-menu-item
        :to="{ name: 'backoffice.bedTypeList' }"
        tag="router-link"
        icon="bed"
        label="See all bed types"
      ></b-menu-item>
      <b-menu-item
        :to="{ name: 'backoffice.bedList' }"
        tag="router-link"
        icon="bed"
        label="See all beds"
      ></b-menu-item>
    </b-menu-list>

    <b-menu-list label="Health Snapshots">
      <b-menu-item
        :to="{ name: 'backoffice.healthSnapshotNew' }"
        tag="router-link"
        icon="plus"
        label="Create a health snapshot"
      ></b-menu-item>
    </b-menu-list>
  </b-menu>
</template>

<script>
export default {};
</script>
