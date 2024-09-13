import axios from 'axios';
import {BASE_URL} from "@/core/constant/config";

const baseConfig = {
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
};


const axiosInstance = axios.create(baseConfig);


export default axiosInstance;