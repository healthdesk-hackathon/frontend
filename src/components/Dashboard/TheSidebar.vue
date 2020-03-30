<template>
  <b-menu>
    <b-menu-list label="Triage">
      <b-menu-item
        :to="{ name: 'Backoffice.TriageNew' }"
        tag="router-link"
        icon="plus"
        label="Admit a patient"
      ></b-menu-item>
    </b-menu-list>
  </b-menu>
</template>

<script>
export default {};
</script>
