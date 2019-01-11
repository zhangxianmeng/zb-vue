<template>
  <div class="deposit-send">
    <v-header :data="headData" @leftIconClick="back" @rightIconClick="openService"></v-header>
    <div class="content">
      <div class="table">
        <el-table
            stripe
            border
            :span-method="arraySpanMethod"
            :data="backwater.tableData"
            style="width: 100%">
          <el-table-column
              v-for="item in backwater.headList"
              :prop="item.prop"
              :label="item.label">
          </el-table-column>
        </el-table>
      </div>
      <p style="margin-top:20px">
        <mt-button size="large" type="danger" @click="oneKeyXimaNew">一键返水</mt-button>
      </p>
      <div class="tips">
        <h3>
          温馨提示：
        </h3>
        <p>
          1.自助反水最低金额为1元（如没有达到自助反水最低金额是不能自助返水的）。

          <br>2.每天00:00-03:00为系统结算时间，暂不能用使用自助返水，每日可自助返水的时间为昨天0点到23:59:59,每个平台自助结算的是有效投注额，未自助返水的系统会进行系统结算。

          <br>3.自助返水无限次数，自助返水申请后，会在5分钟内通过审核，反水金额会自动添加到。
        </p>
      </div>
    </div>
  </div>

</template>

<script>
  import {commonHead,backwaterModule} from '@/common/js/mixin'

  export default {
    mixins:[commonHead,backwaterModule],
  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/mixin'
  .deposit-send
    mobile-wrapper()
    .content
      margin-top 20px
      m-wrapper()
      select
        width 100%
</style>