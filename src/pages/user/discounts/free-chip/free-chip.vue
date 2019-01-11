<template>
  <div>
    <div class="input-group">
      <span class="label">会员等级</span>
      <div>
        <input readonly disabled :value="userInfo.level | level" type="text">
      </div>
    </div>
    <div class="input-group">
      <span class="label">筹码金额</span>
      <div>
        <input readonly disabled :value="amount || 0" type="text">
      </div>
    </div>
    <div class="input-group">
      <span class="label"></span>
      <div>
        <el-button @click="applyActivity" type="danger">立即领取</el-button>
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
</template>

<script>
  import {freeChipModule} from '@/common/js/mixin'
  export default {
    mixins:[freeChipModule]
  }
</script>

<style lang="stylus" scoped>

</style>