<template>
  <input
    v-if="column?.type === 'bool'"
    type="checkbox"
    class="checkbox"
    :value="item[column.name]"
    :checked="item[column.name]"
    @click="changeListItem($event, id, column, item)"
  >

  <template v-else-if="column?.type === 'file'">
    <img
      v-if="item[column.name] !== undefined"
      class="banner-img"
      :src="item[column.name].startsWith('http')
        ? item[column.name] : baseURL + item[column.name]"
    >
    <template v-else>
      <input
        :id="`banner-${id}`"
        type="file"
        name="banner"
        hidden
        @change="modalAction(uploadImage, '上传海报', id)"
      >
      <label
        class="banner"
        :for="`banner-${id}`"
      >上传🖼海报</label>
    </template>
  </template>

  <template
    v-for="option in column?.options"
    v-else-if="column?.type === 'radio'"
    :key="option"
  >
    <input
      type="radio"
      :name="`radio${item._id || 'new'}`"
      :value="option"
      :checked="item[column.name] === option"
      @change="changeListItem($event, id, column, item)"
    >{{ option }}
  </template>

  <select
    v-else-if="column?.type === 'select'"
    :value="item[column.name]"
    @input="changeListItem($event, id, column, item)"
  >
    <option
      v-for="option in column?.options"
      :key="option"
      :value="option"
    >
      {{ option }}
    </option>
  </select>

  <div
    v-else-if="column.type === 'array'"
    class="array-item"
  >
    <div class="array-item-title">
      <i>查询一个</i><i>查询所有</i><i>创建一个</i><i>创建多个</i>
      <i>更新一个</i><i>删除一个</i><i>删除多个</i>
    </div>
    <div
      v-for="(authNum, authKey) in item[column.name]"
      :key="authKey"
      class="array-item-body"
    >
      <span class="array-item-name">{{ authNameArr[authKey] }}</span>
      <div
        v-for="(authVal, index) in getAuthArr(authNum)"
        :key="index"
        class="array-item-value"
      >
        <input
          type="checkbox"
          :value="authVal"
          :checked="authVal === (2 ** index)"
          @click="changeListItem($event, id, column, item, authKey, 2 ** index)"
        >
      </div>
    </div>
  </div>

  <span
    v-else-if="column.type === 'bool'"
    @input="changeListItem($event, id, column, item)"
  >
    {{ item[column.name] }}
  </span>
  <span
    v-else
    contenteditable="true"
    @input="changeListItem($event, id, column, item)"
  >
    {{ item[column.name] }}
  </span>
</template>

<script>
import { inject } from 'vue'
import modal from '../services/modal'
import Upload from '../services/Upload'

export default {
  name: 'DataAction',
  props: {
    id: {
      type: String,
      default: undefined
    },
    column: {
      type: Object,
      required: true
    },
    item: {
      type: Object,
      required: true
    },
  },
  setup(props) {
    const source   = inject(Symbol.for('sourceSymbol'))
    const tempList = inject(Symbol.for('tempListSymbol'))
    const baseURL = import.meta.env.VITE_BASE_URL
    const authNameArr = {
      usermanager: '用户',
      userPrefill: '用户预填信息',
      park: '停车',
      complaint: '投诉',
      repair: '报修',
      register: '出入登记',
      propertyNotice: '物业通知',
      businessActivity: '商铺活动',
      lifeService: '生活服务',
    }

    const modalAction = modal().modalAction

    // 修改列表内容(只影响视图层, 不修改模型层)
    const changeListItem = (e, id, column, item, path, fixAuthNum) => {
      let content;
      const { name, type } = column
      if (type === 'bool') {
        e.currentTarget.value = !(e.currentTarget.value === 'true')
        content = e.currentTarget.value
      } else if (type === 'file') {
        content = path
      } else if (type === 'select' || type === 'radio') {
        content = e.currentTarget.value
      } else if (type === 'array') {
        const eNum = Number(e.currentTarget.value)
        let tempListVal = tempList.value[id]
        const authList = tempListVal !== undefined
          && Object.prototype.hasOwnProperty.call(tempListVal, name)
          ? tempListVal[name]
          : { ...item[name] }
        const newNum = e.currentTarget.checked ? fixAuthNum : -eNum
        authList[path] = authList[path] + newNum
        content = authList
      } else {
        content = e.currentTarget.innerText
      }
      const tempObj = {} // 临时对象

      const itemIsNone = item[name] === undefined

      if ((content === '' && itemIsNone)
        || (tempList.value[id] !== undefined
        && compare(content, item[name]))) {
        delete tempList.value[id][name]
      } else {
        tempObj[name] = content
        if (tempList.value[id]) {
          tempList.value[id] = {
            ...tempList.value[id],
            ...tempObj
          }
        } else {
          tempList.value[id] = tempObj
        }
      }
    }
    // 上传图片
    const uploadImage = async (id) => {
      const formData = new FormData()
      const bannerDom = await document
        .querySelector(`input[id='banner-${id}']`)
      await formData.append('banner', bannerDom.files[0])

      const res = await Upload.imageUpload('image', formData)
      if (res.status === 200) {
        for (const data of source.value.data) {
          if (data._id === id) {
            data.banner = res.data.path
            changeListItem(e, id, props.column, data, data.banner)
            break
          }
        }
      }
    }

    const compare = (first, second) => {
      if (typeof first === 'object' && typeof second === 'object') {
        return JSON.stringify(first) === JSON.stringify(second)
      } else {
        return first === second
      }
    }

    const getAuthArr = (authNum) => {
      const authArr = []
      let n = 64
      while (n > 0) {
        if (authNum >= n) {
          authNum -= n
          authArr.unshift(n)
        } else {
          authArr.unshift(0)
        }
        n = n / 2 | 0
      }
      return authArr
    }
    return {
      uploadImage, changeListItem, modalAction,
      getAuthArr, authNameArr, baseURL
    }
  }
}
</script>

<style scoped>
.banner-img {
  width: 80%;
  margin: 0 auto;
}
.banner {
  border: 1px dotted #000;
  display: block;
  box-sizing: content-box;
  width: 100%;
  height: 3em;
  line-height: 3em;
  font-size: .8rem;
}
.checkbox {
  display: block;
  width: 100%;
  margin: 0;
}
.checkbox::before {
  display: block;
  width: 100%;
  height: 100%;
}
.array-item {
  width: 14em;
}
.array-item-title {
  text-align: right;
}
.array-item-title > i {
  writing-mode: vertical-lr;
  font-size: .4em;
  width: 3.2em;
}
.array-item-body {
  font-size: .7rem;
}
.array-item-name,
.array-item-value {
  display: inline-block;
}
.array-item-name {
  min-width: 7.5em;
}
.array-item-value {
  width: 1.7em;
}
</style>