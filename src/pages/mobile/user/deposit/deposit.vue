<template>
  <div class="deposit">
    <v-header :data="headData" @leftIconClick="commonBack" @rightIconClick="openService"></v-header>
    <div class="content">
      <div class="banner">
        <div>
          <p>主账户余额</p>
          <p class="money"><span>￥ {{balance}}</span> <i @click="getGameMoney" class="iconfont icon-shuaxin"></i>
          </p>
        </div>
      </div>
      <div class="deposit-list">
        <div v-for="(item,idx) in tabTitleList" class="item" @click="selectItem(idx,item)">
          <div class="tit">
            <p>
              <i class="icon-badge" :class="getIcon(item)"></i>
              <span>{{item.text}}</span>
            </p>
            <p>
              <span class="zeng" v-if="item.badge">加赠1%</span>
              <i class="iconfont icon-arrow"></i>
            </p>
          </div>
        </div>
      </div>

      <!--存款页面-->
      <transition name="slider-right">
        <div class="third-party-payment-wrapper common-mask-page"
             v-if="currentId === obj.forTitle.id && isShowCommonMaskPage"
             v-for="(obj,key) in depositTypes">
          <v-header :data="commonPageHeadData" @leftIconClick="closeDepositPage"></v-header>
          <!--存款方式-->
          <div class="mobile-input-group">
            <span class="label">存款方式</span>
            <div class="deposit-btn-group">
              <pay-way-type-tab
                  @selectPayWayType="payWayTypeSelect"
                  :type="key"
                  :currentType="obj.currentType"
                  :list="obj.list">
              </pay-way-type-tab>
            </div>
          </div>

          <third-party-payment
              @getPayBankList="_getPayBankList"
              v-if="item.payWayType===obj.currentType"
              v-for="item in obj.list"
              :obj="item.payWayItem">
          </third-party-payment>

        </div>
      </transition>

    </div>
  </div>
</template>

<script>
  import payWayTypeTab from 'MComponents/pay-way-type-tab/pay-way-type-tab.vue'
  import thirdPartyPayment from './third-party-payment/third-party-payment.vue'
  import {commonHead, getGameMoney, depositModule,} from '@/common/js/mixin'

  export default {
    mixins: [commonHead, getGameMoney, depositModule],
    data() {
      return {
        commonPageHeadData: {
          title: '',
          leftIcon: 'arrowr',
        },
        isShowCommonMaskPage: false
      }
    },
    computed: {},
    created() {
      this.getGameMoney()
    },
    methods: {
      getIcon(item) {
        return `iconfont icon-${item.icon}`
      },
      closeDepositPage() {
        //返回
        this.currentId = ''
        this.isShowCommonMaskPage = false
      }
    },
    watch: {
      isShowCommonMaskPage(val) {
        this.setContentHeight(val)
      }
    },
    components: {
      payWayTypeTab, thirdPartyPayment
    }

  }
</script>

<style lang="stylus" src="./deposit.styl" scoped></style>