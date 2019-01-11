<template>
  <div v-if="bannerList.length" class="banner-wrapper">
    <mt-swipe :auto="4000" :style="{height:height+'px',minHeight:'170px'}">
      <mt-swipe-item v-for="(item,idx) in bannerList">
        <a href="javascript:;" @click="goToThisPage(item)">
          <img width="100%" @load="loadImg" v-lazy="imgObj(item.src)" alt="">
        </a>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {Swipe, SwipeItem} from 'mint-ui'

  Vue.component(Swipe.name, Swipe)
  Vue.component(SwipeItem.name, SwipeItem)

  export default {
    data() {
      return {
        height: 200,
        currentIdx: 0
      }
    },
    props: {
      bannerList: {
        type: Array,
        default: []
      }
    },
    computed: {},
    mounted() {
    },
    methods: {
      loadImg(e) {
        if (!this.isLoad) {
          this.isLoad = true
          this.$Lazyload.$once('loaded', ({el, src}) => {
            this.height = el.scrollHeight
          })
        }
      },
      imgObj(src) {
        return {
          src,
          loading: `${this.baseUrl}images/loading.jpg`
        }
      },
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
      _isHttpUrl(string) {
        return /^http/.test(string)
      }
    },
    watch: {},
    components: {}

  }
</script>

<style lang="stylus" scoped>
  .banner-wrapper
    a.link
      display block
      height 100%
</style>