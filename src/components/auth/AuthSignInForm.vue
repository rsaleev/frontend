<template>
  <v-card
    width="300px"
    class="mx-auto px-auto"
    elevation="12"
    rounded="10"
    color="grey-lighten-3"
    justify-space-around
  >
    <v-card-content>
      <v-form ref="data" v-model="loginFormValid" @submit.prevent="loginUser">
        <v-text-field
          v-model="login"
          :rules="loginRules"
          label="Логин/Email"
          required
        />
        <v-text-field
          v-model="password"
          type="Password"
          label="Пароль"
          required
        />
        <v-btn
          :disabled="!loginFormValid"
          type="submit"
          color="success"
          class="mx-5"
          fab
        >
          Войти
        </v-btn>
      </v-form>
    </v-card-content>
  </v-card>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()
// vars
let data = new FormData()
let login = ref(store.getters['login/LOGIN_GET'])
let password = ref(store.getters['login/PASSWORD_GET'])
let loginFormValid = ref(false)

let loggedIn = computed(() => store.getters['auth/LOGGED_IN_GET'])

function loginUser() {
  data.append('username', login.value)
  data.append('password', password.value)
  store.dispatch('auth/LOGIN_USER', data)
  if (loggedIn.value == true) {
    store.dispatch('login/CLEAR_CREDENTIALS')
    router.push('/')
  }
}
</script>

<style scoped>
.v-card {
  padding-top: 20px;
}
</style>
