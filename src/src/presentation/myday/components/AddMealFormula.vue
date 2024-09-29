<script setup lang="ts">


import {defineProps, ref, defineEmits, toRefs, computed} from 'vue';

interface Props {
  date: Date,
  dialogShow: boolean
}

const props = defineProps<Props>()
const {date, dialogShow} = toRefs(props)


const meals = computed(() => {
  return [
    {title: 'Śniadanie', value: 'brekfast'},
    {title: 'Obiad', value: 'lunch'},
    {title: 'Kolacja', value: 'dinner'},
  ]
})

const products = [
  {id: '12345', name: 'Banana', weight: 130, calories: 126, protein: 1.3, fat: 0.4, carbs: 0.4},
  {id: '1234555', name: 'Apple', weight: 130, calories: 126, protein: 1.3, fat: 0.4, carbs: 0.4},
  {id: '1234556', name: 'Chocolate', weight: 130, calories: 126, protein: 1.3, fat: 0.4, carbs: 0.4},
]


const selectedProduct = ref(null)
const isValidForm = ref(false)


const emit = defineEmits({
  "on-confirm": () => true,
  "on-cancel": () => true
})


const onConfirm = () => {
  emit('on-confirm')
}


const onCancel = () => {
  emit('on-cancel')
}

</script>

<template>
  <v-dialog v-model="dialogShow" max-width="50%">
    <v-card>
      <v-card-title>
        Dodaj Produt dla {{ date.toLocaleString(undefined, {year: 'numeric', month: '2-digit', day: '2-digit'}) }}
      </v-card-title>
      <v-card-title>
        <v-form v-model="isValidForm">
          <v-container>
            <v-row>
              <v-col
                  cols="12"
                  class="d-flex justify-end"
              >
                <v-autocomplete
                    label="Typ posiłku"
                    :items="meals"
                />
              </v-col>
              <v-col
                  cols="12"
                  class="d-flex justify-end"
              >
                <v-autocomplete
                    label="Produkt"
                    item-title="name"
                    :model-value="selectedProduct"
                    :items="products"
                    clearable
                    return-object
                >
                  <template v-slot:item="{props,item}">
                    <v-list-item
                        v-bind="props"
                    >
                      <v-list-item-subtitle>
                        Białko: {{ item.raw.protein }} g /
                        Tłuszcz: {{ item.raw.fat }} g /
                        Węgle: {{ item.raw.carbs }} g /
                        Kalorie: {{ item.raw.calories }} kcal
                      </v-list-item-subtitle>
                    </v-list-item>
                  </template>
                </v-autocomplete>
              </v-col>
              <v-col
                  cols="12"
                  class="d-flex justify-end"
              >
                <v-text-field
                    label="Waga Produktu [g]"
                    type="number"
                />
              </v-col>
            </v-row>
          </v-container>
          <v-spacer/>
          <div class="buttons d-flex pb-3">
            <v-btn
                @click="onCancel"
                class="mr-3"
            >
              Cancel
            </v-btn>
            <v-spacer/>
            <v-btn
                color="black"
                class="white--text mr-5"
                @click="onConfirm"
            >
              Confirm
            </v-btn>
          </div>
        </v-form>
      </v-card-title>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.buttons {
  padding-left: 67%;
}
</style>