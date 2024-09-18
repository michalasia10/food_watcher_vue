import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {useRouter, useRoute} from "vue-router";
import axiosInstance from "@/core/utils/api"
import {Axios} from 'axios';
import {publicRoutes} from "@/core/constant/paths";


export const useMainStore = defineStore('main', () => {
        // const
        const token = ref<string>('')
        const userId = ref<string>('')
        const router = useRouter()
        const route = useRoute()

        // computed / getters
        const loggedIn = computed<boolean>(() => token.value !== '')
        const tokenValue = computed<string>(() => token.value)
        const axiosObject = computed<Axios>(() => axiosInstance(tokenValue, logOut))
        const isAuthPage = computed(() => publicRoutes.some((r) => route.path.includes(r)))


        // setters
        function setToken(newToken: string) {
            token.value = newToken
        }

        function setUserId(userId: string) {
            token.value = userId
        }

        // method(s)
        function moveToPage(route: string): void {
            router
                .push(route)
                .then(() => {
                })
        }

        function moveToLogin(): void {
            moveToPage('/login')
        }

        function logOut() {
            setToken('')
            setUserId('')
            moveToLogin()
        }


        return {
            setToken,
            setUserId,
            logOut,
            loggedIn,
            token,
            userId,
            moveToLogin,
            moveToPage,
            axiosObject,
            isAuthPage
        }
    },
    {persist: true}
);