import {computed, ref} from 'vue'
import {defineStore} from 'pinia'
import {ProductRepository} from "@/feature/product/infra/repo/ProductRepository";
import {ProductService} from "@/feature/product/app/service/ProductService";
import {Product} from "@/feature/product/domain/entities/Product";
import {useMainStore} from "@/presentation/mainStore";

export const useProductStore = defineStore('product', () => {
    const mainStore = useMainStore();
    const {axiosObject} = mainStore

    const productRepository = new ProductRepository(axiosObject);
    const productService = new ProductService(productRepository);

    const isLoading = ref<boolean>(false)
    const error = ref<any>(null)
    const products = ref<Product[]>([])


    async function fetchProducts(page: number, limit: number, queryString: string) {
        isLoading.value = true
        try {
            const newProducts = await productService.findAll(page, limit, queryString)
            if (newProducts.length === 0) {
                error.value = 'No products found'
            } else {
                error.value = null
                products.value = newProducts
            }
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