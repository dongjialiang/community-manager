<template>
  <div class="nav">
    <template
      v-for="link in links"
      :key="link._id"
    >
      <router-link :to="link.addr">
        {{ link.name }}
      </router-link>
    </template>
    <router-link to="signup">
      注册
    </router-link>/
    <router-link to="login">
      登录
    </router-link>
  </div>
</template>

<script>
import { reactive } from 'vue';
export default {
  name: 'Menu',
  setup() {
    const links = [
      {
        name: '首页',
        addr: 'home'
      },
    ]
    // 暴露给模板
    return {
      links
    };
  },
};
</script>

<style scoped>
.nav {
  display: flex;
  height: 3em;
  line-height: 3em;
  font-weight: bold;
  background-color: #7fffd4;
}
a {
  color: #fff;
  flex: 1 0 auto;
  text-decoration: none;
}
@media (max-width: 640px) {
  .nav {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 99;
  }
}
</style>
