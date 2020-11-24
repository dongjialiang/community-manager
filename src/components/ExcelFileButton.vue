<template>
  <input
    type="file"
    class="excelFile"
    @change="readExcelToData"
  >
  <input
    type="button"
    value="导出"
    @click="dataToExcel"
  >
</template>

<script>
import { inject } from 'vue'
import Xlsx from 'xlsx'
import Service from '../services/CommonService'
export default {
  name: 'ExcelFileButton',
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
    }
  },
  setup(props) {
    const ManyData = inject(props.manyDataSymbol)
    const itemTotal = inject(props.itemTotalSymbol)
    // 读取Excel表格文件的数据到数据列表中
    const readExcelToData = () => {
      const e = event
      if (e.currentTarget.value !== '') {
        const file = e.currentTarget.files[0];

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
        fileReader.readAsBinaryString(file);
      }
    }
    // 导出数据到Excel表格文件
    const dataToExcel = async () => {
      const res = await Service.getAllService(
        props.listName, '{}', 1, itemTotal.value)
      const headers = props.columns.map((v) => v.name)

      const result = res.data.data.map((v) => {
        const newData = {}
        for (const key of headers) {
          newData[key] = v[key]
        }
        return newData
      })

      const worksheet = await Xlsx.utils.json_to_sheet(result)

      const workbook = Xlsx.utils.book_new()
      Xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

      Xlsx.writeFile(workbook, 'test2.xlsx', {
        bookSST: false,
        type: 'base64'
      })
    }
    return { readExcelToData, dataToExcel }
  }
}
</script>

<style scoped>

</style>