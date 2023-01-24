<!-- eslint-disable vue/v-on-event-hyphenation -->
<template>
  <v-container full-width>
    <v-row class="mb-6">
      <v-col cols="5"></v-col>
      <v-col cols="1" class="mx-1">
        <objects-filter
          @submit-filter-data="filterDataCallback($event)"
        ></objects-filter>
      </v-col>
      <v-col cols="1" class="mx-1">
        <objects-export :query-param="query"></objects-export>
      </v-col>
      <v-col cols="1" class="mx-1">
        <objects-import></objects-import>
      </v-col>
    </v-row>
    <objects-simple
      :items="items"
      :items-per-page="query.size"
    ></objects-simple>
    <div class="text-center">
      <v-pagination
        v-model="query.page"
        :length="totalPages"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
        @update:model-value="getObjects(query)"
      ></v-pagination>
    </div>
  </v-container>
</template>

<script setup>
//import ObjectsFull from '@/components/objects/ObjectsFull.vue'

import ObjectsSimple from '@/components/objects/ObjectsSimple.vue'
import ObjectsFilter from '@/components/objects/ObjectsFilter.vue'
import ObjectsExport from '@/components/objects/ObjectsExport.vue'
import ObjectsImport from '@/components/objects/ObjectsImport.vue'

import { ref, reactive } from 'vue'
import httpClient from '@/plugins/httpclient'
import { onBeforeMount } from 'vue'

const rootURL = process.env.VUE_APP_BACKEND_URL

const items = ref(null)
const itemsTotal = ref(0)
const totalPages = ref(0)

const query = reactive({
  size: 30,
  page: 1
})

function filterDataCallback(arg) {
  console.log(arg)
  for (let key in arg) {
    if (arg[key] !== null) {
      query[key] = arg[key]
    }
  }
  getObjects(query)
}

function getObjects(arg) {
  httpClient
    .get(rootURL.concat('/objects'), {
      params: arg
    })
    // 200+
    .then((response) => {
      items.value = response.data.items
      itemsTotal.value = response.data.total
      totalPages.value = Math.round(itemsTotal.value / query.size)
    })
    // не 200+
    .catch((error) => {
      if (error.response) {
        return error.response
      }
    })
}

onBeforeMount(() => {
  getObjects(query)
})
</script>

<style></style>
