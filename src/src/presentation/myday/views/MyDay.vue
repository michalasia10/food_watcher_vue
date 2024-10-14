<script setup lang="ts">
import FooterComponent from "@/core_ui/components/FooterComponent.vue";
// @ts-ignore
import ScrollDateCalendar from "@/presentation/myday/components/ScrollDateCalendar.vue";
import MacroProgressLinear from "@/presentation/myday/components/MacroProgressLinear.vue";

import {onMounted, ref, watch} from 'vue'
import {storeToRefs} from "pinia";
import AddMealFormula from "@/presentation/myday/components/AddMealFormula.vue";
import {useMyDayStore} from "@/presentation/myday/composables/myDayStore";
import {summaryMapper} from "@/presentation/myday/views/summaryMapper";
import MealTypeMapper from "@/presentation/myday/views/mealTypeMapper";

// store(s)
const myDayStore = useMyDayStore()

// ref(s)
const {isLoading, error, myDay} = storeToRefs(myDayStore)
const searchValue = ref<string>('')
const summaryKey = ref<number>(0)

// method(s)
const {fetchMyDay} = myDayStore


const selectedDate = ref<Date>(new Date());
const dialogShow = ref(false);


const onConfirm = () => {
  dialogShow.value = false
//   ToDo: Add meal to the list
}

const onCancel = () => {
  dialogShow.value = false
}

const changeDate = (value: Date) => {
  selectedDate.value = value
  fetchMyDay(value)
}

watch(myDay, async (newValue, oldValue) => {
      if (oldValue !== newValue) {
        console.log('myDay', newValue, oldValue)
        summaryKey.value += 1
      }
    }
)

onMounted(() => {
  fetchMyDay(selectedDate.value)
})


</script>


<template>
  <v-container class="d-flex flex-column meal-tracker" grow>
    <div class="fixed-section">
      <scroll-date-calendar
          :selectedDate="selectedDate"
          @on-select-date="changeDate"
      />
    </div>
    <v-divider/>
    <v-card class="scrollable-section">
      <v-card-text class="scrollable-content">
        <v-expansion-panels v-if="myDay">
          <v-expansion-panel v-for="meal in myDay.meals" :key="meal.type">
            <v-expansion-panel-title>
              <v-list-item>
                <v-list-item-title class="text-h6">{{ MealTypeMapper.fromString(meal.type) }}</v-list-item-title>
                <v-list-item-subtitle>
                  Kalorie | Białko | Tłuszcze | Węglowodany
                  <br>
                  {{ meal.macro.strRepresentation }}
                </v-list-item-subtitle>
              </v-list-item>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-list-item v-for="(product, index) in meal.products" :key="index">
                <v-list-item-title>{{ product.baseProduct.name }}</v-list-item-title>
                <v-list-item-subtitle>
                  {{ product.macro.strRepresentation }}
                </v-list-item-subtitle>
                <template v-slot:append>
                  <v-btn icon="mdi-close" variant="text"></v-btn>
                </template>
                <v-divider/>
              </v-list-item>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>

        <v-divider></v-divider>
      </v-card-text>

    </v-card>
    <v-divider/>
    <v-card class="fixed-section">
      <v-card-text>
        <v-row :key="summaryKey" class="align-content-center justify-center">
          <v-col
              v-for="map in summaryMapper"
              :key="map.key"
              cols="2"
              :class="map.cssClass"
          >
            <macro-progress-linear
                :value="myDay?.summary ? myDay.summary[map.key] : 0.0"
                :max-value="myDay?.user ? myDay.user[map.key] : 0.0"
                :color="map.color"
                :icon="map.icon"
                :unit="map.unit"
                :text="map.text"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <add-meal-formula
        :date="selectedDate"
        :dialog-show="dialogShow"
        @on-cancel="onCancel"
        @on-confirm="onConfirm"
    />
    <footer-component>
      <template #additional-nav-buttons>
        <v-btn value="add" @click="dialogShow = true">
          <v-icon>mdi-calendar-plus</v-icon>
          Dodaj produkt
        </v-btn>
      </template>
    </footer-component>
  </v-container>
</template>

<style scoped>

.fixed-section {
  flex: 0 0 auto;
}

.scrollable-section {
  flex: 1 1 auto;
  overflow-y: auto;
}

.scrollable-content {
  max-height: 100%;
}

.meal-tracker {
  height: calc(100vh - 152px);
  flex-direction: row;
  padding: 0px;
}
</style>