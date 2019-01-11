<template>
  <div class="header-wrapper">
    <download @closeDownload="closeDownload" v-if="data.download"></download>
    <div style="position: relative">
      <mt-header :title="data.title">
        <mt-button slot="left" @click="leftIconClick">
          <i v-if="data.leftIcon" :class="leftIcon"></i>
        </mt-button>
        <mt-button slot="right" @click="rightIconClick">
          <i v-if="data.rightIcon"  :class="rightIcon"></i>
        </mt-button>
      </mt-header>
      <router-link to="/mobile"><img class="logo" :src="data.logo" alt=""></router-link>
    </div>
  </div>
</template>

<script>
  import download from 'MComponents/download/download'
  export default {
    data() {
      return {}
    },
    props: {
      data: {
        type: Object,
        default: {
          title: '',
          leftIcon: '',
          rightIcon: '',
          logo: '',
          download:false
        }
      },
    },
    computed: {
      leftIcon() {
        return `iconfont icon-${this.data.leftIcon}`
      },
      rightIcon() {
        return `iconfont icon-${this.data.rightIcon}`
      }
    },
    methods: {
      leftIconClick() {
        this.$emit('leftIconClick')
      },
      rightIconClick() {
        this.$emit('rightIconClick')
      },
      closeDownload(){
        this.$emit('closeDownload')
      }
    },
    components: {download}
  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'
  .header-wrapper
    position fixed
    left 0
    top 0
    width 100%
    z-index 9
    .logo
      position absolute
      left 50%
      top 5px
      height 40px
      margin-left -73px

  .mint-header
    i
      font-size 20px
      padding 0 10px

</style>
