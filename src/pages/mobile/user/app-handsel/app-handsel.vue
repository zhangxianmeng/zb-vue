<template>
  <div class="app-handsel">
    <v-header :data="headData" @leftIconClick="back" @rightIconClick="openService"></v-header>
    <div class="content">
      <div class="box">
        <h2 class="red title">下载APP送彩金</h2>
        <p>
          <mt-button @click="downloadApp" type="primary">点击下载</mt-button>
        </p>
      </div>

      <div class="tips">
        <h3>
          苹果app下载温馨提示：
        </h3>
        <p>
        <p class="red">
          手机APP安装出现未信任软件，请您进入手机设置--通用--设备设置--golden
          skydragonmarket点击手中弹出窗口，点击信任就可以了。
        </p>
        </p>
      </div>

    </div>
  </div>
</template>

<script>
  import {commonHead} from '@/common/js/mixin'

  export default {
    mixins: [commonHead],
    data() {
      return {}
    },
    computed: {},
    methods: {
      downloadApp() {
        window.location.href = 'https://www.qnappzb.com/web/app.html'
      }
    },
    watch: {},
    components: {}

  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/mixin'
  @import '~common/stylus/variable'
  .app-handsel
    mobile-wrapper()
    .content
      margin-top 20px
      m-wrapper()
      h2
        font-size 20px
        margin-bottom 20px
      .box
        text-align center
        padding 50px 0
        border-bottom 1px solid $color-border-gray
</style>