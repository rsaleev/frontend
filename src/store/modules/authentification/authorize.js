import axios from 'axios'

const namespaced = true

const state = {
  userToken: null
}

const getters = {
  // получение токена
  TOKEN_GET(state) {
    return state.userToken
  },
  LOGGED_GET(state) {
    if (state.userToken !== null) {
      return true
    } else {
      return false
    }
  }
}
const mutations = {
  // назначение токена
  TOKEN_SET(state, payload) {
    state.userToken = payload
  },
  // удаление значения токена
  TOKEN_UNSET(state) {
    state.userToken = null
  }
}

const actions = {
  // запрос на авторизацию и получение токена
  LOGIN_USER({ commit }, payload) {
    axios
      .post(`${process.env.VUE_APP_BACKEND_URL}/auth/login`, payload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      // 200+
      .then((response) => {
        // // сохранение токена в хранилище и в локальном хранилище
        // localStorage.setItem('token', response.data.access_token)
        // назначение значений
        commit('TOKEN_SET', response.data.access)
      })
      // не 200+
      .catch((error) => {
        if (error.response) {
          return error.response
        }
      })
  },
  // запрос на выход из сессии
  LOGOUT_USER({ commit }, { payload }) {
    axios
      //отправка запроса
      .post(process.env.VUE_APP_BACKEND_URL + '/logout', {
        payload
      })
      .then((response) => {
        console.log(response)
        // удаление токена из хранилища и локального хранилища
        // localStorage.removeItem('token')
        commit('TOKEN_UNSET')
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response)
        }
      })
  }
}

export default {
  namespaced,
  getters,
  mutations,
  actions,
  state
}
