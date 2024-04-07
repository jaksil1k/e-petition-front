<template>
  <div>
    <img v-bind:src="previewImage" class="uploading-image"  alt="image"/>
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

      // const reader = new FileReader();
      // reader.readAsDataURL(image);
      // reader.onload = e =>{
      //   this.previewImage = e.target.data;
      //   console.log(e.target.result);
      // };


      this.previewImage = URL.createObjectURL(image);
    }
  },
  computed: {
  }
}  // missing closure added
</script>



<style>
.uploading-image{
  display:flex;
}
</style>