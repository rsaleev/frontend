<template>
  <v-container fluid>
    <v-btn>
      Фильтры
      <ObjectsFilter></ObjectsFilter>
    </v-btn>
    <v-data-table
      v-model:page="page"
      v-model:options="options"
      :items-per-page="itemsPerPage"
      fixed-header
      :server-items-length="itemsTotal"
      :loading="loading"
      class="elevation-1"
    >
      <thead>
        <tr>
          <th class="text-left">ID</th>
          <th class="text-left">Lat</th>
          <th class="text-left">Lon</th>
          <th class="text-left">ID дома</th>
          <th class="text-left">ФИАС ID</th>
          <th class="text-left">ФИАС Код</th>
          <th class="text-left">Адрес</th>
          <th class="text-left">Регион</th>
          <th class="text-left">Населенный пункт</th>
          <th class="text-left">Округ</th>
          <th class="text-left">Серия дома</th>
          <th class="text-left">Год постройки</th>
          <th class="text-left">Год введения в эксплуатацию</th>
          <th class="text-left">Кол-во подъездов</th>
          <th class="text-left">Кол-во этажей</th>
          <th class="text-left">Кол-во помещений</th>
          <th class="text-left">Кол-во жилых помещений</th>
          <th class="text-left">Кол-во нежилых помещений</th>
          <th class="text-left">Общая площадь</th>
          <th class="text-left">Жилая площадь</th>
          <th class="text-left">Кол-во жильцов</th>
          <th class="text-left">Статус</th>
          <th class="text-left">Дата</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.lat }}</td>
          <td>{{ item.lon }}</td>
          <td>{{ item.house_id }}</td>
          <td>{{ item.fias_id }}</td>
          <td>{{ item.fias_code }}</td>
          <td>{{ item.address }}</td>
          <td>{{ item.region }}</td>
          <td>{{ item.area }}</td>
          <td>{{ item.district }}</td>
          <td>{{ item.serie }}</td>
          <td>{{ item.year_built }}</td>
          <td>{{ item.year_maintenance }}</td>
          <td>{{ item.doors }}</td>
          <td>{{ item.levels }}</td>
          <td>{{ item.flats_total }}</td>
          <td>{{ item.flats_living }}</td>
          <td>{{ item.flats_nonliving }}</td>
          <td>{{ item.area_total }}</td>
          <td>{{ item.area_living }}</td>
          <td>{{ item.residents }}</td>
          <td>{{ item.status }}</td>
          <td>{{ item.status_date }}</td>
        </tr>
      </tbody>
      <tfoot>
        <div class="text-center">
          <v-pagination
            v-model="page"
            :length="4"
            prev-icon="mdi-menu-left"
            next-icon="mdi-menu-right"
          ></v-pagination>
        </div>
      </tfoot>
    </v-data-table>
  </v-container>
</template>

<script setup>
import httpClient from '@/plugins/httpclient'
import { onBeforeMount } from 'vue'
import { ref } from '@vue/reactivity'
import { ObjectsFilter } from '@/components/objects/ObjectsFilter.vue'

const items = ref(null)
const itemsTotal = ref(null)
const itemsPerPage = ref(50)
const page = ref(1)
const loading = ref(true)

function getObjects(arg) {
  let queryParams = {
    page: page.value,
    size: itemsPerPage.value
  }
  if (arg.value != null) {
    queryParams.assign(arg.value)
  }
  httpClient
    .get(`http://localhost:8081/objects`, {
      params: queryParams
    })
    // 200+
    .then((response) => {
      items.value = response.data.items
      itemsTotal.value = response.data.total
    })
    // не 200+
    .catch((error) => {
      if (error.response) {
        return error.response
      }
    })
}
onBeforeMount(() => {
  getObjects()
})
</script>
