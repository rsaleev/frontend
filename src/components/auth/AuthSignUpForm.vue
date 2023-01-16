<template>
  <v-card class="mx-auto" width="320px" color="grey-lighten-3" elevation="12">
    <v-card-content>
      <v-form ref="data" v-model="registerUser" @submit.prevent="loginUser">
        <v-text-field
          v-model="login"
          :rules="loginRules"
          label="Логин"
          required
        />
        <v-text-field
          v-model="mail"
          :rules="mailRules"
          label="E-Mail"
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
          Регистрация
        </v-btn>
      </v-form>
    </v-card-content>
  </v-card>
</template>

<script setup>
import axios from 'axios'

let form = new FormData()

function registerUser() {
  axios.post('/auth/register', form, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
</script>
