<template>
  <div class="forget-pwd">
    <v-header :data="headData" @leftIconClick="back" @rightIconClick="openService"></v-header>
    <div class="tab-card-wrapper">
      <tab-card :list="list" :currentIdx="currentIdx" @selectTabItem="selectTabItem"></tab-card>
    </div>
    <div class="form">

      <div v-if="currentIdx === 0">
        <div class="mobile-input-group">
          <label for="dxAccount">游戏账号</label>
          <input id="dxAccount" v-model="getbackPwdByDxData.name" type="text">
        </div>
        <div class="mobile-input-group">
          <label for="">手机号</label>
          <input v-model="getbackPwdByDxData.phone" type="text">
        </div>
        <div class="center">
          <mt-button @click="getbackPwdByDx" size="small" type="danger">找回密码</mt-button>
        </div>
      </div>

      <div v-if="currentIdx === 1">
        <div class="mobile-input-group">
          <label for="">游戏账号</label>
          <input id="" v-model="getbackPwdByEmailData.name" type="text">
        </div>
        <div class="mobile-input-group">
          <label for="dxAccount">注册邮箱</label>
          <input v-model="getbackPwdByEmailData.email" type="text">
        </div>

        <div class="mobile-input-group">
          <label for="dxAccount">验证码</label>
          <div class="code">
            <input v-model="getbackPwdByEmailData.code" type="text">
            <img @click="changeCode" :src="validateCodeForIndex" alt="">
          </div>
        </div>

        <div class="center">
          <mt-button @click="getbackPwdByEmail" size="small" type="danger">找回密码</mt-button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import TabCard from 'MComponents/tab-card/tab-card'
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
        list: [
          {
            text: '短信找回',
          },
          {
            text: '邮箱找回',
          },
        ],
        currentIdx: 0
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
      selectTabItem(idx) {
        this.currentIdx = idx
      }
    },
    watch: {},
    components: {TabCard}

  }
</script>

<style lang="stylus">
  @import '~common/stylus/mixin'
  .forget-pwd
    mobile-wrapper()
    m-wrapper()
  .tab-card-wrapper
    padding 30px 0
</style>