<template>
  <div>
    <div class="goods-list-wrapper">
      <!--条件过滤-->
      <div class="filter">
        <div class="filter-tit">
          <div class="tab">
          <span v-for="item in tabs" @click="selectItem(item)"
                :class="{active:currentCategory===item.value}">{{item.text}}</span>
          </div>
          <div @click="toggleMenu" class="select">
            <p>
              <span>筛选</span>
              <i class="iconfont icon-filter"></i>
            </p>
          </div>
        </div>
        <!--子菜单-->
        <transition name="slide-fade">
          <div class="sub" v-if="isShowSelectMenu">
            <p class="tit">会员积分兑换值：</p>
            <div class="category-btn">
              <span v-for="item in values" :class="{active:currentPriceRage===item.value}"
                    @click="selectPriceRage(item)">{{item.text}}</span>
            </div>
          </div>
        </transition>

      </div>
      <!--产品列表-->
      <div class="goods-list" v-if="filterPointPresents.length">
        <div @click="goToDetailPage(item)" class="item" v-for="item in filterPointPresents">
          <div class="pic">
            <img v-lazy="item.imageUrl" alt="">
          </div>
          <div class="describe">
            <p class="name">{{item.name}}</p>
            <p>现积分：<span class="red">{{item.vipSaveRange}}</span></p>
            <p v-if="item.range!==item.vipSaveRange" class="old">原积分：{{item.vipSaveRange}}</p>
            <p class="btn">
              <mt-button size="small" type="danger">立即兑换</mt-button>
            </p>
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
    data() {
      return {
        isShowSelectMenu:false
      }
    },
    computed: {},
    created() {
    },
    methods: {
      toggleMenu(){
        this.isShowSelectMenu = !this.isShowSelectMenu
      }
    },
    watch: {},
    components: {NoResult}

  }
</script>

<style lang="stylus" src="./goods-list.styl" scoped>

</style>