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
  box-sizing: border-box;
  right: 3vw;
  line-height: 2em;
  width: 15em;
  background-color: var(--main-bg-color);
  box-shadow: inset 0 -.2em 0 rgba(0, 0, 0, .1);
  filter: drop-shadow(0 0 .5em #333);
  pointer-events: all;
  border-radius: .4em;
  color: #fff;
}
.toast::after {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border: .8em solid;
  transition: all .4s;
}
@media (max-width: 640px) {
  .toast {
    bottom: 8vh;
  }
  .toast::after {
    left: 6.7em;
    bottom: -1.4rem;
    border-color: var(--main-bg-color) transparent transparent;
  }
}
@media (min-width: 641px) {
  .toast {
    top: 8vh;
  }
  .toast::after {
    right: 3em;
    top: -1.4rem;
    border-color: transparent transparent var(--main-bg-color);
  }
}
</style>