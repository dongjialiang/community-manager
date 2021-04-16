<template>
  <div class="mask">
    <div class="modal">
      {{ msg }}
      <div class="modal-body">
        <button
          class="modal-button"
          @click="confirm"
        >
          确定
        </button>
        <button
          class="modal-button"
          @click="cancel"
        >
          取消
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue'
import createStore from '../store'

const store = createStore()

export default {
  name: 'Modal',
  setup() {
    const msg = ref('')

    watchEffect(() => {
      msg.value = store.state.modalMsg
    })

    const confirm = () => {
      store.setModalAction(true)
    }
    const cancel = () => {
      store.setModalAction(false)
    }

    return { msg, confirm, cancel }
  }
}
</script>

<style scoped>
.mask {
  position: absolute;
  z-index: 99;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: all;
  background-color: rgba(0, 0, 0, .5);
}
.modal {
  color: var(--main-bg-color);
  background-color: rgba(250, 250, 250, 1);
  width: 25vw;
  height: 20vh;
  margin: 20vh auto;
  border-radius: .5em;
  border: .5em solid var(--main-bg-color);
  padding: 2vh 0;
  position: relative;
  filter: drop-shadow(2px 4px 6px black);
  font-size: 1.4em;
}
.modal-body {
  position: absolute;
  width: 100%;
  margin: 0;
  bottom: 0;
}
.modal-button {
  line-height: 2em;
  margin: .4em;
  width: 30%;
  border-radius: .4em;
  color: #fff;
  font-size: .8em;
  box-shadow: inset 0 -.2em 0 rgba(0, 0, 0, .1);
  background-color: var(--main-bg-color);
}
.modal-button:hover {
  background-color: #7fdfd4;
}
@media (max-width: 768px) {
  .modal {
    width: 50vw;
    height: 20vh;
  }
}
</style>