import {createRouter, createWebHistory, type RouteRecordRaw} from 'vue-router'
import {useMainStore} from "@/presentation/mainStore";
import ProductList from "@/presentation/product_list/views/ProductList.vue";
import MainView from "@/presentation/MainView.vue";
import PathEnum, {publicRoutes} from "@/core/constant/paths";
import authRoute from "@/core/router/authRoute";


const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: MainView,
        children: [
            ...authRoute,
            {
                path: 'products',
                component: ProductList
            }
        ]
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

router.beforeEach((to, from, next) => {
    const mainStore = useMainStore();

    if (
        !publicRoutes.some((route) => to.path.includes(route)) &&
        !mainStore.loggedIn
    ) {
        next({path: PathEnum.LOGIN});
    } else {
        next();
    }
});
export default router;