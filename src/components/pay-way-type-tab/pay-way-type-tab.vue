<template>
  <div class="pay-way-type-tab">
    <div @click="select(item)" :class="{active:currentType === item.payWayType}"
         class="deposit-btn-type" v-for="(item) in list">
      <div class="wr">
        <i :class="getIcon(item)"></i>
        <div class="text">
          <h3>{{item.title}}</h3>
          <p>{{item.describe}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    props: {
      currentType: {
        type: String,
        default: 0
      },
      list: {
        type: Array,
        default: []
      },
      type: {
        type: String,
        default: ''
      }
    },
    computed: {},
    created() {
    },
    methods: {
      select(item) {
        this.$emit('selectPayWayType', item, this.type)
      },
      getIcon(item){
        return `iconfont icon-${item.icon}`
      }
    },
    watch: {},
    components: {}

  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'
  .pay-way-type-tab
    clearfix()

  .deposit-btn-type
    float left
    width 240px
    padding 6px 10px
    line-height 24px
    border 1px solid #ccc
    border-radius 5px
    position relative
    margin 5px 15px 5px 0
    background $color-gray-background
    cursor pointer
    transition all .3s ease-in
    &.active, &:hover
      border 1px solid $color-primary
      background $color-light
      background $color-primary
      color $color-light
      .wr i
        color $color-light

    .wr
      display flex
      align-items center
      i
        margin-right 10px
        font-size 18px
        color $color-blue-mobile
      .icon-weixin-color
        color rgb(33,174,60)
      .icon-jd
        color #ca4341
      .icon-meituan1
        color rgb(7,196,189)
      .icon-shouji
        font-size 20px

</style>