import axios from "axios";

export const API_URL = "http://localhost:8081/api";
export const API = axios.create({
    baseURL: API_URL,
});

// request interceptor for adding token to headers
API.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('SavedToken')}`;
    return config;
});