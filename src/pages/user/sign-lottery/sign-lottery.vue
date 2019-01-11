<template>
  <div>
    <tab-title @selectItem="selectItem" :tab-title-list="tabTitleList" :currentIdx="currentIdx"></tab-title>
    <div class="border-content">
      <!--签到中心-->
      <div v-if="currentIdx===0">
        <div class="center">
          <el-button @click="doSignRecord" type="danger" :disabled="isSignToday">{{isSignToday?'已签到':'立即签到'}}</el-button>
          <span style="margin-left:10px">今日已领取 <span class="red">{{getSignAmount}}</span> 元</span></div>
        <div class="sign-wrapper">
          <sign :arrDate="arrDate"></sign>
        </div>
      </div>
      <!--签到说明-->
      <div v-if="currentIdx===1">
        <div class="table">
          <el-table
              stripe
              border
              :data="tableData"
              style="width: 100%">
            <el-table-column
                v-for="item in headList"
                :prop="item.prop"
                :label="item.label">
            </el-table-column>
          </el-table>
        </div>

        <div class="tips">
          <h3>
            温馨提示：
          </h3>
          <p>
            1、激活要求，单月达到存款要求后可以进行签到帐户转入游戏帐户。

            <br>2、所有签到奖金流水需要10倍。

            <br>3、签到金每次转入游戏帐户提款不得超过最大上限。

            <br>4、签到奖金每月最后一日的23:59:59秒自动清理，请及时进行游戏。

            <br>5、禁止套利行为，如有发现立即关闭帐户。

            <br>6、签到彩金需转入PT/PT国际板/CQ9/PG/老虎机钱包（DT、MG、QT、NT、PNG、SW），任一平台进行游戏。

            <br>7、转入游戏额度不能低于10元
          </p>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import tabTitle from '@/components/tab-title/tab-title'
  import sign from '@/components/sign/sign'
  import {signLotteryModule} from '@/common/js/mixin'
  export default {
    mixins:[signLotteryModule],
    components: {tabTitle, sign}

  }
</script>

<style lang="stylus" scoped>
.sign-wrapper
  margin-top 20px
</style>