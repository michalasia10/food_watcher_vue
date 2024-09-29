<script setup lang="ts">
import {computed, ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {useMainStore} from "@/presentation/mainStore";
import {storeToRefs} from "pinia";
import PathEnum from "@/core/constant/paths";


const route = useRoute()

const mainStore = useMainStore()
const {logOut} = mainStore

const {isAuthPage} = storeToRefs(mainStore)

const drawer = ref(true)
const rail = ref(true)


const user = ref({
  name: 'Ronald Richards',
  email: 'ronald.richards@example.com'
})

const currentPageTitle = computed(() => {
  switch (route.path) {
    case PathEnum.ROOT:
      // ToDo: use i18n
      return 'Główna'
    case PathEnum.PRODUCTS:
      return 'Produkty'
    case PathEnum.MYDAY:
      return 'My Day'
    default:
      return 'FoodWatcher'
  }
})

</script>
<template>
  <v-app>
    <v-navigation-drawer
        v-model="drawer"
        permanent
        @click="rail = false"
        v-if="!isAuthPage"
    >
      <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
          :title="user.name"
          :subtitle="user.email"

      />
      <v-divider></v-divider>
      <v-list density="compact" nav>
        <v-list-item
            prepend-icon="mdi-calendar-month"
            title="My DAY"
            value="day"
            :to="PathEnum.MYDAY"
        />
        <v-list-item
            prepend-icon="mdi-food-apple"
            title="Produkty"
            value="products"
            :to="PathEnum.PRODUCTS"
        />
      </v-list>

      <template v-slot:append>
        <v-list density="compact" nav>
          <v-list-item
              prepend-icon="mdi-cog"
              title="Ustawienia konta"
              value="settings"
              :to="PathEnum.SETTINGS"
          />
          <v-list-item
              prepend-icon="mdi-help-circle"
              title="Pomoc"
              value="help"
              :to="PathEnum.HELP"
          />
          <v-list-item
              prepend-icon="mdi-logout"
              title="Wyloguj się"
              value="logout"
              @click="logOut"
          />
        </v-list>
      </template>
    </v-navigation-drawer>

    <v-main class="d-flex flex-column">
      <v-app-bar
          flat
          v-if="!isAuthPage"
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>{{ currentPageTitle }}</v-toolbar-title>
      </v-app-bar>

      <v-container fluid class="flex-grow-1 d-flex flex-column">
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>
<style scoped>
.v-main {
  background-color: #f5f5f5;
}
</style>