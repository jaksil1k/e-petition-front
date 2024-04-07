<template>
  <main class="petition-page">
    <section class="petition">
      <h1 class="petition__title">{{petition.title}}</h1>
      <p class="petition__content">Создано: {{petition.createdAt}}</p>
      <p class="petition__content">Направлено: {{petition.agency}}</p>
      <p class="petition__content body">{{petition.body}}</p>
      <p>{{petition}}</p>
      <button @click="sign">Sign petition</button>
      <button v-if="isOwner" @click="editPetition">Edit</button>
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
    this.petition = (await petition.getById(this.$route.params.id)).data;
    console.log(this.petition)
    if (this.$store.getters.token) {
      this.isOwner = (await petition.isMy(this.petition.id)).data.is_owner;
    }
  },
  methods: {
    sign() {
      axios.post("/petition/sign", {id: this.petition.id})
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