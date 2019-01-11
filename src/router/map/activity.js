let vip = () => import('@/pages/activity/vip/vip.vue')
let movie = () => import('@/pages/activity/movie/movie.vue')
let casino = () => import('@/pages/activity/casino/casino.vue')
let upgrade = () => import('@/pages/activity/upgrade/upgrade.vue')
let vipBirthday = () => import('@/pages/activity/vip-birthday/vip-birthday.vue')
let lucky = () => import('@/pages/activity/lucky/lucky.vue')
let dtFundFlow = () => import('@/pages/activity/dtFundFlow/dtFundFlow.vue')
let christmas = () => import('@/pages/activity/christmas/christmas.vue')
let newagent = () => import('@/pages/activity/agent/agent.vue')
let evesf = () => import('@/pages/activity/evesf/index.vue')
let newYearMoney = () => import('@/pages/activity/newYearMoney/index.vue')
let firecracker = () => import('@/pages/activity/firecracker/index.vue')

export default [
  {
    path: '/activity/vip',
    component: vip
  },
  {
    path: '/activity/movie',
    component: movie
  },
  {
    path: '/activity/casino',
    component: casino
  },
  {
    path: '/activity/upgrade',
    component: upgrade
  },
  {
    path: '/activity/vip-birthday',
    component: vipBirthday
  },
  {
    path: '/activity/lucky',
    component: lucky
  },
  {
    path: '/activity/dtFundFlow',
    component: dtFundFlow
  },
  {
    path: '/activity/christmas',
    component: christmas
  },
  {
    path: '/activity/newagents',
    component: newagent
  },
  {
    path: '/activity/evesf',
    component: evesf
  },
  {
    path: '/activity/newYearMoney',
    component: newYearMoney
  },
  {
    path: '/activity/firecracker',
    component: firecracker
  },
]