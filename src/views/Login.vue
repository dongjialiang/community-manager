<template>
  <div>
    <input
      v-model="admin"
      class="admin"
      type="text"
      placeholder="输入管理员账户名"
      autofocus
    >
    <input
      v-model="pwd"
      class="pwd"
      type="password"
      placeholder="输入密码"
    >
    <button
      class="submit"
      @click="modalAction(submit, '登录')"
    >
      登录
    </button>
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router'
import createStore from '../store'
import Admin from '../services/Admin'
import modal from '../services/modal'
export default {
  name: 'Login',
  setup() {
    const admin = ref('')
    const pwd = ref('')

    const router = useRouter()
    const store = createStore()

    const modalAction = modal().modalAction

    const submit = async () => {
      const res = await Admin.login(
        { admin: admin.value, pwd: pwd.value })

      if (res?.status === 200) {
        const data = res.data
        store.setToken(data.token)
        store.setUser(data.body)

        router.push('home')
      }
    }

    return { admin, pwd, submit, modalAction }
  },
};
</script>
<style scoped>
.admin,
.pwd {
  display: block;
  width: 14em;
  line-height: 1.4em;
  margin: 0.5em auto;
  font-size: 1.2em;
  font-weight: 500;
  outline: none;
  border-width: 0 0 1px;
}
.submit {
  margin: 0.5em auto;
  width: 16em;
  line-height: 2em;
  font-size: 1.2em;
  color: #fff;
  border-radius: 0.3em;
  box-shadow: 0.1em 0.1em 0.2em #ccc;
  font-weight: 500;
  background: mediumpurple;
  outline: none;
  border: none;
  transition: color padding box-shadow cubic-bezier(0.445, 0.05, 0.55, 0.95)
    0.3s;
}
.submit:active {
  padding: 0.1em 0 0;
  color: #eee;
  box-shadow: inset 0.1em 0.1em 0.1em #ccc;
}
</style>
