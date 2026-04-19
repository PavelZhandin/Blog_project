import axios, { InternalAxiosRequestConfig } from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:4444',
    headers: { 'Cache-Control': 'no-cache' }
});

instance.interceptors.request.use((config: InternalAxiosRequestConfig<unknown>) => {
    config.headers.Authorization = window.localStorage.getItem('userToken');

    return config;
});

export default instance;
