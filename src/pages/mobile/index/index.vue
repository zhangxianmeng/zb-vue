<template>
  <div>
    <v-header
        @closeDownload="closeDownload"
        @rightIconClick="openService"
        @leftIconClick="openMenu"
        :data="headData">
    </v-header>

    <div class="index-main" :class="{paddingTop:headData.download}">

      <!--banner-->
      <banner :bannerList="bannerList"></banner>

      <!--公告-->
      <notice></notice>

      <!--登录注册已登录状态按钮等-->
      <btn-group :isLogin="isLogin"></btn-group>

      <!--网页版游戏-->
      <index-game></index-game>

    </div>

    <!--菜单-->
    <v-menu @closeMenu="closeMenu" :isShow="isShow"></v-menu>

    <!--alert-->
    <idx-alert @close="close"
               :isShowIndexAlert="isShowIndexAlert">
    </idx-alert>
  </div>
</template>

<script>
  import {getBannerData} from '@/api/index'
  import VMenu from 'MComponents/menu/menu'
  import notice from './notice/notice'
  import btnGroup from './btn-group/btn-group'
  import indexGame from './index-game/index-game'
  import banner from 'MComponents/banner/banner'
  import idxAlert from './index-alert/index-alert'
  import {menu} from '@/common/js/mixin'
  import {mapGetters} from 'vuex'
  import {ajaxRequst} from '@/common/js/util'

  export default {
    mixins: [menu],
    data() {
      return {
        headData: {
          title: '',
          leftIcon: 'menu',
          rightIcon: 'kefu1',
          logo: require('@/common/image/newlogo.png'),
          download: true
        },
        bannerList: [],
        isShowIndexAlert:false
      }
    },
    computed: {
      ...mapGetters(['isLogin'])
    },
    created() {
      this._getBannerItems() //加载banner
    },
    mounted(){
      this.isShowIndexAlert=true
    },
    methods: {
      // 关闭下载提示
      closeDownload() {
        this.headData.download = false
      },
      // 打开客服
      openService() {
        this.$router.push('/mobile/self-help')
      },
      // 获取banner
      _getBannerItems() {
        // position：1:首页轮播图/2:老虎机轮播图/3:真人轮播图/4:捕鱼轮播图/5:棋牌轮播图
        // displaySide：1:电脑网页/2:手机网页/3:手机APP

        let baseUrl = 'http://220.241.124.160:15002'
        if (process.env.NODE_ENV === 'production') {
          baseUrl = ''
        }
        let url = baseUrl + '/api/personal/carouselMapConfig/list'
        ajaxRequst(url, 'POST', {position: "1", displaySide: "2"}).then((res) => {
          if (res.code === this.ERR_OK || this.ERR_OK_OTHER === res.code) {
            if (res.data.length) {
              this.bannerList = res.data.map((item) => {
                item.src = item.imageUrl
                item.href = item.jumpLink
                return item
              })
            }
          } else {
            this.$message({
              type: 'warning',
              message: res.message
            })
          }
        })
      },
      close(){
        this.isShowIndexAlert = false
      },
    },
    components: {
      VMenu, notice, btnGroup, indexGame, banner ,idxAlert
    }
  }
</script>

<style lang="stylus" src="./index.styl" scoped>


</style>