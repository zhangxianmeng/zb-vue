<template>
  <div class="">
    <common-nav ref="nav"></common-nav>
    <div class="main bg-wap">
      <div class="status">
        <div class="sw">
          <div class="pro">
            <span>3000</span>
          </div>
          <div class="final"></div>
        </div>
        <div class="mg">
          <div class="pro">
            <span>3000</span>
          </div>
          <div class="final"></div>
        </div>
        <div class="pg">
          <div class="pro">
            <span>3000</span>
          </div>
          <div class="final"></div>
        </div>
        <div class="dt">
          <div class="pro">
            <span>3000</span>
          </div>
          <div class="final"></div>
        </div>
        <div class="cq9">
          <div class="pro">
            <span>3000</span>
          </div>
          <div class="final"></div>
        </div>
      </div>
      <div class="handle">
        <img src="./img/item-click.png" alt="">
        <div><span>目前已有888位玩家领取成功</span></div>
      </div>

      <div class="rule">
        <img src="./img/rule.png" alt="">
        <p>1、此活动在期限内每位玩家仅限领取一次，用户只需集满五福字即可点击领取红包。</p>
        <p>2、活动红包派发金额按照参赛人员总概率计算，越先完成任务的玩家获得金额额度越高。</p>
        <p>3、此活动金额以红包优惠券的方式派发到玩家的站内信里，可自行兑换转入指定的游戏厅。</p>
        <p>4、获得的红包彩金只需完成5倍流水即可提款。</p>
        <p>5、尊宝国际拥有本次活动的最终解释权和修改权。</p>
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