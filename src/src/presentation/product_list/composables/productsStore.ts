import {computed, ref} from 'vue'
import {defineStore} from 'pinia'
import {ProductRepository} from "@/feature/product/infra/repo/ProductRepository";
import {ProductService} from "@/feature/product/app/service/ProductService";
import {Product} from "@/feature/product/domain/entities/Product";
// import {useMainStore} from "@/presentation/mainStore";

export const useProductStore = defineStore('user', () => {
    const productRepository = new ProductRepository();
    const productService = new ProductService(productRepository);
    // const mainStore = useMainStore();

    const isLoading = ref<boolean>(false)
    const error = ref<any>(null)
    const products = ref<Product[]>([])


    async function fetchProducts() {
        isLoading.value = true
        try {
            products.value = await productService.findAll()
        } catch (e) {
            error.value = e
        } finally {
            isLoading.value = false
        }
    }

    return {
        isLoading,
        error,
        fetchProducts,
        products: computed(() => products.value)
    }
})