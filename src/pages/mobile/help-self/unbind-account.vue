<template>
  <div class="unbind-account">
    <v-header :data="headData" @leftIconClick="back" @rightIconClick="openService"></v-header>
    <div class="form content">
      <div class="mobile-input-group">
        <label>游戏账号</label>
        <input v-model="unlockAccountByInfoData.loginName" type="text">
      </div>

      <div class="mobile-input-group">
        <label>注册姓名</label>
        <input v-model="unlockAccountByInfoData.accountName" type="text">
      </div>

      <div class="mobile-input-group">
        <label>注册手机号</label>
        <input v-model="unlockAccountByInfoData.phone" type="text">
      </div>

      <div class="mobile-input-group">
        <label>注册邮箱</label>
        <input v-model="unlockAccountByInfoData.email" type="text">
      </div>

      <div class="center">
        <mt-button @click="unlockAccountByInfo" size="small" type="danger">去解冻</mt-button>
      </div>

    </div>

  </div>
</template>

<script>
  import {safeCenter} from '@/common/js/mixin'

  export default {
    mixins: [safeCenter],
    data() {
      return {
        headData: {
          title: '解冻账号',
          leftIcon: 'arrowr',
          rightIcon: 'kefu1',
        },
      }
    },
    computed: {},
    created() {
    },
    methods: {
      back() {
        this.$router.back()
      },
      openService() {
        this.$router.push('/mobile/self-help')
      },
    },
    watch: {},
    components: {}

  }
</script>

<style lang="stylus">
  @import '~common/stylus/mixin'
  .unbind-account
    mobile-wrapper()
    m-wrapper()
    .content
      padding 30px 0
</style>