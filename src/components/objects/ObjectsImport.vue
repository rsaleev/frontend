<template>
  <div class="text-center">
    <v-btn :disabled="dialog" :loading="dialog" @click.stop="importData">
      <v-icon color="red">mdi-upload</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" hide-overlay width="500px">
      <v-card width="400px">
        <v-card-text>Импорт таблицы</v-card-text>
        <v-file-input
          v-model="file"
          label="Выберите файл"
          prepend-icon="mdi-paperclip"
          show-size
        ></v-file-input>
        <v-btn
          text
          :disabled="buttonDisabled"
          :loading="uploading"
          @click.stop="uploadFile(file)"
        >
          Загрузить
        </v-btn>
        <v-progress-linear v-show="progressLinear" />
        <v-card-text v-show="textVisible">{{ text }}</v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import httpClient from '@/plugins/httpclient'

const rootURL = process.env.VUE_APP_BACKEND_URL
const polling = ref(null)
const file = ref(null)
const text = ref(null)
const textVisible = ref(true)
const buttonDisabled = ref(true)
const progressLinear = ref(false)
const dialog = ref(false)
const uploading = ref(false)
const taskId = ref(false)
const taskState = ref(false)

function importData() {
  dialog.value = true
}

function importDataRetrieve() {
  httpClient
    .get(rootURL.concat('/objects/import/check'), {
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
      {
        if (response.data.task_state === 'SUCCESS') {
          textVisible.value = true
          text.value = 'Завершено'
        }
        clearInterval(polling.value)
        dialog.value = false
      }
    })
    // не 200+
    .catch((error) => {
      text.value = error.response
    })
}
function pollImportDataRetrieve() {
  polling.value = setInterval(() => {
    importDataRetrieve()
  }, 1000)
}

function uploadFile() {
  let formData = new FormData()
  formData.append('file', file.value)
  uploading.value = true
  httpClient
    .post(
      rootURL.concat('/objects/import/upload'),
      {
        file: formData
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    .then((response) => {
      taskId.value = response.data.id
      taskState.value = response.data.state
      pollImportDataRetrieve()
    })
    .catch((error) => {
      textVisible.value = true
      text.value = error.response
    })
}

onMounted(() => {
  watch(file, (value) => {
    if (value !== null) {
      buttonDisabled.value = false
    } else {
      buttonDisabled.value = true
    }
  })
})
</script>
