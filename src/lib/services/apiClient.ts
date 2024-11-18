import axios from 'axios';
import { getLocale } from '@/lib/utils/getLocale';

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(async (config) => {
    const locale = await getLocale();
    config.headers['Accept-Language'] = locale;
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default apiClient;