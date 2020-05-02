<template>
  <b-menu>
    <b-menu-list
      v-for="menuListItem in groupMenuList"
      :key="menuListItem.group"
      :label="menuListItem.label"
    >
      <b-menu-item
        v-for="menuItem in menuListItem.menu_items"
        :key="menuItem.to.name"
        :to="menuItem.to"
        tag="router-link"
        :icon="menuItem.icon"
        :label="menuItem.label"
      ></b-menu-item>
    </b-menu-list>
  </b-menu>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["sidebarmenu", "user"]),
    groupMenuList() {
      // Deep clone the state, as the current filtering and manipulation
      // messes up the arrays otherwise
      let list = JSON.parse(JSON.stringify(this.sidebarmenu.sidebarMenuList));

      // Filter the sidebarMenuList for the user's groups
      list = list.filter(listitem => this.user.groups.includes(listitem.group));

      // For the remaining groups, filter the menu items to show
      // only those without a context, or where the current state
      // has an item for the context.
      // For example, if the context of an item is an admission, and
      // and the store state has an admission set, keep the item.

      let currentView = this.user.current_view;

      list.forEach(listitem => {
        listitem.menu_items = listitem.menu_items.filter(
          item =>
            !item.context ||
            (currentView[item.context] && currentView[item.context].id)
        );
      });

      return list;
    }
  }
};
</script>
