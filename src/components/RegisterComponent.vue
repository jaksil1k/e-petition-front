<template>

  <form class="auth__form"
        @submit.prevent = "onSubmit">
    <input class="auth__input" v-model="name" type="text" placeholder="Name" required/>
    <input class="auth__input" v-model="surname" type="text" placeholder="Surname" required/>
    <input class="auth__input" v-model="email" type="text" placeholder="E-mail" required/>
    <input class="auth__input" v-model="password" type="password" placeholder="Password" required/>
    <button class="button-9" role="button">Register</button>
  </form>
</template>

<script>
import axios from "axios";
import {toast} from "vue3-toastify";

export default {
  name: 'Register',
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
            this.$emit('registerSuccess');
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

</style>