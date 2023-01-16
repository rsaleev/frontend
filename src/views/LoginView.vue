<template>
  <v-container fluid mb-6>
    <v-card class="px-4">
      <v-card-title>Вход в систему</v-card-title>
      <v-card-text>
        <v-form ref="loginForm" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="10">
              <v-text-field
                v-model="login"
                class="input-field"
                name="input-login"
                label="Логин"
                width="200px"
              ></v-text-field>
            </v-col>
            <v-col cols="10">
              <v-text-field
                v-model="password"
                :append-icon="show ? 'eye' : 'eye-off'"
                :type="show ? 'text' : 'password'"
                class="input-field"
                name="input-password"
                label="Пароль"
                width="200px"
                @click:append="show = !show"
              ></v-text-field>
            </v-col>
            <v-col class="d-flex" cols="12" sm="6" xsm="12"></v-col>
            <v-spacer></v-spacer>
            <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
              <v-btn
                x-large
                block
                :disabled="!valid"
                color="success"
                @click="validate"
              >
                Войти
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
let valid = true
let login = ''
let password = ''
let show = false
</script>
