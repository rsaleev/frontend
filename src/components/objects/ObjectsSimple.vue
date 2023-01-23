<template>
  <v-data-table
    :items-per-page="itemsPerPage"
    fixed-header
    dense
    height="400"
    class="elevation-0 custom_table"
  >
    <thead>
      <tr>
        <th class="text-center header-text">Адрес</th>
        <th class="text-center header-text">Регион</th>
        <th class="text-center header-text">Округ</th>
        <th class="text-center header-text">Район</th>
        <th class="text-center header-text">Кол-во подъездов</th>
        <th class="text-center header-text">Статус</th>
        <th class="text-center header-text">Последнее изменение</th>
        <th class="text-center header-text">Прогноз</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.id">
        <td class="text-left">
          <p class="text-wrap">
            {{ item.address }}
          </p>
        </td>
        <td class="text-center">
          <p class="text-wrap">{{ item.region }}</p>
        </td>
        <td class="text-center">
          <p class="text-wrap">
            {{ item.area }}
          </p>
        </td>
        <td class="text-center">
          <p class="text-wrap">
            {{ item.district }}
          </p>
        </td>
        <td class="text-center">
          <p class="text-wrap">
            {{ item.doors }}
          </p>
        </td>
        <td class="text-center">
          <p class="text-wrap">
            {{ item.status }}
          </p>
        </td>
        <td class="text-center">
          <p class="text-wrap">
            {{ formatDateTime(item.status_date) }}
          </p>
        </td>
        <td class="text-center">
          <p class="text-wrap">
            {{ item.predict }}
          </p>
        </td>
      </tr>
    </tbody>
  </v-data-table>
</template>

<script setup>
import { ref } from '@vue/reactivity'
import { onMounted, watch } from 'vue'
import { formatDateTime } from '@/plugins/dateformatter'

const props = defineProps({
  items: {
    type: Array,
    // eslint-disable-next-line vue/require-valid-default-prop
    default: []
  },

  itemsPerPage: {
    type: Number,
    default: 30
  },
  currentPage: {
    type: Number,
    default: 1
  }
})

const items = ref(props.items)
const itemsPerPage = ref(props.itemsPerPage)
onMounted(() => {
  watch(
    () => props.items,
    (value) => {
      items.value = value
    }
  )
})
</script>

<style>
.custom_table {
  max-height: 400px;
  overflow: auto;
}
.custom_table td {
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
}
.text-wrap {
  font-size: 12px;
}

.header-text {
  font-size: 14px;
}
</style>
