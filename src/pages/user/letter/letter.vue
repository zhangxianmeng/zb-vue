<template>
  <div>
    <tab-title @selectItem="selectItem" :tab-title-list="tabTitleList" :currentIdx="currentIdx"></tab-title>
    <div class="border-content">
      <div v-if="currentIdx===0">
        <div class="item-list" v-if="pagination.pageContents.length">
          <div @click="readMsg(item)" class="item" v-for="item in pagination.pageContents">
            <p>
              <span class="title">{{item.title}}</span>
              <span v-if="!item.read" class="red">(未读)</span>
              <span v-if="item.read" class="already">(已读)</span>
            </p>
            <p><span>{{item.createDate}}</span></p>
          </div>
        </div>
        <no-result v-if="!pagination.pageContents.length"></no-result>

        <!--分页-->
        <div class="el-pagination-wrapper">
          <el-pagination class="center"
                         background
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :current-page="pagination.pageIndex"
                         :page-sizes="[10,15,20]"
                         :page-size="pagination.size"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="pagination.totalRecords">
          </el-pagination>
        </div>
      </div>

      <div v-if="currentIdx===1">

        <div class="input-group">
          <span class="label">标题</span>
          <div>
            <input v-model="sendData.title" type="text">
          </div>
        </div>

        <div class="input-group">
          <span class="label">内容</span>
          <div>
            <textarea v-model="sendData.content"></textarea>
          </div>
        </div>

        <div class="input-group">
          <span class="label"></span>
          <div>
            <el-button @click="saveBookDate" type="danger">发送</el-button>
          </div>
        </div>

      </div>
    </div>

    <!--信件详情-->
    <v-dialog @on-close="closeDialog('isShowLetterDialog')" :isShow="isShowLetterDialog">
      <div class="letter-dialog">
        <div class="dialog-header">
          <h3>{{letterDetail.title}}</h3>
        </div>
        <div class="dialog-body">
          <p class="timer">时间：{{letterDetail.createDate}}</p>
          <p>
            {{letterDetail.content}}
          </p>
        </div>
      </div>

    </v-dialog>
  </div>
</template>

<script>
  import tabTitle from '@/components/tab-title/tab-title'
  import VDialog from '@/components/dialog/dialog'
  import NoResult from '@/components/no-result/no-result'
  import {letterModule} from '@/common/js/mixin'
  export default {
    mixins:[letterModule],
    components: {tabTitle, VDialog, NoResult}
  }
</script>

<style lang="stylus" scoped>
  .item-list
    line-height 40px
    .item
      display flex
      justify-content space-between
      border-bottom 1px solid #ddd
      cursor pointer
      transition .3s all ease-in
      padding 0 15px
      &:hover
        background #eee
      .title
        margin-right 6px
      .already
        opacity .7

  .letter-dialog
    line-height 30px
    .timer
      opacity .7
  .el-pagination-wrapper
    margin-top 20px

</style>