<template>
  <b-navbar fixed-top>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ name: 'backoffice' }">
        <h3 class="is-size-3 has-text-weight-bold has-text-primary">
          Healthdesk
        </h3>
      </b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item tag="div">
        <div class="buttons">
          <a class="button is-light">
            My Profile
            <!-- TODO: add logged in user name etc here -->
          </a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<style lang="scss" scoped>
.navbar {
  border-bottom: 1px solid $border;
  padding: 0 2rem;
}
</style>
