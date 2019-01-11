<template>
  <div class="deposit-send">
    <v-header :data="headData" @leftIconClick="back" @rightIconClick="openService"></v-header>
    <div class="content">
      <user-center-pagination
          @getLosePromo="openGetLosePromoDialog"
          @cancelLosePromo="cancelLosePromo"
          :headList="headList"
          :pagination="pagination"
          :apiFun="apiFun"
          :paginationMark="config.paginationMark.rescueMoney"
          :number="999">
      </user-center-pagination>
      <div class="tips">
        <h3>
          温馨提示：
        </h3>
        <p>
          救援金有效时间为60天（从派发当天开始计算），规定时间内未领取会自动取消。
        </p>
      </div>

      <!--领取救援金-->
      <v-dialog :height="400" :width="width" @on-close="closeDialog('isShowGetLosePromoDialog')" :is-show="isShowGetLosePromoDialog">
        <div>
          <div class="dialog-header">
            <h3>选择老虎机平台</h3>
          </div>
          <div class="dialog-body">
            <p class="red">请选择您喜欢的老虎机平台, 确定后我们不接受任何重新转至其他老虎机平台的申请</p>
            <div class="options">
              <span v-for="item in options">
                <input type="radio" :id="item.value" :value="item.value" v-model="platform">
                <label :for="item.value">{{item.text}}</label>
              </span>
            </div>
            <p class="center">
              <mt-button size="small" @click="optLosePromo" type="danger">确定</mt-button>
            </p>
          </div>
        </div>
      </v-dialog>
    </div>
  </div>

</template>

<script>
  import {commonHead,rescueMoneyModule} from '@/common/js/mixin'
  import userCenterPagination from '@/components/user-center-pagination/user-center-pagination'
  import VDialog from '@/components/dialog/dialog'

  export default {
    mixins:[commonHead,rescueMoneyModule],
    data(){
      return {
        width:window.innerWidth*.9
      }
    },
    components: {userCenterPagination, VDialog}
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
  .options
    margin 10px 0
    span
      display block
      margin-right 15px
      input
        margin-right 4px
        vertical-align middle
        height auto
</style>