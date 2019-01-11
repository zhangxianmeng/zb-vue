<template>
  <div>
    <!--商品列表-->
    <div class="goods-list-wrapper wrapper">
      <div class="tab">
            <span v-for="item in tabs" @click="selectItem(item)"
                  :class="{active:currentCategory===item.value}">{{item.text}}</span>
      </div>
      <div class="goods-title">
        <span>会员积分兑换值：</span>
        <div class="category-btn">
              <span v-for="item in values" :class="{active:currentPriceRage===item.value}"
                    @click="selectPriceRage(item)">{{item.text}}</span>
        </div>
      </div>

      <div class="goods-list" v-if="filterPointPresents.length">
        <div @click="goToDetailPage(item)" class="item" v-for="item in filterPointPresents">
          <div class="pic">
            <img v-lazy="item.imageUrl" alt="">
          </div>
          <div class="bottom">
            <p class="name">{{item.name}}</p>
            <p>现积分：<span class="red">{{item.vipSaveRange}}</span></p>
            <p v-if="item.range!==item.vipSaveRange" class="old">原积分：{{item.vipSaveRange}}</p>
          </div>
          <div class="mask">
            立即兑换
          </div>
        </div>
      </div>
      <no-result text="暂无结果" v-if="!filterPointPresents.length"></no-result>
    </div>
  </div>
</template>

<script>
  import NoResult from '@/components/no-result/no-result'
  import {goodsListModule} from '@/common/js/mixin'
  export default {
    mixins:[goodsListModule],
    components: {NoResult}
  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'
  .goods-list-wrapper
    border-top-left-radius 15px
    border-top-right-radius 15px
    overflow hidden
    margin 20px auto
    .tab
      display flex
      line-height 60px
      text-align center
      background $color-light
      span
        flex 1
        font-size 18px
        transition all .3s ease-in
        cursor pointer
        &.active
          background $color-danger
          color $color-light
    .goods-title
      margin 30px 20px
      display flex
      & > span
        margin-right 15px
    .category-btn
      span
        padding 6px 12px
        cursor pointer
        transition all .3s ease-in
        &.active, &:hover
          background $color-primary
          color #fff
    .goods-list
      .item
        float left
        margin-bottom 20px
        margin-right 20px
        width 285px
        border 1px solid $color-border-gray
        cursor pointer
        background $color-light
        transition all .3s ease-in
        position relative
        overflow hidden
        &:nth-of-type(4n)
          margin-right 0
        &:hover
          border-color $color-danger
          .mask
            bottom 0
          img
            transform scale(1.05)
        .pic
          padding 10px 20px
          height 260px
          display flex
          justify-content center
          align-items center
          img
            width 90%
            padding-bottom 10px
            transition all .3s ease-in

        .bottom
          border-top 1px solid $color-border-gray
          font-size 14px
          text-align center
          line-height 24px
          padding 15px
          height 80px
          p
            no-wrap(1)
            &.old
              text-decoration line-through
              opacity .6
            &.name
              font-size 16px
        .mask
          position absolute
          bottom -40px
          left 0
          width 100%
          line-height 40px
          text-align center
          background $color-danger
          color $color-light
          opacity .9
          transition all .3s ease-in
</style>