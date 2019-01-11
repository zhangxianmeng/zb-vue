<template>
  <div>
    <div class="game-list">
      <div class="item" v-for="item in finalList">
        <div class="pic">
          <img v-lazy="item.imageUrl" alt="" :key="item.imageUrl">
        </div>
        <div class="bottom">
          <p class="zh-name">{{item.gameCName}}</p>
          <!--<p class="en-name">{{item.gameEName}}</p>-->
          <p class="favorite" v-if="isShowFavorite">
            <span @click="addGameCollect(item)" v-if="item.collectFlag === 'N'"><i class="iconfont icon-shoucang"></i> 收藏</span>
            <span @click="deleteGameCollect(item)" v-if="item.collectFlag === 'Y'"><i
                class="iconfont icon-shoucang1"></i> 已收藏</span>
          </p>
          <div class="btn-group">
            <el-button v-if="item.gameStatus!=='2'" type="warning" @click="playGameFun(item,1)">试玩游戏</el-button>
            <el-button v-if="item.gameStatus!=='1'" type="danger" @click="playGameFun(item,0)">进入游戏</el-button>
          </div>
        </div>

      </div>
    </div>
    <div class="control">
      <img v-if="isShowMoreBtn &&(filterList.length>20)" @click="gameNumControl(1)" src="./img/more-g.png" alt="">
      <!--<el-button v-if="isShowMoreBtn &&(filterList.length>20)" @click="gameNumControl(1)" type="primary">展示更多游戏</el-button>-->
      <el-button v-if="(!isShowMoreBtn) && (filterList.length>20)" @click="gameNumControl(0)" type="primary">隐藏更多
      </el-button>
    </div>
    <!--弹框-->
    <v-dialog @on-close="closeDialog" :isShow="isShowBtcGameDialog" >
      <div class="points-transform">
        <div class="dialog-header">
          <h3>分数转换器</h3>
        </div>
        <div class="dialog-body center">
          <div class="points">
            <p class="balance">{{btcBalance}} {{country}} = {{(btcBalance*1000).toFixed(2) || 0}} 分</p>
            <p style="opacity: .8">1BTC / 1ETH = 1000分</p>
          </div>
          <div>
            <el-button @click="playGameFun(currentItem,playMode)" type="danger" size="small" class="small-btn">进入游戏</el-button>
          </div>
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script>
  import VDialog from '@/components/dialog/dialog'
  import {gameList} from '@/common/js/mixin'

  export default {
    mixins: [gameList],
    components:{
      VDialog
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/mixin.styl'
  @import '~common/stylus/variable.styl'
  .game-list
    clearfix()
    .item
      width 288px
      float: left
      margin 0 15px 15px 0
      padding 15px
      border 1px solid $color-border-gray
      background $color-light
      overflow hidden
      cursor pointer
      text-align center
      transition all .2s ease-in
      &:hover
        transform translate3d(0, -4px, 0)
      &:nth-of-type(4n)
        margin-right 0
      .zh-name
        no-wrap()
        font-size 16px
      .en-name
        no-wrap()
      img
        width 100%
        height 160px
      .bottom
        line-height 24px
        padding 10px 0
        background $-color-light-bg
      .favorite
        font-size 15px
        color $color-intersperse
      .btn-group
        display flex
        justify-content center
        margin-top 6px
      .el-button
        font-size 14px

  .control
    background url(./img/more-line.png) no-repeat center
    text-align center
    margin 10px 0
    img
      animation: Updown 2s linear infinite
      cursor: pointer


  .points-transform
    .points
      margin-bottom 20px
      .balance
        font-size 20px
        font-weight 600
        margin-bottom 10px
  @keyframes Updown {
    0% {
      transform: translateZ(0)
    }
    50% {
      transform: translate3d(0, 10px, 0)
    }
    to {
      transform: translateZ(0)
    }
  }
</style>