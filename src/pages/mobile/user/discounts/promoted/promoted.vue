<template>
  <div class="promoted">
    <v-header :data="headData" @leftIconClick="back" @rightIconClick="openService"></v-header>
    <div class="content">
      <h3 class="title red">本月投注额</h3>
      <div style="margin-top:20px" class="table">
        <el-table
            stripe
            border
            :data="tableData"
            style="width: 100%">
          <el-table-column
              v-for="item in headList"
              :prop="item.prop"
              :label="item.label">
          </el-table-column>
        </el-table>
      </div>
      <p class="center" style="margin-top:20px">
        <!--<el-button @click="watchPromtedRule" type="danger">查看晋级标准</el-button>-->
        <mt-button size="large" @click="checkUpgrade" type="danger">立即晋级</mt-button>
      </p>
    </div>
  </div>

</template>

<script>
  import {commonHead,promotedModule} from '@/common/js/mixin'

  export default {
    mixins:[commonHead,promotedModule],
  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/mixin'
  .promoted
    mobile-wrapper()
    .content
      margin-top 20px
      m-wrapper()
      .title
        font-size 16px
        text-align center
        font-weight 600
      select
        width 100%
</style>