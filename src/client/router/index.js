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
  if (to.name == 'login') {
    next()
  }else{
    next({ name: 'login' })
  }
})

export default router
