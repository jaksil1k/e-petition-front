import { createStore } from 'vuex'

export default createStore({
  state: {
    token: null,
  },
  getters: {
    token: (state) => {return state.token}
  },
  mutations: {
    token(state, token) {
      state.token = token;
    }
  },
  actions: {
    token(context, token) {
      context.commit('token', token);
    }
  },
  modules: {}
})
