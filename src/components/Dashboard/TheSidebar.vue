<template>
  <b-menu>
    <b-menu-list label="Triage">
      <b-menu-item
        :to="{ name: 'Backoffice.TriageNew' }"
        tag="router-link"
        icon="plus"
        label="Add a file"
      ></b-menu-item>
      <b-menu-item
        :to="{ name: 'Backoffice.TriageList' }"
        tag="router-link"
        icon="archive"
        label="All files"
      ></b-menu-item>
    </b-menu-list>
  </b-menu>
</template>

<script>
export default {};
</script>
