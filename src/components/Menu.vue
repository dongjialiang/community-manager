<template>
  <div class="nav">
    <div
      v-for="link in links"
      :key="link._id"
      class="nav-list"
    >
      <router-link :to="link.addr">
        {{ link.name }}
      </router-link>
    </div>
    <div class="user">
      <template v-if="user?.admin === undefined">
        <router-link to="signup">
          注册
        </router-link>/
        <router-link to="login">
          登录
        </router-link>
      </template>
      <template v-else>
        <b>🐱‍👤</b>
        <div class="set">
          <p>{{ user.admin }}</p>
          <button
            class="logout"
            @click="logout"
          >
            退出
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue'
import createStore from '../store'
export default {
  name: 'Menu',
  setup() {
    const links = [
      {
        name: '首页',
        addr: 'home'
      },
    ]
    const user = ref({})
    const store = createStore()
    const logout = () => {
      store.setToken(null)
      store.setUser(null)
    }
    watchEffect(() => {
      const storeUser = store.state.user
      if (typeof storeUser === 'string') {
        user.value = JSON.parse(storeUser)
      }
    })
    // 暴露给模板
    return {
      links,
      user,
      logout
    };
  },
};
</script>

<style scoped>
.nav {
  display: flex;
  line-height: 3em;
  font-weight: bold;
  background-color: var(--main-bg-color);
}
a {
  color: #fff;
  text-decoration: none;
}
.user {
  position: relative;
}
.set {
  position: absolute;
  background-color: #fff;
  z-index: 50;
  left: calc((100% - 5em) / 2);
  top: 2.5rem;
  width: 5em;
  display: none;
  border-radius: .3rem;
  border: 1px solid #000;
}
.set > p,
.set > button {
  font-size: .7em;
  line-height: 1.4em;
  margin: 0;
  padding: 0.3em 0;
}
.set > p {
  border-bottom: 1px solid #000;
}
.logout {
  background: transparent;
  border: 0;
  display: block;
  width: 100%;
}
@media (min-width: 641px) {
  .nav > .nav-list {
    text-align: left;
    padding: 0 0 0 .8em;
    font-size: 1.4em;
    font-weight: bold;
    flex: .8 0 auto;
  }
  .user {
    flex: .2 0 auto;
  }
  .user:hover .set {
    display: block;
  }
}
@media (max-width: 640px) {
  .nav {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 99;
  }
  .nav-list,
  .user {
    flex: 1 0 auto;
  }
}
</style>
