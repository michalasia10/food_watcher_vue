<script setup lang="ts">
import {defineProps} from 'vue';

defineProps<{
  macroValue: number | undefined,
  macroUnit: string,
  color: string,
  icon: string,
  cssClass?: string
}>()
const precisedValue = (value: number | undefined) => value ? value.toFixed(2) : 0.00

</script>

<template>
  <v-chip
      :color="color"
      :class="cssClass"
      label
  >
    <v-icon start :icon="icon"></v-icon>
    {{ precisedValue(macroValue) }} {{ macroUnit }}
  </v-chip>
</template>

<style scoped>

</style>