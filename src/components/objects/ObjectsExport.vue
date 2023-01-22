<template>
  <div class="text-center">
    <v-btn :disabled="dialog" :loading="dialog" @click="exportData">
      <v-icon>mdi-download</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" hide-overlay persistent width="300">
      <v-card width="300px">
        <v-card-text>
          Загрузка файла
          <v-progress-linear indeterminate class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { toRefs, ref } from 'vue'
import httpClient from '@/plugins/httpclient'
import qs from 'qs'

const props = defineProps({
  queryParam: {
    type: Object,
    default: null
  }
})
const params = toRefs(props.queryParam)
const taskId = ref(null)
const taskState = ref(null)
const polling = ref(null)
const dialog = ref(false)

function getIds() {
  httpClient
    .get(`http://localhost:8081/objects/ids`, {
      params: params
    })
    // 200+
    .then((response) => {
      let ids = response.data.ids
      return ids
    })
    // не 200+
    .catch((error) => {
      if (error.response) {
        return error.response
      }
    })
}

function exportDataRetrieve() {
  httpClient
    .get(`http://localhost:8081/objects/export/download`, {
      params: {
        id: taskId.value
      },
      responseType: 'blob',
      headers: {
        Accept:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      }
    })
    .then((response) => {
      if (response.status === 200) {
        clearInterval(polling.value)
        dialog.value = false
        let href = URL.createObjectURL(response.data)
        let link = document.createElement('a')
        link.href = href
        link.setAttribute('download', 'export.xlsx')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(href)
      }
    })
    // не 200+
    .catch((error) => {
      if (error.response) {
        return error.response
      }
    })
}

function exportData() {
  // получить список ID
  dialog.value = true

  let itemsIds = getIds()
  httpClient
    .get(`http://localhost:8081/objects/export`, {
      params: {
        ids: itemsIds
      },
      paramsSerializer: (params) => {
        return qs.stringify(params)
      }
    })
    // 200+
    .then((response) => {
      taskId.value = response.data.id
      taskState.value = response.data.state
      pollExportTaskRetrieve()
    })
    // не 200+
    .catch((error) => {
      if (error.response) {
        return error.response
      }
    })
}

function pollExportTaskRetrieve() {
  polling.value = setInterval(() => {
    exportDataRetrieve()
  }, 1000)
}
</script>
