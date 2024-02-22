<template>
  <main class="petition__main">

    <section class="profile">
      <img src="@/assets/images/default-profile-icon.png" alt="profile image">
      <h1 class="profile__name">Ricardo Milos</h1>
      <button class="button-23" role="button">Edit Profile</button>
    </section>


    <section class="profile__section">
      <nav class="profile__nav">
        <a class="profile__link" @click="showCreated">Created</a>
        <a class="profile__link" @click="showSigned">Signed</a>
      </nav>
    </section>
    <section class="created-petitions" v-for="item in createdList" :key="item.id">
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
      createdList: [],
      signedList: [],
    }
  },
  methods: {
    showPetition(id) {
      this.$router.push({name: 'petition_view', params: {id: id}})
    }
  },
  async mounted() {
    let result1 = await axios.get("http://localhost:8081/api/petition/my",
        {headers: {"Content-Type": "application/json",
        Authorization: localStorage.getItem('SavedToken')}});
    console.log(result1.data);
    this.createdList = result1.data.petitions;

    let result2 = await axios.get("http://localhost:8081/api/petition/my",
        {headers: {"Content-Type": "application/json",
            Authorization: localStorage.getItem('SavedToken')}});
    console.log(result2.data);
   this.signedList = result2.data.petitions;
  }
}
</script>

<style scoped>
@import '../assets/css/profile/style.css';
@import '../assets/css/profile/petitions.css';
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


.profile__link:nth-child(1)::after {
  content: "";

  position: absolute;
  top: 3rem;
  left: -1rem;

  width: 120%;
  height: 5px;

  background-color: #006EFF;
}
</style>