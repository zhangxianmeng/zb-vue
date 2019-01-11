<template>
  <div class="transform-wrapper">
    <v-header :data="headData" @leftIconClick="back" @rightIconClick="openService"></v-header>
    <div class="content">
      <user-header></user-header>

      <div class="transform">
        <div class="mobile-input-group">
          <label for="">来源账户：<span class="red num">{{transformInBalance}}</span></label>
          <div>
            <select @change="_getGameMoney(1)" v-model="transformIn" name="">
              <option v-for="item in config.accountList" :value="item.value">{{item.text}}</option>
            </select>
          </div>
        </div>

        <div class="mobile-input-group">
          <label for="">目标账户：<span class="red num">{{transformOutBalance}}</span></label>
          <div>
            <select v-model="transformOut" name="">
              <option v-for="item in transforOutAccountList" :value="item.value">{{item.text}}</option>
            </select>
          </div>
        </div>

        <div class="mobile-input-group">
          <label class="label">转账金额</label>
          <div>
            <input v-model="amount" type="text">
          </div>
        </div>

        <div class="btn-group">
          <mt-button @click="updateGameMoney" size="large" type="danger">提交</mt-button>
          <mt-button @click="oneKeyGameMoney" size="large" type="primary">一键额度回归</mt-button>
        </div>

        <div class="tips">
          <h3>
            温馨提示：
          </h3>
          <p>
            1、"老虎机钱包账户"支持DT、MG、QT、NT、PNG、SW，若要游玩以上平台请将额度转入"老虎机钱包账户"即可。<br>

            2、请在户内转账前进行平台激活方可转账成功。<br>

            3、户内转账只支持整数转账。<br>

            4、进行户内转账时，请先关闭正在进行的游戏页面，避免出现错误。
          </p>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
  import userHeader from 'MComponents/user-header/user-header'
  import {commonHead,transformModule} from '@/common/js/mixin'

  export default {
    mixins: [commonHead,transformModule],
    data() {
      return {}
    },
    computed: {},
    methods: {},
    watch: {},
    components: {userHeader}

  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/mixin'
  .transform-wrapper
    mobile-wrapper()
    .transform
      m-wrapper()
      margin-top 20px
      select
        width 100%
      .num
        font-size 16px
    .btn-group
      button
        margin-bottom 10px

</style>