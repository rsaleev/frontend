<template>
  <v-container>
    <v-form class="requestFilter" @submit="setFilterData">
      <v-card class="filter">
        <v-card-title>ID ФИАС</v-card-title>
        <v-text-field
          v-model="fiasIdFilter"
          single-line
          hide-details
        ></v-text-field>
      </v-card>
      <v-card class="filter">
        <v-card-title>Код ФИАС</v-card-title>
        <v-text-field
          v-model="fiasCodeFilter"
          single-line
          hide-details
        ></v-text-field>
      </v-card>
      <v-card class="filter">
        <v-card-title>Адрес</v-card-title>
        <v-text-field
          v-model="addressFilter"
          placeholder="Тверская 10"
          single-line
          hide-details
        ></v-text-field>
      </v-card>
      <v-card class="filter">
        <v-card-title>Регион</v-card-title>
        <v-text-field
          v-model="regionFilter"
          placeholder="Москва"
          single-line
          hide-details
        ></v-text-field>
      </v-card>
      <v-card class="filter">
        <v-card-title>Район</v-card-title>
        <v-text-field
          v-model="areaFilter"
          single-line
          hide-details
        ></v-text-field>
      </v-card>
      <v-card class="filter">
        <v-card-title>Округ</v-card-title>
        <v-text-field
          v-model="districtFilter"
          single-line
          hide-details
        ></v-text-field>
      </v-card>
      <v-card class="filter">
        <v-card-title>Годы постройки</v-card-title>
        <v-row>
          <v-col>
            <v-text-field
              v-model="yearBuiltMinFilter"
              placeholder="c"
              single-line
              hide-details
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="yearBuiltMaxFilter"
              placeholder="по..."
              single-line
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card>
      <v-card class="filter">
        <v-card-title>Годы эксплуатации</v-card-title>
        <v-row>
          <v-col>
            <v-text-field
              v-model="yearMaintenanceMinFilter"
              placeholder="c"
              single-line
              hide-details
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="yearMaintenanceMaxFilter"
              placeholder="по..."
              single-line
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card>
      <v-card class="filter">
        <v-card-title>Кол-во подъездов</v-card-title>
        <v-row>
          <v-col>
            <v-text-field
              v-model="doorsMinFilter"
              placeholder="от..."
              single-line
              hide-details
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="doorsMaxFilter"
              placeholder="до..."
              single-line
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card>
      <v-card class="filter">
        <v-card-title>Кол-во этажей</v-card-title>
        <v-row>
          <v-col>
            <v-text-field
              v-model="levelsMinFilter"
              placeholder="от..."
              single-line
              hide-details
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="levelsMaxFilter"
              placeholder="до..."
              single-line
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card>
      <v-card class="filter">
        <v-card-title>Дата изменения статуса</v-card-title>
        <v-row>
          <v-col>
            <v-text-field
              v-model="statusDateMinFilter"
              placeholder="от..."
              single-line
              hide-details
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="statusDateMaxFilter"
              placeholder="до..."
              single-line
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card>
      <v-card class="filter">
        <v-card-title>Статус</v-card-title>
        <v-text-field
          v-model="statusFilter"
          single-line
          hide-details
        ></v-text-field>
      </v-card>
      <v-btn type="submit" @click="setFilterData">Применить</v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref, emit } from 'vue'

defineEmits(['requestFilterData'])

const requestFilterData = ref(null)

const fiasIdFilter = ref(null)
const fiasCodeFilter = ref(null)
const addressFilter = ref(null)
const regionFilter = ref(null)
const areaFilter = ref(null)
const districtFilter = ref(null)
const yearBuiltMinFilter = ref(null)
const yearBuiltMaxFilter = ref(null)
const yearMaintenanceMinFilter = ref(null)
const yearMaintenanceMaxFilter = ref(null)
const doorsMinFilter = ref(null)
const doorsMaxFilter = ref(null)
const levelsMinFilter = ref(null)
const levelsMaxFilter = ref(null)
const statusFilter = ref(null)
const statusDateMinFilter = ref(null)
const statusDateMaxFilter = ref(null)

function setFilterData() {
  requestFilterData.value.append(fiasIdFilter.value)
  requestFilterData.value.append(fiasCodeFilter.value)
  requestFilterData.value.append(addressFilter.value)
  requestFilterData.value.append(regionFilter.value)
  requestFilterData.value.append(areaFilter.value)
  requestFilterData.value.append(districtFilter.value)
  requestFilterData.value.append(yearBuiltMinFilter.value)
  requestFilterData.value.append(yearBuiltMaxFilter.value)
  requestFilterData.value.append(yearMaintenanceMinFilter.value)
  requestFilterData.value.append(yearMaintenanceMaxFilter.value)
  requestFilterData.value.append(doorsMinFilter.value)
  requestFilterData.value.append(doorsMaxFilter.value)
  requestFilterData.value.append(levelsMinFilter.value)
  requestFilterData.value.append(levelsMaxFilter.value)
  requestFilterData.value.append(statusFilter.value)
  requestFilterData.value.append(statusDateMinFilter.value)
  requestFilterData.value.append(statusDateMaxFilter.value)
  emit('requestFilterData', requestFilterData)
}
</script>

<style>
.v-card-title {
  width: 50%;
  font-size: 14px;
}
.v-text-field {
  height: 10%;
}
</style>
