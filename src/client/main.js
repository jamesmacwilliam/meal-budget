import Vue from 'vue/dist/vue.esm'
import App from './components/app.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import router from './router'

Vue.use(Vuetify)

new Vue({
  el: '#app',
  router,
  template: "<App />",
  components: { App }
})
