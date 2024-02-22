<template>
  <div>
    <input
        ref="file"
        type="file"
        accept="image/*"
        @change="fileChange"
        hidden
    />
    <div
        class="drag-drop-zone"
        @click="upload()"
        @dragover="dragover"
        @dragleave="dragleave"
        @drop="drop"
    >
      <template v-if="isDragging">
        <div class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
            <path
                d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160
              160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0
              12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4
              24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6
              9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"
            />
          </svg>
        </div>
        <p>Drop to upload</p>
      </template>
      <img v-else-if="previewImg" class="preview" :src="previewImg" />
      <template v-else>
        <div class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
            <path
                d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160
              160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0
              12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4
              24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6
              9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"
            />
          </svg>
        </div>
        <p>Click to upload</p>
        <p class="sub-text">or drag and drop image</p>
        <p class="sub-text">(500x250px)</p>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      required: true,
    },
  },
  data() {
    return {
      isDragging: false,
    };
  },
  computed: {
    previewImg() {
      if (this.value) {
        return URL.createObjectURL(this.value);
      }
      return null;
    },
  },
  methods: {
    upload() {
      this.$refs.file.click();
    },
    fileChange(e, isDrop = false) {
      const file = isDrop ? e.dataTransfer.files[0] : e.target.files[0];
      this.$emit("input", file);
    },
    dragover(e) {
      e.preventDefault();
      this.isDragging = true;
    },
    dragleave() {
      this.isDragging = false;
    },
    drop(e) {
      e.preventDefault();
      this.fileChange(e, true);
      this.isDragging = false;
    },
  },
};
</script>

<style scoped>
.drag-drop-zone {
  width: 500px;
  height: 250px;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.drag-drop-zone .preview {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.drag-drop-zone .icon {
  width: 25px;
  height: 20px;
}
.drag-drop-zone .sub-text {
  font-size: 12px;
}
</style>