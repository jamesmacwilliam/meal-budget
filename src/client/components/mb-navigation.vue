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
      <v-spacer></v-spacer>
      <v-menu v-if="loggedIn" bottom left>
        <v-btn slot="activator">
          {{ username }}
        </v-btn>
        <v-list>
          <v-list-tile :key="0" @click="logout">
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
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
  },
  computed: {
    username() {
      return this.$store.state.username
    },
    loggedIn() {
      return this.$store.state.loggedIn
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('logout')
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
