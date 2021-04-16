<template>
  <button
    class="function-button"
  >
    <input
      id="import-data-btn"
      type="file"
      class="excelFile"
      hidden
      @change="readExcelToData"
    >
    <label
      for="import-data-btn"
    >📥</label>
    <Tip tip="导入表格数据" />
  </button>
  <button
    class="function-button"
    value="导出"
    @click="modalAction(dataToExcel, '导出数据')"
  >
    📤
    <Tip tip="导出表格数据" />
  </button>
</template>

<script>
import { inject } from 'vue'
import Service from '../services/CommonService'
import modal from '../services/modal'
import Tip from './Tip.vue'

export default {
  name: 'ExcelFileButton',
  components: { Tip },
  props: {
    listName: {
      type: String,
      required: true
    },
    columns: {
      type: Array,
      required: true
    },
    listSize: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const ManyData       = inject(Symbol.for('manyDataSymbol'))
    const itemTotal      = inject(Symbol.for('itemTotalSymbol'))
    const createManyItem = inject(Symbol.for('createManyItemSymbol'))

    const modalAction = modal().modalAction

    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'https://cdn.jsdelivr.net/npm/xlsx'
    + '@0.16.9/dist/xlsx.mini.min.js'
    document.body.appendChild(script)

    // 读取Excel表格文件的数据到数据列表中
    const readExcelToData = (event) => {
      const eCurrentTarget = event.currentTarget
      if (eCurrentTarget.value !== '') {
        const file = eCurrentTarget.files[0];

        ManyData.value = []

        const fileReader = new FileReader();

        fileReader.onload = (ev) => {
          // 获取二进制串数据
          const data = ev.currentTarget.result
          // 读取文件
          const workbook = XLSX.read(data, { type: 'binary' })
          const sheetLength = workbook.SheetNames.length

          for (let index = 0; index < sheetLength; index++) {
            const sheetName = workbook.SheetNames[index];
            const sheet = XLSX.utils.sheet_to_json(
              workbook.Sheets[sheetName])
            ManyData.value.push(...sheet)
          }
        }
        fileReader.onloadend = () => {
          modalAction(createManyItem, '导入文件数据')
          document.querySelector('.excelFile').value = ''
        }
        fileReader.readAsBinaryString(file)
      }
    }
    // 导出数据到Excel表格文件
    const dataToExcel = async () => {
      const headers = [
        ...props.columns.map((v) => v.name),
        'updatedAt']
      const result_filed = {}
      for (const key of headers) {
        result_filed[key] = 1
      }
      const res = await Service.getAllService(
        props.listName, '{}', 1, itemTotal.value + props.listSize,
        JSON.stringify(result_filed))

      const workbook = XLSX.utils.book_new() // 创建工作簿
      const cmnDateFormat = Intl.DateTimeFormat('cmn-Hans-CN') // 创建日期格式对象
      const resultDataArr = res.data.data // 获取结果数组
      const tempWorkBook = {} // 临时工作簿
      resultDataArr.map((exportData) => { // 遍历所有信息
        const sheetName = cmnDateFormat.format(
          Date.parse(exportData['updatedAt'])
        ).replaceAll('/', '-') // 根据最后更新时间创建工作表名(具体到天)
        delete exportData['updatedAt'] // 删除最后更新时间属性
        if (tempWorkBook[sheetName] === undefined) { // 如果临时工作表不存在
          tempWorkBook[sheetName] = [] // 创建临时工作表
        }
        delete exportData._id
        tempWorkBook[sheetName].push(exportData) // 存入表格数组
      })
      for (const key in tempWorkBook) { // 遍历临时工作簿的表名
        let worksheet; // 存放工作表的变量
        if (tempWorkBook.hasOwnProperty(key)) { // 如果有表名
          const resultArr = tempWorkBook[key] // 表格数组
          worksheet = XLSX.utils.json_to_sheet(resultArr) // 转为工作表
        }
        XLSX.utils.book_append_sheet(workbook, worksheet, key) // 把工作表添加入工作簿中
      }

      const timeFile = Intl.DateTimeFormat('cmn-Hans-CN', {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric',
        hour12: false
      }).format(Date.now()) // 根据当前时间创建Excel表名(精确到秒)

      XLSX.writeFile(workbook, `${timeFile}.xlsx`, { // 生成Excel表格
        bookSST: false,
        type: 'base64'
      })
    }
    return { readExcelToData, dataToExcel, modalAction }
  }
}
</script>

<style scoped>
.function-button {
  font-size: 1.4em;
  position: relative;
  margin: 0;
  line-height: 1em;
  background-color: transparent;
  font-weight: bold;
  border-radius: 50%;
}
</style>