<template>
  <div class="text-center">
    <v-btn fab @click.stop="dialog = true">
      <v-icon color="blue">mdi-filter</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" scrollable max-width="500px">
      <v-card>
        <v-card-item class="filter">
          <v-card-title>ID ФИАС</v-card-title>
          <v-text-field
            v-model="filterData.fias_id"
            single-line
            hide-details
            placeholder="ФИАС ID"
          ></v-text-field>
        </v-card-item>
        <v-card-item class="filter">
          <v-card-title>Код ФИАС</v-card-title>
          <v-text-field
            v-model="filterData.fias_code"
            single-line
            hide-details
            placeholder="ФИАС код"
          ></v-text-field>
        </v-card-item>
        <v-card-item class="filter">
          <v-card-title>Адрес</v-card-title>
          <v-text-field
            v-model="filterData.address"
            single-line
            hide-details
            placeholder="Адрес"
          ></v-text-field>
        </v-card-item>
        <v-card-item class="filter">
          <v-card-title>Регион</v-card-title>

          <v-text-field
            v-model="filterData.region"
            single-line
            hide-details
            placeholder="Регион"
          ></v-text-field>
        </v-card-item>
        <v-card-item class="filter">
          <v-card-title>Район</v-card-title>
          <v-text-field
            v-model="filterData.area"
            single-line
            hide-details
            placeholder="Район"
          ></v-text-field>
        </v-card-item>
        <v-card-item class="filter">
          <v-card-title>Округ</v-card-title>
          <v-text-field
            v-model="filterData.district"
            single-line
            hide-details
            placeholder="Округ"
          ></v-text-field>
        </v-card-item>
        <v-card-item class="filter">
          <v-card-title>Годы постройки</v-card-title>
          <v-row>
            <v-col>
              <v-text-field
                v-model="filterData.year_built_min"
                placeholder="С ..."
                single-line
                hide-details
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="filterData.year_built_max"
                placeholder="По..."
                single-line
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-item>
        <v-card-item class="filter">
          <v-card-title>Годы эксплуатации</v-card-title>
          <v-row>
            <v-col>
              <v-text-field
                v-model="filterData.year_maintenance_min"
                placeholder="c"
                single-line
                hide-details
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="filterData.year_maintenance_max"
                placeholder="по..."
                single-line
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-item>
        <v-card-item class="filter">
          <v-card-title>Кол-во подъездов</v-card-title>
          <v-row>
            <v-col>
              <v-text-field
                v-model="filterData.doors_min"
                placeholder="от..."
                single-line
                hide-details
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="filterData.doors_max"
                placeholder="до..."
                single-line
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-item>
        <v-card-item class="filter">
          <v-card-title>Кол-во этажей</v-card-title>
          <v-row>
            <v-col>
              <v-text-field
                v-model="filterData.levels_min"
                placeholder="от..."
                single-line
                hide-details
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="filterData.levels_max"
                placeholder="до..."
                single-line
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-item>
        <v-card-item class="filter">
          <v-card-title>Дата изменения статуса</v-card-title>
          <v-row>
            <v-col>
              <v-text-field
                v-model="filterData.status_date_min"
                placeholder="от..."
                single-line
                hide-details
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="filterData.status_date_max"
                placeholder="до..."
                single-line
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-item>
        <v-card-item class="filter">
          <v-card-title>Статус</v-card-title>
          <v-text-field
            v-model="filterData.status"
            single-line
            hide-details
          ></v-text-field>
        </v-card-item>
        <v-card-actions>
          <v-btn @click.stop="submitFilterData">Применить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const emit = defineEmits(['submitFilterData'])

const dialog = ref(false)

const filterData = reactive({
  fias_id: null,
  fias_code: null,
  address: null,
  region: null,
  area: null,
  district: null,
  year_built_min: null,
  year_built_max: null,
  year_maintenance_min: null,
  year_maintenance_max: null,
  doors_min: null,
  doors_max: null,
  levels_min: null,
  levels_max: null,
  status: null,
  status_date_min: null,
  status_date_max: null
})

function submitFilterData() {
  emit('submitFilterData', filterData)
  dialog.value = false
  for (let key in filterData) {
    filterData[key] = null
  }
}
</script>

<style>
.v-card-title {
  width: 50%;
  font-size: 14px;
}
</style>
