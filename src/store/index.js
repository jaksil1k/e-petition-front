import { createStore } from 'vuex'

export default createStore({
  state: {
    token: null,
    image: null,
  },
  getters: {
    token: state => state.token,
    image: state => state.image,
  },
  mutations: {
    token(state, token) {
      state.token = token;
    },
    image(state, image) {
      state.image = image;
    }
  },
  actions: {
    token(context, token) {
      context.commit('token', token);
    },
    image(context, image) {
      context.commit('image',  image)
    },
  },
  modules: {}
})
