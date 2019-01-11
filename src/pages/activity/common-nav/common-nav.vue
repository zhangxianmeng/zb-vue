<template>
  <div>
    <div v-if="!isMobilePlatform" class="common-nav">
      <div class="wrapper">
        <router-link class="logo" to="/">
          <img :src="logo" alt="">
        </router-link>
        <div class="right-wrapper">
          <div class="menu-list">
            <a v-if="_isHttpUrl(item.path)" v-for="item in menuList" :href="item.path" target="_blank">{{item.text}}</a>
            <router-link v-if="!_isHttpUrl(item.path)" v-for="item in menuList" :to="{path:item.path}">{{item.text}}
            </router-link>
            <el-button v-if="!isLogin" type="warning" @click="openLoginDialog">登录</el-button>
            <el-button v-if="isLogin" type="warning" @click="logOut">退出</el-button>
          </div>
        </div>
      </div>
    </div>


    <!--手机端-->
    <div class="mobile-common-nav" v-if="isMobilePlatform">
      <v-header
          @rightIconClick="openService"
          @leftIconClick="openMenu"
          :data="headData">
      </v-header>
    </div>

    <!--菜单-->
    <v-menu @closeMenu="closeMenu" :isShow="isShow" :menuList="menuList"></v-menu>
  </div>

</template>
<script>
  import VMenu from './menu/menu'
  import {mapGetters} from 'vuex'
  import {logOut, loginDialog, menu} from '@/common/js/mixin'
  import {isMobilePlatform} from '@/common/js/util'

  const path = isMobilePlatform() ? '/mobile' : ''
  export default {
    mixins: [logOut, loginDialog, menu],
    data() {
      return {
        headData: {
          title: '',
          leftIcon: 'menu',
          rightIcon: 'kefu1',
          logo: require('@/common/image/newlogo.png'),
        },
        logo: require('@/common/image/newlogo.png'),
        menuList: [
          {
            text: '尊宝电影院',
            path: path + '/activity/movie',
            show: 'isLogin&logOut'
          },
        ],
        isMobilePlatform: isMobilePlatform()
      }
    },
    computed: {
      ...mapGetters([
        'isLogin'
      ])
    },
    created() {
    },
    methods: {
      _isHttpUrl(string) {
        return /^http/.test(string)
      },
      // 打开客服
      openService() {
        this.$router.push('/mobile/self-help')
      },

    },
    watch: {},
    components: {VMenu}

  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'
  .mobile-common-nav
    padding-top 50px
  .common-nav
    height 100px
    background #4a68a4
    line-height 100px
    &.mobile-common-nav
      height 50px
      line-height 50px
    .wrapper
      clearfix()
      .logo
        float left
      .right-wrapper
        float right
      .menu-list
        a
          color $color-light
          font-size 16px
          padding 0 30px
          margin 0 20px
          display block
          float left
          transition all .3s ease-in
          &:hover, &.active
            color $color-intersperse

</style>