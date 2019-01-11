<template>
  <div class="integral">
    <v-header @leftIconClick="back" @rightIconClick="openService" :data="headData"></v-header>

    <header-banner :isLogin="isLogin"></header-banner>

    <div class="notice-wrapper">
      <notice></notice>
    </div>
    
    <div class="go-to-luck">
      <router-link to="/mobile/integral/lucky-lottery">
        <img src="./img/lucky.png" alt="">
      </router-link>
    </div>

    <goods-list :proList="proList"></goods-list>

  </div>
</template>

<script>
  import goodsList from './goods-list/goods-list'
  import headerBanner from './header-banner/header-banner'
  import notice from './notice/notice'
  import {commonBack} from '@/common/js/mixin'
  import {mapGetters} from 'vuex'
  export default {
    mixins:[],
    data() {
      return {
        headData: {
          leftIcon: 'arrowr',
          rightIcon:'kefu1',
          title: '积分商城'
        },
        proList:[]
      }
    },
    computed: {
      ...mapGetters(['isLogin'])
    },
    created() {
    },
    methods: {
      back(){
        this.$router.back()
      },
      openService(){
        this.$router.push('/mobile/self-help')
      }
    },
    watch: {
    },
    components: {goodsList,headerBanner,notice}

  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/mixin'
  @import '~common/stylus/variable'
  .integral
    mobile-wrapper()
    background $color-gray-background
  .notice-wrapper
    margin 5px 0
  .go-to-luck
    margin-bottom 5px
    padding 5px 0
    background $color-light
    img
      width 100%

</style>