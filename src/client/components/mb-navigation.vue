<template>
  <div id="navigation">
    <v-navigation-drawer
      fixed
      v-model="drawer"
      app
    >
      <v-list dense>
        <li v-for="item in leftNavItems">
          <router-link :to="item.path" class="list__tile" exact>
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </router-link>
        </li>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="primary" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Meal Budget</v-toolbar-title>
    </v-toolbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      drawer: null,
      leftNavItems: [
        {
          icon: 'home',
          title: 'Home',
          path: '/'
        }
      ]
    }
  }
}
</script>
