<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
  <header class="header">
    <nav class="header__nav">
      <router-link class="header__link" to="/">Main</router-link>
      <router-link class="header__link" to="/petitions">View Petitions</router-link>
      <router-link class="header__link" to="/create-petition" >Create Petitions</router-link>
      <router-link class="header__link" to="/login" v-if="!isAuthorized">Login</router-link>
      <router-link class="header__link" @click="viewProfile" to="#" v-if="isAuthorized">My Petitions</router-link>
    </nav>
  </header>

  <router-view/>

  <footer class="footer">
    <div class="footer__content">
      <nav class="footer__nav">
        <ul class="footer__list">
          <li class="footer__item footer__item--title">Business</li>
          <li class="footer__item">
            <a class="footer__link" href="#">About us</a>
          </li>
          <li class="footer__item">
            <a class="footer__link" href="#">Vacancy</a>
          </li>
          <li class="footer__item">
            <a class="footer__link" href="#">Our team</a>
          </li>
        </ul>
        <ul class="footer__list">
          <li class="footer__item footer__item--title">Community</li>
          <li class="footer__item">
            <a class="footer__link" href="#">About us</a>
          </li>
          <li class="footer__item">
            <a class="footer__link" href="#">Vacancy</a>
          </li>
          <li class="footer__item">
            <a class="footer__link" href="#">Our team</a>
          </li>
        </ul>
        <ul class="footer__list">
          <li class="footer__item footer__item--title">Support</li>
          <li class="footer__item">
            <a class="footer__link" href="#">About us</a>
          </li>
          <li class="footer__item">
            <a class="footer__link" href="#">Vacancy</a>
          </li>
          <li class="footer__item">
            <a class="footer__link" href="#">Our team</a>
          </li>
        </ul>
        <ul class="footer__list">
          <li class="footer__item footer__item--title">Social Media</li>
          <li class="footer__item">
            <a class="footer__link" href="#">About us</a>
          </li>
          <li class="footer__item">
            <a class="footer__link" href="#">Vacancy</a>
          </li>
          <li class="footer__item">
            <a class="footer__link" href="#">Our team</a>
          </li>
        </ul>
      </nav>
      <div class="footer__info">
        <p class="footer__text footer__text--bold">(c) 2024, E-petition.kz</p>
        <p class="footer__text">All rights reserved</p>
      </div>
    </div>
  </footer>
</template>

<style>
@import './assets/css/main.css';
@import './assets/css/reset.css';
@import './assets/css/typography.css';
@import './assets/css/header.css';
@import './assets/css/footer.css';



</style>


<script>
export default {
  data() {
    return {
    }
  },
  methods: {
    viewProfile() {
      if (localStorage.hasOwnProperty("user")) {
        this.$router.push({name: 'profile'})
      } else {
        this.$router.push({name: 'login'})
      }
    }
  },
  computed: {
    isAuthorized() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
  }
}
</script>