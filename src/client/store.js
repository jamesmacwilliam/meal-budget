import Vue from 'vue/dist/vue.esm'
import Vuex from 'vuex'

Vue.use(Vuex)

import axios from 'axios'
import moment from 'moment'

const store = new Vuex.Store({
  state: {
    loggedIn: false
  },
  actions: {
    async login({ commit, state }, user) {
      const payload = {
        username: user.username,
        password: user.password
      }
      try {
        await axios.post('/auth/login', payload)
        commit('setLoggedIn', true)
      } catch(e) {}
    }
  },
  mutations: {
    setLoggedIn(state, status = false) {
      sessionStorage.setItem('loggedIn', status.toString())
      state.loggedIn = status.toString() === 'true'
    }
  }
})

module.exports = store
