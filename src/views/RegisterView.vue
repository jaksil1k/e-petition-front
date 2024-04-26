<template>
  <main class="auth">
      <h1 class="auth__h1">Registration</h1>
      <h2 class="auth__h2">Already registered? <router-link to="/login">Sign in</router-link></h2>
    <div class="auth__or">
      <p class="auth__or-p">Or</p>
    </div>
    <form class="auth__form"
    @submit.prevent = "onSubmit">
      <input class="auth__input" v-model="name" type="text" placeholder="Name" required/>
      <input class="auth__input" v-model="surname" type="text" placeholder="Surname" required/>
      <input class="auth__input" v-model="email" type="text" placeholder="E-mail" required/>
      <input class="auth__input" v-model="password" type="password" placeholder="Password" required/>
      <button class="button-9" role="button">Register</button>
    </form>
  </main>
</template>

<script>
import axios from "axios";
import {toast} from "vue3-toastify";

export default {
  name: 'RegisterView',
  data() {
    return {
      name: "",
      surname: "",
      iin: "",
      email: "",
      password: "",
    }
  },
  methods: {
    onSubmit() {
      let data = {
        name: this.name + " " + this.surname,
        iin: this.iin,
        email: this.email,
        password: this.password,
      }
      localStorage.removeItem('user');
      axios.post('/auth/register', data)
      .then(response => {
        localStorage.setItem('user', response.data.token)
        this.$store.dispatch('user', response.data.token);
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
      });
    },
  }
}
</script>

<style scoped>
@import "/src/assets/css/auth/auth.css";

</style>










