<script setup lang="ts">
import Footer from "@/core_ui/components/Footer.vue"
import {useProductStore} from '@/presentation/product_list/composables/productsStore'
import {storeToRefs} from "pinia";
import {onMounted} from "vue";

// store(s)
const productStore = useProductStore()

// ref(s)
const {isLoading, error, products} = storeToRefs(productStore)

// method(s)
const {fetchProducts} = productStore

onMounted(() => {
  fetchProducts()
})


</script>

<template>
  <v-container>
    <v-row v-if="isLoading">
      <v-col cols="12">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </v-col>
    </v-row>

    <v-row v-else-if="error">
      <v-col cols="12">
        <v-alert type="error" title="Error" :text="error"></v-alert>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col v-for="product in products" :key="product.id" cols="12" sm="6" md="4" lg="3">
        <v-card>
          <v-card-title>{{ product.name }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <Footer>
    <template #additional-nav-buttons>
      <v-btn value="add">
        <v-icon>mdi-plus</v-icon>
        Add
      </v-btn>
    </template>
  </Footer>

</template>
