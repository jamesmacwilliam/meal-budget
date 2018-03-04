import Vue from 'vue/dist/vue.esm'
import Vuex from 'vuex'

Vue.use(Vuex)

import axios from 'axios'
import moment from 'moment'

const store = new Vuex.Store({
  state: {
    token: sessionStorage.getItem('jwt'),
    exp: sessionStorage.getItem('exp'),
    expWarnSeconds: 60
  },
  getters: {
    freshToken: (state, getters) => {
      if (getters.expirySeconds > 1) { return state.token }
      return null
    },
    expirySeconds: (state, getters) => {
      return getters.expiryTime.diff(moment())/1000
    },
    expiryTime: (state, getters) => {
      if (!state.exp) { return moment() }
      return moment(state.exp)
    },
    expiryWarn: (state, getters) => {
      return getters.expirySeconds <= state.expWarnSeconds
    }
  },
  actions: {
    async fetchToken({ commit, state }, user) {
      const payload = {
        username: user.username,
        password: user.password
      }
      let response = await axios.post('/auth/login', payload)
      commit('setToken', response.data.token)
      commit('setTokenExpiry', response.data.expiryDate)
    }
  },
  mutations: {
    setToken(state, token) {
      if (token) {
        sessionStorage.setItem('jwt', token)
      }else{
        sessionStorage.removeItem('jwt')
      }
      state.jwt = token
    },
    setTokenExpiry(state, expString) {
      if (expString) {
        sessionStorage.setItem('exp', expString)
      }else{
        sessionStorage.removeItem('exp')
      }
      state.exp = moment(expString)
    }
  }
})

module.exports = store
