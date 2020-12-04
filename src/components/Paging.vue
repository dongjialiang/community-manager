<template>
  <div class="page-code-box">
    <span
      v-if="page > 1"
      class="page-code-button prev-button"
      @click="prevPage()"
    >◀</span>
    <span
      v-for="item in pageSize"
      :key="item"
      class="page-code-button"
      :class="{ 'current-page': page === item }"
      @click="jumpToPage(item)"
    >{{ item }}</span>
    <span
      v-if="page < pageSize"
      class="page-code-button next-button"
      @click="nextPage()"
    >▶</span>
  </div>
</template>
<script>
import { inject } from 'vue'
export default {
  name: 'Paging',
  props: {
    pageSymbol: {
      type: Symbol,
      required: true
    },
    pageSizeSymbol: {
      type: Symbol,
      required: true
    }
  },
  setup(props) {
    const page = inject(props.pageSymbol)
    const pageSize = inject(props.pageSizeSymbol)
    // 上一页
    const prevPage = () => { page.value-- }
    // 下一页
    const nextPage = () => { page.value++ }
    // 跳到当前页码
    const jumpToPage = (currentPage) => { page.value = currentPage }
    return { page, pageSize, prevPage, nextPage, jumpToPage }
  }
}
</script>
<style scoped>
.page-code-box {
  margin: 1em auto;
  display: block;
}
.page-code-button {
  border: solid 1px rgba(226, 232, 240, 1);
  box-shadow: 0.1em 0.1em 0.1em #cdcdcd;
}
.current-page {
  background-color: #ccc;
}
.page-code-button {
  padding: 0.5em 1em;
  font-weight: 500;
  box-sizing: border-box;
  color: rgba(74, 85, 104, 1);
  transition: background-color, border-color, color,
    box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1);
}
.page-code-button:hover {
  color: rgba(226, 232, 240, 0.9);
  border: solid 1px rgba(26, 22, 24, 1);
  background-color: rgba(20, 0, 10, 0.7);
}
.page-code-button:active {
  background-color: rgba(10, 140, 160, 0.7);
  border: solid 1px rgba(26, 232, 240, 1);
}
.prev-button {
  border-radius: 0.5em 0 0 0.5em;
  padding: .5em 1em .5em .8em;
}
.next-button {
  border-radius: 0 0.5em 0.5em 0;
  padding: .5em .8em .5em 1em;
}
</style>
