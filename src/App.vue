<template>
  <v-app>
    <app-header />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import AppHeader from '@/components/header/AppHeader.vue'

export default {
  name: 'App',
  components: { AppHeader },

  data: () => ({
    //
  })
}
</script>
