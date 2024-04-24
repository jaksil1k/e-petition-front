<template>
  <main class="petition-page">
    <section class="petition">
      <h1 class="petition__title">{{petition.title}}</h1>
      <p class="petition__content">Создано: {{petition.createdAt}}</p>
      <p class="petition__content">Направлено: {{petition.agency}}</p>
      <p class="petition__content body">{{petition.body}}</p>

      <button type="button" @click="showModal">Sign petition</button>
      <button type="button" @click="showAlert">alert</button>

<!--      <button v-if="isOwner" @click="editPetition">Edit</button>-->
      <img :src="fileUrl" alt="no image">

      <Modal
          v-show="isModalVisible"
          @close="closeModal"
          @sign="signPetition"
      />
    </section>
    {{getFile}}
  </main>
</template>

<script>
import petitionApi from "@/api/petitionApi";
import Modal from "@/components/ModalComponent";
import axios from "axios";
import {toast} from "vue3-toastify";
export default {
  name: 'PetitionView',
  components: {Modal},
  data() {
    return {
      petition: {},
      isOwner: false,
      fileUrl: '',
      isModalVisible: false,
    }
  },
  async mounted() {
    const json = await petitionApi.getById(this.$route.params.id)
    console.log(json);
    this.petition = json.data;
    console.log(this.petition.file.id)
    this.fileUrl = 'http://localhost:8081/api/file/' + this.petition.file.id;
    if (this.$store.getters.token) {
      this.isOwner = (await petitionApi.isMy(this.petition.id)).data.is_owner;
    }

  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    async signPetition(req) {
      if (!req.esp || !req.password) {
        console.log(req.esp);
        return;
      }
      const response = await axios.post("/petition/signEds", {
        petitionId: this.petition.id,
        certificate_store: req.esp,
        password: req.password
      })
      console.log(response);
      this.closeModal();
    },
    showAlert() {
      toast("Success", {
        "theme": "auto",
        "type": "success",
        "dangerouslyHTMLString": true
      })
    }
  },
  computed: {
    getFile() {
      return this.$store.getters.esp;
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
  width: 50%;
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