// 公用方法
export default {
  createdTableHeadersDetail(fields) {
    let columns = []
    fields.forEach((field) => {
      let column = {}
      switch (field.identity_key) {
        case 'department':
          column.title = field.title
          column.key = field.identity_key
          column.width = 150
          column.resizable = true
          column.fixed = 'left'
          break

        default:
          column.title = field.title
          column.key = field.identity_key
          column.width = 180
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
}
