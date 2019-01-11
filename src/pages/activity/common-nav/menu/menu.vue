<template>
  <div>
    <div v-if="isShow" class="mask" @click="closeMenu"></div>
    <transition name="slider-left">
      <div v-if="isShow" class="menu-wrapper">
        <i @click="closeMenu" class="iconfont icon-2guanbi icon-close"></i>
        <div class="header">
          <div v-if="isLogin">
            <img :src="levelImage" alt="">
            <p>会员账号：{{userInfo.loginname}}</p>
            <p>会员等级：{{userInfo.level | level}}</p>
            <p>会员余额：{{userInfo.credit}}</p>
          </div>
          <div v-if="!isLogin">
            <p style="padding :20px 0">尊敬的用户，您好，请先登录</p>
          </div>
        </div>
        <div class="main">
          <ul>
            <li @click="selectItem(item)" v-for="item in filterList">
              <i v-if="item.icon" :class="getIcon(item)"></i>
              <span>{{item.text}}</span>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {levelImage, logOut, loginDialog} from '@/common/js/mixin'

  export default {
    mixins: [levelImage, logOut, loginDialog],
    data() {
      return {
        ownMenuList: [
          {
            text: '登录账户',
            // icon: 'denglu',
            id: 'login',
            show: 'logOut'
          },
          {
            text: '注册账户',
            // icon: 'zhuce1',
            id: 'register',
            show: 'logOut'
          },
          {
            text: '安全退出',
            // icon: 'tuichu',
            id: 'logout',
            show: 'isLogin'
          },
        ]
      }
    },
    props: {
      isShow: {
        type: Boolean,
        default: false
      },
      menuList: {
        type: Array,
        default: []
      }
    },
    computed: {
      filterList() {
        if (this.isLogin) {
          return this.ownMenuList.concat(this.menuList).filter(item => item.show.includes('isLogin'))
        } else {
          return this.ownMenuList.concat(this.menuList).filter(item => item.show.includes('logOut'))
        }
      },
      ...mapGetters(['isLogin'])
    },
    created() {

    },
    methods: {
      selectItem(item) {
        this.closeMenu()
        // 退出
        if (item.id === 'logout') {
          this.logOut()
          return
        }
        // 登录
        if (item.id === 'login') {
          this.openLoginDialog()
          return
        }

        // 注册
        if (item.id === 'register') {
          this.$router.push('/mobile/register')
          return
        }

        if (this._isHttpUrl(item.path)) {
          window.location.href = item.path
        } else {
          this.$router.push(item.path)
        }


      },
      closeMenu() {
        this.$emit('closeMenu')
      },
      getIcon(item) {
        return `iconfont icon-${item.icon}`
      },
      _isHttpUrl(string) {
        return /^http/.test(string)
      },
    }
  }
</script>

<style lang="stylus" src="./menu.styl" scoped></style>
