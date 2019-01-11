<template>
  <div class="coupon">
    <v-header :data="headData" @leftIconClick="back" @rightIconClick="openService"></v-header>
    <div class="content">
      <div class="mobile-input-group">
        <label class="label">尊宝账户</label>
        <div>
          <select v-model="coupon.couponType">
            <option value="">请选择账户</option>
            <option v-for="item in platformList" :value="item.value">{{item.text}}</option>
          </select>
        </div>
      </div>

      <div class="mobile-input-group">
        <label class="label">转账金额</label>
        <div>
          <input v-model="coupon.couponRemit" type="text">
        </div>
      </div>

      <div class="mobile-input-group">
        <label class="label">存送优惠券代码</label>
        <div>
          <input v-model="coupon.couponCode" type="text">
        </div>
      </div>

      <div>
        <mt-button size="large" @click="transferInforCoupon" type="danger">提交</mt-button>
      </div>

      <div class="tips">
        <h3>存送优惠券说明：</h3>
        <p>
          1.不限平台使用，请选择正确的游戏平台填写优惠代码，确认提交，红利金额会自动添加到您指定的游戏平台里。

          <br>2.PT/PT国际板/CQ9/PG/老虎机钱包（DT、MG、QT、NT、PNG、SW）平台存送优惠券，需要游戏帐户低于5元方可使用

          <br>3.存送优惠券有效期为30天，请您在有效期内进行使用。

          <br>4.如何得到存送优惠券，请留意尊宝国际最新的相关优惠信息。

          <br>5.优惠卷会以邮件的方式发至您的站内信。
        </p>
      </div>
    </div>
  </div>

</template>

<script>
  import {commonHead, couponModule} from '@/common/js/mixin'

  export default {
    mixins: [commonHead, couponModule],
  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/mixin'
  .coupon
    mobile-wrapper()
    .content
      margin-top 20px
      m-wrapper()
      select
        width 100%
</style>