<template>
  <div class="redPacket-transfrom-wrapper">
    <v-header :data="headData" @leftIconClick="back" @rightIconClick="openService"></v-header>
    <div class="content">
      <user-header></user-header>
      <div class="redPacket-transfrom">

        <div class="mobile-input-group">
          <label class="label">来源账户：<span class="red num">{{transformInBalance}}</span></label>
          <div>
            <select @change="_getGameMoney(1)" v-model="transformIn" name="">
              <option v-for="item in transformInAccountList" :value="item.value">{{item.text}}</option>
            </select>
          </div>
        </div>

        <div class="mobile-input-group">
          <label class="label">目标账户：<span class="red num">{{transformOutBalance}}</span></label>
          <div>
            <select @change="_getGameMoney(2)" v-model="transformOut" name="">
              <option v-for="item in transformOutAccountList" :value="item.value">{{item.text}}</option>
            </select>
          </div>
        </div>

        <div class="mobile-input-group">
          <label for="">转账金额</label>
          <div>
            <input v-model="amount" type="text">
          </div>
        </div>

        <div>
          <mt-button size="large" @click="transformMoney" type="danger">执行转账</mt-button>
        </div>

        <!--分割线-->
        <div class="input-group split"></div>

        <div class="mobile-input-group">
          <label class="label">好友账户</label>
          <div>
            <input v-model="friendAccount" type="text">
          </div>
        </div>

        <div class="mobile-input-group">
          <label class="label">转账金额</label>
          <div>
            <input v-model="friendTransformAmount" type="text">
          </div>
        </div>

        <div class="mobile-input-group">
          <label class="label"></label>
          <div>
            <mt-button size="large" @click="transferInforRedRaintoUser" type="danger">转给好友</mt-button>
          </div>
        </div>

        <div class="tips">
          <h3>
            温馨提示：
          </h3>
          <p>
            1、红包账户可转入游戏平台，达到流水即可提款。

            <br>2、转给好友需输入完整帐号，若因自身原因转错产生的一切纠纷，恕无法处理。
          </p>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
  import userHeader from 'MComponents/user-header/user-header'

  import {commonHead,redPacketTransformModule} from '@/common/js/mixin'
  export default {
    mixins: [commonHead,redPacketTransformModule],
    data() {
      return {}
    },
    computed: {},
    methods: {
    },
    watch: {},
    components: {userHeader}

  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/mixin'
  .redPacket-transfrom-wrapper
    mobile-wrapper()
    .redPacket-transfrom
      margin-top 20px
      m-wrapper()
      select
        width 100%
      .num
        font-size 16px
</style>