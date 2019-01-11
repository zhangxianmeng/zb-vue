<template>
  <div class="account-list">
    <v-header :data="headData" @leftIconClick="back" @rightIconClick="openService"></v-header>
    <div class="content">
      <m-list :list="list" @selectItem="selectListItem"></m-list>

      <transition name="slider-right">
        <div v-if="isShowPagination" class="user-center-pagination-wrapper">
          <v-header :data="depositPageHeadData" @leftIconClick="closeDepositPage"></v-header>
          <user-center-pagination
              :headList="paginationData.headList"
              :pagination="pagination"
              :apiFun="paginationData.apiFun"
              :typeList="typeList"
              :number="currentIdx">
          </user-center-pagination>
        </div>
      </transition>

    </div>
  </div>
</template>

<script>
  import {commonHead, accountListModule} from '@/common/js/mixin'
  import MList from 'MComponents/m-list/m-list'
  import userCenterPagination from '@/components/user-center-pagination/user-center-pagination.vue'

  export default {
    mixins: [commonHead, accountListModule],
    data() {
      return {
        depositPageHeadData: {
          title: '',
          leftIcon: 'arrowr',
        },
        list: [
          {
            icon: 'declare',
            text: '在线存款记录',
          },
          {
            icon: 'qingdan',
            text: '手工存款记录',
          },
          {
            icon: 'declare',
            text: '附言存款记录',
          },
          {
            icon: 'qingdan',
            text: '提款记录',
          },
          {
            icon: 'declare',
            text: '户内转账记录',
          },
          {
            icon: 'qingdan',
            text: '优惠记录',
          },
          {
            icon: 'declare',
            text: '自助返水记录',
          },
          {
            icon: 'qingdan',
            text: '存送优惠记录',
          },
        ],
        isShowPagination:false

      }
    },
    computed: {},
    methods: {
      selectListItem(item, idx) {
        this.currentIdx = idx
        this.isShowPagination = true
        this.depositPageHeadData.title = item.text
      },
      closeDepositPage(){
        this.isShowPagination = false
      }
    },
    watch: {},
    components: {MList, userCenterPagination}

  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/mixin'
  @import '~common/stylus/variable'

  .account-list
    mobile-wrapper()
    background #eee

  .user-center-pagination-wrapper
    m-wrapper()
    position absolute
    top 0
    left 0
    z-index 999
    background $color-light
    padding-top 70px
    padding-bottom 20px
    min-height 100vh
    .mobile-input-group
      .label
        margin-bottom 10px
        display inline-block
</style>