import http from '../unit/http'
// import cookie from "js-cookie";

// let id = cookie.get("CURRENT-USER-ID");
// let phone = cookie.get("CURRENT-USER-PHONE");
// let tags = cookie.get("CURRENT-USER-TAGS");

let headerV4 = {
  Authorization:
    '7e9559776d2e4aac37509df2bec2c40b49013cb9b0a22ca1ee08f7986b243b73:eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lc3BhY2VfaWQiOjF9.u5GQ2tNmjF6hc_um_VLdPU2GPzPLB0_LBK9rayQw5Bk',
}
let headerSQL = {
  Authorization:
    'gid://slp-table-mapper/Namespace/1&eyJhbGciOiJIUzI1NiJ9.eyJnaWQiOiJnaWQ6Ly9za3lsYXJrL05hbWVzcGFjZS8xIn0.d4LgEu5ErE0ORVcAABxUCfr5Q_ANYOwBhUL7M_y4Kgo',
}
// admin
export default {
  // 登录oauth
  getMagnateOauthAPI() {
    return http.get('/magnate/oauth')
  },
  getUserAPI(token) {
    return http.get(`/api/v1/user?access_token=` + token)
  },
  // 翻版
  // 渲染表单
  getFormAPI(formID) {
    return http.get(`/api/v4/forms/${formID}`, '', headerV4)
  },

  // 渲染表项
  getFormResponsesAPI(formID) {
    return http.get(`/api/v4/forms/${formID}/responses`, '', headerV4)
  },
  // 获取单条数据
  getResFormAPI(dataID) {
    return http.get(`/api/v4/responses/${dataID}`, '', headerV4)
  },
  // 发送数据
  postFormAPI(formID, data) {
    return http.post(`/api/v4/forms/${formID}/responses`, data, headerV4)
  },
  // 修改表单数据
  putFormsAmendAPI(tableID, dataID, data) {
    return http.put(`/api/v4/forms/${tableID}/responses/${dataID}`, data, headerV4)
  },
  // sql查询
  getSqlJsonAPI(sql) {
    return http.get(`/api/table_mappers/json_api/execute_select_sql?sql=` + sql, '', headerSQL)
  },
  // 渲染流程
  getflowAPI(flowID) {
    return http.get(`/api/v4/yaw/flows/${flowID}`, '', headerV4)
  },
  // 流程填写
  postflowAPI(flowID, data) {
    return http.post(`/api/v4/yaw/flows/${flowID}/journeys`, data, headerV4)
  },
  // 请求组织成员
  getOrganizationsAPI(organizationID) {
    return http.get(`/api/v4/organizations/${organizationID}/members`, '', headerV4)
  },
}
