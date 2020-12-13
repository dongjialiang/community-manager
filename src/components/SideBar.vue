<template>
  <div class="sidebar">
    <div
      v-for="(item, index) in manager_list"
      :key="index"
    >
      <router-link :to="item.link">
        {{ item.name }}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SideBar',
  setup() {
    const manager_list = [
      {
        name: '管理用户信息',
        link: 'user',
      },
      {
        name: '管理商铺活动信息',
        link: 'businessActivity',
      },
      {
        name: '管理物业通知',
        link: 'propertyNotice',
      },
      {
        name: '管理生活服务',
        link: 'lifeService',
      },
      {
        name: '管理出入登记信息',
        link: 'register',
      },
      {
        name: '管理投诉',
        link: 'complaint',
      },
      {
        name: '管理报修',
        link: 'repair',
      },
      {
        name: '管理停车信息',
        link: 'park',
      }
    ]

    return { manager_list }
  }
}
</script>

<style scoped>
.sidebar {
  background-color: rgb(127, 223, 212);
  height: 100%;
}
a {
  color: #fff;
  text-decoration: none;
  display: block;
  line-height: 2.3em;
  padding: 0 0 0 .8em;
  text-align: left;
  border-bottom: 1px solid #fff;
}
a:hover {
  background-color: var(--main-bg-color);
}
</style>