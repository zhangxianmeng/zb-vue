<template>
  <div class="">
    <common-nav ref="nav"></common-nav>
    <div class="main bg-wap">
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
            isShowDialog:false,
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