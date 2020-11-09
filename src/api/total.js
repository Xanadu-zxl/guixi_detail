// 公用方法
export default {
  createdTableHeadersDetail(fields) {
    let columns = []
    fields.forEach((field) => {
      let column = {}
      switch (field.identity_key) {
        case 'project':
          column.title = field.title
          column.key = field.identity_key
          column.width = 150
          column.resizable = true
          column.fixed = 'left'
          break
        default:
          column.title = field.title
          column.key = field.identity_key
          column.width = 100
          column.resizable = true
          break
      }
      if (column.key) {
        columns.push(column)
      }
    })
    return columns
  },
  createdExportHeadersDetail(fields) {
    let columns = []
    fields.forEach((field) => {
      let column = {}
      switch (field.identity_key) {
        default:
          column.title = field.title
          column.key = field.identity_key
          column.width = 100
          column.resizable = true
          break
      }
      columns.push(column)
    })
    return columns
  },
  ListData(fields) {
    let tableList = []
    fields.forEach((field) => {
      let objData = {}

      switch (field.type) {
        default: {
          objData.field_id = field.id
          objData.identity_key = field.identity_key
          objData.type = field.type
          objData.title = field.title
          objData.value = ''
        }
      }

      tableList.push(objData)
    })
    return tableList
  },
  // 单位拼接
  unitWith(array) {
    array.forEach((el) => {
      console.log(el)
      const unit = el.unit
      el.first_years = `${el.first_years} ${unit}`
      el.secend_years = `${el.secend_years} ${unit}`
      el.third_years = `${el.third_years} ${unit}`
    })
    return array
  },
  getColumnsTitle(data) {
    let array = []
    data.forEach((ele) => {
      array.push(ele.category)
    })
    // 去重
    array = Array.from(new Set(array))
    let columnsTitle = []
    array.forEach((column) => {
      columnsTitle.push({
        value: column,
        label: column,
      })
    })
    return columnsTitle
  },
}
