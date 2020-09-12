import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import { Toast } from 'vant'

Vue.use(Toast)

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes,
})

// router.beforeEach((to, from, next) => {
//   let name = to.name
//   // 没有权限，触发登录
//   const permission = localStorage.getItem('user_permission')
//   let path = sessionStorage.getItem('callback')
//   // 是否有回调地址
//   if (!permission) {
//     if (!path) {
//       sessionStorage.setItem('callback', name)
//       router.push({ name: 'login' })
//     }
//   }

//   if (to.name === 'detail') {
//     const permission = localStorage.getItem('user_permission')
//     if (
//       permission.indexOf('销售总监') === -1 &&
//       permission.indexOf('销秘') === -1 &&
//       permission.indexOf('权证') === -1
//     ) {
//       Toast('抱歉你没有权限~')
//       router.push({ name: 'buy' })
//     }
//   }
//   next()
// })

export default router
