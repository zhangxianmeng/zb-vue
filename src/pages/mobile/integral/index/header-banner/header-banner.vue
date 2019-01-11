<template>
  <div class="header-banner">
    <div class="flexbox" v-if="isLogin">

      <div class="avator">
        <img class="level-img" :src="levelImage" alt="">
        <div class="text">
          <p>{{userInfo.loginname}}</p>
          <p>我的积分：{{points}}分</p>
        </div>
      </div>

      <p @click="openDialog('isShowRecordDialog')" class="records">
        <span>兑换记录</span>
        <i class="iconfont icon-arrow"></i>
      </p>

    </div>
    <div class="logOut" v-if="!isLogin">
      <p>
        <i class="iconfont icon-xiazai"></i>
        <br>
        <span>请先登录</span>
      </p>
    </div>
    <div class="pro-list">
      <div class="item">
        <p><i class="iconfont icon-duihuan"></i></p>
        <p>兑一送一</p>
      </div>
      <div class="item">
        <p><i class="iconfont icon-jifen"></i></p>
        <p>双倍积分</p>
      </div>
      <div class="item">
        <p><i class="iconfont icon-weibiaoti2fuzhi02"></i></p>
        <p>兑换折扣</p>
      </div>
    </div>

    <!--兑换弹框记录-->
    <lottery-records
        @closeDialog="closeDialog('isShowRecordDialog')"
        :isShowRecordDialog="isShowRecordDialog"
        :flag="2">
    </lottery-records>
  </div>
</template>

<script>
  import {levelImage, queryPoints} from '@/common/js/mixin'
  import LotteryRecords from '../../components/lottery-records/lottery-records'
  import {mapGetters} from 'vuex'


  export default {
    mixins: [levelImage, queryPoints],
    data() {
      return {
        isShowRecordDialog: false
      }
    },
    props: {
      isLogin: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      ...mapGetters(['isLogin', 'initLoginState', 'userInfo'])
    },
    created() {
    },
    methods: {
      closeDialog(attr) {
        this[attr] = false
      },
      openDialog(attr) {
        this[attr] = true
      },
    },
    watch: {
      //处理app跳转web存款
      initLoginState(val) { //等待登录状态初始化成功后 获取支付通道
        if (val && window.location.href.includes('isFromApp') && this.isLogin) {
          this._queryPoints()
        }
      }
    },
    components: {LotteryRecords}

  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/mixin'
  @import '~common/stylus/variable'

  .header-banner
    background $color-blue-mobile
    color $color-light
    .flexbox
      display flex
      justify-content space-between
      align-items center
      padding 15px 10px
    .avator
      display flex
      align-items center
      .level-img
        width 70px
        margin-right 10px
      .text
        p
          margin-bottom 10px
          &:last-child
            margin-bottom 0
    .records
      extend-click()
    .pro-list
      height 80px
      background rgba(0, 0, 0, .3)
      display flex
      text-align center
      .item
        flex 1
        i
          display: block
          margin 0 auto
          width: 40px
          height: 40px
          line-height: 40px
          font-size: 26px
          border-radius: 50%
          background: #ef8934
          color: #fff
          margin-bottom: 7px
          margin-top: 10px


    .logOut
      display flex
      align-items center
      justify-content center
      text-align center
      height 100px
      i
        font-size 32px
        display inline-block
        margin-bottom 10px
</style>