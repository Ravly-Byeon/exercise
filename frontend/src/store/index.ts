import Vue from 'vue'
import Vuex from 'vuex'
import login from "@/store/module/login.vuex";
import board from "@/store/module/board.vuex";
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    login,
    board,
  },
  plugins: [
    createPersistedState({
      paths: ['login', 'board'],
    })
  ]
})
