<template>
  <main class="auth">
    <h1 class="auth__h1">Login</h1>
    <h2 class="auth__h2">Haven't registered yet? <router-link to="/register">Sign up</router-link></h2>
    <div class="auth__or">
      <p class="auth__or-p">Or</p>
    </div>
    <form class="auth__form"
          @submit.prevent = "onSubmit">
      <input class="auth__input" v-model="email" type="text" placeholder="E-mail" required>
      <input class="auth__input" v-model="password" type="password" placeholder="Password" required>
      <button class="button-9" role="button">Login</button>
    </form>
  </main>
</template>

<script>
import axios from "axios";
import {toast} from "vue3-toastify";
export default {
  name: 'LoginView',
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
        this.$router.push({name: 'home'});
      })
      .catch(error => {
        if (error.response && error.response.data.message) {
          toast(error.response.data.message, {
            "theme": "auto",
            "type": "error",
            "dangerouslyHTMLString": true
          });
        }
        else {
          throw error;
        }
      });
    }
  }
}
</script>

<style scoped>
@import "/src/assets/css/auth/auth.css";
</style>