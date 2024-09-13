<script setup lang="ts">
import {useProductStore} from '@/presentation/product_list/composables/productsStore'
import {storeToRefs} from "pinia";
import {onMounted} from "vue";

const productStore = useProductStore()
const {isLoading, error, products} = storeToRefs(productStore)
const {fetchProducts} = productStore

onMounted(() => {
  fetchProducts()
})


</script>

<template>
<v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h3 mb-4">Products</h1>
      </v-col>
    </v-row>

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
</template>

<style scoped>

</style>