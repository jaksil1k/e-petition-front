<template>
  <main class="petition__main">

    <section class="profile">
      <img src="@/assets/images/default-profile-icon.png" alt="profile image">
      <h1 class="profile__name">Ricardo Milos</h1>
      <button class="button-23" role="button">Edit Profile</button>
      <button @click="logout" class="button-23" role="button">Logout</button>
    </section>


    <section class="profile__section">
      <nav class="profile__nav">
        <a class="profile__link" :style="createdListActive" @click="showCreated">Created</a>
        <a class="profile__link" :style="signedListActive" @click="showSigned">Signed</a>
      </nav>
    </section>
    <section class="created-petitions" v-for="item in list" :key="item.id">
      <div class="petition">
        <div class="petition__item">
          <p class="petition__p">{{item.title}}</p>
        </div>
        <div>
          <button @click="showPetition(item.id)">
            Show Petition
          </button>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { API } from "@/http-common";
import axios from "axios";

export default {
  name: 'ProfileView',
  data() {
    return {
      list: [],
      isCreatedListActive: true,
    }
  },
  methods: {
    showPetition(id) {
      this.$router.push({name: 'petition_view', params: {id: id}})
    },
    async showCreated() {
      let response = await axios.get("http://localhost:8081/api/petition/my",
          {headers: {"Content-Type": "application/json",
              Authorization: 'Bearer ' + localStorage.getItem('user')}});
      console.log(response.data);
      this.list = response.data.petitions;
      this.isCreatedListActive = true;
    },
    async showSigned() {
      let response = await axios.get("http://localhost:8081/api/petition/signed",
          {headers: {"Content-Type": "application/json",
              Authorization: 'Bearer ' + localStorage.getItem('user')}});
      console.log(response.data);
      this.list = response.data.petitions;
      this.isCreatedListActive = false;
    },
    logout() {
      localStorage.removeItem("user")
      window.location.reload();
    }
  },
  computed: {
    createdListActive() {
      return {
        '--underlined': this.isCreatedListActive ? "#006EFF" : "transparent",
      }
    },
    signedListActive() {
      return {
        '--underlined': !this.isCreatedListActive ? "#006EFF" : "transparent",
      }
    },
    currentUser() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    this.showCreated();
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
@import '../assets/css/profile/style.css';
@import '../assets/css/profile/nav.css';

.created-petitions {
  /*height: 70vh;*/
  margin: 0 100px;
  width: 90%;
}
.petition__main{
  height: 130vh;
}
.petition {
  height: 50px;
  border: 1px solid;
  display: flex;
  justify-content: space-between;
}
.petition__p {
  font-size: large;
}


.profile__link::after {
  content: "";

  position: absolute;
  top: 3rem;
  left: -1rem;

  width: 120%;
  height: 5px;

  background-color: var(--underlined);
}
</style>