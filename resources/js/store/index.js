import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import getters from './getters'
import member from './modules/member';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    user,
      member
  },
  getters
});

export default store
