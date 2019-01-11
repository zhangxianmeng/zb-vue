<template>
  <div class="exchange-page">
    <v-header :data="headData" @leftIconClick="back" @rightIconClick="openService"></v-header>
    <v-address v-if="addrList.length" @entryAddressManage="entryAddressManage" :addressItem="addressItem" :flagAddrIndex="flagAddrIndex"></v-address>
    <div class="pro-info">
      <div class="tit">
        <div class="left">
          <div class="pic">
            <img :src="itemData.imageUrl" alt="">
          </div>
          <div>
            <p class="name">{{itemData.name}}</p>
            <p class="summary">{{itemData.property}}</p>
          </div>
        </div>
        <div class="right">
          <p>x1</p>
          <p class="red">{{itemData.point}}分</p>
        </div>
      </div>

      <div v-if="isComeFromDetail" class="bar">
        <span>优惠活动</span>
        <span>0分</span>
      </div>

      <div v-if="isComeFromDetail" class="bar">
        <span>VIP活动</span>
        <span>{{itemData.promotion}}分</span>
      </div>

    </div>
    <div v-if="isComeFromDetail" class="exchange-btn">
      <p class="sum">
        共一件，合计 <span class="red">{{itemData.point}}分</span>
      </p>
      <mt-button class="btn" @click="exchangePhysical" type="danger">{{isComeFromDetail?'立即兑换':'立即领取'}}</mt-button>
    </div>

    <div v-if="isComeFromLuckyLottery" class="exchange-btn">
      <mt-button size="large" @click="exchangePhysical" type="danger">{{isComeFromDetail?'立即兑换':'立即领取'}}</mt-button>
    </div>

  </div>
</template>

<script>
  import {openSuccessTip, exchangePhysical,getHandleAddress} from '@/common/js/mixin'
  import VAddress from './address/address'
  import {mapGetters} from 'vuex'

  export default {
    mixins: [openSuccessTip, exchangePhysical,getHandleAddress],
    data() {
      return {
        headData: {
          title: '确认兑换信息',
          leftIcon: 'arrowr',
          rightIcon: 'kefu1',
        },
      }
    },
    computed: {
      isComeFromDetail() {
        return this.$route.query.comeFrom === 'detail'
      },
      isComeFromLuckyLottery() {
        return this.$route.query.comeFrom === 'luckyLottery'
      },
      itemData() {
        return JSON.parse(this.$route.query.itemData || '{}')
      },
      ...mapGetters(['userInfo'])
    },
    created() {
      if (!this.isComeFromDetail && !this.isComeFromLuckyLottery && this.itemData.id) {
        this.$router.push('/mobile/integral')
      }
    },
    methods: {
      back() {
        this.$router.back()
      },
      openService() {
        this.$router.push('/mobile/self-help')
      },
      //选择地址
      entryAddressManage() {
        this.$router.push('/mobile/integral/exchangePage/select-address')
      },

    },
    watch: {},
    components: {VAddress}

  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/mixin'
  @import '~common/stylus/variable'
  .exchange-page
    mobile-wrapper()
    background #eee
    .pro-info
      background $color-light
      margin-top 10px
      line-height 26px
      m-wrapper()
      .tit
        display flex
        justify-content space-between
        align-items center
        padding 10px 0
        .left
          display flex
          align-items center
          .name
            font-size 16px
          .pic
            flex 0 0 80px
            width 80px
            height 70px
            border 1px solid #eee
            display flex
            justify-content center
            align-items center
            margin-right 10px
            img
              max-width 70px

        .right
          font-size 16px
          text-align right
      .bar
        display flex
        justify-content space-between
        line-height 40px
        border-top 1px solid #eee
    .exchange-btn
      display flex
      justify-content space-between
      align-items center
      background $color-light
      margin-top 10px

      .sum
        flex 1
        text-align center
        .red
          font-size 16px
      .btn
        flex 0 0 100px
</style>