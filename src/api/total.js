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
          column.width = 120
          column.resizable = true
          break
      }
      if (column.key) {
        columns.push(column)
      }
    })
    return columns
  },
  // 多维表单表头
  createdTableHeaders(fields) {
    let columns = []
    fields.forEach((field) => {
      let column = {}
      switch (field.identity_key) {
        case 'department':
          // column.width = 0
          break
        case 'category':
          column.title = field.title
          column.key = field.identity_key
          column.width = 20
          column.resizable = true
          column.fixed = 'left'
          break
        case 'project':
          column.title = field.title
          column.key = field.identity_key
          column.width = 105
          column.resizable = true
          column.fixed = 'left'
          break
        case 'data_name':
          column.title = field.title
          column.key = field.identity_key
          column.width = 105
          column.resizable = true
          column.fixed = 'left'
          break
        default:
          column.title = field.title
          column.key = field.identity_key
          column.width = 70
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
          column.width = 110
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

  getColumnsTitle(data) {
    let array = []
    data.forEach((ele) => {
      array.push(ele.mapped_values.category.value[0])
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
  setMappedValues(arr) {
    let dataList = []
    let key = []
    arr.forEach((mapped) => {
      let middle = {}
      key = Object.keys(mapped.mapped_values)
      key.forEach((res) => {
        middle[res] = mapped.mapped_values[res].value[0]
      })
      dataList.push(middle)
    })
    return dataList
  },
}
