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
    >📥<Tip tip="导入表单数据" /></label>
  </button>
  <button
    class="function-button"
    value="导出"
    @click="modalAction(dataToExcel, '导出数据')"
  >
    📤<Tip tip="导出表单数据" />
  </button>
</template>

<script>
import { inject } from 'vue'
import Xlsx from 'xlsx'
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
    itemTotalSymbol: {
      type: Symbol,
      required: true
    },
    manyDataSymbol: {
      type: Symbol,
      required: true
    },
    createManyItemSymbol: {
      type: Symbol,
      required: true
    },
    listSize: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const ManyData = inject(props.manyDataSymbol)
    const itemTotal = inject(props.itemTotalSymbol)
    const createManyItem = inject(props.createManyItemSymbol)

    const modalAction = modal().modalAction

    // 读取Excel表格文件的数据到数据列表中
    const readExcelToData = () => {
      const eCurrentTarget = event.currentTarget
      if (eCurrentTarget.value !== '') {
        const file = eCurrentTarget.files[0];

        ManyData.value = []

        const fileReader = new FileReader();

        fileReader.onload = (ev) => {
          // 获取二进制串数据
          const data = ev.currentTarget.result
          // 读取文件
          const workbook = Xlsx.read(data, { type: 'binary' })
          const sheetLength = workbook.SheetNames.length

          for (let index = 0; index < sheetLength; index++) {
            const sheetName = workbook.SheetNames[index];
            const sheet = Xlsx.utils.sheet_to_json(
              workbook.Sheets[sheetName])
            ManyData.value.push(...sheet)
          }
        }
        fileReader.onloadend = (ev) => {
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

      const workbook = Xlsx.utils.book_new()
      const cnDateTimeFormat = Intl.DateTimeFormat('cn')
      let resultArr = []
      let dateIndex

      const result = res.data.data.map((v) => {
        const exportData = {}
        for (const key of headers) {
          exportData[key] = v[key]
        }
        const sheetName = cnDateTimeFormat.format(
          Date.parse(exportData['updatedAt'])).replaceAll('/', '-')
        delete exportData['updatedAt']
        if (dateIndex === undefined) {
          dateIndex = sheetName
          resultArr.push(exportData)
        } else if (dateIndex === sheetName) {
          resultArr.push(exportData)
        } else if (dateIndex !== sheetName) {
          const worksheet = Xlsx.utils.json_to_sheet(resultArr)
          Xlsx.utils.book_append_sheet(workbook, worksheet, dateIndex)
          resultArr = [exportData]
          dateIndex = sheetName
        }
      })
      const worksheet = Xlsx.utils.json_to_sheet(resultArr)
      Xlsx.utils.book_append_sheet(workbook, worksheet, dateIndex)

      const timeFile = Intl.DateTimeFormat('cn', {
        timeStyle: 'medium',
        dateStyle: 'short'
      }).format(Date.now())

      Xlsx.writeFile(workbook, `${timeFile}.xlsx`, {
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
}
</style>