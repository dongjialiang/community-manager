<template>
  <div class="toast">
    {{ msg }}
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue'
import createStore from '../store'

const store = createStore()

export default {
  name: 'Toast',
  setup() {
    const msg = ref('')

    watchEffect(() => {
      const toastMsg = store.state.toastMsg
      msg.value = toastMsg
    })

    return { msg }
  }
}
</script>

<style scoped>
.toast {
  position: absolute;
  z-index: 99;
  top: 5em;
  left: calc((100% - 30vw) / 2);
  box-sizing: border-box;
  line-height: 2em;
  width: 30vw;
  background-color: var(--main-bg-color);
  box-shadow: inset 0 -.2em 0 rgba(0, 0, 0, .1);
  pointer-events: all;
  border-radius: .4em;
  color: #fff;
}
</style>