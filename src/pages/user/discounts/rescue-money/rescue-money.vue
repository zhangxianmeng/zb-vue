<template>
  <div>
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
    <v-dialog @on-close="closeDialog('isShowGetLosePromoDialog')" :is-show="isShowGetLosePromoDialog">
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
            <el-button @click="optLosePromo" type="danger">确定</el-button>
          </p>
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script>
  import VDialog from '@/components/dialog/dialog'
  import userCenterPagination from '@/components/user-center-pagination/user-center-pagination'
  import {rescueMoneyModule} from '@/common/js/mixin'
  export default {
    mixins:[rescueMoneyModule],
    components: {userCenterPagination, VDialog}
  }
</script>

<style lang="stylus" scoped>
  .my-pagination
    margin 20px 0
    text-align center

  .options
    margin 15px 0
    text-align center

    span
      margin-right 15px
      input
        margin-right 4px
        vertical-align middle
        height auto

</style>