<template>
  <main class="petition-page">
    <section class="petition">
      <h1 class="petition__title">{{petition.title}}</h1>
      <p class="petition__content">Создано: {{petition.createdAt}}</p>
      <p class="petition__content">Направлено: {{petition.agency}}</p>
      <p class="petition__content body">{{petition.body}}</p>

      <button type="button" @click="showModal">Sign petition</button>

      <button v-if="isOwner" @click="editPetition">Edit</button>
      <img :src="'http://localhost:8081/api/file/' + fileId" alt="no image">

      <Modal
          v-show="isModalVisible"
          @close="closeModal"
      />

      <input type="file">
    </section>
  </main>
</template>

<script>
import axios from "axios";
import petition from "@/api/petition";
import Modal from "@/components/ModalComponent";
export default {
  name: 'PetitionView',
  components: {Modal},
  data() {
    return {
      petition: {},
      isOwner: false,
      fileId: '',
      isModalVisible: false,
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
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
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