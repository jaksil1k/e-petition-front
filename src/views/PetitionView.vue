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
<!--      <Modal-->
<!--          v-show="isModalVisible"-->
<!--          @close="closeModal"-->
<!--          @sign="sign"-->
<!--      />-->
<!--      <button class="button-9" type="button" @click="showModal">Sign petition</button>-->
      <button class="button-9" type="button" onclick="signXmlCall();">Sign petition</button>
      <textarea class="form-control" id="xmlToSign" rows="3" hidden readonly>{{xml}}</textarea>
      <select id="storageSelect" class="custom-select" hidden>
        <option value="PKCS12" selected>PKCS12</option>
      </select>
      <textarea class="form-control" id="signedXml" rows="6" hidden readonly>Подписанный XML</textarea>

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
import {NCALayerClient} from "ncalayer-js-client";
import $ from 'jquery'
export default {
  name: 'PetitionView',
  components: {Login, Register, Modal},
  data() {
    return {
      dataFile: {},
      petition: {},
      isOwner: false,
      fileUrl: '',
      isModalVisible: false,
      isRegistered: false,
      signature: null,
      waiting: false,
      msg: 'Welcome to Your Vue.js App',
      html: '<i class="fa fa-cog fa-spin fa-3x fa-fw"></i>',  //this line demostrate how to use fontawesome animation icon
      blocked: true,
      webSocket: new WebSocket('wss://127.0.0.1:13579/'),
      callback: null,
      xml: '',
    }
  },
  methods: {
    sendXmlToSign(e) {
      console.log(e.target);
    },
    async sign() {
      this.signature = null;
      this.waiting = true;

      const ncalayerClient = new NCALayerClient();

      try {
        await ncalayerClient.connect();
      } catch (error) {
        alert(`Не удалось подключиться к NCALayer: ${error.toString()}`);
        return;
      }

      try {
        this.signature = await ncalayerClient.basicsSignCMS(
            NCALayerClient.basicsStorageAll,
            this.$refs.fileUploadInput.files[0],
            NCALayerClient.basicsCMSParamsDetached,
            NCALayerClient.basicsSignerSignAny,
        );
        this.waiting = false;
      } catch (error) {
        if (error.canceledByUser) {
          alert('Действие отменено пользователем.');
        }

        alert(error.toString());
        return;
      }
    },
    signPetition2() {

      // console.log('<?xml version="1.0" encoding="UTF-8"?><root>'
      //     + this.OBJtoXML(this.petition) + '</root>');
      const xmlToSign = '<?xml version="1.0" encoding="UTF-8"?><root>'
          + this.OBJtoXML(this.petition) + '</root>';
    },
    OBJtoXML(obj) {
      let xml = '';
      for (const prop in obj) {
        xml += obj[prop] instanceof Array ? '' : "<" + prop + ">";
        if (obj[prop] instanceof Array) {
          for (const array in obj[prop]) {
            xml += "<" + prop + ">";
            xml += this.OBJtoXML(new Object(obj[prop][array]));
            xml += "</" + prop + ">";
          }
        } else if (typeof obj[prop] == "object") {
          xml += this.OBJtoXML(new Object(obj[prop]));
        } else {
          xml += obj[prop];
        }
        xml += obj[prop] instanceof Array ? '' : "</" + prop + ">";
      }
      xml = xml.replace(/<\/?[0-9]+>/g, '');
      return xml
    },
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
  computed: {
    isAuth() {
      return this.$store.getters.token;
    }
  },
  async mounted() {
    const res = await petitionApi.getById(this.$route.params.id)
    this.petition = res.data;
    this.xml = '<?xml version="1.0" encoding="UTF-8"?><root>'
        + this.OBJtoXML(this.petition) + '</root>'
    // console.log(this.petition.file.id)
    this.fileUrl = axios.defaults.baseURL + '/file/' + this.petition.file.id;
    if (localStorage.getItem('user')) {
      this.$store.dispatch('token', localStorage.getItem('user'))
    }
    if (this.$store.getters.token) {
      //this.isOwner = (await petitionApi.isMy(this.petition.id)).data.is_owner;
    }
  },
}
// axios.post("http://localhost:8081/api/petition/signXml", {
//     petitionId: window.location.href.split('/').reverse()[0],
//     xml: rw.responseObject
// }, {
//     headers: {
//         'Authorization': 'Bearer ' + localStorage.getItem("user")
//     }
// }).then(res => {
//     console.log(res)
//     if (res.hasOwnProperty("msg")) {
//         alert("Успешно подписано");
//     } else {
//         alert("Петиция уже подписана заявителем");
//     }
// });
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

