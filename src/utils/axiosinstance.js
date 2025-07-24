import { BASE_URL } from "./apiPath";
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers:{
        "Content-Type": "application/json",
        Accept:"application/json",
    },
})

axiosInstance.interceptors.request.use(
    (config)=>{
        const accessToken = localStorage.getItem("token");
        if(accessToken)
        {
            console.log(accessToken);
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
);

export default axiosInstance;