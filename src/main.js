import { createApp } from 'vue';

import axios from 'axios';

import App from './App.vue';
import router from './router';
import Table from "./components/Table.vue"
import Modal from "./components/Modal.vue"
import store from './store';

axios.defaults.baseURL = "http://127.0.0.1:8000";
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const app = createApp(App);



app.use(router);
app.use(store);
app.config.globalProperties.$http = axios;

app.component('Table-', Table);
app.component("Modal-", Modal);


app.mount('#app');
