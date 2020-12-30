<template>
  <div class="sidebar">
    <router-link
      v-for="(item, index) in side_bar_list"
      :key="index"
      :to="item.link"
      class="sidebar-link"
    >
      {{ item.name }}
    </router-link>
  </div>
</template>

<script>
import { ref } from 'vue'
import ViewFn from '../services/getViewFnList'

export default {
  name: 'SideBar',
  setup() {
    const side_bar_list = ref([])
    const getSideBarList = async () => {
      const result = await ViewFn.getViewFnList('all')
      for (const [key, data] of Object.entries(result.data.data)) {
        side_bar_list.value.push({ link: key, name: data.name })
      }
    }
    getSideBarList()

    return { side_bar_list }
  }
}
</script>

<style scoped>
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
a {
  color: #000;
  text-decoration: none;
  display: block;
  line-height: 2.3em;
  padding: 0 0 0 .8em;
  text-align: left;
}
a:hover {
  padding: 0;
  color: rgb(58, 143, 133);
  border-left: .3rem solid #fff;
}
.sidebar-link {
  border-left: .3rem solid rgb(1, 148, 128);
}
.router-link-active {
  color: var(--main-bg-color);
  border-left: .3rem solid var(--main-bg-color);
}
</style>