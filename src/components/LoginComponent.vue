<template>
  <form class="auth__form"
        @submit.prevent = "onSubmit">
    <input class="auth__input" v-model="email" type="text" placeholder="E-mail" required>
    <input class="auth__input" v-model="password" type="password" placeholder="Password" required>
    <button class="button-9" role="button">Login</button>
  </form>
</template>

<script>
import axios from "axios";
import {toast} from "vue3-toastify";

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    onSubmit() {
      localStorage.removeItem('user');
      axios.post("/auth/login", {email: this.email, password: this.password})
          .then(response => {
            localStorage.setItem('user', response.data.token);
            this.$store.dispatch('token', response.data.token);
            this.$emit('loginSuccess');
          })
          .catch(error => {
            if (error.response && error.response.data.message) {
              toast(error.response.data.message, {
                "theme": "auto",
                "type": "error",
                "dangerouslyHTMLString": true
              });
            } else {
              throw error;
            }
          });
    }
  }
}
</script>

<style scoped>

</style>