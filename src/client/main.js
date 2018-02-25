import Vue from 'vue/dist/vue.esm'
import App from './components/app.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import router from './router'

import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  theme: {
    primary: colors.indigo.darken4,
    secondary: colors.indigo.lighten1,
    accent: colors.indigo.accent4
  }
})

new Vue({
  el: '#app',
  router,
  template: "<App />",
  components: { App }
})
