<template>
  <div class="index-wrapper">
    <!--banner-->
    <div class="banner-wrapper">
      <banner :slides="slides" :inv="4000" :height="520"></banner>
      <!--游戏下载-->
      <div class="sidebar-wrapper">
        <router-link to="/download">
          <div class="duck"></div>
        </router-link>
        <div class="text-link">
          <p>
            <span>NEW</span>
            <router-link to="/welfare">福利中心</router-link>
          </p>
          <p>
            <span>
              <b>HOT</b>
            </span>
            <router-link to="/integral/index">积分商城</router-link>
          </p>
        </div>
      </div>
    </div>
    <div class="wrapper main-index-wrapper">

      <!--奖池-->
      <div class="jackpot-wrapper">
        <v-jackpot :options="options"></v-jackpot>
      </div>
      <!--首页主区-->
      <main-block></main-block>

      <!--推荐游戏-->
      <div class="recommend-game">
        <div class="title">
          <h3>
            <img src="./img/recommend.png" alt="">
          </h3>
          <router-link class="more" to="/slots">
            <i class="iconfont icon-gengduomore12"></i><span>更多</span>
          </router-link>
        </div>
        <div class="game-list-wrapper">
          <game-list :filterList="filterList" :isShowFavorite="false"></game-list>
        </div>
      </div>

    </div>
    <!--优势-->
    <advantage>

    </advantage>


    <!--首页弹框-->
    <transition name="opacity">
      <div v-if="isShowIndexAlertDialog && !isLogin" class="index-alert-mask">
        <div class="index-alert-wrapper">
          <div class="index-alert-content">
            <div class="index-alert-msg-box">
              <p v-html="indexAlertData.list"></p>
            </div>
            <div class="index-alert-tips">
              <!--<marquee onmouseover="this.stop()" onmouseout="this.start()" scrollamount="3" behavior="" direction="up">-->
              <div v-html="indexAlertData.tips"></div>
              <!--</marquee>-->
            </div>
          </div>
          <i @click="isShowIndexAlertDialog = false" class="iconfont icon-guanbi close-btn"></i>
        </div>
      </div>
    </transition>


  </div>

</template>

<script src="./index.js"></script>
<style lang="stylus" src="./index.styl"></style>