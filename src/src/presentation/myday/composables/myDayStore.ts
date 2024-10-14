import {computed, ref} from 'vue'
import {defineStore} from 'pinia'
import {MyDayRepository} from "@/feature/myday/infra/repo/MyDayRepository";
import {MyDayService} from "@/feature/myday/app/service/MyDayService";
import {MyDay} from "@/feature/myday/domain/entities/MyDay";
import {useMainStore} from "@/presentation/mainStore";

export const useMyDayStore = defineStore('myday', () => {
    const mainStore = useMainStore();
    const {axiosObject} = mainStore

    const myDayRepository = new MyDayRepository(axiosObject);
    const myDayService = new MyDayService(myDayRepository);

    const isLoading = ref<boolean>(false)
    const error = ref<any>(null)
    const myDay = ref<MyDay | null>(null)

    async function fetchMyDay(date: Date) {
        isLoading.value = true
        try {
            myDay.value = await myDayService.findByDateTime(date)
        } catch (e) {
            error.value = e
        } finally {
            isLoading.value = false
        }
    }

    return {
        isLoading,
        error,
        fetchMyDay,
        myDay: computed(() => myDay.value)
    }
})