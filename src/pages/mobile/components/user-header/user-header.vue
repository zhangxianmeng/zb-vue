<template>
  <div class="user-header">
    <div class="left">
      <p>
        <img src="./img/icon-member.png" alt="">
      </p>
      <p>
        <router-link class="btn" to="/mobile/user/account-settings">个人资料</router-link>
      </p>
    </div>
    <div class="right">
      <p class="login-name">您好：{{userInfo.loginname}}</p>
      <p class="level">会员等级：{{userInfo.level | level}}</p>
      <div class="account-list">
        <select v-model="gameCode" @change="getGameMoney">
          <option value="">余额查询</option>
          <option v-for="item in config.accountList" :value="item.value">{{item.text}}</option>
        </select>
      </div>
      <p class="balance">
        <span>余额：</span><span class="num">{{ balance }}</span><i @click="getGameMoney" class="iconfont icon-shuaxin refresh"></i>
      </p>
      <p class="points">我的积分：{{points}} 分</p>
      <p>签到余额：{{signAmount}} 元</p>
    </div>
  </div>
</template>

<script>
  import {queryAccountBalance,queryPoints,querySignAmount} from "@/common/js/mixin"
  import {mapGetters} from 'vuex'

  export default {
    mixins: [queryAccountBalance,queryPoints,querySignAmount],
    data() {
      return {}
    },
    computed: {
      ...mapGetters(['userInfo', 'points', 'signAmount'])
    },
    created() {
      this._querySignAmount() //查询签到余额
    },
    methods: {},
    watch: {},
    components: {}

  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/mixin'
  @import '~common/stylus/variable'
  .user-header
    height 170px
    background url(./img/mc_bg.jpg) no-repeat center
    display flex
    align-items center
    color $color-light
    m-wrapper()
    line-height 22px
    .left
      text-align center
      margin-right 20px
      flex 0 0 80px
      img
        width 100%
      .btn
        background $color-intersperse
        color $color-light
        padding 5px 10px
        display inline-block
        margin-top 10px
    .right
      .account-list
        margin 5px 0
        .num
          margin 0 5px
      .refresh
        margin-left 10px
      .balance
        no-wrap()


</style>