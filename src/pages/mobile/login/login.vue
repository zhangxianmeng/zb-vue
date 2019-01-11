<template>
  <div class="login-wrapper">
    <v-header @leftIconClick="back" :data="headData" @rightIconClick="openService"></v-header>
    <div class="content">
      <p class="center">
        <img class="logo" src="./img/logo2.png" alt="">
      </p>
      <div class="content">
        <div class="mobile-input-group">
          <label for="loginName">账号：</label>
          <input v-model="userFormData.loginName" id="loginName" type="text">
        </div>
        <div class="mobile-input-group">
          <label for="passWord">密码：</label>
          <input v-model="userFormData.passWord" id="passWord" type="password">
        </div>
        <p class="tip">
          <router-link to="/mobile/register">立即注册</router-link>
          <span>|</span>
          <router-link to="/mobile/help-self/forget-pwd">忘记密码？</router-link>
        </p>

        <div class="center">
          <mt-button @click="login" size="large" type="primary">登录</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {login,commonHead} from '@/common/js/mixin'
  export default {
    mixins:[login,commonHead],
    data() {
      return {
        userFormData: {
          loginName: '',
          passWord: ''
        }
      }
    },
    computed: {},
    created() {
    },
    methods: {
    },
    watch: {},
    components: {}

  }
</script>

<style lang="stylus" src="./login.styl" scoped></style>