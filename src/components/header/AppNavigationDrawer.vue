<template>
  <v-navigation-drawer v-model="drawerActivated" temporary clipped>
    <!-- Список объектов меню  -->
    <v-list>
      <v-list-item
        v-for="item in menu.items"
        :key="item.title"
        :to="item.link"
        link
      >
        <!-- Объект меню  -->
        <v-list-item-icon>
          <v-icon class="mx-2">{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="mx-2">{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { watch, ref, onMounted } from 'vue'

//props
const props = defineProps({
  drawerState: {
    type: Boolean,
    required: true
  }
})
const menu = ref({
  items: [
    {
      title: 'Задачи',
      link: '/tasks',
      icon: 'mdi-briefcase-clock',
      scope: 'tasks',
      role: null
    },
    {
      title: 'Справочники',
      link: '/catalogues',
      icon: 'mdi-book',
      scope: 'catalogues',
      role: null
    },
    {
      title: 'Файлы',
      link: '/files',
      icon: 'mdi-file-tree',
      scope: 'files',
      role: null
    }
  ]
})
// включение наблюдателя за активностью меню
const drawerActivated = ref(false)
onMounted(() => {
  watch(
    () => props.drawerState,
    (value) => {
      drawerActivated.value = value
    }
  )
})
</script>

<style scoped>
:global(.v-navigation-drawer) {
  will-change: initial;
}
</style>
