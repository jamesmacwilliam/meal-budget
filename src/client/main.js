import Vue from 'vue/dist/vue.esm'
import App from './components/app.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import VueRouter from 'vue-router'

Vue.use(Vuetify)
Vue.use(VueRouter)

new Vue({
  el: '#app',
  template: "<App />",
  components: { App }
})
