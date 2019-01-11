<template>
  <div class="integral-detail">
    <v-header :data="headData" @leftIconClick="back" @rightIconClick="openService"></v-header>
    <div class="content">
      <div class="banner">
        <img :src="itemData.imageUrl" alt="">
      </div>
      <div class="describe">
        <h3 class="name">{{itemData.name}}</h3>
        <p class="summary">{{itemData.summary}}</p>
        <p class="red current-point">{{currentPoint}} 分</p>
        <div class="level">
          <img :src="levelImage" alt="">
          <span class="level-text">{{userInfo.level | level}}</span>
          <span class="useful">当前可用 {{points}} 积分</span>
        </div>
      </div>

      <div class="bar">
        <span>
          兑换有效期
        </span>
        <span>
          {{itemData.startTime && itemData.startTime.split(' ')[0]}} 至
            {{itemData.endTime && itemData.endTime.split(' ')[0]}}
        </span>
      </div>
      <div class="property">
        <p>类型</p>
        <div class="property-list">
          <a :class="{active:currentProperty===item.property}" @click="selectItem(item,idx)"
             v-for="(item,idx) in itemData.property" href="javascript:;">{{_filterAttrVal(itemData.type,
            item.property)}}</a>
        </div>
      </div>

      <div class="btn-wrapper">
        <mt-button size="large" type="danger" @click="pointsExchange">立即兑换</mt-button>
      </div>

    </div>

    <!--手机兑换-->
    <el-dialog
        title="温馨提示"
        :visible.sync="dialogData.dialogVisiblePhone"
        width="90%">
      <div>
        <h3>请输入您将要充值的的手机号</h3>
        <div>手机号：<input maxlength="11" v-model="dialogData.userInput.phone" type="text"/></div>
      </div>
      <span slot="footer" class="dialog-footer">
          <mt-button v-if="isMobile" type="primary" @click="pointsExchangePhone(dialogData.item)">兑换</mt-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {integralDetailModule} from '@/common/js/mixin'

  export default {
    mixins: [integralDetailModule],
    data() {
      return {
        headData: {
          title: '商品兑换详情',
          leftIcon: 'arrowr',
          rightIcon: 'kefu1',
        },
      }
    },
    computed: {},
    created() {
    },
    methods: {
      back() {
        this.$router.back()
      },
      openService() {
        this.$router.push('/mobile/self-help')
      },
    },
    watch: {},
    components: {}

  }
</script>

<style lang="stylus" src="./detail.styl" scoped>

</style>