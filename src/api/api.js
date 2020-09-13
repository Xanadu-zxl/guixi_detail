import http from '../unit/http'
// import cookie from "js-cookie";

// let id = cookie.get("CURRENT-USER-ID");
// let phone = cookie.get("CURRENT-USER-PHONE");
// let tags = cookie.get("CURRENT-USER-TAGS");

let headerV4 = {
  Authorization:
    'd25adaf98146c4f32c127e6c094f6f672db695970692fc473a9e8e861b304f1a:eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lc3BhY2VfaWQiOjF9.plo6dlWfBGCS9kH8765wWR9aQo_-SyFQw5kRBBio9Y0',
}
let headerSQL = {
  Authorization:
    'gid://slp-table-mapper/Namespace/1&eyJhbGciOiJIUzI1NiJ9.eyJnaWQiOiJnaWQ6Ly9za3lsYXJrL05hbWVzcGFjZS8xIn0.TwAB1xT_B-hn74leeBM_nY82KtewYvd8OiasRrXpZL0',
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
}
