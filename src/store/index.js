import { createStore } from 'vuex'
import Authorize from './modules/authentification/authorize.js'
import Register from './modules/authentification/register.js'
import Login from './modules/authentification/login.js'

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    auth: Authorize,
    register: Register,
    login: Login
  }
})
