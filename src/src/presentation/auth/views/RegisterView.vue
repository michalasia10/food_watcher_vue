<script setup lang="ts">
import {ref} from 'vue'
import {storeToRefs} from "pinia";
import {useAuthStore} from "@/presentation/auth/composables/authStore";
import {emailRules, passwordRules, usernameRules} from "@/presentation/auth/views/helpers";

// store(s)
const authStore = useAuthStore()

// const(s)
const placeHolder = "Wpisz tutaj"


// ref(s)
const {isLoading, error} = storeToRefs(authStore)

const showPassword = ref<boolean>(false)
const username = ref<string>('')
const password = ref<string>('')
const email = ref<string>('')
const isValidForm = ref<boolean>(false)

// method(s)
const {login, register} = authStore
const registerCallback = () => {
  register(username.value, password.value, email.value)
}


</script>

<template>
  <v-container>
    <v-card max-width="400" class="mx-auto">
      <v-card-text>
        <v-form v-model="isValidForm" ref="form">
          <v-text-field
              label="Username"
              v-model="username"
              :rules="usernameRules"
              :placeholder="placeHolder"
              outlined
              dense
          />
          <v-text-field
              label="Hasło"
              v-model="password"
              :rules="passwordRules"
              :placeholder="placeHolder"
              prepend-inner-icon="mdi-lock"
              :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="showPassword = !showPassword"
              :type="showPassword ? 'text' : 'password'"
              outlined
              dense
          />
          <v-text-field
              v-model="email"
              label="Email"
              :placeholder="placeHolder"
              :rules="emailRules"
              outlined
              dense
          />
          <v-btn
              type="submit"
              block
              color="black"
              class="mt-4 white--text"
              :disabled="isLoading || !isValidForm"
              @click.stop="registerCallback"
          >
            <v-progress-circular
                v-if="isLoading"
                indeterminate
                color="white"
                size="24"
            ></v-progress-circular>
            <span v-else>Zaczynamy!</span>
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>


<style scoped>
</style>