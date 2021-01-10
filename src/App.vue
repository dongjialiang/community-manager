<template>
  <div class="custom-scrollbar">
    <Menu />
    <div class="container">
      <router-view />
      <SideBar />
    </div>
    <Toast v-show="toastVisible" />
    <Modal v-show="modalVisible" />
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue'
import Menu from './components/Menu.vue'
import Toast from './components/Toast.vue'
import Modal from './components/Modal.vue'
import SideBar from './components/SideBar.vue'
import createStore from './store';

const store = createStore()

export default {
  name: 'App',
  setup() {
    const toastVisible = ref(false)
    const modalVisible = ref(false)
    const toastMsg = ref('')

    watchEffect(() => {
      toastMsg.value = store.state.toastMsg
      modalVisible.value = store.state.modalVisible
      toastVisible.value = toastMsg.value !== '' ? true : false
    })
    return { toastVisible, modalVisible }
  }
};
</script>

<style scoped>
.container {
  display: flex;
}
@media (min-width: 641px) {
  .container {
    margin: 3rem 0;
  }
}
@media (max-width: 640px) {
  .container {
    margin: 0 0 3rem;
  }
}
.box {
  flex: 1 1 80%;
}
.custom-scrollbar {
  height: 100vh;
  overflow-y: scroll;
}
.custom-scrollbar::-webkit-scrollbar {
  z-index: 8;
  width: .3em;
}
.custom-scrollbar::-webkit-scrollbar-track {
  border-radius: 12px;
  background-color: var(--main-bg-color);
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(20, 20, 20, .8);
  border-radius: 12px;
}
</style>
