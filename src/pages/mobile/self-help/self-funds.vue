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
            title: '资金问题',
            leftIcon: 'arrowr',
            rightIcon: '',
        },
        list: [
          {
            text: '存款问题',
            id:'deposit',
            content: {
              text:``
            },
          },
          {
            text: '提款问题',
            content: {
              text: `
              <ul>
			   		<li>
			   			<span>如何提款？？</span>
			   			<p>
							您好，请您进入【提款界面→银行卡提款→选择收款卡号→输入提款金额→输入提款密码→提交】温馨提示：最低提款金额100
			   			</p>
			   		</li>
			   		<li>
			   			<span>首次提款多久到账？？</span>
			   			<p>
							您好，首次提款时我们财务核对您的银行卡一些信息，确保钱款安全到账，提款时间延长一些，之后就都是5分钟到账。五分钟提款的承诺不包含系统异常、银行维护、网路延迟
			   			</p>
			   		</li>
			   		<li>
			   			<span>提款提交成功了，为什么金额一直没有到账？？</span>
			   			<p>
							您好，若您已提交取款却迟迟未到账，请您联系在线客服，提供您的游戏账号，取款金额，取款时间，让在线客服为您查看处理。
			   			</p>
			   		</li>
			   		<li>
			   			<span>为什么我的提款被取消了？？</span>
			   			<p>
							您好，若您提交提款后，提款状态一直显示已取消，请您联系在线客服，提供您的游戏账号，取款金额，取款时间，让在线客服为您查看原因。
			   			</p>
			   		</li>
			   		<li>
			   			<span>提款有次数限制吗？？</span>
			   			<p>
							您好，是没有次数限制的！
			   			</p>
			   		</li>
			   		<li>
			   			<span>提款金额有上限吗？？</span>
			   			<p>
							您好，最低提款额度为100元，当日提款总额度无上限。
			   			</p>
			   		</li>
			   		<li>
			   			<span>提款需要审核吗？？</span>
			   			<p>
							您好，用户申请提款若遇到配合平台抽查，需全力配合，此不在《尊宝》秒提、五分钟提款的承诺范围，平台抽查完毕，若无问题，《尊宝》会于第一时间为用户出款。
			   			</p>
			   		</li>
			   		<li>
			   			<span>我可以用别人的银行卡提款吗？？</span>
			   			<p>
							您好，用户被严禁使用他人或第三者银行账户或银行卡进行取款业务
			   			</p>
			   		</li>
			   		<li>
			   			<span>可以提款到支付宝吗？？</span>
			   			<p>
							您好，目前仅支持提款到银行卡和久安定制。
			   			</p>
			   		</li>
			   		<li>
			   			<span>奖池中奖平台费收取规则</span>
			   			<p>
							任何会员在老虎机游戏幸运中奖池奖金50000以上，将扣除20%-40%的费用做为平台建设，剩余的款项 您可以从提交出款。凡是50000以下，您可以提取100%奖池金额。
			   			</p>
			   		</li>
			   	</ul>
              `
            },
          },
          {
            text: '户内转账',
            content: {
              text: `
                  <ul>
                        <li>
                            <span>转账提示系统繁忙？</span>
                            <p>
                                您好，若您转账出现此提示，请您确保您转账的平台已被激活，若激活后还是出现此提示，请您联系在线客服为您进一步查看
                            </p>
                        </li>
                        <li>
                            <span>转账提示获取余额失败</span>
                            <p>
                                您好，若您转账出现此提示，请您确保您转账的平台已被激活，若激活后还是出现此提示，请您联系在线客服为您进一步查看
                            </p>
                        </li>
                        <li>
                            <span>怎么激活游戏平台？</span>
                            <p>
                                您好，请您进入官网后登陆您的账号，在网页版先登入一下您要玩的游戏平台进入任何一个游戏，进入游戏后等候游戏界面完全加载出来就可以了哦
                            </p>
                        </li>
                        <li>
                            <span>流水已达到，但是无法户内转账</span>
                            <p>
                                您好，请您联系在线客服，提供您的账号和游戏平台，在线客服为你刷新即可
                            </p>
                        </li>
                    </ul>
              `
            },
          },
          {
            text: '银行卡管理',
            content: {
              text: `
              	<ul>
                  <li>
                      <span>如何绑定银行卡？</span>
                      <p>
                          您好，您在首页登陆后，在登录区域点击"个人中心"按钮，进入“账户设置”后选择"银行卡管理"添加银行卡就可以绑定您的银行卡。
                      </p>
                  </li>
                  <li>
                      <span>如何解绑银行卡？</span>
                      <p>
                          您好，您在首页登陆后，在登录区域点击"个人中心"按钮，进入“账户设置”后选择"银行卡管理"，选择您要解绑的银行卡，点击解绑即可解绑您的银行卡。
                      </p>
                  </li>
                  <li>
                      <span>可以同时绑定多少张银行卡？</span>
                      <p>
                          您好，一个游戏账号可以同时绑定三张不同银行类别的银行卡。
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

        if (item.id === 'deposit') {
            this.$router.push('/mobile/self-deposit');
        }
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