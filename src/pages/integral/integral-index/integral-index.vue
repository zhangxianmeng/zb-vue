<template>
  <div class="integral">

    <div class="banner">
      <div class="header-wrapper">
        <user-info-component></user-info-component>
        <winner-notice></winner-notice>
        <luck-lottery></luck-lottery>
      </div>
    </div>

    <!--商品列表-->
    <goods-list></goods-list>

  </div>
</template>
<script>
  import userInfoComponent from './components/user-info/user-info'
  import winnerNotice from './components/winner-notice/winner-notice'
  import luckLottery from './components/luck-lottery/luck-lottery'
  import goodsList from './components/goods-list/goods-list'
  import {mapGetters} from 'vuex'
  export default {
    data() {
      return {

      }
    },
    computed: {
      ...mapGetters([
        'isLogin',
        'points'
      ])
    },
    created() {

    },
    methods: {

    },
    components: {
      winnerNotice,
      luckLottery,
      userInfoComponent,
      goodsList,
    }
  }
</script>
<style lang="stylus" scoped src="./integral-index.styl"></style>