<template>
  <v-dialog :height="700" :width="800" @on-close="closeDialog" :is-show="isShowRecordDialog">
    <div class="record-dialog-wrapper">
      <div class="dialog-header">
        <h3>{{recordTitle}}</h3>
      </div>
      <div class="dialog-body">
        <div v-if="pageContents.length" class="table my-table">
          <table>
            <thead>
            <tr>
              <th>时间</th>
              <th>积分</th>
              <th>备注</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in pageContents">
              <td>{{item.createTime}}</td>
              <td><span class="red">{{item.points}}</span></td>
              <td>
                <div class="remark">
                  <p>
                    <span class="name">{{item.name}} </span>
                    <span class="property">{{_property(flag,item)}}</span>
                  </p>
                  <span v-if="item.status === '已抽奖'" class="getLotteryBtn status" @click="getLotteryPrize(item)">领取</span>
                  <span v-if="item.status !== '已抽奖'" class="status">{{ item.status === '已完成'?'已领取':item.status}}</span>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <no-result v-if="!pageContents.length" style="margin-bottom:15px"></no-result>
        <div class="pagination center">
          <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pagination.pageIndex"
              :page-sizes="pagination.pageSizes"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pagination.total">
          </el-pagination>
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<script>
  import VDialog from '@/components/dialog/dialog'
  import NoResult from '@/components/no-result/no-result'
  import {exchangeRecords} from '@/common/js/mixin'
  export default {
    mixins:[exchangeRecords],
    components: {VDialog,NoResult}
  }
</script>

<style lang="stylus">
  @import '~common/stylus/variable'
  .record-dialog-wrapper
    .remark
      display flex
      justify-content space-between
      .getLotteryBtn
        background $color-danger
        padding 2px 10px
        border-radius 5px
        color $color-light
        cursor pointer
</style>