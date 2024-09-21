<script setup lang="ts">
import {useProductStore} from '@/presentation/product_list/composables/productsStore'
import {storeToRefs} from "pinia";
import {onMounted, ref} from "vue";
import ProductCard from "@/presentation/product_list/components/ProductCard.vue";
import Footer from "@/core_ui/components/Footer.vue";
import ContainerWithScroll from "@/core_ui/components/ContainerWithScroll.vue";


// store(s)
const productStore = useProductStore()

// ref(s)
const {isLoading, error, products} = storeToRefs(productStore)
const searchValue = ref<string>('')
const limit = 20

// method(s)
const {fetchProducts} = productStore

const resetError = () => {
  error.value = null
  searchValue.value = ''
}


onMounted(() => {
  fetchProducts(0, limit, '')
})


</script>

<template>
  <ContainerWithScroll
      :is-loading="isLoading"
      :items="products"
      :limit="limit"
      :search-value="searchValue"
      @fetch-items="fetchProducts"
  >
    <template #container-content>
      <v-row v-if="isLoading" justify="center" align="center" style="height: 2000px;">
        <v-col cols="12" class="text-center">
          <v-progress-circular
              indeterminate
              color="black"
              size="64"
          ></v-progress-circular>
        </v-col>
      </v-row>

      <v-row v-else-if="error" justify="center" align="center" style="height: 400px;">
        <v-col cols="12" class="text-center">
          <v-alert
              type="warning"
              closable
              @click:close="resetError"
          >
            An error occurred while loading products:
            <br>
            {{ error }}
          </v-alert>
        </v-col>
      </v-row>

      <v-row
          v-else
      >
        <v-col
            v-for="product in products"
            :key="product.id"
            cols="10"
            sm="10"
            lg="6"
            md="6"
        >
          <ProductCard :product="product"/>
        </v-col>
      </v-row>
      <Footer>
        <template #additional-nav-buttons>
          <v-text-field
              v-model="searchValue"
              label="Szukaj..."
              single-line
              clearable
              @click:clear="resetError"
              hide-details
              max-width="300"
          />
          <v-btn value="add">
            <v-icon>mdi-plus</v-icon>
            Add
          </v-btn>
        </template>
      </Footer>
    </template>
  </ContainerWithScroll>
</template>
<style scoped>
</style>