import axios from 'axios'

// import store from '@/store'

const httpClient = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_URL,
  withCredentials: false,
  timeout: 30000,
  // headers: { Authorization: `Bearer ${store.getters['auth/tokenGet']}` }
  headers: { 'Access-Control-Allow-Origin': 'http://localhost' }
})

export default httpClient
