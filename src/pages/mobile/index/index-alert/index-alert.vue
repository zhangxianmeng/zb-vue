<template>
    <div v-if="isShowIndexAlert && !isLogin" class="index-alert-masks">
      <div class="index-alert-wrapper">
        <div class="index-alert-content">
          <div class="index-alert-msg-box">
            <p v-html="indexAlertData.list"></p>
          </div>
        </div>
      </div>

      <i class="close-btns" @click="cls"></i>
    </div>
</template>

<script>
  import {checkConfigSystem} from '@/api/index'


  export default {
    data() {
      return {
        isShowIndexAlert: true,
        //弹框数据
        indexAlertData: {
          list: '',
          tips: ''
        },
      }
    },
    props: {
      isShowIndexAlert: Boolean
    },
    computed: {},
    created() {
      this._checkConfigSystem()
    },
    methods: {
      //首页弹框信息
      _checkConfigSystem() {
        checkConfigSystem({
          typeNo: 'type003',
          itemNo: '001'
        }).then((res) => {
          if (this.ERR_OK === res.code) {
            let flag = res.data.split('#')[1]
            this.indexAlertData.list = flag.split('温馨提示：')[0]
            this.indexAlertData.tips = '温馨提示：' + flag.split('温馨提示：')[1]
          }
        })
      },
      cls(){
        this.$emit('close')
      },
    },
    watch: {},
    components: {}

  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  //弹框
  .index-alert-masks
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    z-index 99
    background rgba(0, 0, 0, .7)
    .index-alert-wrapper
      clearfix()
      position: absolute
      background: url(./img/index-alert.png) no-repeat center
      background-size: contain
      width: 100%
      height: 90%
      left: 0%
      margin: 0
      z-index 99
      .index-alert-content
        position: absolute
        top: 38%
        height: 38%
        width: 70%
        left: 15%
        overflow-y: auto
        color #8d3a04
      .index-alert-msg-box
        font-size 15px
        line-height 34px
  .close-btns
    position absolute
    top: 12%
    right: 2%
    width 90px
    height 90px
    cursor pointer
    z-index 999

</style>