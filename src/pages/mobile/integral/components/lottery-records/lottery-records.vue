<template>
  <v-dialog :height="480" :width="width" @on-close="closeDialog" :is-show="isShowRecordDialog">
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
                  <p style="text-align: left">
                    <span class="name">{{item.name}} </span>
                    <span class="property">{{_property(flag,item)}}</span>
                  </p>
                  <span v-if="item.status === '已抽奖'" class="getLotteryBtn status"
                        @click="getLotteryPrize(item)">领取</span>
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
              small
              background
              @current-change="handleCurrentChange"
              :current-page="pagination.pageIndex"
              :page-size="pagination.pageSize"
              :pager-count="5"
              layout="prev, pager, next"
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
    mixins: [exchangeRecords],
    data() {
      return {
        width: window.innerWidth,
        pagination:{
          size: 5,
          pageIndex: 1,
          total: 0
        }
      }
    },
    components: {VDialog, NoResult}
  }
</script>

<style lang="stylus">
  @import '~common/stylus/variable'
  .record-dialog-wrapper
    color $color-text
    .remark
      display flex
      justify-content space-between
      align-items center
      .status
        flex 0 0 48px
        width 48px
      .getLotteryBtn
        background $color-danger
        padding 2px 10px
        border-radius 5px
        color $color-light
        cursor pointer
</style>