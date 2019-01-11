<template>
  <div>
    <div class="integral-detail wrapper">
      <div class="header">
        <router-link to="/integral">积分商城</router-link> &gt; <span class="red">{{itemData.name}}</span>
      </div>
      <div class="product-wrapper">
        <div class="big-img">
          <img :src="itemData.imageUrl" alt="">
        </div>
        <div class="detail-info">
          <h3>{{itemData.name}} <span v-if="itemData.summary">({{itemData.summary}})</span></h3>

          <div class="level">
            <img :src="levelImage" alt="">
            <span class="level-text">{{userInfo.level | level}}</span>
            <span class="my-points">当前可用 <span>{{points}}</span> 积分</span>
          </div>

          <div class="promo-point">
            <p>所需积分：<span class="red need-point">{{currentPoint}}分</span><span class="old">{{currentPoint*itemData.vipSave}}分</span>
            </p>
            <div class="promo">
              <!--<span>{{itemData.vipSave*10 == 10?'暂无优惠（等级不够）':'享受'+itemData.vipSave*10+'折优惠'}}</span>-->
              <!--<div class="promo-list">-->
              <!--<span>不同等级会员享受不同优惠</span>-->
              <!--<div>-->
              <!--<p v-for="item in promoList">-->
              <!--<span>{{item.note}}</span>-->
              <!--<span>{{item.value / 10 === 10 ? '无折扣' : item.value / 10 + '折'}}</span>-->
              <!--</p>-->
              <!--</div>-->
              <!--</div>-->

              <span>暂无优惠</span>
            </div>
          </div>

          <p><span class="same-width">有效期</span>{{itemData.startTime && itemData.startTime.split(' ')[0]}} 至
            {{itemData.endTime && itemData.endTime.split(' ')[0]}}
          </p>
          <div class="type">
            <span class="same-width">选择类型</span>
            <div class="property-list">
              <a :class="{active:currentProperty===item.property}" @click="selectItem(item,idx)"
                 v-for="(item,idx) in itemData.property" href="javascript:;">{{_filterAttrVal(itemData.type,
                item.property)}}</a>
            </div>
          </div>
          <div class="btn-wrapper">
            <span class="same-width"></span>
            <el-button type="danger" @click="pointsExchange">立即兑换</el-button>
          </div>
        </div>
      </div>
    </div>
    <!--手机兑换-->
    <el-dialog
        title="温馨提示"
        :visible.sync="dialogData.dialogVisiblePhone"
        width="30%">
      <div>
        <h3>请输入您将要充值的的手机号</h3>
        <div>手机号：<input maxlength="11" v-model="dialogData.userInput.phone" type="text"/></div>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="pointsExchangePhone(dialogData.item)">兑换</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import {integralDetailModule} from '@/common/js/mixin'
  export default {
    mixins: [integralDetailModule],
    watch: {},
    components: {}

  }
</script>

<style lang="stylus" scoped src="./integral-detail.styl"></style>