<template>
  <div v-if="slides.length" :style="styleObj" class="slide-show" @mouseover="clearInv" @mouseout="runInv">
    <div class="slide-img">
      <a href="javascript:;" @click="goToThisPage(slides[nowIndex])">
        <transition name="slide-fade">
          <img v-if="isShow" :src="slides[nowIndex].src">
        </transition>
        <transition name="slide-fade">
          <img v-if="!isShow" :src="slides[nowIndex].src">
        </transition>
      </a>
    </div>
    <div class="indicator" v-if="isShowIndicator">
      <div class="indicator-wrapper">
        <a :class="{active: index === nowIndex}" v-for="(item, index) in slides" @mouseover="goto(index)"
           href="javascript:;"></a>
      </div>
    </div>

    <span class="prev-btn" @click="goto(prevIndex)"><i class="iconfont icon-arrowr"></i></span>
    <span class="next-btn" @click="goto(nextIndex)"><i class="iconfont icon-arrowr icon-arrow-right"></i></span>
  </div>
</template>

<script>
  export default {
    props: {
      slides: {
        type: Array,
        default: []
      },
      inv: {
        type: Number,
        default: 1000
      },
      isShowIndicator: {
        type: Boolean,
        default: true
      },
      height: {
        type: Number,
        default: 400
      }
    },
    data() {
      return {
        nowIndex: 0,
        isShow: true
      }
    },
    computed: {
      prevIndex() {
        if (this.nowIndex === 0) {
          return this.slides.length - 1
        }
        else {
          return this.nowIndex - 1
        }
      },
      nextIndex() {
        if (this.nowIndex === this.slides.length - 1) {
          return 0
        }
        else {
          return this.nowIndex + 1
        }
      },
      styleObj() {
        return {
          height: `${this.height}px`
        }
      }
    },
    methods: {
      goToThisPage(item) {
        let href = item.href
        if (this._isHttpUrl(href)) {
          window.open(href)
          return
        }
        if (!this._isHttpUrl(href)) {
          this.$router.push(href)
        }
      },
      goto(index) {
        this.isShow = false
        setTimeout(() => {
          this.isShow = true
          this.nowIndex = index
        }, 10)
      },
      runInv() {
        this.invId = setInterval(() => {
          this.goto(this.nextIndex)
        }, this.inv)
      },
      clearInv() {
        clearInterval(this.invId)
      },
      _isHttpUrl(string) {
        return /^http/.test(string)
      },
    },
    mounted() {
      this.runInv();
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  .slide-show
    position: relative
    overflow: hidden
    &:hover .prev-btn,&:hover .next-btn
      opacity .7

  .slide-img img
    position: absolute
    top: 0
    left: 50%
    margin-left: -960px

  .indicator
    position absolute
    bottom 40px
    left 0
    width 100%
    display flex
    justify-content center
    z-index 99
    .indicator-wrapper
      a
        float left
        width 30px
        height 8px
        background $color-light
        margin 0 4px
        &.active
          background $color-intersperse

  .prev-btn, .next-btn
    position absolute
    top 50%
    width 30px
    height 30px
    border-radius 50%
    text-align center
    line-height 30px
    background rgba(0, 0, 0, .7)
    opacity 0
    margin-top -15px
    cursor pointer
    transition all .3s ease-in

    .iconfont
      color #fff
    &:hover
      opacity .9

  .next-btn
    right 30px

  .prev-btn
    left 30px

  .icon-arrow-right
    display: inline-block
    transform: rotate(180deg)

</style>
