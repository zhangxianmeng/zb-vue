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
            title: '账号问题',
            leftIcon: 'arrowr',
            rightIcon: '',
        },
        list: [
          {
            text: '注册问题',
            content: {
              text:`
                  <ul>
                      <li>
                          <span>如何注册尊宝账号？</span><br>
                          <p>
                              您好，请到官网首页点击上方的『免费注册』 确实填写个人资料并提交，即可登记成为尊宝会员。用户需进行实名注册，并确认提款人姓名与您的银行账号持有人相符。
                          </p>
                      </li>
                      <li>
                          <span>手机号码已被注册怎么办？</span><br>
                          <p>
                              您好，出现此提示代表您在尊宝已有账号，请到官网点击『安全中心』后，选择（忘记登录账号）
                          </p>
                      </li>
                      <li>
                          <span>可以注册多帐号吗？</span><br>
                          <p>
                              您好，这是不允许的，一位用户只能拥有一个账户，包括同一姓名，同一邮件地址，同一借记卡/信用卡，同一银行账户，同一电话，都视为一位用户。
                          </p>
                      </li>
                      <li>
                          <span>如何修改注册信息？</span><br>
                          <p>
                              您好，若您已成功注册账号，除注册同音不同字的姓名以外，您的注册信息是无法进行修改的，您更换手机号或邮箱号都是不会影响您的游戏状态，谢谢！
                          </p>
                      </li>
                  </ul>
              `
            },
          },
          {
            text: '账号管理',
            content: {
              text: `
              <ul>
		   		<li>
		   			<span>账号禁用怎么办？</span>
		   			<p>
						您好，您可以联系在线客服，为您查询具体的禁用的原因，客服再协助您进行处理。或者您前往首页右上角安全中心，输入注册信息，自助解冻游戏账号。
		   			</p>
		   		</li>
		   		<li>
		   			<span>忘记账号怎么办？</span>
		   			<p>
						您好，若您忘记了账号，请您提供您的姓名，电话，邮箱联系客服为您查询。或者您前往首页右上角安全中心，填写注册信息自助找回游戏账号。
		   			</p>
		   		</li>
		   		<li>
		   			<span>如何完善注册信息？</span>
		   			<p>
						您好，您在首页登陆后，在登录区域点击"个人中心"按钮，进入“账户设置”后即可按照提示去完善您的账户信息。
		   			</p>
		   		</li>
		   		<li>
		   			<span>如何查看我的存款记录？</span>
		   			<p>
						您好，请您进入个人中心（我的）＞账户清单＞在线存款记录、手工存款记录即可看到您的存款记录。
		   			</p>
		   		</li>
		   		<li>
		   			<span>如何查看我的提款记录？</span>
		   			<p>
						您好，请您进入个人中心（我的）＞账户清单＞　提款记录即可看到您的提款记录。
		   			</p>
		   		</li>
		   	</ul>
              `
            },
          },
          {
            text: '密码管理',
            content: {
              text: `
              <ul>
		   		<li>
		   			<span>忘记登录密码怎么办？</span>
		   			<p>
						您好，如果您遗失了您的登录密码，可以登录我们官网点击忘记密码，使用注册邮箱或者手机进行自助找回密码。或者您前往首页右上角安全中心，填写注册信息自助找回密码。
		   			</p>
		   		</li>
		   		<li>
		   			<span>如何登录修改游戏密码？</span>
		   			<p>
						您好，您在首页登陆后，在登录区域点击"个人中心"按钮，进入“账户设置”后再点击"修改密码"按钮，即可修改您的密码。或者您前往首页右上角安全中心，登入后进行自助修改。
		   			</p>
		   		</li>
		   		<li>
		   			<span>忘记提款密码怎么办？</span>
		   			<p>
						您好,提款密码就是您游戏帐号的密码,如果您忘记了可以到自助中心进行找回密码即可。
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