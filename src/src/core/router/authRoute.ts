import {type RouteRecordRaw} from 'vue-router'
import AuthView from "@/presentation/auth/views/AuthView.vue";
import LogIn from "@/presentation/auth/views/LogInView.vue";
import RegisterView from "@/presentation/auth/views/RegisterView.vue"


const authRoute: Array<RouteRecordRaw> = [

    {
        path: 'auth',
        component: AuthView,
        children: [
            {
                path: 'login',
                component: LogIn
            },
            {
                path: 'register',
                component: RegisterView
            }
        ]
    },
]

export default authRoute