
// app.js
require('./bootstrap');

import Vue from 'vue';

import VueRouter from 'vue-router';

import VueAxios from 'vue-axios';
import axios from 'axios';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import './../icons' // icon
import App from './App.vue';
import Example from './components/ExampleComponent.vue';
import Layout from './components/layout/Layout.vue';
import store from './store'
import router from './router'
import './../sass/index.scss' // global css

Vue.use(VueAxios, axios);
Vue.use(VueRouter);
Vue.use(ElementUI, { locale });

window.Vue = require('vue');
//Vue.component('dashboard', require('./components/dashboard/Dashboard.vue').default);
//Vue.component('layout', require('./components/layout/Layout.vue').default);
//new Vue(Vue.util.extend({ router, store }, App)).$mount('#app');

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
