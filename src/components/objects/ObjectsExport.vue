<template>
  <div>
    <v-btn @click="exportData">Экспорт</v-btn>
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

const polling = null

function getIds() {
  httpClient
    .get(`http://localhost:8081/objects`, {
      params: params
    })
    // 200+
    .then((response) => {
      let items = response.data.items
      let ids = []
      items.forEach((element) => {
        ids.value.push(element.id)
      })
      return ids
    })
    // не 200+
    .catch((error) => {
      if (error.response) {
        return error.response
      }
    })
}
function exportTaskCheck() {
  httpClient
    .get(`http://localhost:8081/objects/export/check`, {
      params: {
        id: taskId.value
      }
    })
    // 200+
    .then((response) => {
      taskState.value = response.data.state
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
      responseType: 'stream'
    })
    .then((response) => {
      let content = response.headers['Content-Disposition']
      let file = content.split(';')
      let filename = file[1].split('=')
      let buffer = []
      for (const data of response.data) {
        buffer.push(data)
      }
      let href = URL.createObjectURL(buffer)
      let link = document.createElement('a')
      link.href = href
      link.setAttribute('download', filename)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(href)
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
  let itemsIds = getIds()
  httpClient
    .get(`http://localhost:8081/objects/export?ids`, {
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
      pollExportTaskCheck()
    })
    // не 200+
    .catch((error) => {
      if (error.response) {
        return error.response
      }
    })
}

function pollExportTaskCheck() {
  polling.value = setInterval(() => {
    exportTaskCheck()
    if (taskState.value === 'SUCCESS') {
      clearInterval(polling.value)
      exportDataRetrieve()
    }
  }, 1000)
    // 200+
    .then((response) => {
      taskId.value = response.data.id
      taskState.value = response.data.state
      pollExportTaskCheck()
    })
    // не 200+
    .catch((error) => {
      if (error.response) {
        return error.response
      }
    })
}
</script>
