<template>
  <div class="unbind-card">
    <v-header :data="headData" @leftIconClick="back" @rightIconClick="openService"></v-header>
    <div class="form content">
      <div class="mobile-input-group">
        <label>解绑银行卡号</label>
        <input v-model="unBindBankinfoData.bankno" type="text">
      </div>

      <div class="center">
        <mt-button @click="unBindBankinfo" size="small" type="danger">去解绑</mt-button>
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
          title: '忘记密码',
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
  .unbind-card
    mobile-wrapper()
    m-wrapper()
    .content
      padding 30px 0
</style>