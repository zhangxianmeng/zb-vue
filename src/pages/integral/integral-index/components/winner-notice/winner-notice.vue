<template>
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

    <!--领取喜讯弹框-->
    <winner-news-dialog @updateData="updateData" ref="winnerNewsDialog"></winner-news-dialog>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import winnerNewsDialog from '../../../winner-news-dialog/winner-news-dialog.vue'
  import LotteryRecords from '@/pages/integral/lottery-records/lottery-records'
  import {vipLuckyList} from '@/common/js/mixin'
  export default {
    mixins: [vipLuckyList],
    data() {
      return {
        isShowRecordDialog: false,
      }
    },
    computed: {
      ...mapGetters(['isLogin'])
    },
    created() {
    },
    methods: {
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
    components: {
      LotteryRecords,
      winnerNewsDialog
    }

  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/mixin'
  .lottery
    width 384px
    flex 0 0 384px
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