<template>
  <div class="tab-title">
    <a v-if="!isRouter" :class="{active:currentIdx === idx || currentIdx === item.id}" @click="selectItem(idx,item)"
       v-for="(item,idx) in tabTitleList"
       href="javascript:">
      <i :class="getIcon(item)"></i>
      {{item.text}}
      <img class="badge" v-if="item.badge" :src="item.badge">
    </a>
    <!--路由跳转-->
    <router-link v-if="isRouter" v-for="item in tabTitleList" :to="{path:item.router}">
      <i :class="getIcon(item)"></i>
      {{item.text}}
      <img class="badge" v-if="item.badge" :src="item.badge">
    </router-link>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    props: {
      currentIdx: {
        type: Number,
        default: 0
      },
      tabTitleList: {
        type: Array,
        default: []
      },
      isRouter: {
        type: Boolean,
        default: false
      }
    },
    computed: {},
    methods: {
      selectItem(idx, item) {
        this.$emit('selectItem', idx, item)
      },
      getIcon(item) {
        return `iconfont icon-${item.icon} ${item.id}`
      },
    },
    watch: {},
    components: {}
  }
</script>

<style lang="stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'
  .tab-title
    border-bottom 1px solid $color-primary
    clearfix()
    a
      padding 0 30px
      height: 43px
      float: left
      text-align center
      line-height 43px
      margin-right 10px
      position relative
      border: 1px solid rgba(64, 66, 104, 0.3)
      top 1px
      .iconfont
        vertical-align middle
        font-size 18px
      .iconfont.icon-shuaqiaqiapianyinhangqia
        color #D39700
      .iconfont.icon-zhifubao1
        color $color-blue-mobile
      .iconfont.icon-weixin1
        color #67c23a
      .iconfont.icon-jd
        color #ca4341
      .iconfont.icon-QQ
        color $color-blue-mobile

      &:last-child
        margin-right 0
      &.active
        border 1px solid $color-primary
        background $color-primary
        color $color-light
        .iconfont
          color $color-light
      .badge
        position absolute
        right -2px
        top -2px

</style>