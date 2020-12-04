<template>
  <div
    class="list"
    :style="{ 'grid-template-columns': `repeat(${columns.length + 2}, 1fr)` }"
  >
    <div class="list-head">
      选择
    </div>
    <div
      v-for="column in columns"
      :key="column"
      class="list-head"
    >
      {{ column.cn_name }}<Tip :tip="column.tip" />
    </div>
    <div class="list-head">
      操作
    </div>
    <template
      v-for="item in source?.data"
      :key="item._id"
    >
      <div class="list-body">
        <input
          v-model="checkList"
          type="checkbox"
          :value="item._id"
        >
      </div>
      <div
        v-for="column in columns"
        :key="column"
        class="list-body"
        @paste="pasteExcelToData"
      >
        <DataAction
          :id="item._id"
          :column="column"
          :source-symbol="sourceSymbol"
          :item="item"
          :temp-list-symbol="tempListSymbol"
        />
      </div>
      <div class="list-body">
        <span
          v-if="item._id"
          @click="modalAction(updateList, '更新', item)"
        >更新</span>
        <span
          v-else
          @click="modalAction(createItem, '创建', item)"
        >创建</span>
      </div>
    </template>
  </div>

  <input
    type="checkbox"
    :checked="allChecked"
    @click="allCheck"
  >全选
  <button
    class="function-button"
    @click="createOneList"
  >
    +<Tip tip="创建一行新数据" />
  </button>
  <button
    class="function-button"
    @click="modalAction(deleteList, '删除')"
  >
    🗑<Tip tip="删除选中数据" />
  </button>

  <ExcelFileButton
    :item-total-symbol="itemTotalSymbol"
    :list-name="listName"
    :many-data-symbol="manyDataSymbol"
    :columns="columns"
    :create-many-item-symbol="createManyItemSymbol"
    :list-size="listSize"
  />

  <Paging
    :page-symbol="pageSymbol"
    :page-size-symbol="pageSizeSymbol"
  />
</template>

<script>
import { computed, onMounted, provide,
  ref, watch, watchEffect } from 'vue'

import Service from '../services/CommonService'
import modal from '../services/modal'
import Paging from './Paging.vue'
import Tip from './Tip.vue'
import DataAction from './DataAction.vue'
import ExcelFileButton from './ExcelFileButton.vue'
export default {
  name: 'DataList',
  components: { Paging, Tip, DataAction, ExcelFileButton },
  props: {
    columns: {
      type: Array,
      required: true
    },
    listName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const source      = ref({})     // 数据列表获取的资源
    const listSize    = 24          // 列表最大长度
    const allChecked  = ref(false)  // 默认全部不选中
    const checkList   = ref([])     // 选择列表
    const page        = ref(1)      // 列表的当前页数(分页需要)
    const pageSize    = ref(1)      // 总页数
    const manyData    = ref([])     // 存储多行数据(用于创建数据)
    const tempList    = ref({})     // 临时的修改数据存储列表
    const newDataFlag = ref(false)  // 用于新增数据的标识
    const itemTotal   = ref(0)      // 用于记录当前数据总数

    const sourceSymbol         = Symbol()
    const pageSymbol           = Symbol()
    const pageSizeSymbol       = Symbol()
    const itemTotalSymbol      = Symbol()
    const manyDataSymbol       = Symbol()
    const tempListSymbol       = Symbol()
    const createManyItemSymbol = Symbol()

    provide(sourceSymbol, source)
    provide(pageSymbol, page)
    provide(pageSizeSymbol, pageSize)
    provide(itemTotalSymbol, itemTotal)
    provide(manyDataSymbol, manyData)
    provide(tempListSymbol, tempList)

    const modalAction = modal().modalAction

    const getAllService = async () => {
      const result = await Service.getAllService(
        props.listName, '{}', page.value, listSize)
      source.value = result.data
      if (newDataFlag.value) {
        source.value.data.push({})
        newDataFlag.value = false
      }

      itemTotal.value = result.data.total
      pageSize.value = Math.ceil(itemTotal.value / listSize) || 1
    }
    // 在挂载时请求数据
    onMounted(getAllService);

    // 全选函数
    const allCheck = () => {
      if (allChecked.value) {
        checkList.value = [];
      } else {
        checkList.value = [];
        for (const data of source.value?.data) {
          checkList.value.push(data._id);
        }
      }
    };
    // 观察列表是否全部选中
    watch(checkList, () => {
      if (checkList.value.length !== source.value?.data.length) {
        allChecked.value = false
      } else {
        allChecked.value = true
      }
    })
    // 观察页数变化
    watch(page, () => {
      getAllService()
      checkList.value = []
      tempList.value = {}
    })
    // 观察整个列表的内容长度变化
    watchEffect(() => {
      const sourceLength = source.value?.data?.length
      const pageValue = page.value

      if (sourceLength === 0 && pageValue !== 1) {
        page.value--
      } else if (sourceLength > 24 && pageValue <= pageSize.value) {
        page.value = pageValue < pageSize.value
          ? pageSize.value : pageSize.value + 1
      } else if (sourceLength < 24 && pageValue < pageSize.value) {
        getAllService()
      }
    })
    // 更新列表内容的函数(发送更改请求, 会影响模型层)
    const updateList = async (item) => {
      const e = event
      // 阻止事件默认动作和冒泡
      e.preventDefault()
      const query = JSON.stringify({ _id: item._id })
      const requestBody = tempList.value[item._id]
      const requestBodyKeyLen = Object.keys(requestBody).length
      if (requestBody !== undefined && requestBodyKeyLen !== 0) {
        const res =
          await Service.updateService(props.listName, query, requestBody)
        const resData = res.data
        const sourceData = source.value.data
        const sourceDataLen = sourceData.length
        for (let index = 0; index < sourceDataLen; index++) {
          if (sourceData[index]._id === resData._id) {
            sourceData[index] = resData
          }
        }
        tempList.value = {}
      }
    }
    // 根据选中列表删除数据(影响模型层和视图层)
    const deleteList = async () => {
      const e = event
      // 阻止事件默认动作和冒泡
      e.preventDefault()
      const res = await Service.deleteManyService(
        props.listName,
        JSON.stringify({ _id: { $in: checkList.value } }))
      if (res.status === 200) {
        let idKey = checkList.value.length - 1
        while (idKey >= 0) {
          const sourceData = source.value.data
          source.value.data = sourceData.filter(
            ({ _id }) => _id !== checkList.value[idKey])
          checkList.value.splice(idKey--, 1)
        }

        allChecked.value = false
      }
    }
    // 创建数据(影响模型层和视图层)
    const createItem = async (item) => {
      const e = event
      // 阻止事件默认动作和冒泡
      e.preventDefault()
      const requestBody = tempList.value[item._id]
      const res = await Service.createOneService(
        props.listName, requestBody)

      newDataFlag.value = false
      source.value.data.pop()
      source.value.data.push(res.data)

      delete tempList.value[item._id]
    }
    // 创建一行(只影响视图层)
    const createOneList = () => {
      const e = event
      // 阻止事件默认动作和冒泡
      e.preventDefault()
      if (newDataFlag.value !== true) {
        newDataFlag.value = true
        source.value?.data.push({})
      }
    }
    // 创建多条数据
    const createManyItem = async () => {
      const res = await Service.createManyService(
        props.listName, manyData.value)

      source.value.data = source.value.data.concat(res.data)
    }

    provide(createManyItemSymbol, createManyItem)

    // 黏贴Excel表格的数据到数据列表里
    const pasteExcelToData = async () => {
      const e = event
      // 阻止事件默认动作(这里是黏贴事件)和冒泡
      e.preventDefault()

      const html = e.clipboardData.getData('text/html')
      const dom = new DOMParser().parseFromString(html, 'text/html')
      const trs = Array.from(dom.querySelectorAll('table tr'))
      const results = []
      for (const tr of trs) {
        const result = {}
        let index = 0
        const columns = props.columns
        for (const column of columns) {
          result[column.name] = tr.querySelectorAll('td')
            .item(index++)?.innerText
        }
        results.push(result)
      }

      manyData.value = results
      createManyItem()
    }

    return {
      source,listSize, // 数据需要的属性
      sourceSymbol, pageSymbol, pageSizeSymbol, // Symbol1
      itemTotalSymbol, createManyItemSymbol, // Symbol2
      manyDataSymbol, tempListSymbol, // Symbol3
      allChecked, allCheck, checkList, // 选中
      updateList, deleteList, // 删改
      createItem, createOneList, // 增
      pasteExcelToData, // 和Excel文件以及剪贴板的操作
      modalAction
    };
  },
};
</script>

<style scoped>
.list {
  display: grid;
}
.list-head {
  background-color: mediumaquamarine;
  line-height: 2em;
  position: relative;
  border-right: 1px #ccc solid;
}
.list-body,
.list-body span {
  line-height: 1.6em;
  outline: none;
}
.function-button {
  font-size: 1.4em;
  position: relative;
  margin: 0;
  line-height: 1em;
  background-color: transparent;
  outline: none;
  border: 0;
}
</style>
