<template>
  <main class="change-user__main">
    <div class="change-user__header">
      <p class="change-user__header-p">Change your credentials</p>
    </div>
    <div class="change-user">
      <div class="change-user__username">
        <p>{{username}}</p>
      </div>
      <form @submit.prevent="onSubmit" class="change-user__form">
          <label class="change-user__label" for="name">Full Name</label>
          <input class="change-user__input"  type="text" id="name" v-model="user.name"/>

          <label class="change-user__label" for="iin">IIN</label>
          <input class="change-user__input" type="text" id="iin" v-model="user.iin"/>

          <label class="change-user__label" for="email">Email</label>
          <input class="change-user__input" type="text" id="email" v-model="user.email"/>

          <label class="change-user__label" for="phone" >Phone Number</label>
          <input class="change-user__input" type="text" id="phone" v-model="user.phone_number"/>
          <button class="change-user__btn">Save</button>
      </form>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import {toast} from "vue3-toastify";

export default {
  name: 'ChangeUser',
  data() {
    return {
      user: {},
      username: '',
    }
  },
  methods: {
    async getCurrentUser() {
      return (await axios.get("/user/data")).data
    },
    onSubmit() {
      axios.post("/user/data", this.user)
      .then(() => this.$router.push({name: 'profile'}))
      .catch((error) => {
        toast(error.response.data.message, {
          "theme": "auto",
          "type": "error",
          "dangerouslyHTMLString": true
        });
      })
    }
  },
  mounted() {
    if (!localStorage.hasOwnProperty('user')) {
      this.$router.push({name: 'home'});
    }
    this.getCurrentUser()
    .then(res => this.user = res)
    .then(res => this.username = res.name);
  }
}
</script>

<style scoped>

.change-user__main {
  height: 100vh;

  width: 30%;

  display: flex;
  flex-direction: column;
  align-items: center;
}

/* - header */
.change-user__header {

  display: flex;

  margin-top: 4rem;
  margin-bottom: 2rem;
  font-size: 4rem;
  font-weight: 600;

}
.change-user__header>h1 {
  margin: 0 auto;
}
/* - form */

.change-user {

  width: 80%;

  border-style: solid;
  border-width: 1px;
}

.change-user__username {
  display: flex;
  justify-content: center;
  padding: 1rem 0;
  opacity: 0.9;
  font-weight: 600;
  font-size: 3rem;
}

.change-user__form{
  display: flex;
  flex-direction: column;
  /*align-items: center;*/
  width: 80%;
  margin: 1rem auto 0;
  padding: 1.5rem 0;
}

.change-user__label {
  padding: 0.5rem 0;
  margin-left: 1rem;
  opacity: 0.6;
}

.change-user__input {
  padding: 0.5rem 1rem;
  border-width: 2px;
  border-radius: 7px;
  border-color: rgba(0, 0, 0, 0.6);
  margin: 0.5rem 1rem 1rem;
}

.change-user__btn {
  margin: 3rem auto;
  border-radius: 18px;
  border-width: 0;
  width: 12rem;
  height: 3rem;
  background-color: #006EFF;
  color: #fff;
  opacity: 0.6;
}
</style>