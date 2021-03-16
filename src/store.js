import { reactive, readonly } from 'vue'

const state = reactive({
  token: window.localStorage.getItem('token') || '',
  user: window.localStorage.getItem('user') || null,

  toastMsg: '',

  modalMsg: '',
  modalVisible: false,
  modalAction: null
})

export default () => {
  const setToken = (token) => {
    state.token = token
    window.localStorage.setItem('token', token)
  }

  const setUser = (user) => {
    const userString = JSON.stringify(user)
    state.user = userString
    window.localStorage.setItem('user', userString)
  }

  const setToastMsg = (toastMsg) => {
    state.toastMsg = toastMsg
  }

  const setModalMsg = (modalMsg) => {
    state.modalMsg = modalMsg
    state.modalVisible = true
  }

  const setModalAction = (action) => {
    state.modalAction = action
    state.modalVisible = false
  }

  return {
    state: readonly(state),
    setToken,
    setUser,
    setToastMsg,
    setModalMsg,
    setModalAction
  }
}
