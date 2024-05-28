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
    <section>
      <div class="auth" v-if="!isAuth">
        <div v-if="!isRegistered">
          <h2 class="auth__h2">Already registered? <a @click="showLogin" href="javascript:void(0)">Sign in</a></h2>
          <Register @registerSuccess="showSign"/>
        </div>
        <div v-if="isRegistered">
          <h2 class="auth__h2">Haven't registered yet? <a @click="showRegister" href="javascript:void(0)">Sign up</a></h2>
          <Login @loginSuccess="showSign"/>
        </div>
      </div>
      <div class="sign" v-if="isAuth">
        <button class="button-9" type="button" @click="sign" :disabled="waiting">Sign Petition</button>
      </div>
      <div class="status-div">
        <p class="petition__content status" v-bind:class="petition.status">Статус: {{petition.status}}</p>
      </div>
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
      xml: '',
      callback: null,
    }
  },
  methods: {
    sendXmlToSign(e) {
      console.log(e.target);
    },
    async sign() {
      let callback = null;
      this.signature = null;
      this.waiting = true;
      let SELF = this;
      const xmlToSign = '<?xml version="1.0" encoding="UTF-8"?><root>'
          + this.OBJtoXML(this.petition) + '</root>';
      this.webSocket.onopen = function (event) {
        console.log("Connection opened");
      };
      this.webSocket.onmessage = function (event) {
        const result = JSON.parse(event.data);

        if (result != null) {
          const rw = {
            code: result['code'],
            message: result['message'],
            responseObject: result['responseObject'],
            getResult: function () {
              return this.result;
            },
            getMessage: function () {
              return this.message;
            },
            getResponseObject: function () {
              return this.responseObject;
            },
            getCode: function () {
              return this.code;
            }
          };
          SELF.signXmlBack(rw);
        }
      };
      this.webSocket.onclose = function (event) {
        if (event.wasClean) {
          console.log('connection has been closed');
        } else {
          console.log('Connection error');
        }
        if (event.code === 1006) {
          toast("NCALayer выключен!", {
            "theme": "auto",
            "type": "error",
            "dangerouslyHTMLString": true
          })
        }
        console.log('Code: ' + event.code + ' Reason: ' + event.reason);
      };
      this.webSocket.onopen = function (event) {
        console.log("Connection opened");
      };

      try {
        let signXml = {
          "module": "kz.gov.pki.knca.commonUtils",
          "method": "signXml",
          "args": ["PKCS12", "SIGNATURE", xmlToSign, "", ""]
        };
        this.webSocket.send(JSON.stringify(signXml));
        this.waiting = false;
      } catch (error) {
        if (error.canceledByUser) {
          toast('Действие отменено пользователем.', {
            "theme": "auto",
            "type": "error",
            "dangerouslyHTMLString": true
          });
        }
      }
    },
    signXmlBack(result) {
      if (result['code'] === "500") {
        toast(result['message'] === "action.canceled"?"Действие отменено пользователем."
            : "Что то пошло не так, повторите позже", {
          "theme": "auto",
          "type": "error",
          "dangerouslyHTMLString": true
        });
      } else if (result['code'] === "200") {
        const res = result['responseObject'];
        // console.log(res);
        fetch("http://localhost:8081/api/petition/signXml", {
          method: "POST",
          // mode: 'no-cors',
          headers: new Headers({
            'Authorization': 'Bearer ' + localStorage.getItem('user'),
            'Content-Type': 'application/json'
          }),
          body: JSON.stringify({
            petitionId: window.location.href.split('/').reverse()[0],
            xml: res
          })
        }).then(res => res.json()
        ).then(res => {
          if (res.hasOwnProperty('msg')) {
            toast( res.msg, {
              "theme": "auto",
              "type": "success",
              "dangerouslyHTMLString": true}
            );
          }
          else {
            toast(res.message, {
              "theme": "auto",
              "type": "error",
              "dangerouslyHTMLString": true
            });
          }
        });
      }
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
    showSign() {
      this.isAuth = true;
    },
    showLogin() {
      this.isRegistered = true;
    },
    showRegister() {
      this.isRegistered = false;
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

.status-div {
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
  max-width: 300px;
}
.status.ACCEPT {
  color: green;
}
.status.ON_REVIEW {
  color: yellow;
}
.status.DRAFT {
  color: gray;
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

