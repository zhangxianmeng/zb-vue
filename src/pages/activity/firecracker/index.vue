<template>
  <div class="">
    <common-nav ref="nav"></common-nav>
    <div class="main bg-wap">
      <div class="top-bar">
        <h3>活动时间：2月4日0点-2月5日0点</h3>
        <div class="item-bar">
          <div class="lf">
            <div class="item">
              <p>存满500元</p>
              <img src="./img/item-click.png" alt="">
            </div>
            <div class="item">
              <p>存满10000元</p>
              <img src="./img/item-click.png" alt="">
            </div>
          </div>
          <div class="rt">
            <div class="item">
              <p>所有老虎机平台流水满10000</p>
              <img src="./img/item-click.png" alt="">
            </div>
            <div class="item">
              <p>所有老虎机平台流水满2000000</p>
              <img src="./img/item-click.png" alt="">
            </div>
          </div>
        </div>
      </div>

      <div class="rule">
        <img src="./img/rule.png" alt="">
        <p>1、活动时间内玩家可在达到要求后，四项福利各领取一次。</p>
        <p>2、此活动赠送方式为红包优惠券，并非实物，领取成功的玩家需要转入指定游戏厅完成彩金一倍流水方可提款使用。</p>
        <p>3、此活动只针对娱乐性质的会员,禁止多帐号套利以及违规投注行为，如有发现同IP多帐号申请此优惠,我们将立即关闭帐号，请严格遵守尊宝条款条例，尊宝国际有权收回红利以及盈利！</p>
        <p>4、尊宝国际对本次优惠享有最终解释权。</p>
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