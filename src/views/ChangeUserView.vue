<template>
  <main class="change-user">
    <div class="change-user__header">
      <h1 class="change-user__h1">Change your credentials</h1>
    </div>
    <form @submit.prevent="onSubmit" class="change-user__form">
      <div>
        <div class="change-user__form-div">
          <label class="change-user__label" for="name">Full Name</label>
          <input class="change-user__input"  type="text" id="name" v-model="user.name"/>

          <label class="change-user__label" for="email">Email</label>
          <input class="change-user__input" type="text" id="email" v-model="user.email"/>

          <label class="change-user__label" for="password">Password</label>
          <input class="change-user__input" type="password" id="password"/>
        </div>

        <div class="change-user__form-div">
          <label class="change-user__label" for="iin">IIN</label>
          <input class="change-user__input" type="text" id="iin" v-model="user.iin"/>

          <label class="change-user__label" for="phone" >Phone Number</label>
          <input class="change-user__input" type="text" id="phone" v-model="user.phone_number"/>

          <label class="change-user__label" for="re-password">Confirm Password</label>
          <input class="change-user__input" type="password" id="re-password"/>
        </div>
      </div>
      <div>
        <button class="change-user__btn">Save</button>
      </div>
    </form>
  </main>
</template>

<script>
import axios from "axios";
import {toast} from "vue3-toastify";

export default {
  name: 'ChangeUser',
  data() {
    return {
      user: {}
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
    .then(res => this.user = res);
  }
}
</script>

<style scoped>

.change-user {
  height: 100vh;
  max-width: 400px;
}

/* - header */
.change-user__header {

  display: flex;

  margin-top: 4rem;
  margin-bottom: 1.5rem;

}
.change-user__header>h1 {
  margin: 0 auto;
}

/* - form */
.change-user__form {
  border-style: solid;
  border-width: 1px;

  padding: 1.5rem 0.5rem;
}

.change-user__form>div {
  display: flex;
  flex-direction: row;
}
.change-user__form-div {
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 1rem 2.5em;
}
.change-user__label {
  padding: 0.5rem 0;
}

.change-user__input {
  padding: 0.3rem 1rem;
  border-width: 2px;
  border-radius: 7px;
  opacity: 60%;
}

.change-user__btn {
  margin: 2rem;
  border-radius: 100px;
  border-width: 0;
  width: 8rem;
  height: 3rem;
  background-color: #006EFF;
  color: #fff;
}
</style>