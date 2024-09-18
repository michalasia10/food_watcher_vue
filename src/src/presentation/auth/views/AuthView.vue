<script setup lang="ts">
import PathEnum from "@/core/constant/paths";
</script>

<template>
  <v-container fluid class="fill-height pa-0">
    <v-row no-gutters justify="center" align="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="elevation-0">
          <v-card-text>
            <h1 class="text-center text-h4 font-weight-bold mb-6">Food Watcher</h1>

            <v-tabs color="primary" grow>
              <v-tab value="login" :to="PathEnum.LOGIN">Logowanie</v-tab>
              <v-tab value="register" :to="PathEnum.REGISTER">Rejestracja</v-tab>
            </v-tabs>

            <v-window class="mt-6">
              <v-window-item>
                <router-view/>
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

