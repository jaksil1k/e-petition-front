<template>
  <nav class="header__nav">
    <router-link class="header__link" to="/">Main</router-link>
    <router-link class="header__link" to="/petitions">View Petitions</router-link>
    <router-link class="header__link" to="/create-petition" >Create Petitions</router-link>
    <router-link class="header__link" :to="{name: 'profile'}" v-if="token">My Petitions</router-link>
    <a class="header__link" href="javascript:void(0)" v-if="token" @click="logout">Logout</a>
    <router-link class="header__link" :to="{name: 'login'}" v-if="!token">Login</router-link>
  </nav>
</template>

<script>
export default {
  name: 'Nav',
  methods: {
    logout() {
      localStorage.removeItem('user');
      this.$store.dispatch('token', null);
      location.reload();
    },
  },
  computed: {
    token() {
      return this.$store.getters.token;
    }
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>