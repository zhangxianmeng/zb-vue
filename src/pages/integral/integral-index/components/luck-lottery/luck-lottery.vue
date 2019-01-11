<template>
  <div>
    <div class="lucky-lottery">
      <div class="lotto-box">
        <div class="lotto-item" :class="{active:idx === index}" v-for="(item,index) in allLuckyDrawPresent">
          <img v-lazy="item.imageUrl" alt="">
          <p>{{item.title}}</p>
        </div>
        <div @click="startLuckyDraw" class="lotto-item lotto-btn">
          <div>
            <h3>点击抽奖</h3>
            <p v-if="isLogin" style="font-size:16px">{{luckyDrawCostPonit}}分</p>
          </div>
        </div>
      </div>
    </div>

    <!--中奖喜讯弹框-->
    <winner-news-dialog ref="winnerNewsDialog"></winner-news-dialog>
  </div>
</template>

<script>
  import winnerNewsDialog from '../../../winner-news-dialog/winner-news-dialog.vue'
  import {luckLotteryGame} from '@/common/js/mixin'

  export default {
    mixins: [luckLotteryGame],
    components: {winnerNewsDialog}
  }
</script>

<style src="./luck-lottery.styl" lang="stylus" scoped></style>