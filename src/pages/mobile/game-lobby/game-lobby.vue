<template>
  <div class="game-lobby" :class="{noTab}">
    <v-header :data="headData" @leftIconClick="commonBack" @rightIconClick="openMenu"></v-header>

    <div class="wrapper">
      <div class="search-input-wrapper">
        <search-input width="100%" @search="_searchInput"></search-input>
      </div>
      <div class="jackpot-wrapper">
        <v-jackpot :options="jackpotList[1]"></v-jackpot>
      </div>

      <!--游戏列表-->
      <div class="game-list-wrapper">
        <game-list v-show="filterList.length" :filterList="filterList"></game-list>
        <no-result v-show="!filterList.length"></no-result>
      </div>
    </div>

    <game-menu :platformList="platformList" @selectTabItem="selectTabItem" @search="_search" @closeMenu="closeMenu" :isShow="isShow" :currentIdx="currentIdx"></game-menu>

  </div>
</template>

<script>
  import VJackpot from '@/components/v-jackpot/v-jackpot'
  import SearchInput from '@/components/search-input/search-input'
  import GameList from 'MComponents/game-list/game-list'
  import NoResult from '@/components/no-result/no-result'
  import GameMenu from 'MComponents/game-menu/game-menu'
  import {commonBack, gameLobby, menu} from '@/common/js/mixin'
  import {getQueryString} from '@/common/js/util'

  export default {
    mixins: [commonBack, gameLobby, menu],
    data() {
      return {
        headData: {
          title: '游戏大厅',
          leftIcon: 'arrowr',
          rightIcon: 'filter'
        },
        noTab:window.location.href.includes('isFromApp'),
        currentIdx:0,
        platformList: [
          {
            text: 'PT国际版',
            path: 'ptasia',
          },
          {
            text: 'PT',
            path: 'pt',
          },
          {
            text: 'PG',
            path: 'pg',
          },
          {
            text: 'CQ9',
            path: 'cq9',
          },
          {
            text: 'SW',
            path: 'sw',
          },
          {
            text: 'DT',
            path: 'dt',
          },
          {
            text: 'MG',
            path: 'mg',
          },
          {
            text: 'PNG',
            path: 'png',
          },
          {
            text: 'QT',
            path: 'qt',
          },
          {
            text: 'NT',
            path: 'nt',
          },
        ],
      }
    },
    computed: {
      styleObj(){
        return {
          paddingBottom:''
        }
      }
    },
    created() {
      let platform = getQueryString('platform')
      if(platform === 'SLOT'){
        this.currentIdx = 0
        this.openMenu()
      }
      if(platform === 'REAL'){
          this.currentIdx = 1
          this.openMenu()
      }
      if(platform === 'FISH'){
        this.currentIdx = 2
        this.openMenu()
      }
      if(platform === 'SPORT'){
        this.currentIdx = 3
        this.openMenu()
      }
    },
    methods: {
      selectTabItem(idx) {
        this.currentIdx = idx
      }
    },
    watch: {},
    components: {VJackpot, SearchInput, NoResult, GameList, GameMenu}

  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/mixin.styl'
  @import '~common/stylus/variable.styl'
  .game-lobby
    background #eee
    min-height 90vh
    mobile-wrapper()
    &.noTab
      padding-bottom 20px
    clearfix()
    .wrapper
      margin-top 74px
    .search-input-wrapper
      padding 10px
      position fixed
      z-index 99
      top 50px
      left 0
      width 100%
      background rgba(0,0,0,.7)
    .jackpot-wrapper
      margin-top 10px
      height 40px
      background: url(./img/dt-jatbg.png) no-repeat
      background-size: cover
      line-height 40px
      padding-left 20%
      border-radius 20px
    .game-list-wrapper
      margin-top 20px

</style>