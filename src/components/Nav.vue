<template>
  <nav class="header__nav">
    <router-link class="header__link" to="/">Main</router-link>
    <router-link class="header__link" to="/petitions">View Petitions</router-link>
    <router-link class="header__link" to="/create-petition" >Create Petitions</router-link>
<!--    <router-link class="header__link" :to="{name: 'profile'}" v-if="token">My Petitions</router-link>-->
<!--    <a class="header__link" href="javascript:void(0)" v-if="token" @click="logout">Logout</a>-->
    <router-link class="header__link" :to="{name: 'login'}" v-if="!token">Login</router-link>
  </nav>
  <div class="dropdown-container" v-if="token">
    <details class="dropdown right">
      <summary class="avatar">
        <img src="https://gravatar.com/avatar/00000000000000000000000000000000?d=mp" alt="avatar">
      </summary>
      <ul>
        <!-- Menu links -->
        <li>
          <router-link :to="{name: 'profile'}"> Profile </router-link>
        </li>
        <li>
          <router-link :to="{name: 'change-profile'}"> Change profile info </router-link>
        </li>
        <!-- Optional divider -->
        <li class="divider"></li>
        <li>
          <a href="javascript:void(0)" @click="logout"> Logout </a>
        </li>
      </ul>
    </details>
  </div>
</template>

<script>
export default {
  name: 'Nav',
  methods: {
    logout() {
      localStorage.removeItem('user');
      this.$store.dispatch('token', null);
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
.dropdown-container {
  display: inline-block;
  padding: 10px;
  margin-right: 5rem;
}
.dropdown-container .dropdown {
  position: relative;
}
.dropdown-container .dropdown[open] .with-down-arrow::after {
  content: "";
}
.dropdown-container .dropdown[open] summary {
  background: #ffffff10;
}
.dropdown-container .dropdown summary {
  list-style: none;
  display: inline-block;
  cursor: pointer;
  border-radius: 6px;
}
.dropdown-container .dropdown summary.avatar {
  border-radius: 50px;
}
.dropdown-container .dropdown summary.avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50px;
  display: inline-block;
  margin: 0;
}
.dropdown-container .dropdown summary .with-down-arrow {
  display: inline-flex;
  padding: 5px;
  align-items: center;
  color: #fff;
  line-height: 1;
}
.dropdown-container .dropdown summary .with-down-arrow::after {
  content: "";
  font-family: "Material Symbols Outlined";
  font-weight: normal;
  font-style: normal;
  font-size: 1.5rem;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-smoothing: antialiased;
}
.dropdown-container .dropdown.left ul {
  left: 0;
}
.dropdown-container .dropdown.right ul {
  right: 0;
}
.dropdown-container .dropdown ul {
  padding: 0;
  margin: 0;
  box-shadow: 0 0 10px #00000030;
  min-width: max-content;
  position: absolute;
  top: 100%;
  border-radius: 10px;
  background-color: #fff;
  z-index: 2;
}
.dropdown-container .dropdown ul li {
  list-style-type: none;
  display: block;
  /* If you use divider & borders, it's best to use top borders */
  /*border-top: 1px solid #ccc;*/
}
.dropdown-container .dropdown ul li:first-of-type {
  border: none;
  background-color: #f2f2f2;
}
.dropdown-container .dropdown ul li p {
  padding: 10px 15px;
  margin: 0;
}
.dropdown-container .dropdown ul li a {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px 15px;
  text-decoration: none;
  line-height: 1;
  color: #333;
}
.dropdown-container .dropdown ul li a:hover {
  color: #ff34b2;
}
.dropdown-container .dropdown ul li:first-of-type {
  border-radius: 10px 10px 0 0;
}
.dropdown-container .dropdown ul li:last-of-type {
  border-radius: 0 0 10px 10px;
}
.dropdown-container .dropdown ul li.divider {
  border: none;
  border-bottom: 1px solid #333;
  /*
   * removes border from Li after the divider element
   * best used in combination with top borders on other LIs
   */
}
.dropdown-container .dropdown ul li.divider ~ li {
  border: none;
}
</style>