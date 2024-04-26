<template>
  <main class="auth">
      <h1 class="auth__h1">Registration</h1>
      <h2 class="auth__h2">Already registered? <router-link to="/login">Sign in</router-link></h2>
    <div class="auth__or">
      <p class="auth__or-p">Or</p>
    </div>
    <Register
    @registerSuccess="mvHome"/>
  </main>
</template>

<script>

import Register from "@/components/RegisterComponent";
export default {
  name: 'RegisterView',
  components: {Register},
  methods: {
    mvHome() {
      this.$router.push({name: 'home'})
    },
  }
}
</script>

<style scoped>
@import "/src/assets/css/auth/auth.css";

</style>










