<template>
  <div class="pay-way-type-tab">
    <div @click="select(item)" :class="{active:currentType === item.payWayType}"
         class="deposit-btn-type" v-for="(item) in list">
      <div class="wr">
        <div class="text">
          <h3>{{item.title}} <img v-if="item.fz" :src="item.fz" alt=""></h3>
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
    width 48.5%
    min-height 86px
    margin 0 3% 10px 0
    padding 6px 10px
    line-height 24px
    border 1px solid #ccc
    border-radius 5px
    position relative
    background $color-gray-background
    cursor pointer
    transition all .3s ease-in
    display flex
    align-items center
    &:nth-of-type(2n)
      margin-right 0
    &.active,&:hover
      border 1px solid $color-blue-mobile
      background $color-light
      background $color-blue-mobile
      color $color-light
      i
        color $color-light

    .wr
      display flex
      align-items center
    img
      margin-right 8px
    i
      position: absolute
      right -3px
      top -8px
      color $color-blue-mobile
    .text
      padding-left 15px
      h3
        font-size 16px
      p
        opacity .7
</style>