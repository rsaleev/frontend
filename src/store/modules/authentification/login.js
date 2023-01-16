const namespaced = true

const state = {
  username: null,
  password: null
}

const getters = {
  LOGIN_GET(state) {
    return state.username
  },
  PASSWORD_GET(state) {
    return state.password
  }
}
const mutations = {
  LOGIN_SET(state, payload) {
    state.username = payload
  },
  PASSWORD_SET(state, payload) {
    state.password = payload
  },
  LOGIN_UNSET(state) {
    state.username = null
  },
  PASSWORD_UNSET(state) {
    state.password = null
  }
}
const actions = {
  LOGIN_UPDATE({ commit }, payload) {
    commit('LOGIN_SET', payload)
  },
  PASSWORD_UPDATE({ commit }, payload) {
    commit('PASSWORD_SET', payload)
  },
  CLEAR_CREDENTIALS({ commit }) {
    commit('PASSWORD_UNSET')
    commit('LOGIN_UNSET')
  }
}

export default {
  namespaced,
  state,
  getters,
  mutations,
  actions
}
