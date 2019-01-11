<template>
  <div class="sidebar">
    <div class="item-list">
      <div class="item">
        <a :href="config.serviceLink" target="_blank">
          <i class="iconfont icon-kefu1"></i>
          <span>在线客服</span>
        </a>
      </div>
      <div class="item" @mouseover="isShowSub = true" @mouseout="isShowSub = false">
        <a href="javascript:;">
          <i class="iconfont icon-dianhua"></i>
          <span>免费回拨</span>
        </a>
        <transition name="opacity">
          <div class="sub-box" v-if="isShowSub">
            <h3>填写号码后，客服立即回电</h3>
            <input v-model="number" type="text" placeholder="请输入您的手机号码" maxlength="11">
            <el-button @click="makeCall" type="warning" size="small" class="small-btn">确认</el-button>
          </div>
        </transition>
      </div>

      <div class="item" @mouseover="isShowSubService = true" @mouseout="isShowSubService = false">
        <a href="javascript:;">
          <i class="iconfont icon-youxiang"></i>
          <span>客服邮箱</span>
        </a>
        <transition name="opacity">
          <div class="sub-box sub-box-service" v-if="isShowSubService">
            <h3>{{config.serviceEmail}}</h3>
          </div>
        </transition>
      </div>

      <div v-if="vipEWM && (typeof vipEWM === 'string')" class="item" @mouseover="isShowSubWx = true" @mouseout="isShowSubWx = false">
        <a href="javascript:;">
          <i class="iconfont icon-weixin1"></i>
          <span>专属客服</span>
        </a>
        <transition name="opacity">
          <div class="sub-box" v-if="isShowSubWx">
            <img class="wxEwm" :src="vipEWM" alt="">
            <h3>
              专属客服上班时间 <br>
              周一至周六 <br>
              10：00 - 19:00
            </h3>
          </div>
        </transition>
      </div>

      <!--<div class="item" @mouseover="isShowSubApp = true" @mouseout="isShowSubApp = false">-->
        <!--<a href="javascript:;">-->
          <!--<i class="iconfont icon-shoujiapp"></i>-->
          <!--<span>下载APP</span>-->
        <!--</a>-->
        <!--<transition name="opacity">-->
          <!--<div class="sub-box app-download" v-if="isShowSubApp">-->
            <!--<img class="wxEwm" :src="config.zbAppEwm" alt="">-->
            <!--<h3>-->
              <!--下载尊宝APP最高送88元-->
            <!--</h3>-->
            <!--<p class="platform">-->
              <!--<i class="iconfont icon-android"></i>-->
              <!--<i class="iconfont icon-ios"></i>-->
            <!--</p>-->
          <!--</div>-->
        <!--</transition>-->
      <!--</div>-->

      <div class="item">
        <a href="#">
          <i class="iconfont icon-huidingbu"></i>
          <span>返回顶部</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import config from '@/common/js/config'
  import {queryQrcode, makeCall} from '@/common/js/mixin'

  export default {
    mixins: [queryQrcode, makeCall],
    data() {
      return {
        config,
        isShowSub: false,
        isShowSubService: false,
        isShowSubWx: false,
        isShowSubApp: false
      }
    },
    created() {
    },
    methods: {},
    watch: {}
  }
</script>
<style lang="stylus">
  .make-dialog.el-message-box
    width 520px
</style>
<style src="./v-sidebar.styl" lang="stylus" scoped></style>