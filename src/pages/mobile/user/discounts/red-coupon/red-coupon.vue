<template>
  <div class="red-coupon">
    <v-header :data="headData" @leftIconClick="back" @rightIconClick="openService"></v-header>
    <div class="content">
      <div class="mobile-input-group">
        <label class="label">尊宝账户</label>
        <div>
          <select v-model="redCoupon.couponType">
            <option value="">请选择账户</option>
            <option v-for="item in platformList" :value="item.value">{{item.text}}</option>
          </select>
        </div>
      </div>

      <div class="mobile-input-group">
        <label class="label">优惠代码</label>
        <div>
          <input v-model="redCoupon.couponCode" type="text">
        </div>
      </div>

      <div class="mobile-input-group">
        <label class="label"></label>
        <div>
          <mt-button size="large" @click="transferInforRedCoupon" type="danger">提交</mt-button>
        </div>
      </div>

      <div class="tips">
        <h3>红包优惠券说明：</h3>
        <p>
          1.PT/PT国际板/CQ9/PG/老虎机钱包（DT、MG、QT、NT、PNG、SW）平台存送优惠券，需要游戏帐户低于5元方可使用

          <br>2.使用红包优惠券无需进行存款，优惠券有相应的流水倍数，须达到限定投注额或是账户小于五元，才可进行户内转账。

          <br>温馨提示：

          <br>1.完成转帐后，可到账户清单，优惠券记录里查询相关使用记录。

          <br>2.红包优惠券从发至站内信后30天为有效期限，逾期未使用恕不补发。

          <br>3.如使用优惠券出现代码错误，请至您的站内信确认代码或可咨询客服进行核对。

          <br>4.优惠券取得方式不同，请留意尊宝国际相关优惠信息。

          <br>5.优惠卷会以邮件的方式发至您的站内信。
        </p>
      </div>
    </div>
  </div>

</template>

<script>
  import {commonHead,redCouponModule} from '@/common/js/mixin'

  export default {
    mixins:[commonHead,redCouponModule],
  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/mixin'
  .red-coupon
    mobile-wrapper()
    .content
      margin-top 20px
      m-wrapper()
      select
        width 100%
</style>