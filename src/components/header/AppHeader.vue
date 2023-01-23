<template>
  <v-app-bar app color="indigo-lighten-1" clipped-left density="compact">
    <!-- Кнопка раскрытия меню -->
    <v-app-bar-nav-icon
      variant="text"
      @click="drawerActivated = !drawerActivated"
    />
    <!-- Текст в заголовке -->
    <v-app-bar-title class="headline">
      <span class="justify-center">{{ appHeaderTitle }}</span>
      <!-- Объект меню > -->
    </v-app-bar-title>
    <v-spacer />
    <!-- <h4>{{ userIn }}</h4> -->
    <v-btn to="/auth/account" color="white">
      <v-icon>mdi-account</v-icon>
    </v-btn>
    <!-- Навигационное меню -->
  </v-app-bar>
  <app-navigation-drawer :drawer-state="drawerActivated" />
</template>

<script setup>
// базовые
import { ref } from 'vue'
// компоненты
import AppNavigationDrawer from '@/components/header/AppNavigationDrawer.vue'
// переменные
const drawerActivated = ref(false)
const appHeaderTitle = process.env.VUE_APP_TITLE
//функции
</script>
