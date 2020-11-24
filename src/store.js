import { ref, readonly } from 'vue'

const state = ref({
  token: window.localStorage.getItem('token') || '',
  user: window.localStorage.getItem('user') || null
})

export default () => {
  const setToken = (token) => {
    state.value.token = token
    window.localStorage.setItem('token', token)
  }

  const setUser = (user) => {
    state.value.user = user
    window.localStorage.setItem('user', user)
  }

  return {
    state: readonly(state),
    setToken,
    setUser
  }
}
