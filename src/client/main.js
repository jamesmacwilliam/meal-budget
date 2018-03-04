import Vue from 'vue/dist/vue.esm'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/es5/util/colors'
Vue.use(Vuetify, {
  theme: {
    primary: colors.indigo.darken4,
    secondary: colors.indigo.lighten1,
    accent: colors.indigo.accent4
  }
})

import VeeValidate from 'vee-validate'
Vue.use(VeeValidate)

import store from './store'

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

// internal
import App from './components/app.vue'
import router from './router'

new Vue({
  el: '#app',
  router,
  store: store,
  components: { App }
})
