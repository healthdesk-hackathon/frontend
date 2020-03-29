<template>
  <div class="columns">
    <div class="column is-narrow" id="menu-column">
      <section class="section">
        <TheSideBar />
      </section>
    </div>
    <div class="column">
      <section class="section">
        <router-view />
      </section>
    </div>
  </div>
</template>

<script>
import TheSideBar from "@/components/Dashboard/TheSidebar";

export default {
  components: {
    TheSideBar
  }
};
</script>

<style lang="scss" scoped>
#menu-column {
  min-height: 100vh;
  border-right: 1px solid $border;
}
</style>
