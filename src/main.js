import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './api/axios'
import Vue3Toasity, { ToastContainerOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import 'ncalayer-js-client'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

createApp(App).use(store).use(router).use(Vue3Toasity, {
    autoClose: 3000,
}).use(ElementPlus).mount('#app');
