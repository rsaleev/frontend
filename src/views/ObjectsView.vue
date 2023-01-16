<!-- eslint-disable vue/v-on-event-hyphenation -->
<template>
  <v-container full-width>
    <v-spacer></v-spacer>
    <v-text-field
      v-model="search"
      class="search"
      append-icon="mdi-magnify"
      label="Search"
      single-line
      hide-details
    ></v-text-field>
    <div class="text-center">
      <v-dialog v-model="dialog" width="500">
        <objects-filter @requestFilterData="getObjects"></objects-filter>
      </v-dialog>
    </div>
    <objects-simple
      :items="items"
      :items-per-page="itemsPerPage"
    ></objects-simple>
    <div class="text-center">
      <v-pagination
        v-model="currentPage"
        :length="totalPages"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
        @update:model-value="getObjects"
      ></v-pagination>
    </div>
  </v-container>
</template>

<script setup>
//import ObjectsFull from '@/components/objects/ObjectsFull.vue'

import ObjectsSimple from '@/components/objects/ObjectsSimple.vue'
import ObjectsFilter from '@/components/objects/ObjectsFilter.vue'

import { ref, watch, onMounted } from 'vue'
import httpClient from '@/plugins/httpclient'
import { onBeforeMount } from 'vue'

const items = ref(null)
const itemsTotal = ref(0)
const itemsPerPage = ref(50)
const currentPage = ref(1)
const totalPages = ref(1)
const dialog = ref(false)

const query = ref(null)


defineExpose({
  items,
  itemsTotal,
  itemsPerPage,
  currentPage,
  totalPages
})

function getObjects(arg) {
  let params = {
    page: currentPage.value,
    size: itemsPerPage.value
  }
  if (arg.value != null) {
    params.value.assign(arg)
  }
  httpClient
    .get(`http://localhost:8081/objects`, {
      params: params
    })
    // 200+
    .then((response) => {
      items.value = response.data.items
      itemsTotal.value = response.data.total
      totalPages.value = Math.round(itemsTotal.value / itemsPerPage.value)
    })
    // не 200+
    .catch((error) => {
      if (error.response) {
        return error.response
      }
    })
}




onMounted(() => {
  watch(
    () => currentPage,
    (value) => {
      currentPage.value = value
      getObjects()
    }
  )
})

onBeforeMount(() => {
  getObjects(query)
})
//const dialog = ref(false)
</script>

<style>
.v-text-field.search {
  width: 400px;
}
</style>
