<template>
  <header class="header">
    <Nav />
  </header>

  <router-view/>

  <Footer />
</template>

<script>
import Nav from '@/components/Nav'
import Footer from "@/components/Footer";
export default {
  components: {Nav, Footer},
  data() {},
  methods: {},
  computed: {},
  mounted() {
    if (localStorage.hasOwnProperty('user'))
      this.$store.dispatch('token', localStorage.getItem('user'));
  },
}
</script>

<style>
@import './assets/css/main.css';
@import './assets/css/reset.css';
@import './assets/css/typography.css';
@import './assets/css/header.css';
@import './assets/css/footer.css';

</style>