<template>
  <div class="account-settings">
    <v-header :data="headData" @leftIconClick="back" @rightIconClick="openService"></v-header>
    <div class="content">
      <div class="tab-border-wrapper">
        <tab-border @selectTabItem="selectItem" :list="tabTitleList" :currentIdx="currentIdx"></tab-border>
      </div>
      <!--基本资料-->
      <div v-if="currentIdx===0">
        <div v-if="userInfo.accountName" class="mobile-input-group">
          <label class="label">真实姓名：{{formatStr(userInfo.accountName,1,0,2)}}</label>
        </div>

        <div v-if="!userInfo.accountName" class="mobile-input-group">
          <label class="label">
            真实姓名：
            <mt-button @click="goTobindName" type="primary" size="small">点击绑定</mt-button>
          </label>
        </div>

        <div class="mobile-input-group">
          <label class="label">注册邮箱：{{formatStr(userInfo.email,4,8,5)}}</label>
        </div>

        <div class="mobile-input-group">
          <label class="label">手机号码：{{formatStr(userInfo.phone,3,4,4)}}</label>
        </div>

        <div v-if="userInfo.birthday" class="mobile-input-group">
          <label class="label">生日：{{userInfo.birthday | Date('yyyy-MM-dd')}}</label>
        </div>
        <div v-if="!userInfo.birthday" class="mobile-input-group">
          <label class="label">生日：</label>
          <div>
            <el-date-picker type="date" placeholder="选择日期" v-model="baseInfo.birthday"
                            style="width: 100%;height:40px"></el-date-picker>
          </div>
        </div>


        <div class="mobile-input-group">
          <label class="label">QQ号码：</label>
          <div>
            <input v-model="baseInfo.qq" type="text">
          </div>
        </div>

        <div class="mobile-input-group">
          <label class="label">用户昵称：</label>
          <div>
            <input v-model="baseInfo.aliasName" type="text">
          </div>
        </div>

        <div class="mobile-input-group">
          <label class="label">微信：</label>
          <div>
            <input v-model="baseInfo.microchannel" type="text">
          </div>
        </div>

        <div class="mobile-input-group">
          <label class="label"></label>
          <div>
            <mt-button size="large" @click="changeInfo" type="danger">提交</mt-button>
          </div>
        </div>


      </div>

      <!--修改密码-->
      <div v-if="currentIdx===1">

        <div class="mobile-input-group">
          <span class="label">原密码</span>
          <div>
            <input v-model="pwd.oldPwd" type="password">
          </div>
        </div>

        <div class="mobile-input-group">
          <span class="label">新密码</span>
          <div>
            <input v-model="pwd.newPwd" type="password">
          </div>
        </div>

        <div class="mobile-input-group">
          <span class="label">确认新密码</span>
          <div>
            <input v-model="pwd.rePwd" type="password">
          </div>
        </div>

        <div class="mobile-input-group">
          <span class="label"></span>
          <div>
            <mt-button size="large" @click="changePwd" type="danger">提交</mt-button>
          </div>
        </div>

        <div class="tips">
          <h3>
            温馨提示：
          </h3>
          <p>
            1. 修改密码请注意大小写。
          </p>
        </div>


      </div>


      <!--绑定银行卡-->
      <div v-if="currentIdx===2">
        <div class="mobile-input-group">
          <span class="label">卡/折号</span>
          <div>
            <input @change="getBankInfo" v-model="bankCard.bankno" type="text">
          </div>
        </div>

        <div class="mobile-input-group">
          <span class="label">银行名称</span>
          <div>
            <input readonly disabled :value="bankCard.bankname" type="text">
          </div>
        </div>
        <div class="mobile-input-group">
          <span class="label">登录密码</span>
          <div>
            <input v-model="bankCard.password" :type="inputType">
          </div>
        </div>

        <div class="mobile-input-group">
          <span class="label">姓名</span>
          <div>
            <input v-if="userInfo.accountName" v-model="bankCard.xinMing" readonly disabled type="text">
            <input v-if="!userInfo.accountName" v-model="bankCard.xinMing" type="text">
          </div>
        </div>

        <div class="mobile-input-group">
          <mt-button size="large" @click="mainbandingBankno" type="danger">提交</mt-button>
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
  </div>
</template>

<script>
  import tabCard from 'MComponents/tab-card/tab-card'
  import tabBorder from 'MComponents/tab-border/tab-border'
  import {commonHead, bindBankCardModule, accountSettingsModule} from '@/common/js/mixin'
  import Vue from 'vue'
  import {DatePicker} from 'element-ui'

  Vue.use(DatePicker)
  export default {
    mixins: [commonHead, bindBankCardModule, accountSettingsModule],
    data() {
      return {}
    },
    computed: {},
    methods: {},
    watch: {},
    components: {tabCard, tabBorder}

  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/mixin'
  .account-settings
    mobile-wrapper()
    .content
      margin-top 10px
      m-wrapper()
    .tab-border-wrapper
      margin-bottom 15px


</style>