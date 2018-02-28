import Vuex from 'vuex'

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('jwt'),
    exp: localStorage.getItem('exp'),
    expWarnSeconds: 60
  },
  getters: {
    expirySeconds: (state, getters) => {
      return getters.expiryTime.diff(moment())/1000
    }
    expiryTime: (state, getters) => {
      return moment(state.exp)
    }
    expiryWarn: (state, getters) => {
      return getters.expirySeconds <= state.expWarnSeconds
    }
  },
  mutations: {
    setToken(state, token) {
      if (token) {
        localStorage.setItem('jwt', token)
      }else{
        localStorage.removeItem('jwt')
      }
      state.jwt = token
    }
    setTokenExpiry(state, expString) {
      if (exp) {
        localStorage.setItem('exp', expString)
      }else{
        localStorage.removeItem('exp')
      }
      state.exp = moment(expString)
    }
  }
})

