<template>
  <section class="create-petition">
    <h1 class="create-petition__title">
      Create your petition
    </h1>
    <form class="create-petition__form"
          @submit.prevent="onSubmit">
      <label class="create-petition__text" for="state-body">Наименование государственного органа, местного представительного и (или) исполнительного органа.</label>
      <input v-model="agency" class="create-petition__input-text" type="text" id="state-body" required/>
      <label class="create-petition__text" for="title">Заголовок петиции</label>
      <input v-model="title" class="create-petition__input-text" type="text" id="title" required>

      <div
        class="dropzone"
        @dragover.prevent
        @dragenter.prevent
        @dragstart.prevent
        @drop.prevent="handleFileChange($event.dataTransfer)"
    >
      <input
          id="file-input"
          type="file"
          accept="image/png, image/jpeg"
          @change="handleFileChange($event.target)"
          required
      />
      <h2 for="file-input">Click or Drag N Drop Image</h2>
      <img v-bind:src="preview" />
      <h3 v-if="preview">File name: {{ fileName }}</h3>
    </div>

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
export default {
  name: 'CreatePetition',
  components: {
    DragDropImageInput,
  },
  data() {
    return {
      image: "",
      fileName: "",
      preview: null,
      preset: process.env.VUE_APP_UPLOAD_PRESET,
      formData: null,
      cloudName: process.env.VUE_APP_CLOUD_NAME,
      success: "",
      imageId: "",
      title: "",
      agency: "",
      body: "",
    };
  },
  methods: {
    handleFileChange: function (event) {
      this.file = event.files[0];
      this.fileName = this.file.name;

      this.formData = new FormData();
      this.formData.append("image", this.file);

      // let reader = new FileReader();
      // reader.readAsDataURL(this.file);
      //
      // reader.onload = (e) => {
      //   this.preview = e.target.result;
      //   this.formData.append("file", this.preview);
      // };

      console.log(this);
    },
    uploadImage(){
      let formData = this.formData;
      console.log(formData);

      // axios.post(
      //     "http://127.0.0.1:8081/api/image"
      //     ,formData
      //     ,{headers: {"Content-Type": "multipart/form-data",
      //         Authorization: localStorage.getItem('SavedToken')},})
      //     .then(response => {
      //       this.imageId = response.data.id;
      //     })
      //     .catch(e => {
      //       console.log(e)
      //     })
    },
    async onSubmit() {
      await this.uploadImage();
      let data = {
        title: this.title,
        imageId: this.imageId,
        body: this.body,
        agency: this.agency
      }
      const response = await axios.post("http://127.0.0.1:8081/api/petition", data)
      console.log(response)
      this.$router.push({name: 'home'})

    }
  },
  mounted() {}
}



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

