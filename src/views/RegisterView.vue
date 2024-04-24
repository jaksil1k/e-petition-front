<template>
  <main class="register">
      <h1 class="register__h1">Registration</h1>
      <h2 class="register___h2">Already registered? <router-link to="/login">Sign in</router-link></h2>
    <div class="register__or">
      <p class="register__or-p">Or</p>
    </div>
    <form class="register__form"
    @submit.prevent = "onSubmit">
      <input class="register__input" v-model="name" type="text" placeholder="Name" required/>
      <input class="register__input" v-model="surname" type="text" placeholder="Surname" required/>
      <input class="register__input" v-model="email" type="text" placeholder="E-mail" required/>
      <input class="register__input" v-model="password" type="password" placeholder="Password" required/>
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

      axios.post('/auth/register', data)
      .then(response => {
        localStorage.setItem('user', response.data.token)
        this.$store.dispatch('user', response.data.token);
        this.$router.push({name: 'main'});
      })
      .catch(error => {
        if (error.response.data.message) {
          toast(error.response.data.message, {
            "theme": "auto",
            "type": "error",
            "dangerouslyHTMLString": true
          })
        } else {
          throw error;
        }
      });
    },
  }
}
</script>

<style scoped>
.register {
  height: 100vh;
  margin-top: 4rem;
  width: 40%;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.register__form {
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
}

.register__input {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 1rem;
  font-size: 2rem;
}

.button-9 {
  backface-visibility: hidden;
  background-color: #405cf5;
  border-radius: 6px;
  border-width: 0;
  box-shadow: rgba(50, 50, 93, .1) 0 0 0 1px inset,rgba(50, 50, 93, .1) 0 2px 5px 0,rgba(0, 0, 0, .07) 0 1px 1px 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  font-family: -apple-system,system-ui,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif;
  font-size: x-large;
  height: 44px;
  line-height: 1.15;
  margin: 12px 0 0;
  outline: none;
  overflow: hidden;
  padding: 0 25px;
  position: relative;
  text-align: center;
  text-transform: none;
  transform: translateZ(0);
  transition: all .2s,box-shadow .08s ease-in;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: 60%;
}

.button-9:disabled {
  cursor: default;
}

.button-9:focus {
  box-shadow: rgba(50, 50, 93, .1) 0 0 0 1px inset, rgba(50, 50, 93, .2) 0 6px 15px 0, rgba(0, 0, 0, .1) 0 2px 2px 0, rgba(50, 151, 211, .3) 0 0 0 4px;
}

.register__div-btn {
  display: flex;
  justify-content: center;
}
</style>










