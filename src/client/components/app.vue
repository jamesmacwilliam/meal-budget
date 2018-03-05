<template>
  <v-app id="mb-container">
    <mb-navigation/>
    <v-content>
      <mb-flash />
      <v-container fluid fill-height>
        <v-layout
          justify-center
          align-center
          >
          <router-view/>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer color="primary" app>
      <span class="white--text">&copy; 2018</span>
    </v-footer>
  </v-app>
</template>
<script>
import MbNavigation from './mb-navigation.vue'
import MbFlash from './mb-flash.vue'

export default {
  props: ['loggedIn', 'username'],
  components: { MbNavigation, MbFlash },
  created() {
    this.$store.commit('setLoggedIn', this.loggedIn)
    this.$store.commit('setUsername', this.username)
  }
}
</script>
