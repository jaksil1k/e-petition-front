<template>
  <div >
    <img v-bind:src="previewImage" alt="image" class="dropzone"/>
    <input type="file" accept="image/jpeg" @change=uploadImage>
  </div>
</template>

<script>
export default {
  name:'imageUpload',
  data(){
    return{
      previewImage: null
    }
  },
  methods:{
    uploadImage(e){
      const image = e.target.files[0];
      this.$store.dispatch('image', image);

      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = e =>{
        this.previewImage = e.target.result;
      };
    }
  },
  computed: {
  }
}  // missing closure added
</script>



<style>
.dropzone {
  height: fit-content;

  max-height: 300px;
  max-width: 600px;

  min-height: 100px;
  min-width: 300px;

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