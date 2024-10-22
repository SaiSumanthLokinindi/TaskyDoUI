import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://192.168.0.120:5000/',
    timeout: 5000,
});

export default instance;
