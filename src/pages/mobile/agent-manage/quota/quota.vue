<template>
  <div class="agent-manage">
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
                              :apiFun="apiFun"
                              :timer="timer">
      </user-center-pagination>
    </div>
  </div>
</template>

<script>
  import {commonHead,quotaModule} from '@/common/js/mixin'
  import userCenterPagination from '@/components/user-center-pagination/user-center-pagination.vue'
  import Vue from 'vue'
  import {DatePicker} from 'element-ui'
  Vue.use(DatePicker)
  import {getMonthFirstDay} from '@/common/js/util'
  export default {
    mixins: [commonHead,quotaModule],
    data() {
      return {
      }
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
  .agent-manage
    mobile-wrapper()
    .content
      m-wrapper()
      margin-top 20px
      .search-filter
        p
          margin-bottom 10px

</style>