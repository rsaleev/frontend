const namespaced = true

const state = {
  username: '',
  password: '',
  email: ''
}

const getters = {
  usernameGet(state) {
    return state.username
  },
  passwordGet(state) {
    return state.password
  },
  emailGet(state) {
    return state.email
  }
}
const mutations = {
  usernameSet(state, payload) {
    state.username = payload
  },
  passwordSet(state, payload) {
    state.password = payload
  },
  emailSet(state, payload) {
    state.email = payload
  }
}

export default {
  namespaced,
  state,
  getters,
  mutations
}
