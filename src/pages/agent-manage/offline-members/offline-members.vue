<template>
  <div>
    <tab-title @selectItem="selectItem" :tab-title-list="tabTitleList" :currentIdx="currentIdx"></tab-title>
    <div class="border-content">

      <div class="search-filter common-filter">
        <p>
          <span>开始时间：</span>
          <el-date-picker
              :clearable="false"
              v-model="timer[0]"
              type="datetime"
              placeholder="选择日期">
          </el-date-picker>
        </p>
        <p>
          <span>结束时间：</span>
          <el-date-picker
              :clearable="false"
              v-model="timer[1]"
              type="datetime"
              placeholder="选择日期">
          </el-date-picker>
        </p>
        <p>
          <el-button @click="searchData" type="primary">提交</el-button>
        </p>
      </div>

      <user-center-pagination class="center"
                              ref="pagination"
                              :headList="headList"
                              :pagination="pagination"
                              :paginationMark="config.paginationMark.offlineMembers"
                              :apiFun="apiFun"
                              :timer="timer">
      </user-center-pagination>


    </div>
  </div>
</template>

<script>
  import tabTitle from '@/components/tab-title/tab-title'
  import userCenterPagination from '@/components/user-center-pagination/user-center-pagination.vue'
  import {offlineMembers} from "@/common/js/mixin"

  export default {
    mixins:[offlineMembers],
    components: {
      tabTitle, userCenterPagination
    }

  }
</script>

<style lang="stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'
  .common-filter
    margin-bottom 20px
    display flex
    p
      margin-right 10px
</style>