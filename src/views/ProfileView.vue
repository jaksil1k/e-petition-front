<template>
  <main class="profile__main">

    <section class="profile">
      <img src="@/assets/images/default-profile-icon.png" alt="profile image">
      <h1 class="profile__name">{{user.name}}</h1>
      <button class="profile__btn" role="button" @click="$router.push({name: 'change-profile'})">Edit Profile</button>
    </section>

    <div class="created-petitions__container">
      <div>
        <section class="profile__section">
          <nav class="profile__nav">
            <a class="profile__link" :style="createdListActive" @click="showCreated">Created</a>
            <a class="profile__link" :style="signedListActive" @click="showSigned">Signed</a>
          </nav>
        </section>
        <section class="created-petitions" v-for="(item, index) in list" :key="item.id">
          <div class="petition">
            <div class="petition__item" @click="openPetition(item.id)">
              <p class="petition__p index">{{index}}</p>
              <p class="petition__p title">{{item.title}}</p>
            </div>
            <div class="petition__status">
              <p class="petition__p status" v-bind:class="item.status">STATUS: {{item.status}}</p>
            </div>
            <div class="profile-petitions__icons">
              <div class="petition__img-div" @click="openPetition(item.id)">
                <img src="@/assets/images/blue-arrow-png.png" alt="open petition">
              </div>

<!--              <div class="profile-petitions__icons-edit">-->
<!--                <img src="@/assets/images/change-document-edit-modify-paper-pencil-write-writing-icon.png">-->
<!--              </div>-->
            </div>
          </div>
        </section>
      </div>
    </div>
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
      user: {},
      computedColor: "black"
    }
  },
  methods: {
    showStatus(status) {
      if (status === "ACCEPT") {
        this.com
      }
    },
    openPetition(id) {
      this.$router.push({name: 'petition_view', params: {id: id}})
    },
    async showCreated() {
      if (this.createdList.length === 0)
        this.createdList = (await axios.get("/petition/my")).data;
      this.list = this.createdList.petitions;
      console.log(this.list);
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
    if (!localStorage.hasOwnProperty('user')) {
      this.$store.dispatch('token', localStorage.getItem('user'));
    }
    this.getCurrentUser()
        .then(res => this.user = res)
        .catch(e => e.response.status===401?localStorage.removeItem('user'):e);
    this.showCreated();
  }
}
</script>

<style scoped>
@import '../assets/css/profile/style.css';
@import '../assets/css/profile/nav.css';


.created-petitions__container {
  /*display: flex;*/
  /*justify-content: center;*/

}
.created-petitions__container>div {
  width: 83%;
  margin-left: 14%;
  /*margin-right: 4%;*/
}

.created-petitions {
  /*height: 70vh;*/
  /*margin: 0 100px;*/
  width: 90%;
}
.petition {
  border: 2px solid #639BE4;
  padding: 2rem 0;
  border-radius: 14px;
  display: flex;
  justify-content: space-between;
}

.petition__item {
  display: flex;
  flex-direction: row;
  width: 90%;
}

.petition__p {
  margin: 0 1rem;
  font-size: large;
  font-weight: 600;
}
.petition__p.status.ACCEPT {
  color: green;
}
.petition__p.status.ON_REVIEW {
  color: yellow;
}
.petition__p.status.DRAFT {
  color: gray;
}

.petition__p.index {
  font-size: xx-large;
}

.petition__p.title {
  max-width: 70%;
}

.profile-petitions__icons {
  display: flex;
  flex-direction: row-reverse;
  max-width: 10%;
}

.profile-petitions__icons-edit {
  max-width: 46%;
}
.petition__img-div {
  max-width: 54%;
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