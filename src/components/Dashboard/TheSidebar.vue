<template>
  <b-menu>
    <b-menu-list label="Submission management">
      <b-menu-item
        :to="{ name: 'Backoffice.TriageMode' }"
        tag="router-link"
        icon="flash"
        label="Triage mode"
      ></b-menu-item>
      <b-menu-item
        :to="{ name: 'Backoffice.TriageNew' }"
        tag="router-link"
        icon="new-box"
        label="New submissions"
      ></b-menu-item>
      <b-menu-item
        :to="{ name: 'Backoffice.TriageTreated' }"
        tag="router-link"
        icon="archive"
        label="Treated submissions"
      ></b-menu-item>
    </b-menu-list>
  </b-menu>
</template>

<script>
export default {};
</script>
