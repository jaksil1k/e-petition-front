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
    signPetition(req) {
      if (!req.esp || !req.password) {
        toast("ЭЦП или пароля нету", {
          "theme": "auto",
          "type": "error",
          "dangerouslyHTMLString": true
        });
        return;
      }
      axios.post("/petition/signEds", {
        petitionId: this.petition.id,
        certificate_store: req.esp,
        password: req.password
      })
      .then((response) => {
        toast(response.data.msg, {
          "theme": "auto",
          "type": "success",
          "dangerouslyHTMLString": true
        });
      })
      .catch(error => {
        if (error.response.data.message) {
          toast(error.response.data.message, {
            "theme": "auto",
            "type": "error",
            "dangerouslyHTMLString": true
          });
        }
        else {
          throw error;
        }
      })
      this.closeModal();
    },
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