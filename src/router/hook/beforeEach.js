import store from '@/store'

export default (to, from, next) => {
  let path = to.path

  // 跳转个人中心页面限制
  if (path.includes('/mobile/user') || path.includes('/user')) {
    // 已登录
    if (store.getters.isLogin) {
      if (store.getters.isAgent) {
        alert('代理不能进入游戏账户中心~！')
        next(false)
      } else {
        store.commit('SET_LOADINGSTATE', true)
        next()
      }
    } else { //未登录
      // 手机端判断是否为app跳转，pc直接返回首页
      if (path.includes('/mobile/user')) {
        // app跳转过来不需要判断登录状态，重新请求一次接口判断登录状态
        if (window.location.href.includes('isFromApp')) {
          next()
          store.commit('SET_LOADINGSTATE', true)
        } else { //手机端限制
          // 如果在登录页面，想跳个人中心，阻断路由
          if (from.path.includes('/mobile/login')) {
            next(false)
          } else {//跳登录页
            store.commit('SET_LOADINGSTATE', true)
            next({path: '/mobile/login'})
          }
        }
      } else {//pc端直接返回首页
        store.commit('SET_LOADINGSTATE', true)
        next({path: '/'})
      }

    }
  } else {
    //开启loading态
    store.commit('SET_LOADINGSTATE', true)
    next()
  }
}
