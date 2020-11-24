<template>
  <div
    class="page-code-box"
    :class="{
      'all-radius': page > 1 && page < pageSize,
      'right-radius': page === 1,
      'left-radius': page === pageSize,
    }"
  >
    <left
      v-if="page > 1"
      class="prev-button"
      @click="prevPage()"
    />
    <span
      v-for="item in pageSize"
      :key="item"
      class="page-code-button"
      :class="{ 'current-page': page === item }"
      @click="jumpToPage(item)"
    >
      {{ item }}
    </span>
    <right
      v-if="page < pageSize"
      class="next-button"
      @click="nextPage()"
    />
  </div>
</template>
<script>
import { inject } from 'vue'
import { Left, Right } from '@icon-park/vue-next';
export default {
  name: 'Paging',
  components: { Left, Right, },
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
.page-code-box > span {
  vertical-align: top;
  border: solid 1px rgba(226, 232, 240, 1);
  box-shadow: 0.1em 0.1em 0.1em #cdcdcd;
}
.all-radius {
  border-radius: .5em;
}
.left-radius {
  border-radius: .5em 0 0 .5em;
}
.right-radius {
  border-radius: 0 .5em .5em 0;
}
.current-page {
  background-color: #ccc;
}
.page-code-button {
  padding: 0.5em 1em;
  font-weight: 500;
  box-sizing: border-box;
  color: rgba(74, 85, 104, 1);
  font-size: 0.875rem;
  transition: background-color, border-color, color,
    box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1);
}
.prev-button,
.next-button {
  background-color: #fff;
  padding: 0.6em 0.8em 0.45em;
  font-size: 0.875rem;
}
.prev-button {
  border-radius: 0.5em 0 0 0.5em;
}
.next-button {
  border-radius: 0 0.5em 0.5em 0;
}
.page-code-box span:hover,
.page-code-box span:hover {
  color: rgba(226, 232, 240, 0.9);
  background-color: rgba(20, 0, 10, 0.7);
}
.page-code-box span:active,
.page-code-box span:active {
  background-color: rgba(10, 140, 160, 0.7);
  border: solid 1px rgba(26, 232, 240, 1);
}
</style>
