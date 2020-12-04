<template>
  <div class="mask">
    <div class="modal">
      {{ msg }}
      <button @click="confirm">
        确定
      </button>
      <button @click="cancel">
        取消
      </button>
    </div>
  </div>
</template>

<script>
import { provide, ref, watchEffect } from 'vue'
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
  background: rgba(250, 250, 250, 1);
  width: 50vw;
  height: 20vh;
  margin: 20vh auto;
  border-radius: .5em;
  padding: 2vh;
}
</style>