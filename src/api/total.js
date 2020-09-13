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
}
