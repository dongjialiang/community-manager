<template>
  <div class="box">
    <div
      v-for="(item, index) in manager_list"
      :key="index"
      :class="`function ${homeList[index % 3]}`"
      :style="`top: ${6 - (index % 3 === 1 ? 5 : 0) + (index / 3 | 0) * 16}em`"
    >
      <h3>{{ item.subject }}</h3>
      <p>
        <b>{{ item.subject }}</b>
        {{ item.text }}
      </p>
      <router-link :to="item.link">
        {{ item.name }}
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import ViewFn from '../services/getViewFnList'
export default {
  name: 'Home',
  setup() {
    const manager_list = ref([])
    const getManagerList = async () => {
      const result = await ViewFn.getViewFnList('all')
      for (const [key, data] of Object.entries(result.data.data)) {
        data.link = key
        manager_list.value.push(data)
      }
    }
    getManagerList()

    const homeList = ['left', 'middle', 'right']
    return { manager_list, homeList }
  },
};
</script>

<style scoped>
.box {
  display: grid;
  position: relative;
}
.function {
  position: absolute;
  margin: 0 auto;
  text-align: center;
  width: 25vw;
  transition: width 0.7s ease-out;
}
.function > p {
  font-size: .9rem;
  text-align: left;
}
.function > a {
  display: inline-block;
  height: 1.4em;
  padding: .4em .6em;
  border-radius: .3em;
  font-size: .9em;
  color: #fff;
  background-color: var(--main-bg-color);
  line-height: 1.4em;
  text-decoration: none;
  box-shadow: inset 0 -.2em 0 rgba(0, 0, 0, .15);
}
.function > a:hover {
  background-color: #7fdfd4;
}
.left {
  left: 1em;
}
.middle
{
  left: calc((100% - 25vw) / 2);
}
.right
{
  right: 1em;
}

@media (max-width: 640px) {
  .box {
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(8, 12em);
  }
  .function {
    position: initial;
    width: 100%;
    text-align: center;
  }
  .function > p {
    margin: 0 auto;
    width: 80vw;
    font-size: 1em;
  }
}
</style>
