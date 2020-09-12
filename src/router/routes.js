export default [
  {
    path: '/guixi_detail/saler/detail',
    name: 'detail',
    component: () => import(/* webpackChunkName:'detail' */ '@/components/detail/detail'),
  },
  {
    path: '/guixi_detail/saler/login',
    name: 'login',
    component: () => import(/* webpackChunkName:'login' */ '@/components/login/login'),
  },
  {
    path: '/guixi_detail/saler/code',
    name: 'code',
    component: () => import(/* webpackChunkName:'code' */ '@/components/login/code'),
  },
  {
    path: '/guixi_detail/saler/buy',
    name: 'buy',
    component: () => import(/* webpackChunkName:'buy' */ '@/components/buy'),
  },
  {
    path: '/guixi_detail/saler/buy_message',
    name: 'buy_message',
    component: () => import(/* webpackChunkName:'buy_message' */ '@/components/visit/buy_message'),
  },
  {
    path: '/guixi_detail/saler/call/caller_buy_message',
    name: 'caller_buy_message',
    component: () => import(/* webpackChunkName:'caller_buy_message' */ '@/components/caller/caller_buy_message'),
  },
  {
    path: '/guixi_detail/saler/subscribe',
    name: 'subscribe',
    component: () => import(/* webpackChunkName:'subscribe' */ '@/components/subscribe'),
  },
  {
    path: '/guixi_detail/saler/subscribe_message',
    name: 'subscribe_message',
    component: () => import(/* webpackChunkName:'subscribe_message' */ '@/components/visit/subscribe_message'),
  },
  {
    path: '/guixi_detail/saler/sign_message',
    name: 'sign_message',
    component: () => import(/* webpackChunkName:'sign_message' */ '@/components/visit/sign_message'),
  },
  {
    path: '/guixi_detail/saler/sign',
    name: 'sign',
    component: () => import(/* webpackChunkName:'sign' */ '@/components/sign'),
  },
  {
    path: '/guixi_detail/saler/housing',
    name: 'housing',
    component: () => import(/* webpackChunkName:'housing' */ '@/components/house/housing'),
  },
  {
    path: '/guixi_detail/saler/pcHousing',
    name: 'pcHousing',
    component: () => import(/* webpackChunkName:'pcHousing' */ '@/components/house/pcHousing'),
  },
  {
    path: '/guixi_detail/saler/house',
    name: 'house',
    component: () => import(/* webpackChunkName:'house' */ '@/components/house/house'),
  },

  // 流程
  {
    path: '/guixi_detail/saler/signing',
    name: 'signing',
    component: () => import(/* webpackChunkName:'signing' */ '@/components/flows/signing'),
  },
  {
    path: '/guixi_detail/saler/checkout',
    name: 'checkout',
    component: () => import(/* webpackChunkName:'checkout' */ '@/components/flows/checkout'),
  },
  {
    path: '/guixi_detail/saler/changeRoom',
    name: 'changeRoom',
    component: () => import(/* webpackChunkName:'changeRoom' */ '@/components/flows/changeRoom'),
  },
  {
    path: '/guixi_detail/saler/rename',
    name: 'rename',
    component: () => import(/* webpackChunkName:'rename' */ '@/components/flows/rename'),
  },
  {
    path: '/guixi_detail/saler/sendOrders',
    name: 'sendOrders',
    component: () => import(/* webpackChunkName:'sendOrders' */ '@/components/flows/sendOrders'),
  },
  {
    path: '/guixi_detail/saler/paper_printing',
    name: 'paper_printing',
    component: () => import(/* webpackChunkName:'paper_printing' */ '@/components/flows/paper_printing'),
  },
  {
    path: '/guixi_detail/saler/customer',
    name: 'customer',
    component: () => import(/* webpackChunkName:'customer' */ '@/components/customer'),
  },
  // 新建客户
  {
    path: '/guixi_detail/saler/arrive_visitors',
    name: 'arrive_visitors',
    component: () => import(/* webpackChunkName:'visit' */ '@/components/arrive_visitors'),
  },
  // 预约表
  {
    path: '/guixi_detail/saler/reserve',
    name: 'reserve',
    component: () => import(/* webpackChunkName:'visit' */ '@/components/reserve/reserve'),
  },
  {
    path: '/guixi_detail/saler/reserve/reserved',
    name: 'reserved',
    component: () => import(/* webpackChunkName:'reserved' */ '@/components/reserve/reserved'),
  },

  // 来电客户录入表
  {
    path: '/guixi_detail/saler/caller',
    name: 'caller',
    component: () => import(/* webpackChunkName:'call' */ '@/components/caller/caller'),
    children: [
      {
        path: 'new',
        name: 'new',
        component: () => import(/* webpackChunkName:'call' */ '@/components/caller/new'),
      },
      {
        path: 'view',
        name: 'call_view',
        component: () => import(/* webpackChunkName:'call' */ '@/components/caller/view'),
      },
    ],
  },
  // message
  {
    path: '/guixi_detail/saler/message',
    name: 'message',
    component: () => import(/* webpackChunkName:'message' */ '@/components/message/message'),
  },
  {
    path: '/guixi_detail/saler/message/init',
    name: 'init',
    component: () => import(/* webpackChunkName:'init' */ '@/components/message/init'),
  },
  {
    path: '/guixi_detail/saler/message/revisit',
    name: 'revisit',
    component: () => import(/* webpackChunkName:'revisit' */ '@/components/message/revisit'),
  },
  {
    path: '/guixi_detail/saler/message/revisit/record',
    name: 'record',
    component: () => import(/* webpackChunkName:'record' */ '@/components/message/record'),
  },
  // admin
  {
    path: '/guixi_detail/saler/admin/guest',
    name: 'guest',
    component: () => import(/* webpackChunkName:'guest' */ '@/components/admin/guest'),
  },
  {
    path: '/guixi_detail/saler/admin/today_details',
    component: () => import(/* webpackChunkName:'today_details' */ '@/components/admin/today_details'),
    children: [
      {
        path: '/',
        name: 'today',
        component: () => import(/* webpackChunkName:'today' */ '@/components/admin/today.vue'),
      },
      {
        path: '/guixi_detail/saler/admin/custom_time',
        name: 'custom_time',
        component: () => import(/* webpackChunkName:'custom_time' */ '@/components/admin/custom_time'),
      },
    ],
  },
  {
    path: '/guixi_detail/saler/admin/ranking_list',
    name: 'ranking_list',
    component: () => import(/* webpackChunkName:'ranking_list' */ '@/components/admin/ranking_list'),
  },
  {
    path: '*',
    name: '404',
    component: () => import('@/components/buy'),
  },
]
