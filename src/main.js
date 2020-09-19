// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/reset.css'
import './assets/svg/style.css'
import axios from 'axios'
import VueCookies from 'vue-cookies'
import 'view-design/dist/styles/iview.css'
import '@vant/touch-emulator'
import { Table, Page, Select } from 'view-design'

import {
  Tab,
  Tabs,
  Tabbar,
  TabbarItem,
  Collapse,
  CollapseItem,
  Uploader,
  List,
  Field,
  Picker,
  Cell,
  Popup,
  RadioGroup,
  Radio,
  Calendar,
  DatetimePicker,
  DropdownMenu,
  DropdownItem,
  Icon,
  Search,
  Toast,
  Checkbox,
  CheckboxGroup,
  Loading,
  Switch,
  Pagination,
} from 'vant'

Vue.prototype.$axios = axios
Vue.component('Table', Table)
Vue.component('Page', Page)
Vue.component('Select', Select)
Vue.use(VueCookies)
Vue.use(DropdownMenu)
Vue.use(Toast)
Vue.use(Search)
Vue.use(Icon)
Vue.use(DropdownItem)
Vue.use(Pagination)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Uploader)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(DatetimePicker)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Switch)
Vue.use(List)
Vue.use(Field)
Vue.use(Popup)
Vue.use(Picker)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Calendar)
Vue.use(Cell)
Vue.use(Loading)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})
