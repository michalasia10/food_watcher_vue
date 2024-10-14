import type {AxiosError, AxiosResponse} from "axios";
import axios, {Axios, HttpStatusCode} from 'axios';
import {BASE_URL} from "@/core/constant/config";
import type {ComputedRef} from "@vue/reactivity";

type authRejectCallbackType = () => void


const axiosInstance = (token: ComputedRef<string>, authRejectCallback: authRejectCallbackType): Axios => {
    const baseConfig = {
        baseURL: BASE_URL,
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.value}`
        }
    };
    const axiosIn = axios.create(baseConfig);

    axiosIn.interceptors.response.use(
        function (response: AxiosResponse) {
            return response
        },
        function (error: AxiosError) {
            const authErrors = [
                HttpStatusCode.Unauthorized.valueOf(),
                HttpStatusCode.Forbidden.valueOf()
            ]

            if (
                authErrors.includes(error?.response?.status || 0)
            ) {
                return authRejectCallback();
            }
            return error
        }
    )

    return axiosIn

}


export default axiosInstance;