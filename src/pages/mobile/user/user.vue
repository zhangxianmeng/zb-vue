<template>
  <div class="user-center">
    <v-header :data="headData" @leftIconClick="back" @rightIconClick="openService"></v-header>
    <div class="content">
      <user-header></user-header>
      <m-list :list="list" @selectItem="selectItem"></m-list>
    </div>
  </div>
</template>

<script>
  import {commonHead} from '@/common/js/mixin'
  import MList from 'MComponents/m-list/m-list'
  import userHeader from 'MComponents/user-header/user-header'
  import {mapGetters} from 'vuex'

  export default {
    mixins: [commonHead],
    data() {
      return {
        list: [
          {
            icon: 'chongzhi0101',
            text: '存款',
            path: 'deposit'
          },
          {
            icon: 'icon-test',
            text: '提款',
            path: 'withdraw'
          },
          {
            icon: 'zhuanzhang',
            text: '户内转账',
            path: 'transform'
          },
          {
            icon: 'tuikuan',
            text: '红包转账',
            path: 'redPacket-transform'
          },
          {
            icon: 'zizhu',
            text: '自助优惠',
            path: 'discounts'
          },
          {
            icon: 'jinbi',
            text: 'app彩金',
            path: 'app-handsel'
          },
          {
            icon: 'qiandao',
            text: '签到送彩金',
            path: 'sign-lottery'
          },

          {
            icon: 'shezhi',
            text: '账户设置',
            path: 'account-settings'
          },
          {
            icon: 'declare',
            text: '账户清单',
            path: 'account-list'
          },
          {
            icon: 'youxiang',
            text: '站内信',
            path: 'letter'
          },
          {
            icon: 'huangguan',
            text: 'vip等级制度',
            path: 'vip-level'
          },
          {
            icon: 'zhaoshangdaili',
            text: '合作代理',
            path: 'agent'
          },
          {
            icon: 'kefu1',
            text: '我的客服',
            path: 'service'
          },

        ]
      }
    },
    computed: {
      ...mapGetters(['isLogin'])
    },
    methods: {
      selectItem(item) {
        this.$router.push(`/mobile/user/${item.path}`)
      }
    },
    watch: {
      isLogin(val) {
        if (!val && window.location.href.includes('/mobile/user')) {
          this.$router.push('/mobile')
        }
      }
    },
    components: {MList, userHeader}

  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/mixin'
  .user-center
    mobile-wrapper()
    background #eee
</style>