<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal"
           role="dialog"
           aria-labelledby="modalTitle"
           aria-describedby="modalDescription"
      >
        <header
            class="modal-header"
            id="modalTitle"
        >
          <slot name="header">
            This is the default title!
          </slot>
          <button
              type="button"
              class="btn-close"
              @click="close"
              aria-label="Close modal"
          >
            x
          </button>
        </header>

        <section
            class="modal-body"
            id="modalDescription"
        >
          <slot name="body" class="sign">
            <form @submit.prevent="signPetition" class="sign-form">
              <input @change="uploadFile" type="file" class="sign-form__input" accept="application/x-pkcs12" required>
              <input v-model="password" type="password" class="sign-form__input" placeholder="password" required>
              <button class="sign-form__btn">Подписать</button>
            </form>
          </slot>
        </section>

        <footer class="modal-footer">
          <slot name="footer">
            This is the default footer!
          </slot>
          <button
              type="button"
              class="btn-green"
              @click="close"
              aria-label="Close modal">
            Close Modal
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>

export default {
  name: 'Modal',
  data() {
    return {
      password: '',
      esp: null
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },
    async uploadFile(e) {
      this.esp = (await this.fileToBase64(e.target.files[0])).replace("data:application/x-pkcs12;base64,", "");
    },
    async fileToBase64(file) {
      return new Promise((resolve, reject) => {
        if (!file.type.match('x-pkcs12')) {
          return reject(new Error('INVALID_FILE'));
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function() {
          const base64data = reader.result;
          resolve(base64data);
        };
      });
    },
    signPetition() {
      this.$emit('sign', {
        esp: this.esp,
        password: this.password
      });
    },
  },
};
</script>

<style scoped>
/*.sign-form__div {*/
/*}*/

.sign-form {
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 0 auto;
}

.sign-form__input {
  margin-bottom: 15px;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #FFFFFF;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  width: 30%;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  color: #4AAE9B;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #4AAE9B;
  background: transparent;
}

.btn-green {
  color: white;
  background: #4AAE9B;
  border: 1px solid #4AAE9B;
  border-radius: 2px;
}
.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity .5s ease;
}
</style>