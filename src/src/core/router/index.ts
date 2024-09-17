import {createRouter, createWebHistory} from 'vue-router'
import ProductList from "@/presentation/product_list/views/ProductList.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/products',
            name: 'products',
            component: ProductList
        },
    ]
})
export default router;