<template>
  <div class="header-banner">
    <div>
      <p><img class="avator" src="./img/icon-member.png" alt=""></p>
      <p class="account">
        账户：{{userInfo.loginname}} （代理）
      </p>
      <p class="balance">
        <span>老虎机佣金：{{slotAmount}}元 <i @click="getUserStatus" class="iconfont icon-shuaxin refresh"></i></span>
        <span>其他佣金：{{balance}} <i @click="getGameMoney" class="iconfont icon-shuaxin refresh"></i></span>
      </p>
    </div>
  </div>
</template>

<script>
  import {getUserStatus} from '@/api/index'
  import {mapGetters,mapMutations} from 'vuex'
  import {getGameMoney} from "@/common/js/mixin"

  export default {
    mixins:[getGameMoney],
    data() {
      return {}
    },
    computed: {
      ...mapGetters(['userInfo','slotAmount'])
    },
    created() {
    },
    methods: {
      //刷新老虎机账户余额
      getUserStatus() {
        getUserStatus().then((res) => {
          if (this.ERR_OK === res.code) {
            this.SET_SLOT_AMOUNT(res.data)
          } else {
            this.$message({
              type: 'warning',
              message: res.message
            })
          }
        })
      },
      ...mapMutations([
        'SET_SLOT_AMOUNT'
      ])
    },
    watch: {},
    components: {}

  }
</script>

<style lang="stylus" scoped>
.header-banner
  height 160px
  background url(./img/mc_bg.jpg) no-repeat center
  background-size cover
  color #fff
  text-align center
  display flex
  align-items center
  justify-content center
  .avator
    width 70px
  .account
    margin 15px 0
  .balance
    span
      margin-right 20px
      &:last-child
        margin-right 0
    .refresh
      margin-left 5px
</style>