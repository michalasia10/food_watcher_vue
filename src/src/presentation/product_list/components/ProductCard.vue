<script setup lang="ts">
import {defineProps} from 'vue';
import {Product} from '@/feature/product/domain/entities/Product';
import MacroChip from "@/presentation/product_list/components/MacroChip.vue";


defineProps<{
  product: Product
}>();

const gramUnit = 'g'

</script>

<template>
  <v-card class="product-card" max-width="500" elevation="3">
    <div class="image-container">
      <v-img
          :src="product.image"
          height="160"
          width="160"
          cover
          class="mx-auto"
          :aspect-ratio="1"
      >
      </v-img>
    </div>
    <v-card-title class="text-center text-white bg-black bg-opacity-50 ">
      {{ product.name }}
    </v-card-title>
    <v-divider></v-divider>

    <v-card-text>
      <macro-chip
          icon="mdi-food-drumstick"
          color="green"
          css-class="ml-8"
          :macro-unit="gramUnit"
          :macro-value="product.macro.protein"
      />
      <macro-chip
          icon="mdi-cheese"
          color="yellow"
          cssClass="ml-3"
          :macro-unit="gramUnit"
          :macro-value="product.macro.fat"
      />

      <macro-chip
          icon="mdi-barley"
          color="blue"
          cssClass="ml-3"
          :macro-unit="gramUnit"
          :macro-value="product.macro.carbs"
      />

      <macro-chip
          icon="mdi-fire"
          color="red"
          cssClass="ml-3"
          macro-unit="kcal"
          :macro-value="product.macro.kcal"
      />


    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn class="custom-btn" color="primary">
        Edit
      </v-btn>
      <v-btn class="custom-btn" color="error">
        Delete
      </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.product-card {
  transition: all 0.3s ease-in-out;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.image-container {
  height: 240px;
  position: relative;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>