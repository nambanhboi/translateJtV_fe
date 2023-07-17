import { createApp } from 'vue';

import axios from 'axios';

import App from './App.vue';
import router from './router';
import Table from "./components/Table.vue"
import Modal from "./components/Modal.vue"

axios.defaults.baseURL = "http://127.0.0.1:8000";
const app = createApp(App);



app.use(router);
app.config.globalProperties.$http = axios;

app.component('Table-', Table);
app.component("Modal-", Modal);

app.mount('#app');
