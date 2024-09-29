<script setup lang="ts">
import ScrollDateCalendar from "@/presentation/myday/components/ScrollDateCalendar.vue";
import FooterComponent from "@/core_ui/components/FooterComponent.vue";
import MacroProgressLinear from "@/presentation/myday/components/MacroProgressLinear.vue";

import {ref} from 'vue'
import AddMealFormula from "@/presentation/myday/components/AddMealFormula.vue";

const weekDays = ref([
  {short: 'P', date: '11', current: false},
  {short: 'W', date: '12', current: false},
  {short: 'Ś', date: '13', current: false},
  {short: 'C', date: '14', current: true},
  {short: 'P', date: '15', current: false},
  {short: 'S', date: '16', current: false},
  {short: 'N', date: '17', current: false},
])
const mealsB = ref([
  {name: 'Banan', weight: 130, calories: 126, protein: 1.3, fat: 0.4, carbs: 0.4},
  {name: 'Banan', weight: 130, calories: 126, protein: 1.3, fat: 0.4, carbs: 0.4},
  {name: 'Banan', weight: 130, calories: 126, protein: 1.3, fat: 0.4, carbs: 0.4},
  {name: 'Banan', weight: 130, calories: 126, protein: 1.3, fat: 0.4, carbs: 0.4},
  {name: 'Banan', weight: 130, calories: 126, protein: 1.3, fat: 0.4, carbs: 0.4},
  {name: 'Banan', weight: 130, calories: 126, protein: 1.3, fat: 0.4, carbs: 0.4},
  {name: 'Banan', weight: 130, calories: 126, protein: 1.3, fat: 0.4, carbs: 0.4},
  {name: 'Banan', weight: 130, calories: 126, protein: 1.3, fat: 0.4, carbs: 0.4},
  {name: 'Banan', weight: 130, calories: 126, protein: 1.3, fat: 0.4, carbs: 0.4},
  {name: 'Banan', weight: 130, calories: 126, protein: 1.3, fat: 0.4, carbs: 0.4},
  {name: 'Banan', weight: 130, calories: 126, protein: 1.3, fat: 0.4, carbs: 0.4},
  {name: 'Banan', weight: 130, calories: 126, protein: 1.3, fat: 0.4, carbs: 0.4},
  {name: 'Banan', weight: 130, calories: 126, protein: 1.3, fat: 0.4, carbs: 0.4},
  {name: 'Banan', weight: 130, calories: 126, protein: 1.3, fat: 0.4, carbs: 0.4},
  {name: 'Banan', weight: 130, calories: 126, protein: 1.3, fat: 0.4, carbs: 0.4},
  {name: 'Banan', weight: 130, calories: 126, protein: 1.3, fat: 0.4, carbs: 0.4},
  {name: 'Banan', weight: 130, calories: 126, protein: 1.3, fat: 0.4, carbs: 0.4},
  {name: 'Banan', weight: 130, calories: 126, protein: 1.3, fat: 0.4, carbs: 0.4},
])
const mealsL = ref([
  {name: 'Apple', weight: 130, calories: 126, protein: 1.3, fat: 0.4, carbs: 0.4},
  {name: 'Apple', weight: 130, calories: 126, protein: 1.3, fat: 0.4, carbs: 0.4},
  {name: 'Apple', weight: 130, calories: 126, protein: 1.3, fat: 0.4, carbs: 0.4},
])

const macros = ref([
  {name: 'Białka', current: 150, target: 120, color: '#4CAF50'},
  {name: 'Tłuszcze', current: 40, target: 70, color: '#FFEB3B'},
  {name: 'Węgle', current: 88, target: 373, color: '#2196F3'},
  {name: 'Kcal', current: 22, target: 373, color: '#F44336'},
])

const selectedDate = ref(new Date());
const dialogShow = ref(false);


const onConfirm = () => {
  dialogShow.value = false
//   ToDo: Add meal to the list
}

const onCancel = () => {
  dialogShow.value = false
}

const changeDate = (value) => {
  selectedDate.value = value
}

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
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-title>
              <v-list-item>
                <v-list-item-title class="text-h6">Śniadanie</v-list-item-title>
                <v-list-item-subtitle>391 kcal 13.3 10.2 61</v-list-item-subtitle>
              </v-list-item>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-list-item v-for="(item, index) in mealsB" :key="index">
                <v-list-item-title>{{ item.name }}</v-list-item-title>
                <v-list-item-subtitle>
                  {{ item.weight }}g
                  {{ item.calories }} kcal
                  {{ item.protein }} g
                  {{ item.fat }} g
                  {{ item.carbs }} g
                </v-list-item-subtitle>
                <template v-slot:append>
                  <v-btn icon="mdi-close" variant="text"></v-btn>
                </template>
                <v-divider/>
              </v-list-item>
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title>
              <v-list-item>
                <v-list-item-title class="text-h6">Drugie</v-list-item-title>
                <v-list-item-subtitle>500 kcal 13.3 10.2 61</v-list-item-subtitle>
              </v-list-item>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-list-item v-for="(item, index) in mealsL" :key="index">
                <v-list-item-title>{{ item.name }}</v-list-item-title>
                <v-list-item-subtitle>
                  {{ item.weight }}g
                  {{ item.calories }} kcal
                  {{ item.protein }} g
                  {{ item.fat }} g
                  {{ item.carbs }} g
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
        <v-row class="align-content-center justify-center">
          <v-col cols="2" class="pr-2">
            <macro-progress-linear
                :value="macros[0].current"
                :max-value="macros[0].target"
                :color="macros[0].color"
                icon="mdi-food-drumstick"
                unit="g"
                text="Białko"
            />
          </v-col>
          <v-col cols="2" class="px-4">
            <macro-progress-linear
                :value="macros[1].current"
                :max-value="macros[1].target"
                :color="macros[1].color"
                icon="mdi-cheese"
                unit="g"
                text="Tłuszcze"
            />
          </v-col>
          <v-col cols="2" class="pr-2">
            <macro-progress-linear
                :value="macros[2].current"
                :max-value="macros[2].target"
                :color="macros[2].color"
                icon="mdi-barley"
                unit="g"
                text="Węgle"
            />
          </v-col>
          <v-col cols="2" class="pr-2">
            <macro-progress-linear
                :value="macros[3].current"
                :max-value="macros[3].target"
                :color="macros[3].color"
                icon="mdi-fire"
                unit="kcal"
                text="Kalorie"
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