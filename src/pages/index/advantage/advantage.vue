<template>
  <div class="advantage" @click="isShowAdvantage = true">
    <div v-if="!isShowAdvantage" class="advantage-wr">
      <img class="text1" src="./img/text1.png" alt="">
      <img class="arrow" src="./img/btn.png" alt="">
    </div>
    <transition name="opacity">
      <div v-if="isShowAdvantage" class="app-download">
        <img src="./img/text2.png" alt="">
        <div class="ewm">
          <div>
            <img class="code" :src="ewm" alt="">
            <img src="./img/android.png" alt="">
          </div>
          <div>
            <img class="code" :src="ewm" alt="">
            <img src="./img/ios.png" alt="">
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isShowAdvantage: false,
        ewm: require('@/common/image/zb-app.png')
      }
    },
    computed: {},
    created() {
    },
    methods: {},
    watch: {},
    components: {}

  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'
  .advantage
    height 320px
    background url("./img/bg.jpg") no-repeat center
    position relative
    cursor: pointer
    padding-top 50px
    text-align center
    overflow hidden
    .advantage-wr
      .arrow
        position absolute
        left 50%
        bottom 0
        margin-left -44px
        padding 20px
        animation: downUp .9s ease infinite alternate

    .app-download
      text-align center
      .ewm
        display flex
        width 280px
        margin 0 auto
        margin-top 20px
        div
          width 130px
          margin 0 10px
        img.code
          width 100%
          margin-bottom 5px

  @keyframes downUp {
    0% {
      transform: translate3d(0, -20px, 0)
    }
    100% {
      transform: translate3d(0, 20px, 0)
    }
  }
</style>