import axios from 'axios'
import store from "@/store";


axios.defaults.baseURL = 'http://localhost:8081/api'

axios.interceptors.request.use(function (config) {
    let token = localStorage.getItem('user')
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
},
    function (error) {
        if (error.status.code === 401) {
            localStorage.removeItem('user');
            store.dispatch('token', null);
        }
        return Promise.reject(error);
    });