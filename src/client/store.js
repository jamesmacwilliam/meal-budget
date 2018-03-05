import Vue from 'vue/dist/vue.esm'
import Vuex from 'vuex'

Vue.use(Vuex)

import axios from 'axios'
import moment from 'moment'

const store = new Vuex.Store({
  state: {
    loggedIn: false,
    username: sessionStorage.getItem('username'),
    flashSuccess: null,
    flashError: null
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
        commit('setUsername', user.username)
      } catch(e) {
        commit('flashError', 'that username/password was not valid')
      }
    },
    async logout({ commit, state }) {
      await axios.get('/auth/logout')
      commit('setLoggedIn', false)
    }
  },
  mutations: {
    flashError(state, error) {
      state.flashError = error
    },
    flashSuccess(state, success) {
      state.flashSuccess = success
    },
    setUsername(state, username) {
      sessionStorage.setItem('username', username)
      state.username = username
    },
    setLoggedIn(state, status = false) {
      sessionStorage.setItem('loggedIn', status.toString())
      state.loggedIn = status.toString() === 'true'
    }
  }
})

module.exports = store
