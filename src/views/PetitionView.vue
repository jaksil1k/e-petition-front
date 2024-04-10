<template>
  <main class="petition-page">
    <section class="petition">
      <h1 class="petition__title">{{petition.title}}</h1>
      <p class="petition__content">Создано: {{petition.createdAt}}</p>
      <p class="petition__content">Направлено: {{petition.agency}}</p>
      <p class="petition__content body">{{petition.body}}</p>
      <button @click="sign">Sign petition</button>
      <button v-if="isOwner" @click="editPetition">Edit</button>
      <img :src="'http://localhost:8081/api/file/' + fileId" alt="no image">
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
      fileId: '',
    }
  },
  async mounted() {
    this.petition = (await petition.getById(this.$route.params.id)).data;
    console.log(this.petition.file.id)
    this.fileId = this.petition.file.id;
    if (this.$store.getters.token) {
      this.isOwner = (await petition.isMy(this.petition.id)).data.is_owner;
    }

  },
  methods: {
    sign() {
      axios.post("/petition/signEds", {
        petition_id: this.petition.id,
        certificate_store: this.certificate,
        password: this.password
      })
      .then(() => alert("Successfully signed"))
      .catch(() => alert("Already signed"));
    },
    clickSign() {

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