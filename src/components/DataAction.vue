<template>
  <input
    v-if="column?.type === 'bool'"
    type="checkbox"
    :value="item[column.name]"
    :checked="item[column.name]"
    @click="changeListItem(id, column)"
  >

  <template v-else-if="column?.type === 'file'">
    <img
      v-if="item[column.name]"
      class="banner-img"
      :src="item[column.name]"
    >
    <template v-else>
      <input
        type="file"
        name="banner"
      >
      <input
        type="button"
        value="提交"
        @click="uploadImage(id)"
      >
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
      @change="changeListItem(id, column)"
    >{{ option }}
  </template>

  <select
    v-else-if="column?.type === 'select'"
    :value="item[column.name]"
    @input="changeListItem(id, column)"
  >
    <option
      v-for="option in column?.options"
      :key="option"
      :value="option"
    >
      {{ option }}
    </option>
  </select>

  <span
    v-else-if="column.type === 'bool'"
    @input="changeListItem(id, column)"
  >
    {{ item[column.name] }}
  </span>
  <span
    v-else
    contenteditable="plaintext-only"
    @input="changeListItem(id, column)"
  >
    {{ item[column.name] }}
  </span>
</template>

<script>
import { inject } from 'vue'
import Upload from '../services/Upload'
export default {
  name: 'DataAction',
  props: {
    id: {
      type: String,
      default: undefined
    },
    sourceSymbol: {
      type: Symbol,
      required: true
    },
    tempListSymbol: {
      type: Symbol,
      required: true
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
    const source   = inject(props.sourceSymbol)
    const tempList = inject(props.tempListSymbol)
    // 修改列表内容(只影响视图层, 不修改模型层)
    const changeListItem = (id, column, path) => {
      let content;
      const e = event;
      const name = column.name
      const type = column.type
      if (type === 'bool') {
        e.currentTarget.value =
                  e.currentTarget.value === 'true'
                    ? false : true
        content = e.currentTarget.value
      } else if (type === 'file') {
        content = path
      } else if (type === 'select' || type === 'radio') {
        content = e.currentTarget.value
      } else {
        content = e.currentTarget.innerText
      }
      const tempObj = {} // 临时Map对象

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
    // 上传图片
    const uploadImage = async (id) => {
      const formData = new FormData()
      const bannerDom = await document
        .querySelector('input[name=\'banner\']')
      await formData.append('banner', bannerDom.files[0])

      const res = await Upload.imageUpload('image', formData)
      if (res.status === 200) {
        for (const data of source.value.data) {
          if (data._id === id) {
            data.banner = res.data.path
            changeListItem(id, props.column, data.banner)
            break
          }
        }
      }
    }
    return { uploadImage, changeListItem }
  }
}
</script>

<style scoped>
.banner-img {
  max-width: 8em;
}
</style>