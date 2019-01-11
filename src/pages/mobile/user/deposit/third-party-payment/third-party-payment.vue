<template>
  <div>
    <!--===========支付选项页面==========-->
    <div class="pay-options-page">

      <!--支付通道-->
      <div class="mobile-input-group">
        <span class="label">支付通道</span>
        <div>
          <pay-way-tab
              @selectPayWay="payWaySelect"
              :list="obj.payWayList"
              :currentIdx="obj.payWayCurrentIdx">
          </pay-way-tab>
        </div>
      </div>
      <div class="mobile-input-group">
        <div>
          若选择的通道无法存款，请点选其他支付通道
        </div>
      </div>

      <!--存款姓名-->
      <div v-if="!obj.isThirdPartyPay" class="mobile-input-group">
        <span class="label">存款姓名</span>
        <div>
          <input v-model="obj.depositName" placeholder="请输入转账的真实姓名" type="text">
        </div>
      </div>
      <!--存款金额-->
      <div class="mobile-input-group">
        <span class="label">存款金额</span>
        <div>
          <account-select-tab
              ref="accountWrapper"
              @selectAmount="amountSelect"
              @amountChang="amountChange"
              :range="obj.range"
              :depositMoney="obj.depositMoney"
              :currentIdx="obj.accountCurrentIdx"
              :isShowInput="isShowInput"
              :list="commonAccountList">
          </account-select-tab>
        </div>
      </div>
      <!--实际到账-->
      <div class="mobile-input-group">
        <span class="label">实际到账</span>
        <span class="red actual">{{ _calcActualAmount(obj.discount,obj.depositMoney) || 0}} 元</span>

        <div class="actual-account">
          <p class="red">
            当前账户余额 {{userInfo.credit}} 元
          </p>
          <p class="red">
            充值后账户余额 {{(userInfo.credit+_calcActualAmount(obj.discount,obj.depositMoney)).toString().$toFixed(2)}} 元，您将获得
            {{obj.depositMoney}} 积分
          </p>
        </div>
      </div>
      <!--支付银行-->
      <div v-if="obj.payBankList" class="mobile-input-group">
        <span class="label">支付银行</span>
        <div>
          <pay-way-tab
              @selectPayWay="payBankSelect"
              :list="obj.payBankList"
              :currentIdx="obj.payBankCurrentIdx">
          </pay-way-tab>
        </div>
      </div>

      <!--账户余额-->
      <div class="mobile-input-group">

      </div>
      <!--支付按钮-->
      <div class="mobile-input-group">
        <div class="actual-account">
          <mt-button size="large" v-if="obj.isThirdPartyPay" type="danger" @click="commonDeposit(obj.currentPayWay)">立即充值</mt-button>
          <mt-button size="large" v-if="!obj.isThirdPartyPay" type="danger" @click="secondsDeposit(obj.currentPayWay,{})">
            立即充值
          </mt-button>
        </div>
      </div>

      <!--温馨提示-->
      <div v-if="obj.tooltip" class="tips">
        <h3>{{obj.tooltip.title}}</h3>
        <div v-for="(item,idx) in obj.tooltip.items">
          <p>
            {{(idx+1)}}、<span v-html="item.text"></span>
          </p>
          <p v-if="item.sub" v-for="(itemSub,index) in item.sub">
            ({{(index+1)}}) <span v-html="itemSub.text"></span>
          </p>
        </div>
      </div>


    </div>

    <!--===========确认存款信息页面==========-->
    <div v-if="obj.state" class="confirm-deposit">
      <!--带小数点限额提示页面-->
      <div v-if="obj.stateSub" class="confirm-quota-page">
        <div class="red confirm-quota-tit">
          <p>您需要存入金额：</p>
          <p class="num">{{obj.depositInfo.amount}}</p>
          <p>温馨提示：请您存入该金额，否则存款无法到账
            本订单有效时间为2小时</p>
        </div>
        <div class="confirm-checkbox">
          <p>
            <label for="agree">
              <input v-model="obj.agree" id="agree" type="checkbox">
              我已明白需要转账 <span class="red num">{{obj.depositInfo.amount}}</span> 元
            </label>
          </p>
          <p>
            <label for="reAgree">
              <input v-model="obj.reAgree" id="reAgree" type="checkbox">
              本人已同意，如未转账 <span class="red num">{{obj.depositInfo.amount}}</span> 元，导致系统无法匹配存款，尊宝国际概不负责！
            </label>
          </p>
          <p>
            实际到账金额：<span class="red num">{{obj.depositInfo.amount}}</span> 元
          </p>
        </div>
        <div class="center">
          <mt-button @click="closeConfirmQuotaPage" type="danger">下一步</mt-button>
        </div>
      </div>
      <!--确认存款信息页面-->
      <div class="confirm-deposit-page">
        <h3 class="confirm-title">请确认收款信息，并完成存款</h3>
        <div class="confirm-info">
          <div class="input-group">
            <span class="label">收款银行：</span>
            <div>{{obj.depositInfo.bankname}}</div>
          </div>
          <div class="input-group">
            <span class="label">收款卡号：</span>
            <div>
              <span>{{obj.depositInfo.accountno}}</span>
              <mt-button type="danger"
                         @click="copy"
                         size="small"
                         class="tag-read"
                         :data-clipboard-text="obj.depositInfo.accountno">
                复制
              </mt-button>
            </div>
          </div>
          <div class="input-group">
            <span class="label">收款姓名：</span>
            <div>
              <span>{{obj.depositInfo.username}}</span>
              <mt-button type="danger"
                         @click="copy"
                         size="small"
                         class="tag-read"
                         :data-clipboard-text="obj.depositInfo.username">
                复制
              </mt-button>
            </div>
          </div>
          <div class="input-group">
            <span class="label">附言：</span>
            <div>
              <span>{{obj.depositInfo.depositId}}</span>
              <mt-button v-if="obj.depositInfo.depositId" type="danger"
                         @click="copy"
                         size="small"
                         class="tag-read"
                         :data-clipboard-text="obj.depositInfo.depositId">
                复制
              </mt-button>
            </div>
          </div>
          <div class="input-group">
            <span class="label">存款金额：</span>
            <div><span class="red" style="font-size:18px">{{obj.depositInfo.amount}} 元</span></div>
          </div>
        </div>
        <div class="confirm-foot">
          <p class="red">
            仅本次有效，下次存款请重新获取 <br>
            请务必保存存款成功截图，未到账可提供给在线客服
          </p>
          <div class="btn-group">
            <mt-button @click="closeConfirmPage()">返回修改</mt-button>
            <mt-button @click="closeConfirmPage()" type="danger">我已成功转账</mt-button>
            <mt-button @click="reSecondsDeposit(obj.currentPayWay,true)" type="danger">存款失败，重新获取收款账户
            </mt-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./third-party-payment.js"></script>
<style lang="stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'
  .pay-options-page
    .mobile-input-group
      margin-bottom 20px
      .label
        margin-bottom 10px
        display inline-block
        margin-right 10px
      .actual
        font-size 16px
      .actual-account
        line-height 21px
      label
        margin-bottom 0
  .confirm-deposit
    padding-top 70px
    m-wrapper()
    position fixed
    top 0
    left 0
    width 100%
    min-height 100vh
    background $color-gray-background
    line-height 24px
    .confirm-title
      font-size 16px
      color $color-danger
    .input-group
      margin-bottom 5px
      .label
        flex 0 0 80px
        width 80px
        text-align left
      .label + div
        margin 0
        flex 1
        display flex
        justify-content space-between
    .confirm-info
      background $color-light
      padding 10px
      margin 10px 0
    .btn-group
      margin-top 10px
      button
        margin 0 10px 10px 0
  .confirm-quota-page
    padding-top 70px
    m-wrapper()
    position fixed
    z-index 999
    left 0
    top 0
    width 100%
    min-height 100vh
    background $color-gray-background
    .confirm-quota-tit
      font-size 20px
      text-align center
      line-height 32px
      margin-bottom 10px
    .num
      font-size 20px
      font-weight 600
    .confirm-checkbox
      margin-bottom 10px

</style>