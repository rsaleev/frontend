<template>
  <div class="text-center">
    <v-btn :disabled="dialog" :loading="dialog" @click.stop="importData">
      <v-icon>mdi-upload</v-icon>
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
          disabled="uploading"
          :loading="uploading"
          @click.stop="uploadFile(file)"
        >
          Загрузить
        </v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import httpClient from '@/plugins/httpclient'

const file = ref(null)
const dialog = ref(false)
const uploading = ref(false)
function importData() {
  dialog.value = true
  let formData = new FormData()
  formData.append('file', file)
}

function uploadFile(arg) {
  httpClient
    .post(
      'http://localhost/import/upload',
      {
        file: arg
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    .then((response) => {
      if (response.status === 200) {
        uploading.value = false
      }
    })
}
</script>
