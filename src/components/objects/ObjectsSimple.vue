<template>
  <v-data-table
    :items-per-page="itemsPerPage"
    fixed-header
    class="elevation-1 custom_table"
  >
    <thead>
      <tr>
        <th class="text-center">Адрес</th>
        <th class="text-center">Регион</th>
        <th class="text-center">Округ</th>
        <th class="text-center">Район</th>
        <th class="text-center">Кол-во подъездов</th>
        <th class="text-center">Статус</th>
        <th class="text-center">Последнее изменение</th>
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
    default: 50
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
.custom_table td {
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
}
</style>
