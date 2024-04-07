import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8081/api'
axios.defaults.headers.common["Authorization"] = 'Bearer ' + localStorage.getItem('user');

axios.interceptors.request.use(function (config) {
    let token = localStorage.getItem('user')
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
});

