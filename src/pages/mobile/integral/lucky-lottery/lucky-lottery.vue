<template>
  <div class="lucky-lottery-wrapper">
    <v-header @leftIconClick="back" @rightIconClick="openService" :data="headData"></v-header>
    <img width="100%" src="./img/top.png" alt="">
    <div class="content">
      <div class="lucky-lottery">
        <div class="lotto-box">
          <div class="lotto-item" :class="{active:idx === index}" v-for="(item,index) in allLuckyDrawPresent">
            <img v-lazy="item.imageUrl" alt="">
            <p>{{item.title}}</p>
          </div>
          <div @click="startLuckyDraw" class="lotto-item lotto-btn">
            <div>
              <h3>点击抽奖</h3>
              <p v-if="isLogin" style="font-size:16px">{{luckyDrawCostPonit}}分</p>
            </div>
          </div>
        </div>
      </div>

      <p class="tip">
        抽奖规则：每次抽奖使用 <span>{{luckyDrawCostPonit}}</span> 积分，每天抽奖次数不限。
      </p>

      <div class="winner-notice">
        <div class="lottery">
          <div class="tit">
            <h3>会员中奖信息</h3>
            <a @click="openDialog('isShowRecordDialog')" href="javascript:;">我的抽奖记录</a>
          </div>
          <div class="list">
            <!--有滚动-->
            <marquee class="marquee" v-if="luckyList.length && luckyList.length>6" direction="up" scrollamount="3">
              <ul>
                <li v-for="item in luckyList">
                  恭喜会员 {{ formatStr(item.loginName,1,1,6) }} 抽中 {{item.name}} {{_property(1,item)}}
                </li>
              </ul>
            </marquee>
            <!--无滚动-->
            <div class="marquee" v-if="luckyList.length && luckyList.length<=6">
              <ul>
                <li v-for="item in luckyList">
                  恭喜会员 {{ formatStr(item.loginName,1,1,6) }} 抽中 {{item.name}} {{_property(1,item)}}
                </li>
              </ul>
            </div>
            <!--无数据-->
            <div v-if="!luckyList.length" class="no-result">暂无中奖记录</div>
          </div>
        </div>

        <!--抽奖记录-->
        <lottery-records
            ref="lotteryRecords"
            @getLotteryPrize="getLotteryPrize"
            @closeDialog="closeDialog('isShowRecordDialog')"
            :isShowRecordDialog="isShowRecordDialog"
            :flag="1">
        </lottery-records>


      </div>
    </div>

    <!--中奖喜讯弹框-->
    <winner-news-dialog @updateData="updateData" width="90%" ref="winnerNewsDialog"></winner-news-dialog>
  </div>
</template>

<script>
  import winnerNewsDialog from '@/pages/integral/winner-news-dialog/winner-news-dialog.vue'
  import LotteryRecords from '../components/lottery-records/lottery-records'
  import {luckLotteryGame,vipLuckyList} from '@/common/js/mixin'

  export default {
    mixins: [luckLotteryGame,vipLuckyList],
    data() {
      return {
        headData: {
          leftIcon: 'arrowr',
          rightIcon: 'kefu1',
          title: '积分抽奖'
        },
        isShowRecordDialog: false,
      }
    },
    computed: {},
    created() {},
    methods: {
      back() {
        this.$router.back()
      },
      openService() {
        this.$router.push('/mobile/self-help')
      },
      updateData() {
        this.$refs.lotteryRecords.lotteryRecords(1)
      },
      getLotteryPrize(name, resultProperty, type, id, obj, imageUrl) {
        this.$refs.winnerNewsDialog.winnerNews({name, resultProperty, type, id, obj, imageUrl})
      },

      closeDialog(attr) {
        this[attr] = false
      },
      openDialog(attr) {
        if (!this.isLogin) {
          this.$message({
            type: 'warning',
            message: '请先登录游戏'
          })
          return
        }
        this[attr] = true
      },
    },
    watch: {},
    components: {winnerNewsDialog,LotteryRecords}

  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/mixin'
  @import '~common/stylus/variable'
  .lucky-lottery-wrapper
    mobile-wrapper()
    background: linear-gradient(to bottom, #ebb738, #f5a42e) #f5a42e

  .content
    width 320px
    margin 0 auto
    .tip
      margin 20px 0
      color #222
      line-height 21px
      span
        color $color-light
        opacity .8
  .lucky-lottery
    width: 320px
    height: 320px
    background: url(./img/lottery.png) no-repeat
    background-size: 100%
    clearfix()
    .lotto-box
      position: relative
      margin: 20px 0 0 20px

      .lotto-item
        position: absolute
        width: 90px
        height: 85px
        padding: 5px
        overflow: hidden
        text-align: center
        background: #fff
        border-radius 14px
        box-shadow: 0 6px 0 #f3f1ee
        img
          height: 42px

      .lotto-btn
        transition: all .3s
        cursor: pointer

      .lotto-item:nth-of-type(2)
        top: 0
        left: 95px

      .lotto-item:nth-of-type(3)
        top: 0
        left: 190px

      .lotto-item:nth-of-type(4)
        top: 95px
        left: 190px

      .lotto-item:nth-of-type(5)
        top: 190px
        left: 190px

      .lotto-item:nth-of-type(6)
        top: 190px
        left: 95px

      .lotto-item:nth-of-type(7)
        top: 190px
        left: 0

      .lotto-item:nth-of-type(8)
        top: 95px
        left: 0

      .lotto-item.active
        background: $color-danger
        box-shadow: 0 6px 0 #be4e4e
        color $color-light
      //color: #fff

      .lotto-item p
        line-height: 24px
        -o-text-overflow: ellipsis
        text-overflow: ellipsis
        overflow: hidden
        white-space: nowrap
        margin-top: 7px

      .lotto-btn
        top: 95px
        left: 95px
        background: $color-intersperse
        background-size: 1rem 1rem
        box-shadow: 0 10px 0 #efa63a
        transition: all .3s
        display flex
        justify-content center
        align-items center
        color $color-light
        h3
          font-size 18px


  .lottery
    width 100%
    background #fcecc8
    .tit
      display flex
      justify-content space-between
      background: rgba(255, 255, 255, .5)
      line-height: 40px
      color: #222
      padding 0 15px
    .list
      padding 15px
      line-height 28px
      height 160px
      .marquee
        height 130px
        overflow hidden
      li
        no-wrap()
      .no-result
        text-align center
        line-height 100px
</style>