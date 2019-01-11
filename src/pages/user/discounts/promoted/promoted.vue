<template>
  <div>
    <tab-title @selectItem="selectItem" :tab-title-list="tabTitleList" :currentIdx="currentIdx"></tab-title>
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
      <el-button @click="watchPromtedRule" type="danger">查看晋级标准</el-button>
      <el-button @click="checkUpgrade" type="danger">立即晋级</el-button>
    </p>
  </div>
</template>

<script>
  import tabTitle from '@/components/tab-title/tab-title'
  import {promotedModule} from '@/common/js/mixin'

  export default {
    mixins: [promotedModule],
    data() {
      return {
        tabTitleList: [
          {
            text: '本月投注额'
          }
        ],
        currentIdx: 0,
      }
    },
    components: {tabTitle}

  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'
  .title
    font-size 18px
    font-weight: 600
    color $color-primary
    margin-bottom 15px
</style>