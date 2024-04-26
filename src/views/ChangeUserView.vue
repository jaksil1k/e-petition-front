<template>
  <main class="change-user">
    <div class="change-user__header">
      <h1 class="change-user__h1">Change your credentials</h1>
    </div>
    <form @submit.prevent="onSubmit" class="change-user__form">
      <div>
        <label class="change-user__label" for="name">Full Name</label>
        <input class="change-user__input"  type="text" id="name" v-model="user.name"/>

        <label class="change-user__label" for="iin">IIN</label>
        <input class="change-user__input" type="text" id="iin" v-model="user.iin"/>

        <label class="change-user__label" for="email">Email</label>
        <input class="change-user__input" type="text" id="email" v-model="user.email"/>

        <label class="change-user__label" for="phone" >Phone Number</label>
        <input class="change-user__input" type="text" id="phone" v-model="user.phone_number"/>
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

}
.change-user__header>h1 {
  margin: 0 auto;
}

/* - form */
.change-user__form {
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 90%;

  border-style: solid;
  border-width: 1px;

  padding: 1.5rem 0.5rem;
}

.change-user__form>div {
  width: 70%;
  display: flex;
  flex-direction: column;

}
.change-user__label {
  padding: 0.5rem 0;
}

.change-user__input {
  padding: 0.3rem 1rem;
  border-width: 2px;
  border-radius: 7px;
  border-color: rgba(0, 0, 0, 0.6);
  margin: 0 1rem;
}

.change-user__btn {
  margin: 2rem 0;
  border-radius: 100px;
  border-width: 0;
  width: 8rem;
  height: 3rem;
  background-color: #006EFF;
  color: #fff;
}
</style>