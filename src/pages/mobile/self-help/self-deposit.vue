<template>
  <div class="service">
    <v-header :data="headData" @leftIconClick="back"></v-header>
    <div class="main">
      <div class="m-list">
        <ul>
          <li :class="{active:idx === currentIdx}"
              v-for="(item,idx) in list">
            <div class="tit" @click="selectItem(item,idx)">
              <p>
                <i v-if="item.icon" class="icon-badge-shit" :class="getIcon(item)"></i>
                <span>{{item.text}}</span>
              </p>
              <i class="iconfont icon-arrow"></i>
            </div>
            <transition name="slide-fade">
              <div v-if="idx === currentIdx && item.content" class="sub">
                <div v-html="item.content.text"></div>
              </div>
            </transition>

          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {commonHead} from '@/common/js/mixin'

  export default {
    mixins: [commonHead],
    data() {
      return {
        headData: {
            title: '存款问题',
            leftIcon: 'arrowr',
            rightIcon: '',
        },
        list: [
          {
            text: '支付宝支付',
            content: {
              text:`
                  <ul>
                      <li>
                          <span>如何使用支付宝扫码存款？</span>
                          <p>
                              您好，请您进入存款页面点选【支付宝→支付宝扫码支付】，输入金额生成订单后，登入您的支付宝扫描二维码支付即可自动到账。 温馨提示：如果该通道支付不成功，请改换另一个支付宝扫码通道
                          </p>
                      </li>
                      <li>
                          <span>支付宝扫码存款没有到账怎么办？</span>
                          <p>
                              您好，请您联系24小时在线客服提供游戏账号以及存款成功截图为您查询处理。
                          </p>
                      </li>
                      <li>
                          <span>如何使用支付宝转账存款？</span>
                          <p>
                              您好，请您进入存款页面点选【支付宝→支付宝转账】,填写存款姓名和存款金额，获取收款帐号和存款金额，前往支付宝里面操作转账。 温馨提示1：每次存款必须先在官网下单重新获取收款账号，请勿直接转账到历史交易收款账户中；必须按照系统给予的金额进行转账才能自动到账。 温馨提示2：每日23:30-01:00左右有延迟到账现象，建议在这个时间段使用其他存款方式
                          </p>
                      </li>
                      <li>
                          <span>支付宝扫码转账没有到账怎么办？</span>
                          <p>
                              您好，请您联系24小时在线客服提供游戏账号、注册姓名以及存款成功截图为您查询处理。
                          </p>
                      </li>
                  </ul>
              `
            },
          },
          {
            text: '微信支付',
            content: {
              text: `
                     <ul>
                        <li>
                            <span>如何使用微信扫码存款？</span>
                            <p>
                                您好，请您进入存款页面点选【微信支付→微信支付】，输入金额生成订单后，登入您的微信扫描二维码支付即可自动到账。
                            </p>
                        </li>
                        <li>
                            <span>微信扫码存款没有到账怎么办？</span>
                            <p>
                                您好，请您联系24小时在线客服提供游戏账号以及存款成功截图为您查询处理。
                            </p>
                        </li>
                    </ul>
              `
            },
          },
          {
            text: '银行卡支付',
            content: {
              text: `
              <ul>
                  <li>
                      <span>如何使用手机/网银转账存款？</span>
                      <p>
                          您好，请您进入存款页面点选【银行卡→手机/网银转账】，填写存款姓名和存款金额，获取收款帐号和存款金额，前往网银操作转账。 温馨提示1：每次存款必须先在官网下单重新获取收款账号，请勿直接转账到历史交易收款账户中。 温馨提示2：每日23:30-01:00左右有延迟到账现象，建议在这个时间段使用其他存款方式
                      </p>
                  </li>
                  <li>
                      <span>手机/网银转账存款没有到账怎么办？</span>
                      <p>
                          您好，请您联系24小时在线客服游戏账号以及存款成功截图为您查询处理。
                      </p>
                  </li>
              </ul>
              `
            },
          },
          {
            text: '快捷支付',
            content: {
              text: `
              	<ul>
                    <li>
                        <span>如何使用快捷支付存款？</span>
                        <p>
                            您好，请您进入存款页面点选【银行卡→快捷支付】，输入金额、支付银行生成订单后，验证您的身份证号、短信支付即可自动到账 温馨提示：如果该通道支付不成功，请改换另一个快捷支付通道
                        </p>
                    </li>
                    <li>
                        <span>快捷支付存款成功但游戏账户没有到账怎么办？</span>
                        <p>
                            您好，请您联系24小时在线客服游戏账号以及存款成功截图为您查询处理。
                        </p>
                    </li>
                </ul>
              `
            },
          },

            {
                text: '在线支付(支持部分信用卡)',
                content: {
                    text: `
                    <ul>
                        <li>
                            <span>如何使用在线支付存款？</span>
                            <p>
                                您好，请您进入存款页面点选【银行卡→在线支付】，输入金额、支付银行生成订单后，输入银行卡号以及验证码即可自动到账
                            </p>
                        </li>
                        <li>
                            <span>在线支付存款没有到账怎么办？</span>
                            <p>
                                您好，请您联系24小时在线客服游戏账号以及存款成功截图为您查询处理。
                            </p>
                        </li>
                    </ul>
              `
                },
            },
            {
                text: 'QQ钱包支付',
                content: {
                    text: `
                    <ul>
                        <li>
                            <span>如何使用QQ钱包存款？</span>
                            <p>
                                您好，请您进入存款页面点选【QQ钱包】，输入金额生成订单后，登入您的QQ扫描二维码支付即可自动到账。温馨提示：如果该通道支付不成功，请改换另一个快捷支付通道
                            </p>
                        </li>
                        <li>
                            <span>QQ钱包存款没有到账怎么办？</span>
                            <p>
                                您好，请您联系24小时在线客服游戏账号以及存款成功截图为您查询处理。
                            </p>
                        </li>
                    </ul>
              `
                },
            },
            {
                text: '点卡支付',
                content: {
                    text: `
                    <ul>
                        <li>
                            <span>如何使用点卡存款？</span>
                            <p>
                                您好请您进入存款页面点选【点卡】，输入点卡种类、面额，输入点卡卡号、卡密即可自动到账
                            </p>
                        </li>
                        <li>
                            <span>支持哪个类型的点卡？</span>
                            <p>
                                您好，请您进入点卡界面查看我方支持的点卡类型
                            </p>
                        </li>
                        <li>
                            <span>点卡收取手续费吗？</span>
                            <p>
                                您好，根据不同类型的点卡收取对应的手续费，请您进入点卡界面查看更多。
                            </p>
                        </li>
                        <li>
                            <span>点卡没有到账怎么办？</span>
                            <p>
                                您好，请您联系24小时在线客服游戏账号，点卡金额，点卡类型，卡号，为您查询处理。
                            </p>
                        </li>
                    </ul>
              `
                },
            },
        ],
        currentIdx: -1
      }
    },
    computed: {
    },
    created() {
    },
    methods: {
      selectItem(item, idx) {
        if (this.currentIdx === idx) {
          this.currentIdx = -1
          return
        }
        this.currentIdx = idx
      },
      getIcon(item) {
        return `iconfont icon-${item.icon}`
      },
    },
    watch: {},
    components: {}

  }
</script>

<style lang="stylus" src="./self-item.styl" scoped>

</style>