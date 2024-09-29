<script setup lang="ts">
import {defineProps, computed} from 'vue';
import ProgressLinear from "@/core_ui/components/ProgressLinear.vue";

interface Pops {
  value: number,
  maxValue: number,
  color: string,
  icon: string,
  unit: string
  text: string
}

const props = defineProps<Pops>()
const {value, text, maxValue, color, icon, unit} = props
const valueValue = computed(() => value.valueOf())
const maxValueValue = computed(() => maxValue.valueOf())
const colorValue = computed(() => color.valueOf())
const iconValue = computed(() => icon.valueOf())

</script>

<template>
  <progress-linear
      :color="colorValue"
      :value="valueValue"
      :max-value="maxValueValue"
  />
  <div class="text-caption text-right" :style="valueValue > maxValueValue ? {color:'red'} : ''">
    <v-icon start :icon="iconValue"></v-icon>
    <strong>{{ text }} {{ valueValue }} / {{ maxValue }} {{ unit }} </strong>
  </div>
</template>

<style scoped>
</style>