<template>
  <div class="box">
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
        {{ column.cn_name }}
        <Tip :tip="column.tip" />
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
        >
          <!-- @paste="pasteExcelToData" -->
          <DataAction
            :id="item._id"
            :column="column"
            :item="item"
          />
        </div>
        <div class="list-body">
          <span
            v-if="item._id"
            @click.prevent="modalAction(updateList, '更新', item)"
          >更新</span>
          <span
            v-else
            @click.prevent="modalAction(createItem, '创建', item)"
          >创建</span>
        </div>
      </template>
    </div>

    <div class="tool">
      <input
        type="checkbox"
        :checked="allChecked"
        @click.prevent="allCheck"
      >全选
      <button
        class="function-button"
        @click.prevent="createOneList"
      >
        +<Tip tip="创建一行新数据" />
      </button>
      <button
        class="function-button"
        @click.prevent="modalAction(deleteList, '删除')"
      >
        🗑<Tip tip="删除选中数据" />
      </button>
      <ExcelFileButton
        :list-name="listName"
        :columns="columns"
        :list-size="listSize"
      />
      <button
        class="function-button"
        @click.prevent="changeSortIndex(-1)"
      >
        ↓<Tip tip="逆序查找信息" />
      </button>
      <button
        class="function-button"
        @click.prevent="changeSortIndex(1)"
      >
        ↑<Tip tip="正序查找信息" />
      </button>
    </div>

    <Paging />
  </div>
</template>

<script>
import { computed, provide, ref, watch, watchEffect } from 'vue'

import Service from '../services/CommonService'
import modal from '../services/modal'

import Paging from './Paging.vue'
import Tip from './Tip.vue'
import DataAction from './DataAction.vue'
import ExcelFileButton from './ExcelFileButton.vue'

export default {
  name: 'DataList',
  components: {
    Paging,
    Tip,
    DataAction,
    ExcelFileButton
  },
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
    let   sort_index  = 1
    const sourceLength = computed(() => source.value?.data?.length)

    provide(Symbol.for('sourceSymbol'), source)
    provide(Symbol.for('pageSymbol'), page)
    provide(Symbol.for('pageSizeSymbol'), pageSize)
    provide(Symbol.for('itemTotalSymbol'), itemTotal)
    provide(Symbol.for('manyDataSymbol'), manyData)
    provide(Symbol.for('tempListSymbol'), tempList)

    const modalAction = modal().modalAction

    const getAllService = async () => {
      const result = await Service.getAllService(
        props.listName, '{}', page.value, listSize,
        '{}', { sort_index })
      source.value.data = result?.data.data || []
      itemTotal.value = result.data.total
      pageSize.value = Math.ceil(itemTotal.value / listSize) || 1
      if (newDataFlag.value) {
        newDataFlag.value = false
        if (sourceLength.value > 0 && sourceLength.value < listSize) {
          source.value.data.push({})
        }
      }
    }
    getAllService() // 请求数据
    watch(() => props.listName, () => {
      checkList.value = []
      tempList.value = {}
      getAllService()
    })

    // 全选函数
    const allCheck = () => {
      if (allChecked.value) {
        return checkList.value = [];
      }
      checkList.value = [];
      for (const data of source.value?.data) {
        checkList.value.push(data._id);
      }
    }
    const changeCheckList = () => {
      if (checkList.value?.length < sourceLength.value
        || sourceLength.value === 0) {
        return allChecked.value = false
      }
      allChecked.value = true
    }
    // 观察列表是否全部选中
    watch(checkList, changeCheckList)
    // 观察页数变化
    watch(page, () => {
      getAllService()
      checkList.value = []
      tempList.value = {}
    })
    // 观察整个列表的内容长度变化
    watchEffect(() => {
      const pageValue = page.value

      if (sourceLength.value === 0 && pageValue !== 1) {
        page.value--
      } else if (sourceLength.value > listSize && pageValue <= pageSize.value) {
        pageSize.value += (pageValue === pageSize.value)
        page.value = pageSize.value
      } else if (sourceLength.value < listSize && pageValue < pageSize.value) {
        getAllService()
      }
    })
    // 更新列表内容的函数(发送更改请求, 会影响模型层)
    const updateList = async (item) => {
      const query = JSON.stringify({ _id: item._id })
      const requestBody = tempList.value[item._id]
      if (requestBody === undefined) {
        return false;
      }
      const requestBodyKeyLen = Object.keys(requestBody).length
      if (requestBodyKeyLen === 0) {
        return false;
      }
      const res = await Service
        .updateService(props.listName, query, requestBody)
      const resData = res.data
      const sourceData = source.value.data
      for (let index = 0; index < sourceLength.value; index++) {
        if (sourceData[index]._id === resData._id) {
          sourceData[index] = resData
        }
      }
      tempList.value = {}
    }
    // 根据选中列表删除数据(影响模型层和视图层)
    const deleteList = async () => {
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

    provide(Symbol.for('createManyItemSymbol'), createManyItem)

    // 黏贴Excel表格的数据到数据列表里
    // const pasteExcelToData = async () => {
    //   const html = e.clipboardData.getData('text/html')
    //   const dom = new DOMParser().parseFromString(html, 'text/html')
    //   const trs = Array.from(dom.querySelectorAll('table tr'))
    //   const results = []
    //   for (const tr of trs) {
    //     const result = {}
    //     let tdIndex = 0
    //     const columns = props.columns
    //     for (const column of columns) {
    //       result[column.name] = tr.querySelectorAll('td')
    //         .item(tdIndex++)?.innerText
    //     }
    //     results.push(result)
    //   }

    //   manyData.value = results
    //   createManyItem()
    // }
    const changeSortIndex = (new_sort_index) => {
      sort_index = new_sort_index
      getAllService()
    };

    return {
      source,listSize, // 数据需要的属性
      allChecked, allCheck, checkList, // 选中
      updateList, deleteList, // 删改
      createItem, createOneList, // 增
      // pasteExcelToData, // 和Excel文件以及剪贴板的操作
      modalAction,
      changeSortIndex
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
.list-body {
  display: flex;
  align-items: center;
  justify-items: center;
  border: 1px solid #eee;
}
.list-body > span {
  display: block;
  overflow-wrap: break-word;
  outline: none;
  max-width: 13em;
}
.list-body > span,
.list-body > input,
.list-body > select {
  font-size: .8rem;
  flex: 1 1 auto;
}
.function-button {
  font-size: 1.4em;
  position: relative;
  margin: 0 .2rem;
  line-height: 1.4em;
  background-color: var(--main-bg-color);
  font-weight: bold;
  box-shadow: inset 0 -.1em 0 rgba(0, 0, 0, .1);
  border-radius: 50%;
  color: #fff;
}
.tool {
  margin: .5rem 0;
}
</style>
