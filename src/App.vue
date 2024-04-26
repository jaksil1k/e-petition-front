<template>
  <header class="header">
    <Nav />
  </header>

  <router-view/>

</template>

<script>
import Nav from '@/components/Nav'
export default {
  components: {Nav},
  data() {},
  methods: {},
  computed: {},
  mounted() {
    this.$store.dispatch('token', localStorage.getItem('user'), {root:true});
  }
}
</script>

<style>
@import './assets/css/main.css';
@import './assets/css/reset.css';
@import './assets/css/typography.css';
@import './assets/css/header.css';
@import './assets/css/footer.css';

</style>