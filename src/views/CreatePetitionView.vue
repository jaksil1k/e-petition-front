<template>
  <section class="create-petition">
    <h1 class="create-petition__title">
      Create your petition
    </h1>
    <form class="create-petition__form"
          @submit.prevent="onSubmit">

      <label class="create-petition__text" for="state-body">Наименование государственного органа, местного представительного и (или) исполнительного органа.</label>
      <input v-model="agency" class="create-petition__input-text" type="text" id="state-body"/>

      <label class="create-petition__text" for="title">Заголовок петиции</label>
      <input v-model="title" class="create-petition__input-text" type="text" id="title">


      <image-component/>

      <label class="create-petition__text" for="body">Содержание петиции</label>
      <textarea class="create-petition__input-text" rows="4" cols="50" id="body" v-model="body"></textarea>

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
      imageId: null,
    };
  },
  methods: {
    uploadImage(){
      let data = new FormData();
      data.append("image", this.$store.getters.image);
      console.log(data);
      return axios.post("/image", data, {headers: {"Content-Type": "multipart/form-data"}});
    },
    async onSubmit() {
      const imageId = await this.uploadImage();
      console.log(imageId);
      let data = {
        title: this.title,
        imageId: imageId,
        body: this.body,
        agency: this.agency
      }
      const response = await axios.post("/petition", data)
      console.log(response)
      this.$router.push({name: 'home'})
    }
  },
  mounted() {}
}


//image/jpeg;base64,
</script>

<style scoped>
@import "../assets/css/create-petition/form.css";
@import "../assets/css/create-petition/upload-image.css";
.dropzone {
  height: fit-content;
  min-height: 200px;
  max-height: 400px;
  width: 600px;
  background: #fdfdfd;
  border-radius: 5px;
  border: 2px dashed #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 3rem auto;
}
.dropzone input[type="file"] {
  position: absolute;
  opacity: 0;
  width: inherit;
  min-height: 200px;
  max-height: 400px;
  cursor: pointer;
}

.dropzone img {
  width: 50%;
  height: 50%;
}





</style>

