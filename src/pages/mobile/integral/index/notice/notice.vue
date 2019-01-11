<template>
  <div class="notice">
    <div class="tit red">
      <span>大家在换</span>
    </div>
    <div class="list">
      <ul>
        <li v-for="item in luckyList">
          恭喜会员 {{ formatStr(item.loginName,1,1,6) }} 抽中 {{item.name}} {{_property(1,item)}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {vipLuckyList} from '@/common/js/mixin'
  export default {
    mixins:[vipLuckyList],
    data() {
      return {}
    },
    computed: {},
    created() {
    },
    methods: {},
    watch: {},
    components: {}

  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/mixin'
  @import '~common/stylus/variable'
  .notice
    display flex
    line-height 40px
    background $color-light
    m-wrapper()
    .tit
      flex 0 0 88px
      width 88px
      font-size 16px
      span
        padding-right 10px
        border-right 1px solid $color-border-gray
    .list
      height 40px
      overflow hidden
      li
        no-wrap()



</style>