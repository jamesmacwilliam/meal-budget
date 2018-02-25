// libs
import Vue from 'vue/dist/vue.esm'
import VeeValidate from 'vee-validate'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

// internal
import App from './components/app.vue'
import router from './router'

import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  theme: {
    primary: colors.indigo.darken4,
    secondary: colors.indigo.lighten1,
    accent: colors.indigo.accent4
  }
})

Vue.use(VeeValidate)

new Vue({
  el: '#app',
  router,
  template: "<App />",
  components: { App }
})
