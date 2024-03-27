import { createStore } from 'vuex'
import { auth } from "./auth.module";

export default createStore({
  state: {
    token: null
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth
  }
})
