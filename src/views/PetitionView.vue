<template>
  <main class="petition-page">
    <section class="petition">
      <h1 class="petition__title">{{petition.title}}</h1>
      <p class="petition__content">Создано: {{petition.createdAt}}</p>
      <p class="petition__content">Направлено: {{petition.agency}}</p>
      <p class="petition__content body">{{petition.body}}</p>
      <button @click="sign">Sign petition</button>
      <button @click="editPetition">Edit</button>
    </section>

  </main>
</template>

<script>
import axios from "axios";
import petition from "@/api/petition";

export default {
  name: 'PetitionView',
  data() {
    return {
      petition: {},
      isOwner: false,
    }
  },
  async mounted() {
    let result = await axios.get("http://localhost:8081/api/petition/" + this.$route.params.id,
        {headers: {"Content-Type": "application/json",
            /*Authorization: localStorage.getItem('user')*/}});
    this.petition = result.data;
    console.log(this.petition);
    if (localStorage.hasOwnProperty('user')) {
      this.isOwner = (await petition.isMy(this.petition.id)).data.is_owner;
    }
    console.log(this.isOwner);
  },
  methods: {
    async sign() {
      await axios.post("http://localhost:8081/api/petition/sign",
          {id: this.petition.id},
          {headers: {"Content-Type": "application/json",
              Authorization: localStorage.getItem('user')}})
      .then(() => alert("Successfully signed"))
      .catch(() => alert("Already signed"));

    }
  }
}
</script>

<style scoped>
.petition-page {
  display: flex;
  justify-content: center;
  height: 100vh;
}
.petition {
  width: 40%;
}
.petition__title {
  font-size: xx-large;
  margin: 2rem 0;
}
.petition__content {
  font-size: large;
}
.petition .body {
  margin-top: 2rem;
}
</style>