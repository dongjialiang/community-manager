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
  components: {
    Menu,
    Toast,
    Modal,
    SideBar
  },
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
  height: 104%;
}
.box {
  flex: 1 1 80%;
}
@media (min-width: 769px) {
  .sidebar {
    flex: 1 0 20%;
  }
}
@media (max-width: 768px) {
  .sidebar {
    display: none;
  }
}
.custom-scrollbar {
  height: 100vh;
  overflow-y: scroll;
}
.custom-scrollbar::-webkit-scrollbar {
  position: absolute;
  z-index: 8;
  width: .3em;
}
.custom-scrollbar::-webkit-scrollbar-track {
  border-radius: 12px;
  background-color: #fff;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(200, 200, 200, .8);
  border-radius: 12px;
}
</style>
