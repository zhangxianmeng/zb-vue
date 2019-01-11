<template>
  <div class="agent-manage">
    <v-header :data="headData" @leftIconClick="back" @rightIconClick="openService"></v-header>
    <header-banner></header-banner>
    <div class="content">
      <m-list :list="list" @selectItem="selectItem"></m-list>
    </div>
  </div>
</template>

<script>
  import headerBanner from './header-banner/header-banner'
  import MList from 'MComponents/m-list/m-list'
  import {mapGetters} from 'vuex'
  import {commonHead} from '@/common/js/mixin'

  export default {
    mixins: [commonHead],
    data() {
      return {
        list: [
          {
            icon: 'xiazai',
            text: '账户中心',
            path: 'agent-center'
          },
          {
            icon: 'jinbi',
            text: '日结佣金',
            path: 'day-commission'
          },
          {
            icon: 'qingdan',
            text: '会员账务',
            path: 'membership'
          },
          {
            icon: 'declare',
            text: '额度记录',
            path: 'quota'
          },
          {
            icon: 'zhaoshangdaili',
            text: '下线会员',
            path: 'offline-members'
          },
          {
            icon: 'icon-test',
            text: '申请提款',
            path: 'withdrawal'
          },
          {
            icon: 'shezhi',
            text: '账户设置',
            path: 'account-settings'
          },
          {
            icon: 'youxiang',
            text: '站内信',
            path: 'letter'
          },
        ]
      }
    },
    computed: {
      ...mapGetters(['isAgent'])
    },
    created() {
      if (!this.isAgent) {
        this.$router.push('/mobile')
      }
    },
    methods: {
      selectItem(item) {
        this.$router.push(`/mobile/agent-manage/${item.path}`)
      }
    },
    watch: {
      isAgent(val) {
        if (!val && window.location.href.includes('/mobile/agent-manage')) {
          this.$router.push('/mobile')
        }
      }
    },
    components: {headerBanner, MList}
  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/mixin'
  @import '~common/stylus/variable'
  .agent-manage
    mobile-wrapper()
    background #eee

</style>