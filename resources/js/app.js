
// app.js
require('./bootstrap');

import Vue from 'vue';

import VueRouter from 'vue-router';

import VueAxios from 'vue-axios';
import axios from 'axios';


Vue.use(VueAxios, axios);
Vue.use(VueRouter);

import App from './App.vue';
import Example from './components/ExampleComponent.vue';

const routes = [
    {
        name: 'Example',
        path: '/',
        component: Example
    }
];

const router = new VueRouter({ mode: 'history', routes: routes});
new Vue(Vue.util.extend({ router }, App)).$mount('#app');

window.Vue = require('vue');

