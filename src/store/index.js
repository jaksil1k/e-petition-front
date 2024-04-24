import { createStore } from 'vuex'

export default createStore({
  state: {
    token: null,
    image: null,
    esp: null,
  },
  getters: {
    token: state => state.token,
    image: state => state.image,
    esp: state => state.esp,
  },
  mutations: {
    token(state, token) {
      state.token = token;
    },
    image(state, image) {
      state.image = image;
    },
    esp(state, esp) {
      state.esp = esp;
    }
  },
  actions: {
    token(context, token) {
      context.commit('token', token);
    },
    image(context, image) {
      context.commit('image',  image);
    },
    esp(context, esp) {
      context.commit('esp', esp);
    }
  },
  modules: {}
})
