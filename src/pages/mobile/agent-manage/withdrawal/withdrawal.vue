<template>
  <div class="withdrawal">
    <v-header :data="headData" @leftIconClick="back" @rightIconClick="openService"></v-header>
    <div class="content">
      <div class="options">
        <div class="mobile-input-group">
          <span class="label">密码：</span>
          <div>
            <input v-model="withdrawalData.password" type="password">
          </div>
        </div>
        <div class="mobile-input-group">
          <span class="label">银行名称：</span>
          <div>
            <select v-model="withdrawalData.bank">
              <option value="">请选择银行</option>
              <option v-for="item in bankList" :value="item.bankname">{{item.bankname}}</option>
            </select>
          </div>
          <div class="btn-group">
            <mt-button @click="bindBankCard" size="small" type="primary" class="small-btn">绑定银行卡</mt-button>
            <mt-button @click="unBindBank" size="small" type="primary" class="small-btn">解绑银行卡</mt-button>
          </div>
        </div>

        <div class="mobile-input-group">
          <span class="label">卡/折号</span>
          <div>
            <input readonly disabled :value="formatStr(withdrawalData.accountNo,4,4,6)" type="text">
          </div>
        </div>

        <div class="mobile-input-group">
          <span class="label">提款类型</span>
          <div>
            <select v-model="withdrawalData.tkType">
              <option value="slotmachine">老虎机</option>
              <option value="liveall">其他</option>
            </select>
          </div>
        </div>

        <div class="mobile-input-group">
          <span class="label">提款金额</span>
          <div>
            <input @focus="agentWithdrawpz" v-model="withdrawalData.amount" type="text">
          </div>
        </div>

        <div class="mobile-input-group">
          <span class="label"></span>
          <div>
            <p class="red">{{tipText}}</p>
          </div>
        </div>

        <div class="mobile-input-group">
          <label class="isAgree" for="isAgree">
            <input style="width:auto" id="isAgree" type="checkbox" v-model="isAgree">
            <span>我已读过《提款须知》，并已清楚了解其规则。</span>
          </label>
        </div>
        <div>
          <mt-button size="large" @click="withdrawal" type="danger">提交</mt-button>
        </div>
      </div>

      <!--绑定银行卡-->
      <transition name="slider-right">
        <div v-if="isShowCommonMaskPage" class="bind-bank-card-wrapper common-mask-page">
          <v-header :data="maskPageHeadData" @leftIconClick="closeMaskPage"></v-header>
          <div class="bind-bank-card">
            <div class="mobile-input-group">
              <label for="">卡/折号</label>
              <div>
                <input @change="getBankInfo" v-model="bankCard.bankno" type="text">
              </div>
            </div>
            <div class="mobile-input-group">
              <label for="">银行账户</label>
              <div>
                <input readonly disabled :value="bankCard.bankname" type="text">
              </div>
            </div>
            <div class="mobile-input-group">
              <label for="">登录密码</label>
              <div>
                <input v-model="bankCard.password" type="password">
              </div>
            </div>
            <div class="mobile-input-group">
              <label for="">姓名</label>
              <div>
                <input v-if="userInfo.accountName" v-model="bankCard.xinMing" readonly disabled type="text">
                <input v-if="!userInfo.accountName" v-model="bankCard.xinMing" type="text">
              </div>
            </div>
            <div class="btn-group">
              <mt-button @click="mainbandingBankno" size="large" type="danger">提交</mt-button>
              <mt-button @click="isShowCommonMaskPage = false" size="large">返回</mt-button>
            </div>

            <div class="tips">
              <h3>温馨提示</h3>
              <p>
                <span class="red"> 1. 请认真填写真实姓名，如有乱填写造成无法出款，尊宝概不负责。</span>

                <br>2. 绑定银行卡/折号，可以免去您重复输入卡/折号的繁琐步骤。

                <br>3. 如有疑问请直接联系在线客服。
              </p>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  import {commonHead, agentWithdrawal, bindBankCardModule} from '@/common/js/mixin'

  export default {
    mixins: [commonHead, agentWithdrawal, bindBankCardModule],
    components: {},
    watch:{
      isShowCommonMaskPage(val) {
        this.setContentHeight(val)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/mixin'
  @import '~common/stylus/variable'
  .withdrawal
    line-height 21px
    mobile-wrapper()
    .options
      m-wrapper()
      margin-top 20px
      .btn-group
        text-align right
        button
          margin-left 10px
      .isAgree
        display flex
        align-items center
        input
          margin-right 5px
          margin-top 5px
    .content
      clearfix()
    .bind-bank-card-wrapper
      .bind-bank-card
        .btn-group
          button
            margin-bottom 10px
</style>