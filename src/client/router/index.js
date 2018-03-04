import Vue from 'vue/dist/vue.esm'
import Router from 'vue-router'
import Dashboard from './dashboard'
import { login, logout, signup } from './auth'

Vue.use(Router)

let router = new Router({
  routes: [
    Dashboard,
    login,
    logout,
    signup
  ]
})

router.beforeEach((to, from, next) => {
  if (['login', 'logout', 'signup'].indexOf(to.name) >= 0) { return next() }
  if (router.app.$store.getters.freshToken) { return next() }
  next({ name: 'login' })
})

export default router
