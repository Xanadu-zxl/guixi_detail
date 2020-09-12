export default [
  {
    path: '/guixi_detail/detail',
    name: 'detail',
    component: () => import(/* webpackChunkName:'detail' */ '@/components/detail/detail'),
  },

  {
    path: '*',
    name: '404',
    component: () => import('@/components/detail/detail'),
  },
  {
    path: '/guixi_detail/login',
    name: 'login',
    component: () => import(/* webpackChunkName:'login' */ '@/components/login/login'),
  },
  {
    path: '/guixi_detail/code',
    name: 'code',
    component: () => import(/* webpackChunkName:'code' */ '@/components/login/code'),
  },
]
