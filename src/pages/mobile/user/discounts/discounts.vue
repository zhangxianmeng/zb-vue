<template>
  <div class="discounts">
    <v-header :data="headData" @leftIconClick="back" @rightIconClick="openService"></v-header>
    <div class="content">
      <user-header></user-header>
      <m-list :list="list" @selectItem="selectItem"></m-list>

    </div>
  </div>
</template>

<script>
  import userHeader from 'MComponents/user-header/user-header'
  import MList from 'MComponents/m-list/m-list'
  import {commonHead} from '@/common/js/mixin'
  export default {
    mixins: [commonHead],
    data() {
      return {
        list: [
          {
            icon: 'zizhu',
            text: '自助存送',
            path: 'deposit-send'
          },
          {
            icon: 'zizhufanshui',
            text: '自助返水',
            path: 'backwater'
          },
          {
            icon: 'jinjishenpi',
            text: '自助晋级',
            path: 'promoted'
          },
          {
            icon: 'jinbi',
            text: '救援金',
            path: 'rescue-money'
          },
          {
            icon: 'tuikuan',
            text: '红包优惠券',
            path: 'red-coupon'
          },
          {
            icon: 'weibiaoti2fuzhi02',
            text: '存送优惠券',
            path: 'coupon'
          },
          {
            icon: 'chouma',
            text: 'VIP免费筹码',
            path: 'free-chip'
          },
          {
            icon: 'shengrilijin',
            text: '生日礼金',
            path: 'birthday'
          },

        ]
      }
    },
    computed: {},
    methods: {
      selectItem(item) {
        this.$router.push(`/mobile/user/discounts/${item.path}`)
      }
    },
    watch: {},
    components: {userHeader,MList}

  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/mixin'
  .discounts
    mobile-wrapper()
    background #eee
</style>