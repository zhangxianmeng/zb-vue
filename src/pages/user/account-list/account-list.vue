<template>
  <div class="common-account-list">
    <tab-title @selectItem="selectItem" :tab-title-list="tabTitleList" :currentIdx="currentIdx"></tab-title>
    <div class="border-content">
      <user-center-pagination
          :headList="paginationData.headList"
          :pagination="pagination"
          :apiFun="paginationData.apiFun"
          :typeList="typeList"
          :number="currentIdx">
      </user-center-pagination>
    </div>
  </div>
</template>

<script>
  import tabTitle from '@/components/tab-title/tab-title'
  import userCenterPagination from '@/components/user-center-pagination/user-center-pagination.vue'
  import {accountListModule} from '@/common/js/mixin'
  export default {
    mixins:[accountListModule],
    data() {
      return {
        tabTitleList: [
          {
            text: '在线存款记录'
          },
          {
            text: '手工存款记录'
          },
          {
            text: '附言存款记录'
          },
          {
            text: '提款记录'
          },
          {
            text: '户内转账记录'
          },
          {
            text: '优惠记录'
          },
          {
            text: '自助返水记录'
          },
          {
            text: '存送优惠记录'
          },
        ],
      }
    },

    components: {tabTitle, userCenterPagination}
  }
</script>

<style lang="stylus">
  .common-account-list
    .tab-title a
      padding 0 10px
</style>