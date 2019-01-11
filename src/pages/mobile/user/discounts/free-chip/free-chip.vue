<template>
  <div class="free-chip">
    <v-header :data="headData" @leftIconClick="back" @rightIconClick="openService"></v-header>
    <div class="content">
      <div class="mobile-input-group">
        <label class="label">会员等级</label>
        <div>
          <input readonly disabled :value="userInfo.level | level" type="text">
        </div>
      </div>
      <div class="mobile-input-group">
        <label class="label">筹码金额</label>
        <div>
          <input readonly disabled v-model="amount" type="text">
        </div>
      </div>
      <div class="mobile-input-group">
        <label class="label"></label>
        <div>
          <mt-button size="large" @click="applyActivity" type="danger">立即领取</mt-button>
        </div>
      </div>

      <div class="tips">
        <h3>
          温馨提示：
        </h3>
        <p>
          1.青铜VIP及以上的会员，每月可领取一次VIP免费筹码。

          <br>2.免费筹码以您领取时的VIP等级来进行派发。

          <br>3.免费筹码领取后，直接添加到尊宝主帐户。

          <br>4.免费筹码无需流水即可提款。

          <br>5.领取过程中有任何疑问，请咨询24小时在线客服。

          <br>6.会员当月未收到免费筹码，需要在一个月内找在线客服申请，例:2月未收到需要在3月31日23:59:59前申请，逾时视同放弃
        </p>
      </div>
    </div>
  </div>

</template>

<script>
  import {commonHead,freeChipModule} from '@/common/js/mixin'

  export default {
    mixins:[commonHead,freeChipModule],
  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/mixin'
  .free-chip
    mobile-wrapper()
    .content
      margin-top 20px
      m-wrapper()
      select
        width 100%
</style>