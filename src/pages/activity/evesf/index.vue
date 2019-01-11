<template>
  <div class="sf">
    <common-nav ref="nav"></common-nav>
    <div class="main bg-wap">
      <div class="content">
        <div class="sec1">
          <div class="wrap">
            <div class="item item1">
              <div class="i-top">2018年存满<b>10000</b>元</div>
              <div class="i-tit">春联红包优惠券<b>58</b>元</div>
              <div class="i-num">2666位玩家已领取</div>
            </div>
            <div class="item item2">
              <div class="i-top">2018年存满<b>50000</b>元</div>
              <div class="i-tit">年货礼盒红包优惠券<b>188</b>元</div>
              <div class="i-num">2666位玩家已领取</div>
            </div>
            <div class="item item3">
              <div class="i-top">2018年存满<b>100000</b>元</div>
              <div class="i-tit">除夕礼炮红包优惠券<b>588</b>元</div>
              <div class="i-num">2666位玩家已领取</div>
            </div>
            <div class="item item4">
              <div class="i-top">2018年存满<b>500000</b>元</div>
              <div class="i-tit">土豪红包优惠券<b>1088</b>元</div>
              <div class="i-num">2666位玩家已领取</div>
            </div>
          </div>
        </div>
        <div class="rule">
          <img src="./img/rule.png" alt="">
          <p>1.此活动赠送彩金兑换代码并非实物，领取成功的玩家需要转入指定游戏厅完成彩金一倍流水方可提款使用。</p>
          <p>2.此活动只计算玩家<b>2018年1月1日0点至2018年12月31日23点59分59秒</b>的存款数据为依据。</p>
          <p>3.此活动每位玩家只限申请一次，若已申请A奖励则无法再次领取B奖励。</p>
          <p>4.此项优惠活动只针对娱乐性质的会员,如有发现同IP多帐号申请活动，尊宝娱乐城将有权不予以派发！</p>
          <p>5.尊宝娱乐享有此优惠的最终解释权及修改权，其网站规则条款适用于此优惠！</p>
        </div>
      </div>
      <code-alert @close="close"
        :isShowDialog="isShowDialog"
        :coupon="coupon"
        :prize="prize">
      </code-alert>
    </div>
  </div>

</template>
<script>
  import commonNav from '@/pages/activity/common-nav/common-nav.vue'
  import commonFooter from '@/pages/activity/common-footer/common-footer.vue'
  import codeAlert from '@/pages/activity/alert/codeAlert.vue'
  import {mapGetters} from 'vuex'
  import {applyGiftNew} from '@/api/index'
  import {isMobilePlatform} from '@/common/js/util'
  import Clipboard from "clipboard"


  export default {
    data() {
        return{
            isShowDialog:true,
            giftID:{
                giftID:''
            },
            prize: '',
            coupon: '',
            isMobile:isMobilePlatform()
        }
    },
    computed: {
      ...mapGetters([
        'isLogin'
      ])
    },
    created() {
    },
    methods: {
        close(){
            this.isShowDialog = false;
        }
    },
    watch: {
        isLogin(val) {
            if (val) {

            }
        },
    },
    components: {commonNav, commonFooter,codeAlert}
  }
</script>
<style>
  .obt-wrap .obt{
    background: url(./img/alert.png) no-repeat center;
    background-size: contain;
  }
</style>
<style lang="stylus" src="./index.styl" scoped></style>