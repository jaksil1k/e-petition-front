<template>
  <section class="create-petition">
    <div class="create-petition__title">
      <h1 class="create-petition__h1">
        Создайте петицию
      </h1>
    </div>
    <form class="create-petition__form"
          @submit.prevent="onSubmit">

      <div class="create-petition__form-div">
        <label class="create-petition__text" for="state-body">Государтвенный орган</label>
        <input v-model="agency" class="create-petition__input-text" type="text" id="state-body" required/>
      </div>

      <div class="create-petition__form-div">
        <label class="create-petition__text" for="title">Заголовок петиции</label>
        <input v-model="title" class="create-petition__input-text" type="text" id="title" required/>
      </div>

      <div class="create-petition__form-div">
        <image-component/>
      </div>

      <div class="create-petition__form-div">
        <label class="create-petition__text" for="body">Содержание петиции</label>
        <textarea class="create-petition__input-text" rows="4" cols="50" id="body" v-model="body" required/>
      </div>

      <div class="create-petition__div-btn">
        <button class="button-9" role="button">Create</button>
      </div>
    </form>
  </section>
</template>

<script>


import DragDropImageInput from "@/components/DragDropImageInput";
import axios from 'axios'
import ImageComponent from "@/components/ImageComponent";
import {toast} from "vue3-toastify";
export default {
  name: 'CreatePetition',
  components: {
    DragDropImageInput,
    ImageComponent
  },
  data() {
    return {
      title: '',
      agency: '',
      body: '',
      fileId: null,
    };
  },
  methods: {
    async uploadImage(){
      let data = new FormData();
      data.append("file", this.$store.getters.image);
      const response = await axios.post("/file", data, {headers: {'Content-Type': 'multipart/form-data'}});
      return response.data.id;
    },
    async onSubmit() {
      this.fileId = await this.uploadImage();
      let data = {
        title: this.title,
        fileId: this.fileId,
        body: this.body,
        agency: this.agency
      }
      axios.post("/petition", data)
      .then(() => this.$router.push({name: 'home'}))
      .catch(error => {
        if (error.response && error.response.data.message) {
          toast(error.response.data.message, {
            "theme": "auto",
            "type": "error",
            "dangerouslyHTMLString": true
          });
        }
      })
    },
  },
  mounted() {
    if (!localStorage.getItem('user')) {
      this.$router.push({'name': 'login'})
    }
  }
}

</script>

<style scoped>
@import "../assets/css/create-petition/form.css";

.create-petition__form {
  margin-bottom: 10rem;
}
</style>

