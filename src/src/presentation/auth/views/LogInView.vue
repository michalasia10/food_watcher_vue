<script setup lang="ts">
import {ref} from 'vue'
import {storeToRefs} from "pinia";
import {useAuthStore} from "@/presentation/auth/composables/authStore";
import {usernameRules, passwordRules} from "@/presentation/auth/views/helpers";

// store(s)
const authStore = useAuthStore()

// ref(s)
const {isLoading} = storeToRefs(authStore)
const showPassword = ref<boolean>(false)

const username = ref<string>('')
const password = ref<string>('')
const isValidForm = ref<boolean>(false)

// method(s)
const {login} = authStore

const loginCallback = () => {
  login(username.value, password.value)
}

</script>

<template>
  <v-container fluid class="fill-height pa-0">
    <v-row no-gutters justify="center" align="center">
      <v-col cols="12" sm="10" md="12" lg="12" xl="10">
        <v-card class="elevation-0 pa-6">

          <v-form v-model="isValidForm">
            <v-card-text>

              <v-btn block class="mb-3" color="surface">
                <v-icon start icon="mdi-google" color="error" class="mr-2"/>
                Kontynuuj z Google
              </v-btn>

              <v-btn block class="mb-6" color="surface">
                <v-icon start icon="mdi-facebook" color="primary" class="mr-2"></v-icon>
                Kontynuuj z Facebook
              </v-btn>

              <div class="text-center text-body-1 font-weight-medium mb-6">LUB</div>

              <v-text-field
                  label="Username"
                  v-model="username"
                  :rules="usernameRules"
                  prepend-inner-icon="mdi-email"
                  variant="outlined"
                  placeholder="twój login"
                  color="primary"
                  class="mb-4"
                  density="comfortable"
              ></v-text-field>

              <v-text-field
                  label="Hasło"
                  v-model="password"
                  :rules="passwordRules"
                  prepend-inner-icon="mdi-lock"
                  :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append-inner="showPassword = !showPassword"
                  :type="showPassword ? 'text' : 'password'"
                  variant="outlined"
                  placeholder="Wpisz hasło"
                  color="primary"
                  class="mb-6"
                  density="comfortable"
              ></v-text-field>
            </v-card-text>
            <v-btn
                type="submit"
                block
                color="black"
                class="mt-4 white--text"
                :disabled="isLoading || !isValidForm"
                @click.stop="loginCallback"
            >
              <v-progress-circular
                  v-if="isLoading"
                  indeterminate
                  color="white"
                  size="24"
              ></v-progress-circular>
              <span v-else>Zaloguj</span>
            </v-btn>
            <v-card-actions>
              <v-btn
                  block
                  color="primary"
                  class="mb-4 text-none"
                  height="48"
              >
                Dołącz do nas
              </v-btn>
            </v-card-actions>

            <v-card-text class="text-center">
              Już masz konto? <a href="#" class="text-decoration-none">Zaloguj się</a>
            </v-card-text>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<style scoped>
.v-btn {
  letter-spacing: normal;
}
</style>