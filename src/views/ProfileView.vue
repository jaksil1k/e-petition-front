<template>
  <main class="petition__main">

    <section class="profile">
      <img src="@/assets/images/default-profile-icon.png" alt="profile image">
      <h1 class="profile__name">{{user.name}}</h1>
      <button class="button-23" role="button" @click="$router.push({name: 'change-profile'})">Edit Profile</button>
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
import axios from "axios";

export default {
  name: 'ProfileView',
  data() {
    return {
      list: [],
      signedList: [],
      createdList: [],
      isCreatedListActive: true,
      user: {}
    }
  },
  methods: {
    showPetition(id) {
      this.$router.push({name: 'petition_view', params: {id: id}})
    },
    async showCreated() {
      if (this.createdList.length === 0)
        this.createdList = (await axios.get("/petition/my")).data;
      this.list = this.createdList.petitions;
      this.isCreatedListActive = true;
    },
    async showSigned() {
      if (this.signedList.length === 0)
        this.signedList = (await axios.get("/petition/signed")).data;
      this.list = this.signedList.petitions;
      this.isCreatedListActive = false;
    },
    async getCurrentUser() {
      return (await axios.get("/user/data")).data
    },
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
  },
  mounted() {
    if (!this.$store.getters.token) {
      this.$router.push('/login');
    }
    this.getCurrentUser()
        .then(res => this.user = res);
    this.showCreated();
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