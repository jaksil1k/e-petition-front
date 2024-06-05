<template>
  <main class="auth">
    <h1 class="auth__h1">Login</h1>
    <h2 class="auth__h2">Haven't registered yet? <router-link to="/register">Sign up</router-link></h2>
    <div class="auth__or">
      <p class="auth__or-p">Or</p>
    </div>
    <Login
    @loginSuccess="mvHome"/>
  </main>
</template>

<script>
import Login from "@/components/LoginComponent";
export default {
  name: 'LoginView',
  components: {Login},
  methods: {
    mvHome() {
      console.log(this.parseJwt(localStorage.getItem('user')).role);
      this.$router.push({name: 'home'});
    },
    parseJwt(token) {
      try {
        return JSON.parse(atob(token.split('.')[1]));
      } catch (e) {
        return null;
      }
    }
  }
}
</script>

<style scoped>
@import "/src/assets/css/auth/auth.css";
</style>