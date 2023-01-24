<template>
  <v-container>
    <v-card
      width="300px"
      class="mx-auto px-auto"
      elevation="12"
      rounded="10"
      color="grey-lighten-3"
      justify-space-around
    >
      <v-card-item>
        <v-form ref="data" v-model="loginFormValid" @submit.prevent="loginUser">
          <v-text-field v-model="login" label="Логин/Email" required />
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
      </v-card-item>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const data = new FormData()
const loginFormValid = ref(false)
const login = ref(store.getters['login/LOGIN_GET'])
const password = ref(store.getters['login/PASSWORD_GET'])
const loggedIn = computed(() => store.getters['auth/LOGGED_GET'])

function loginUser() {
  data.append('username', login.value)
  data.append('password', password.value)
  store.dispatch('auth/LOGIN_USER', data)
  if (loggedIn.value === true) {
    router.push('/objects')
  }
}

onMounted(() =>
  watch([login, password, loggedIn], () => {
    if (loggedIn.value === true) {
      router.push('/objects')
    }
    if (login.value !== '' && password.value !== '') {
      loginFormValid.value = true
    }
  })
)
</script>

<style scoped>
.v-card {
  padding-top: 20px;
}
</style>
