<template>
  <div class="error-main">
    <div>
      <img src="./img/404.png" alt="">
      <p>啊哦~一不小心闯进了未知领域，请点击下面按钮返回首页</p>
      <span class="btn" @click="goBackIndex">返回首页</span>
    </div>
  </div>
</template>
<script>
  import {isMobilePlatform} from '@/common/js/util'

  export default {
    methods: {
      goBackIndex() {
        if (isMobilePlatform()) {
          this.$router.push('/mobile')
        } else {
          this.$router.push('/')
        }

      }
    }
  }
</script>
<style lang="stylus" scoped>
  .error-main
    display flex
    justify-content center
    text-align center
    padding 100px 0 0
    img
      max-width 100%
    p
      margin 40px 0
    span.btn
      border-radius: 8px;
      line-height: 40px;
      text-align: center;
      text-decoration: none;
      display: block;
      width: 150px;
      height: 40px;
      background-color: #09affe;
      color: #fff;
      font-size: 20px;
      margin: 0 auto;
      cursor pointer
      transition all .3s ease-in
      &:hover
        opacity .85
</style>