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
    ...mapState(["sidebarmenu", "user", "patient", "admission"]),
    groupMenuList: function() {
      // Filter the sidebarMenuList for the user's groups

      var list = this.sidebarmenu.sidebarMenuList.filter(
        listitem => this.user.groups.indexOf(listitem.group) >= 0
      );

      // For the remaining groups, filter the menu items to show
      // only those without a context, or where the current state
      // has an item for the context.
      // For example, if the context of an item is an admission, and
      // and the store state has an admission set, keep the item.
      list.forEach(listitem => {
        listitem.menu_items = listitem.menu_items.filter(
          item => !item.context || (this[item.context] && this[item.context].id)
        );
      });

      return list;
    }
  }
};
</script>
