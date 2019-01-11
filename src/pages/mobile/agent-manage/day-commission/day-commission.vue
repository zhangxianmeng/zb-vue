<template>
  <div class="day-commission">
    <v-header :data="headData" @leftIconClick="back" @rightIconClick="openService"></v-header>
    <div class="content">
      <div class="search-filter">
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
          <mt-button size="large" @click="searchData" type="danger">提交</mt-button>
        </p>
      </div>

      <user-center-pagination class="center"
                              ref="pagination"
                              :headList="headList"
                              :pagination="pagination"
                              :paginationMark="config.paginationMark.searchPtCommissions"
                              :apiFun="apiFun"
                              :timer="timer">
      </user-center-pagination>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {DatePicker} from 'element-ui'
  import {commonHead, dayCommissionModule} from '@/common/js/mixin'
  import userCenterPagination from '@/components/user-center-pagination/user-center-pagination.vue'

  Vue.use(DatePicker)
  export default {
    mixins: [commonHead, dayCommissionModule],
    data() {
      return {}
    },
    computed: {},
    created() {
    },
    methods: {},
    watch: {},
    components: {userCenterPagination}

  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/mixin'
  @import '~common/stylus/variable'
  .day-commission
    mobile-wrapper()
    .content
      m-wrapper()
      margin-top 20px
      .search-filter
        p
          margin-bottom 10px

</style>