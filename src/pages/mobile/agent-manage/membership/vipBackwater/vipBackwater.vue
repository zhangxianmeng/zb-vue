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
      </div>
      <div class="mobile-input-group">
        <span class="label">会员账号：</span>
        <input v-model="loginname" type="text">
      </div>
      <div class="mobile-input-group">
        <span class="label">返水类型：</span>
        <select style="width:100%" v-model="proposalType">
          <option v-for="item in list" :value="item.value">{{item.text}}</option>
        </select>
      </div>
      <div class="mobile-input-group">
        <mt-button size="large" @click="searchData" type="danger">提交</mt-button>
      </div>

      <user-center-pagination
          ref="pagination"
          :headList="headList"
          :pagination="pagination"
          :apiFun="apiFun"
          :paginationMark="config.paginationMark.vipBackwater"
          :loginname="loginname"
          :proposalType="proposalType"
          tail="fs"
          :timer="timer">
      </user-center-pagination>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {DatePicker} from 'element-ui'
  import {commonHead, vipBackwater} from '@/common/js/mixin'
  import userCenterPagination from '@/components/user-center-pagination/user-center-pagination.vue'

  Vue.use(DatePicker)
  export default {
    mixins: [commonHead, vipBackwater],
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
  .agent-manage
    mobile-wrapper()
    .content
      m-wrapper()
      margin-top 20px
      .search-filter
        p
          margin-bottom 10px

</style>