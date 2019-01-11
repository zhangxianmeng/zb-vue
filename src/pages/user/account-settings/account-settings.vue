<template>
  <div>
    <tab-title @selectItem="selectItem" :tab-title-list="tabTitleList" :currentIdx="currentIdx"></tab-title>
    <div class="border-content">
      <!--基本资料-->
      <div v-if="currentIdx===0">
        <div v-if="userInfo.accountName" class="input-group">
          <span class="label">真实姓名</span>
          <div>
            {{formatStr(userInfo.accountName,1,0,2)}}
          </div>
        </div>

        <div v-if="!userInfo.accountName" class="input-group">
          <span class="label">真实姓名</span>
          <div>
            <el-button size="small" class="small-btn" @click="goTobindName" type="primary">点击绑定</el-button>
          </div>
        </div>

        <div class="input-group">
          <span class="label">注册邮箱</span>
          <div>
            {{formatStr(userInfo.email,4,8,5)}}
          </div>
        </div>

        <div class="input-group">
          <span class="label">手机号码</span>
          <div>
            {{formatStr(userInfo.phone,3,4,4)}}
          </div>
        </div>

        <div class="input-group">
          <span class="label">生日</span>
          <div>
            <span v-if="userInfo.birthday">{{userInfo.birthday | Date('yyyy-MM-dd')}}</span>
            <el-date-picker v-if="!userInfo.birthday" type="date" placeholder="选择日期" v-model="baseInfo.birthday"
                            style="width: 100%;"></el-date-picker>
          </div>
        </div>


        <div class="input-group">
          <span class="label">QQ号码</span>
          <div>
            <input v-model="baseInfo.qq" type="text">
          </div>
        </div>

        <div class="input-group">
          <span class="label">用户昵称</span>
          <div>
            <input v-model="baseInfo.aliasName" type="text">
          </div>
        </div>

        <div class="input-group">
          <span class="label">微信</span>
          <div>
            <input v-model="baseInfo.microchannel" type="text">
          </div>
        </div>

        <div class="input-group">
          <span class="label"></span>
          <div>
            <el-button @click="changeInfo" type="danger">提交</el-button>
          </div>
        </div>


      </div>

      <!--修改密码-->
      <div v-if="currentIdx===1">

        <div class="input-group">
          <span class="label">原密码</span>
          <div>
            <input v-model="pwd.oldPwd" type="password" >
          </div>
        </div>

        <div class="input-group">
          <span class="label">新密码</span>
          <div>
            <input v-model="pwd.newPwd" type="password" >
          </div>
        </div>

        <div class="input-group">
          <span class="label">确认新密码</span>
          <div>
            <input v-model="pwd.rePwd" type="password">
          </div>
        </div>

        <div class="input-group">
          <span class="label"></span>
          <div>
            <el-button @click="changePwd" type="danger">提交</el-button>
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
        <div class="input-group">
          <span class="label">卡/折号</span>
          <div>
            <input @change="getBankInfo" v-model="bankCard.bankno" style="width:240px" type="">
          </div>
        </div>

        <div class="input-group">
          <span class="label">银行名称</span>
          <div>
            <input readonly disabled :value="bankCard.bankname" type="text">
          </div>
        </div>

        <div class="input-group">
          <span class="label">登录密码</span>
          <div>
            <input v-model="bankCard.password" :type="inputType">
          </div>
        </div>

        <div class="input-group">
          <span class="label">姓名</span>
          <div>
            <input v-if="userInfo.accountName" v-model="bankCard.xinMing" readonly disabled type="text">
            <input v-if="!userInfo.accountName" v-model="bankCard.xinMing" type="text">
          </div>
        </div>

        <div class="input-group">
          <span class="label"></span>
          <div>
            <el-button @click="mainbandingBankno" type="danger">提交</el-button>
          </div>
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
  import tabTitle from '@/components/tab-title/tab-title'
  import {bindBankCardModule, accountSettingsModule} from '@/common/js/mixin'

  export default {
    mixins: [bindBankCardModule, accountSettingsModule],
    components: {tabTitle}

  }
</script>

<style lang="stylus" scoped></style>