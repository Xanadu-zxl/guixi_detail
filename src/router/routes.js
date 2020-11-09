export default [
  {
    path: '/guixi_detail/detail',
    name: 'detail',
    component: () => import(/* webpackChunkName:'detail' */ '@/components/detail/detail'),
  },
  {
    path: '/guixi_detail/detailRank',
    name: 'detailRank',
    component: () => import(/* webpackChunkName:'detailRank' */ '@/components/detail/detailRank'),
  },

  {
    path: '*',
    name: '404',
    component: () => import('@/components/404'),
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
  // 桂溪党建
  {
    path: '/guixi_detail/home',
    name: 'home',
    component: () => import(/* webpackChunkName:'code' */ '@/components/partyConstruction/home'),
  },
  {
    path: '/guixi_detail/my',
    name: 'my',
    component: () => import(/* webpackChunkName:'code' */ '@/components/partyConstruction/my'),
  },
  {
    path: '/guixi_detail/particular',
    name: 'particular',
    component: () => import(/* webpackChunkName:'code' */ '@/components/partyConstruction/particular'),
  },
]
