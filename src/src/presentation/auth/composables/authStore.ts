import {ref} from 'vue'
import {defineStore} from 'pinia'
import {UserRepository} from "@/feature/auth/infra/repo/UserRepository";
import {UserService} from "@/feature/auth/app/service/UserService";
import {User} from "@/feature/auth/domain/entities/User";
import {useMainStore} from "@/presentation/mainStore";
import PathEnum from "@/core/constant/paths"

export const useAuthStore = defineStore('auth', () => {
    const mainStore = useMainStore();
    const {axiosObject} = mainStore

    const userRepository = new UserRepository(axiosObject);
    const userService = new UserService(userRepository);


    const isLoading = ref<boolean>(false)
    const error = ref<any>(null)
    const users = ref<User[]>([])


    async function login(username: string, password: string) {
        isLoading.value = true
        try {
            const token = await userService.login(username, password)
            mainStore.setToken(token?.token ? token.token : '')
            mainStore.setUserId(token?.userId ? token.userId : '')
        } finally {
            isLoading.value = false
            mainStore.moveToPage(PathEnum.MYDAY.valueOf())
        }
    }

    async function register(username: string, password: string, email: string) {
        isLoading.value = true
        try {
            await userService.save(username, password, email)
        } finally {
            isLoading.value = false
            mainStore.moveToPage(PathEnum.LOGIN.valueOf())
        }
    }

    return {
        isLoading,
        error,
        login,
        register
    }
})