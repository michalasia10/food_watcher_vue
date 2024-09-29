<script setup lang="ts">
</script>

<template>
  <v-bottom-navigation grow>
    <v-btn value="home">
      <v-icon>mdi-home</v-icon>
      My Day
    </v-btn>
    <slot name="additional-nav-buttons"></slot>
  </v-bottom-navigation>
</template>

<style scoped>
</style>