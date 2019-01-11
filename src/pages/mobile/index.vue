<template>
  <div>
    <transition :name="transitionName">
      <keep-alive>
        <router-view class="child-view router"></router-view>
      </keep-alive>
    </transition>
    <tab v-if="isShowMobileCommonModule"></tab>
    <login :width="width" @closeDialog="closeLoginDialog" :isShowLoginDialog="isShowLoginDialog"></login>
    <loading v-show="loadingState"></loading>
  </div>
</template>
<script>
  import '@/common/js/mobile-extend'
  import loading from '@/components/loading/loading'
  import tab from 'MComponents/tab/tab'
  import login from '@/components/login/login'
  import {checkLogin, loginDialog} from '@/common/js/mixin'
  import {getQueryString} from '@/common/js/util'
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    mixins: [checkLogin, loginDialog],
    data() {
      return {
        transitionName: 'page-slide-right',
        width: document.documentElement.offsetWidth * .9 || document.body.offsetWidth * .9
      }
    },
    computed: {
      ...mapGetters(['isLogin', 'loadingState', 'isShowMobileCommonModule', 'isShowLoginDialog'])
    },
    created() {
      // 获取app传过来的token,判断app登录状态用
      let token = getQueryString('tokenForTopic')
      //检查登录状态
      this.checkLogin(null, token)
      this._setShowCommonModule(window.location.pathname)
    },
    methods: {
      _isShow(path) {
        let href = window.location.href
        return /\/mobile\/activity\/\w+/.test(path)
          || href.includes('/mobile/user/deposit')
          || (href.includes('/mobile/slots') && href.includes('isFromApp'))
          || (href.includes('/mobile/user/agent') && href.includes('isFromApp'))
      },
      _setShowCommonModule(path) {
        if (this._isShow(path)) {
          this.SET_IS_SHOW_MOBILE_COMMON_MODULE(false)
        } else {
          this.SET_IS_SHOW_MOBILE_COMMON_MODULE(true)
        }
      },
      ...mapMutations([
        'SET_IS_SHOW_MOBILE_COMMON_MODULE'
      ])
    },
    watch: {
      '$route'(to, from) {
        this._setShowCommonModule(to.path)
        //切换标题
        let title = to.meta.title
        let headData = this.headData
        if (title && headData) {
          headData.title = title
        }
        //  监听路由变化时的状态为前进还是后退
        let isBack = this.$router.isBack
        if (isBack) {
          this.transitionName = 'page-slide-left'
        } else {
          this.transitionName = 'page-slide-right'
        }
        this.$router.isBack = false
      },
      isLogin(val) {
        if (val) {
          this.closeLoginDialog()
        }
      }
    },
    components: {
      loading,
      tab,
      login
    }
  }
</script>
<style lang="stylus" scoped></style>
