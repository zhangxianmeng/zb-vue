<template>
  <div class="letter">
    <v-header :data="headData" @leftIconClick="back" @rightIconClick="openService"></v-header>
    <div class="content">
      <div class="tab-border-wrapper">
        <tab-border @selectTabItem="selectItem" :list="tabTitleList" :currentIdx="currentIdx"></tab-border>
      </div>
      <div v-if="currentIdx===0">
        <div class="item-list" v-if="pagination.pageContents.length">
          <div @click="readMsg(item)" class="item" v-for="item in pagination.pageContents">
            <p class="letter-title-wrapper">
              <span v-if="!item.read" class="red">(未读)</span>
              <span v-if="item.read" class="already">(已读)</span>
              <span class="title"> {{item.title}}</span>
            </p>
            <p class="timer-wrapper"><span>{{item.createDate}}</span></p>
          </div>
        </div>
        <no-result v-if="!pagination.pageContents.length"></no-result>

        <!--分页-->
        <div class="pagination-wrapper">
          <el-pagination class="center"
                         small
                         background
                         @current-change="handleCurrentChange"
                         :current-page="pagination.pageIndex"
                         :page-size="pagination.size"
                         :pager-count="5"
                         layout="prev, pager, next"
                         :total="pagination.totalRecords">
          </el-pagination>
        </div>
      </div>

      <div v-if="currentIdx===1">

        <div class="mobile-input-group">
          <span class="label">标题</span>
          <div>
            <input v-model="sendData.title" type="text">
          </div>
        </div>

        <div class="mobile-input-group">
          <span class="label">内容</span>
          <div>
            <textarea style="width:100%" v-model="sendData.content"></textarea>
          </div>
        </div>

        <div>
          <mt-button size="large" @click="saveBookDate" type="danger">发送</mt-button>
        </div>

      </div>

      <!--信件详情-->
      <transition name="slider-right">
        <div v-if="isShowLetterDialog" class="letter-detail-wrapper">
          <v-header :data="commonPageHeadData" @leftIconClick="closeDepositPage"></v-header>
          <div class="letter-dialog">
            <div class="dialog-body">
              <p class="timer">时间：{{letterDetail.createDate}}</p>
              <p>
                {{letterDetail.content}}
              </p>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  import tabBorder from 'MComponents/tab-border/tab-border'
  import NoResult from '@/components/no-result/no-result'

  import {commonHead, letterModule} from '@/common/js/mixin'

  export default {
    mixins: [commonHead, letterModule],
    data() {
      return {
        commonPageHeadData: {
          title: '',
          leftIcon: 'arrowr',
        },
      }
    },
    created() {
      this.commonPageHeadData.title = this.letterDetail.title
    },
    computed: {},
    methods: {
      closeDepositPage() {
        this.isShowLetterDialog = false
      }
    },
    watch: {},
    components: {tabBorder, NoResult}

  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/mixin'
  @import '~common/stylus/variable'
  .letter
    mobile-wrapper()
    .content
      m-wrapper()
      margin-top 10px
      .tab-border-wrapper
        margin-bottom 10px

      .item-list
        line-height 40px
        .item
          display flex
          justify-content space-between
          border-bottom 1px solid #ddd
          cursor pointer
          transition .3s all ease-in
          .letter-title-wrapper
            no-wrap()
            height: 40px
          .timer-wrapper
            flex 0 0 135px
            width 135px
          &:hover
            background #eee
          .title
            margin-right 6px
          .already
            opacity .7

  .letter-detail-wrapper
    m-wrapper()
    position absolute
    top 0
    left 0
    z-index 999
    background $color-light
    padding-top 60px
    padding-bottom 20px
    min-height 100vh
    line-height 24px

  .pagination-wrapper
    margin-top 10px
</style>