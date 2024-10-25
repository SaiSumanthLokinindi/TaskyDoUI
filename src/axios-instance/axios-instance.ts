import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://192.168.0.120:5000/',
    timeout: 5000,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
    },
});

export default instance;
