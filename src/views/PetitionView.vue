<template>
  <main class="petition-page">
    <section class="petition">
      <div class="petition__img-div">
        <img class="petition__img" :src="fileUrl" alt="no image">
      </div>
      <h1 class="petition__title">{{petition.title}}</h1>
      <p class="petition__content">Создано: {{petition.createdAt}}</p>
      <p class="petition__content">Направлено: {{petition.agency}}</p>
      <p class="petition__content body">{{petition.body}}</p>
    </section>
    <section class="auth" v-if="!isAuth">
      <div v-if="!isRegistered">
        <h2 class="auth__h2">Already registered? <a @click="showLogin" href="javascript:void(0)">Sign in</a></h2>
        <Register @registerSuccess="showSign"/>
      </div>
      <div v-if="isRegistered">
        <h2 class="auth__h2">Haven't registered yet? <a @click="showRegister" href="javascript:void(0)">Sign up</a></h2>
        <Login @loginSuccess="showSign"/>
      </div>
    </section>
    <section class="sign" v-if="isAuth">
      <Modal
          v-show="isModalVisible"
          @close="closeModal"
          @sign="signPetition"
      />
      <button class="button-9" type="button" @click="showModal">Sign petition</button>
    </section>
  </main>
</template>

<script>
import petitionApi from "@/api/petitionApi";
import Modal from "@/components/ModalComponent";
import axios from "axios";
import {toast} from "vue3-toastify";
import Register from "@/components/RegisterComponent";
import Login from "@/components/LoginComponent";
export default {
  name: 'PetitionView',
  components: {Login, Register, Modal},
  data() {
    return {
      petition: {},
      isOwner: false,
      fileUrl: '',
      isModalVisible: false,
      isAuth: false,
      isRegistered: false,
    }
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    showSign() {
      this.isAuth = true;
    },
    showLogin() {
      this.isRegistered = true;
    },
    showRegister() {
      this.isRegistered = false;
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
  async mounted() {
    const res = await petitionApi.getById(this.$route.params.id)
    // console.log(json);
    this.petition = res.data;
    // console.log(this.petition.file.id)
    this.fileUrl = axios.defaults.baseURL + '/file/' + this.petition.file.id;
    if (localStorage.getItem('user')) {
      this.isAuth = true;
    }
    if (this.$store.getters.token) {
      this.isOwner = (await petitionApi.isMy(this.petition.id)).data.is_owner;
    }
  },
}
</script>

<style scoped>
@import "/src/assets/css/auth/auth.css";
.petition__img {
  width: 40%;
  height: 30%;
  margin-bottom: 1rem;
}
.petition__img-div {
  margin-top: 7rem;
  max-width: 500px;
  max-height: 200px;
}
.petition-page {
  display: flex;
  height: 100vh;
  max-width: 60%;
  margin-left: 30%;
  margin-right: 10%;
}
.petition {
  max-width: 50%;
  align-items: center;
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
.auth {
  margin-top: 7rem;
  width: 50%;
  align-items: initial;
}
.button-9 {
  margin-top: 10%;
  max-width: 300px;
}
</style>