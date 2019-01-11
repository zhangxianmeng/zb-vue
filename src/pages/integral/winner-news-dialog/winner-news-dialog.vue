<template>
  <div>
    <!--中奖喜讯弹框 - 手机领取-->
    <el-dialog
        :center="true"
        title="温馨提示"
        :visible.sync="dialogData.dialogVisiblePhone"
        :width="width">
      <div>
        <h3>恭喜您，抽中了：<span class="red">{{dialogData.getPrize.name}}</span></h3>
        <div>手机号：<input maxlength="11" v-model="dialogData.userInput.phone" type="text"/></div>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button v-if="!isMobile" @click="closeDialog('dialogVisiblePhone')">取 消</el-button>
          <el-button v-if="!isMobile" type="primary" @click="receivePhonePrize(dialogData.getPrize)">领 取</el-button>

          <mt-button v-if="isMobile" @click="closeDialog('dialogVisiblePhone')">取 消</mt-button>
          <mt-button v-if="isMobile" type="primary" @click="receivePhonePrize(dialogData.getPrize)">领 取</mt-button>
      </span>
    </el-dialog>

    <!--中奖喜讯弹框 - 实物领取-->
    <el-dialog
        :center="true"
        title="温馨提示"
        :visible.sync="dialogData.dialogVisiblePhysical"
        :width="width">
      <div>
        <h3>恭喜您，抽中了：<span class="red">{{dialogData.getPrize.name}} {{dialogData.getPrize.resultProperty}}</span></h3>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button v-if="!isMobile" @click="closeDialog('dialogVisiblePhysical')">取 消</el-button>
          <el-button v-if="!isMobile" type="primary" @click="receivePrizePhysical(dialogData.getPrize)">领 取</el-button>

          <mt-button v-if="isMobile" @click="closeDialog('dialogVisiblePhysical')">取 消</mt-button>
          <mt-button v-if="isMobile" type="primary" @click="receivePrizePhysical(dialogData.getPrize)">领 取</mt-button>
      </span>
    </el-dialog>

    <!--中奖喜讯弹框 - 优惠券-->
    <el-dialog
        :center="true"
        title="温馨提示"
        :visible.sync="dialogData.dialogVisibleCoupon"
        :width="width">
      <div>
        <h3>恭喜您，抽中了：<span class="red">{{dialogData.getPrize.resultProperty}}</span> 请查看站内信</h3>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button v-if="!isMobile" @click="closeDialog('dialogVisibleCoupon')">继续抽奖</el-button>
          <el-button v-if="!isMobile" type="primary" @click="receivePrizeCoupon(dialogData.getPrize)">去查看</el-button>

          <mt-button v-if="isMobile" @click="closeDialog('dialogVisibleCoupon')">继续抽奖</mt-button>
          <mt-button v-if="isMobile" type="primary" @click="receivePrizeCoupon(dialogData.getPrize)">去查看</mt-button>
      </span>
    </el-dialog>

    <!--中奖喜讯弹框 - 彩金-->
    <el-dialog
        :center="true"
        title="温馨提示"
        :visible.sync="dialogData.dialogVisibleMoney"
        :width="width">
      <div>
        <h3>恭喜您，抽中了：<span class="red">{{dialogData.getPrize.name}}</span> 请刷新余额查看</h3>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button v-if="!isMobile" type="primary" @click="closeDialog('dialogVisibleMoney')">继续抽奖</el-button>
          <mt-button v-if="isMobile" type="primary" @click="closeDialog('dialogVisibleMoney')">继续抽奖</mt-button>
      </span>
    </el-dialog>

    <!--中奖喜讯弹框 - 其它-->
    <el-dialog
        :center="true"
        title="温馨提示"
        :visible.sync="dialogData.dialogVisibleOther"
        :width="width">
      <div>
        <h3 class="red">很遗憾，大奖与您擦肩而过</h3>
        <p>大奖在后面，继续抽抽抽，我要抽到大奖出现！</p>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button v-if="!isMobile" type="primary" @click="closeDialog('dialogVisibleOther')">再抽一次</el-button>
          <mt-button v-if="isMobile" type="primary" @click="closeDialog('dialogVisibleOther')">再抽一次</mt-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {winnerNewsModule} from '@/common/js/mixin'

  export default {
    mixins: [winnerNewsModule],
  }
</script>

<style lang="stylus" scoped>
  .mint-button
    margin 0 10px
</style>