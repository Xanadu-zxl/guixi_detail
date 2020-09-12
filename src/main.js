// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/reset.css'
import './assets/svg/styles.css'
import './assets/svg/style.css'
import axios from 'axios'
import VueCookies from 'vue-cookies'
import 'view-design/dist/styles/iview.css'
import '@vant/touch-emulator'
import { Table, Page } from 'view-design'

Vue.prototype.$axios = axios
Vue.component('Table', Table)
Vue.component('Page', Page)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})
