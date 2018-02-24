<template>
  <v-app id="mb-container">
    <mb-navigation/>
    <v-content>
      <v-container fluid fill-height>
        <v-layout
          justify-center
          align-center
          >
          <router-view/>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2018</span>
    </v-footer>
  </v-app>
</template>
<script>
import MbNavigation from './mb-navigation.vue'

export default {
  components: { MbNavigation }
}
</script>
