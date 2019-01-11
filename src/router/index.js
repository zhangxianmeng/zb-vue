import Vue from 'vue'
import Router from 'vue-router'
import maps from './map'
import beforeEach from './hook/beforeEach'
import afterEach from './hook/afterEach'

let error404 = () => import('@/pages/error/404')
Router.prototype.back = function () {
  this.isBack = true
  window.history.go(-1)
}

Vue.use(Router)

const router = new Router({
  mode: 'history', //路由的 history 模式
  base: '/',
  linkActiveClass: 'active',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  },
  routes: maps.concat([
    {
      path: "/404",
      component: error404
    },
    {
      path: "*",
      redirect: '/404',
    }
  ]),

})

router.beforeEach(beforeEach)
router.afterEach(afterEach)

export default router
