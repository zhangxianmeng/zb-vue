<template>
  <div class="agent-manage">
    <v-header :data="headData" @leftIconClick="back" @rightIconClick="openService"></v-header>
    <div class="content">
      <m-list :list="list" @selectItem="selectItem"></m-list>
    </div>
  </div>
</template>

<script>
  import {commonHead} from '@/common/js/mixin'
  import MList from 'MComponents/m-list/m-list'

  export default {
    mixins: [commonHead],
    data() {
      return {
        depositPageHeadData: {
          title: '',
          leftIcon: 'arrowr',
        },
        list: [
          {
            icon: 'jinbi',
            text: '会员输赢',
            path: 'searchagprofit'
          },
          {
            icon: 'chongzhi0101',
            text: '会员存款',
            path: 'searchsubuserProposal'
          },
          {
            icon: 'icon-test',
            text: '会员提款',
            path: 'withdraw'
          },
          {
            icon: 'zizhufanshui',
            text: '会员返水',
            path: 'vipBackwater'
          },
          {
            icon: 'huodongzhongxin',
            text: '会员优惠',
            path: 'vipPromo'
          },

        ]
      }
    },
    computed: {},
    created() {
    },
    methods: {
      selectItem(item){
        this.$router.push(`/mobile/agent-manage/membership/${item.path}`)
      }
    },
    watch: {},
    components: {MList}

  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/mixin'
  @import '~common/stylus/variable'
  .agent-manage
    mobile-wrapper()
    background #eee
</style>