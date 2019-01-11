<template>
  <div class="address" @click="entryAddressManage">
    <i class="iconfont icon-weibiaoti- icon-address"></i>
    <div class="text">
      <h3>{{addressItem.name}} {{addressItem.phone}}</h3>
      <p class="area">{{addressItem.area+' '+addressItem.address}}</p>
      <p class="tip">
        (发货时以站内信通知您，将于一周内发货，收获信息经确认无法修改)
      </p>
    </div>
    <i class="iconfont icon-arrow"></i>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    props: {
      addressItem: {
        type: Object,
        default: {}
      },
      flagAddrIndex: {
        type: Number,
        default: -1
      }
    },
    computed: {},
    created() {
    },
    methods: {
      entryAddressManage() {
        this.$emit('entryAddressManage')
      }
    },
    watch: {},
    components: {}

  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/mixin'
  @import '~common/stylus/variable'
  .address
    background $color-light
    m-wrapper()
    padding 10px
    display flex
    justify-content space-between
    align-items center
    line-height 21px
    .text
      padding 0 8px
      h3
        font-weight: 600
      .area
        margin 4px 0
        no-wrap(3)
      .tip
        opacity .6
    .icon-address
      font-size 20px
      font-weight 600
</style>