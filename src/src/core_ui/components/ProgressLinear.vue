<script setup lang="ts">

import {computed, defineProps, toRefs} from "vue";

interface Props {
  value: number,
  maxValue: number,
  color: string,
}


const props = defineProps<Props>()
const {value, maxValue, color} = toRefs(props)

const clampedValue = computed(() => Math.min(100, (value.value / maxValue.value) * 100));
const colorValue = computed(() => color.value);
const overflow = computed(() => Math.max(0, ((value.value - maxValue.value) / maxValue.value) * 100));
const fillValue = computed(() => Math.min(100, (maxValue.value - value.value) * 100));

</script>

<template>
  <div class="custom-progress-bar">
    <v-progress-linear
        :model-value="100"
        height="10"
        rounded
        bg-opacity="1"
        bg-color="grey-lighten-2"
    >
      <template v-slot:default>
        <div class="progress-wrapper">
          <div
              class="progress-content"
              :style="{ width: `${clampedValue}%`, 'background-color': colorValue }"
          />
          <div
              v-if="overflow > 0"
              class="progress-content overflow"
              :style="{ width: `${overflow}%` }"
          />
          <div
              v-else
              class="progress-content not-overflow"
              :style="{ width: `${fillValue}%` }"
          />
        </div>
      </template>
    </v-progress-linear>
  </div>
</template>


<style scoped>
.custom-progress-bar {
  width: 100%;
}

.progress-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
}

.progress-content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: width 0.3s ease;
}


.overflow {
  background-color: #FF5252; /* Vuetify error color */
}
.not-overflow {
  background-color: lightgray;
}
</style>