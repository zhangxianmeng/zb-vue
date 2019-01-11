<template>
  <div class="withdraw">
    <v-header :data="headData" @leftIconClick="back" @rightIconClick="openService"></v-header>
    <div class="content">
      <user-header></user-header>
      <div class="options">
        <div class="mobile-input-group">
          <label for="">账号密码</label>
          <div>
            <input v-model="withdrawalData.password" type="password">
          </div>
        </div>

        <div class="mobile-input-group">
          <label for="">取款银行</label>
          <div>
            <select style="width:100%" v-model="withdrawalData.bank" name="">
              <option value="">请选择提款银行</option>
              <option v-for="item in bankList" :value="item.bankname">{{item.bankname}}</option>
            </select>
          </div>
        </div>

        <div class="mobile-input-group">
          <label for="">银行卡号</label>
          <div>
            <input readonly disabled type="text" :value="formatStr(withdrawalData.accountNo,4,4,6)">
          </div>
          <div class="btn-group">
            <mt-button @click="bindBankCard" size="small" type="primary">绑定银行卡</mt-button>
            <mt-button @click="unBindBank" size="small" type="primary">解绑银行卡</mt-button>
          </div>
        </div>

        <div class="mobile-input-group">
          <label for="">提款金额</label>
          <div>
            <input v-model="withdrawalData.amount" type="text" placeholder="单笔金额不能少于100">
          </div>
        </div>
        <div>
          <mt-button @click="withdrawSubmit" size="large" type="danger">确认提款</mt-button>
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
  import {commonHead, withdrawalModule, bindBankCardModule} from '@/common/js/mixin'
  import userHeader from 'MComponents/user-header/user-header'

  export default {
    mixins: [commonHead, withdrawalModule, bindBankCardModule],
    components: {userHeader},
    watch:{
      isShowCommonMaskPage(val) {
        this.setContentHeight(val)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'
  .withdraw
    mobile-wrapper()
    .options
      m-wrapper()
      margin-top 20px
      .btn-group
        margin-top 10px
        text-align right
        button
          margin-left 10px
    .content
      clearfix()
    .bind-bank-card-wrapper
      .bind-bank-card
        .btn-group
          button
            margin-bottom 10px

</style>