<template>
  <v-card class="date-bar" elevation="2">
    <v-btn icon="mdi-chevron-left" @click="moveDate(-1)" :disabled="isAtStart"/>
    <div class="date-container">
      <v-btn
          v-for="(date, index) in visibleDates"
          :key="index"
          :class="{ 'v-btn--active': isCurrentDate(date) }"
          variant="text"
          @click="selectDate(date)"
      >
        <div class="date-content">
          <div class="date-day">{{ formatDay(date) }}</div>
          <div class="date-number">{{ formatDate(date) }}</div>
          <div class="date-month" v-if="index === 0 || date.getDate() === 1">
            {{ formatMonth(date) }}
          </div>
        </div>
      </v-btn>
    </div>
    <v-btn icon="mdi-chevron-right" @click="moveDate(1)" :disabled="isAtEnd"/>
  </v-card>
</template>

<script setup>
import {ref, computed, onMounted, watch, toRefs} from 'vue';

const props = defineProps({
  selectedDate: {
    type: Date,
    default: () => new Date(),
  },
});

const {selectedDate} = toRefs(props);
const emit = defineEmits(['on-select-date']);

const currentIndex = ref(0);
const daysToShow = 5;

const dates = computed(() => {
  const today = new Date();
  const datesArray = [];
  for (let i = -180; i <= 180; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    datesArray.push(date);
  }
  return datesArray;
});

const visibleDates = computed(() => {
  return dates.value.slice(currentIndex.value, currentIndex.value + daysToShow);
});

const isAtStart = computed(() => currentIndex.value <= 0);
const isAtEnd = computed(() => currentIndex.value >= dates.value.length - daysToShow);

const formatDay = (date) => {
  return date.toLocaleDateString('pl-PL', {weekday: 'short'});
};

const formatDate = (date) => {
  return date.getDate();
};

const formatMonth = (date) => {
  return date.toLocaleDateString('pl-PL', {month: 'short'});
};

const isCurrentDate = (date) => {
  return date.toDateString() === selectedDate.value.toDateString();
};

const selectDate = (date) => {
  emit('on-select-date', date);
};

const moveDate = (direction) => {
  currentIndex.value += direction * daysToShow;
};

const centerSelectedDate = () => {
  const selectedIndex = dates.value.findIndex(date => isCurrentDate(date));
  if (selectedIndex !== -1) {
    currentIndex.value = Math.max(0, Math.min(selectedIndex - Math.floor(daysToShow / 2), dates.value.length - daysToShow));
  }
};

onMounted(() => {
  centerSelectedDate();
});

watch(() => selectedDate.value, () => {
  centerSelectedDate();
});
</script>

<style scoped>
.full-height-container {
  height: calc(100vh - 152px);
  overflow-y: auto;
}

.date-bar {
  display: flex;
  align-items: center;
  padding: 8px;
  background-color: #f5f5f5;
}

.date-container {
  display: flex;
  justify-content: center;
  flex-grow: 1;
}

.date-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.date-day {
  font-size: 0.75rem;
  opacity: 0.7;
}

.date-number {
  font-size: 1.2rem;
  font-weight: bold;
}

.date-month {
  font-size: 0.75rem;
  opacity: 0.7;
}

.v-btn {
  margin: 0 4px;
  height: auto;
  min-width: 48px;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.v-btn--active {
  background-color: #1976D2;
  color: white;
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(25, 118, 210, 0.5);
}

.v-btn--active .date-content {
  font-weight: bold;
}

.v-btn--active .date-day,
.v-btn--active .date-month {
  opacity: 1;
}

.v-btn:not(.v-btn--active):hover {
  background-color: rgba(25, 118, 210, 0.1);
}
</style>