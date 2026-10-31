import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://192.168.0.104:5001/',
    timeout: 10000,
});

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export default instance;
