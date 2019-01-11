<template>
  <div>
    <tab-title @selectItem="selectItem" :tab-title-list="tabTitleList" :currentIdx="currentIdx"></tab-title>
    <div class="border-content">
      <div class="input-group">
        <span class="label">密码</span>
        <div>
          <input v-model="withdrawalData.password" type="password">
        </div>
      </div>

      <div class="input-group">
        <span class="label">银行名称</span>
        <div>
          <select v-model="withdrawalData.bank">
            <option value="">请选择银行</option>
            <option v-for="item in bankList" :value="item.bankname">{{item.bankname}}</option>
          </select>
        </div>
        <el-button @click="goToBindBank" size="small" type="primary" class="small-btn">绑定银行卡</el-button>
        <el-button @click="unBindBank" size="small" type="primary" class="small-btn">解绑银行卡</el-button>
      </div>

      <div class="input-group">
        <span class="label">卡/折号</span>
        <div>
          <input readonly disabled :value="formatStr(withdrawalData.accountNo,4,4,6)" type="text">
        </div>
      </div>

      <div class="input-group">
        <span class="label">提款类型</span>
        <div>
          <select v-model="withdrawalData.tkType">
            <option value="slotmachine">老虎机</option>
            <option value="liveall">其他</option>
          </select>
        </div>
      </div>

      <div class="input-group">
        <span class="label">提款金额</span>
        <div>
          <input @focus="agentWithdrawpz" v-model="withdrawalData.amount" type="text">
        </div>
      </div>

      <div class="input-group">
        <span class="label"></span>
        <div>
          <p class="red">{{tipText}}</p>
        </div>
      </div>

      <div class="input-group">
        <span class="label"></span>
        <div>
          <!--<p>-->
            <!--<label for="isAgree">-->
              <!--<input id="isAgree" type="checkbox" v-model="isAgree">-->
              <!--我已读过 <a @click.stop="withdrawalRule" class="link" href="javascript:;">《提款须知》</a>，并已清楚了解其规则。-->
            <!--</label>-->
          <!--</p>-->
          <p>
            <el-button @click="withdrawal" type="danger">提交</el-button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import tabTitle from '@/components/tab-title/tab-title'
  import {agentWithdrawal} from '@/common/js/mixin'

  export default {
    mixins:[agentWithdrawal],
    components: {tabTitle}

  }
</script>

<style lang="stylus" scoped>

</style>