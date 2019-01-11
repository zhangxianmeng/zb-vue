<template>
  <div>
    <div class="search-filter">
      <div class="input-group">
        <span class="label">开始时间：</span>
        <el-date-picker
            :clearable="false"
            v-model="timer[0]"
            type="datetime"
            placeholder="选择日期">
        </el-date-picker>
      </div>
      <div class="input-group">
        <span class="label">结束时间：</span>
        <el-date-picker
            :clearable="false"
            v-model="timer[1]"
            type="datetime"
            placeholder="选择日期">
        </el-date-picker>
      </div>
      <div class="input-group">
        <span class="label">会员账号：</span>
        <input v-model="loginname" type="text">
      </div>
      <div class="input-group">
        <span class="label">优惠类型：</span>
        <select v-model="proposalType">
          <option v-for="item in list" :value="item.value">{{item.text}}</option>
        </select>
      </div>
      <div class="input-group">
        <span class="label"></span>
        <el-button @click="searchData" type="primary">搜索</el-button>
      </div>
    </div>

    <user-center-pagination class="center"
        ref="pagination"
        :headList="headList"
        :pagination="pagination"
        :apiFun="apiFun"
        :paginationMark="config.paginationMark.vipPromo"
        :loginname="loginname"
        :proposalType="proposalType"
        tail="yh"
        :timer="timer">
    </user-center-pagination>
  </div>
</template>

<script>
  import {vipPromo} from '@/common/js/mixin'
  import userCenterPagination from '@/components/user-center-pagination/user-center-pagination.vue'

  export default {
    mixins:[vipPromo],
    components: {userCenterPagination}

  }
</script>

<style lang="stylus" scoped>

</style>