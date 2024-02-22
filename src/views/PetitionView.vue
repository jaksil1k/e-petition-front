<template>
  <main class="petition-page">
    <section class="petition">
      <h1 class="petition__title">{{petition.title}}</h1>
      <p class="petition__content">Создано: {{petition.createdAt}}</p>
      <p class="petition__content">Направлено: {{petition.agency}}</p>
      <p class="petition__content body">{{petition.body}}</p>
      <button @click="sign">Sign petition</button>
    </section>

  </main>
</template>

<script>
import axios from "axios";

export default {
  name: 'PetitionView',
  data() {
    return {
      petition: {}
    }
  },
  async mounted() {
    let result = await axios.get("http://localhost:8081/api/petition/" + this.$route.params.id,
        {headers: {"Content-Type": "application/json",
            Authorization: localStorage.getItem('SavedToken')}});
    this.petition = result.data;
    console.log(this.petition)
  },
  methods: {
    async sign() {
      await axios.post("http://localhost:8081/api/petition/sign",
          {id: this.petition.id},
          {headers: {"Content-Type": "application/json",
              Authorization: localStorage.getItem('SavedToken')}})
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