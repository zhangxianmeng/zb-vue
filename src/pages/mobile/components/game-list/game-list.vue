<template>
  <div>
    <div class="game-list">
      <div class="item" v-for="item in filterList">
        <div class="pic">
          <img v-lazy="item.imageUrl" alt="">
        </div>
        <div class="title">
          <p class="zh-name">{{item.gameCName}}</p>
          <p class="favorite">
            <span @click="addGameCollect(item)" v-if="item.collectFlag === 'N'"><i class="iconfont icon-shoucang1"></i></span>
            <span @click="deleteGameCollect(item)" v-if="item.collectFlag === 'Y'"><i
                class="iconfont icon-shoucang1 active"></i></span>
          </p>
        </div>
        <div class="bottom">
          <span v-if="item.gameStatus!=='1'" @click="playGameFun(item,0)">进入游戏</span>
          <span v-if="item.gameStatus!=='2'" @click="playGameFun(item,1)">试玩游戏</span>
        </div>

      </div>
    </div>
    <!--弹框-->
    <v-dialog :width="dialogWidth" @on-close="closeDialog" :isShow="isShowBtcGameDialog">
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
            <mt-button @click="playGameFun(currentItem,playMode)" type="danger" size="small" class="small-btn">进入游戏
            </mt-button>
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
    data(){
      return {
        dialogWidth:window.innerWidth*.9
      }
    },
    components: {
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
      width 48.5%
      float: left
      margin 0 3% 15px 0
      background $color-light
      overflow hidden
      cursor pointer
      transition all .2s ease-in
      &:nth-of-type(2n)
        margin-right 0
      .pic
        height 118px
        position relative
        img
          width 100%
          height 100%
      .title
        display flex
        justify-content space-between
        line-height 40px
        padding 0 10px
        .zh-name
          font-weight 600
          color #333
        .favorite
          i
            color #999
            &.active
              color $color-intersperse
      .bottom
        display flex
        justify-content space-between
        padding 0 10px 10px
        span
          flex 1
          text-align center
          line-height 30px
          border-radius 5px
          background transparent
          border 1px solid #6c9fff
          color #6c9fff
          &:first-child
            background #6c9fff
            color $color-light
            margin-right 5px



  .points-transform
    .points
      margin-bottom 20px
      .balance
        font-size 20px
        font-weight 600
        margin-bottom 10px
</style>