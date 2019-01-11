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
            title: '游戏问题',
            leftIcon: 'arrowr',
            rightIcon: '',
        },
        list: [
          {
            text: '游戏下载问题',
            content: {
              text:`
                  	<ul>
                      <li>
                          <span>如何下载游戏平台客户端？？</span>
                          <p>
                              您好，请您登录官网首页【下载中心】内根据页面也是下载对应的游戏客户端。
                          </p>
                      </li>
                      <li>
                          <span>我手机下载APP怎么提示未受信任无法开启？？</span>
                          <p>
                              请您点开APP，弹出未受信任的开发者，记住弹窗中的大写字母。关闭后进入手机内的【设置】→【通用】→【描述文件】→找到弹窗提示对应的大写字母选择信任即可正常进入APP。
                          </p>
                      </li>
                  </ul>
              `
            },
          },
          {
            text: 'PT',
            content: {
              text: `
                     <ul>
                        <li>
                            <span>PT游戏平台错误代码3</span>
                            <p>
                                (1)苹果手机网页出现此错误→请您进入设置->safari->"阻止弹窗进行关闭"及"阻止COOKIE调整为永远允许"及"诈骗网站警告关闭"，再重启浏览器登入就可以正常进行游戏。<br />
                                (2)电脑网页出现此错误→请关闭浏览器上的诈骗网站警告提醒。<br />
                                (3)安卓手机出现此错误→请关闭手机卫士会阻止弹窗或是提示诈骗网站等等软件。
                            </p>
                        </li>
                        <li>
                            <span>PT游戏平台错误代码6</span>
                            <p>
                                您好，这是由于您的网络不稳定造成的呢，请您保持网络顺畅和稳定，或是切换网络重新登录试试。
                            </p>
                        </li>
                        <li>
                            <span>PT游戏平台错误代码22、23、48</span>
                            <p>
                                您好，这是由于您重覆登入多次失败冻结的呢，请您耐心等候10分钟，或是提供账号给在线客服为您解锁。
                            </p>
                        </li>
                        <li>
                            <span>PT游戏平台错误代码26</span>
                            <p>
                                您好，这是由于您使用非中国大陆地区IP进行登入，请您不要使用VPN或是非中国大陆IP进行游戏。
                            </p>
                        </li>
                        <li>
                            <span>PT游戏平台错误代码107</span>
                            <p>
                                您好，这是由于您输入错误密码的呢，请您输入正确的密码，或是至官网更改一下密码，稍等 5-10 分钟后再重新登入试试。
                            </p>
                        </li>
                        <li>
                            <span>PT游戏平台错误代码104</span>
                            <p>
                                您好，请您先清除一下缓存，退出之后再重新登入试试，还是不行的话，请您更换设备或是重起设备在试试。
                            </p>
                        </li>
                        <li>
                            <span>PT游戏服务器未响应</span>
                            <p>
                                您好，这是由于您在客户端及网页版多次反复登陆，造成帐号卡住两边都无法登陆游戏，请您提供账号给在线客服为您进行刷新。
                            </p>
                        </li>
                        <li>
                            <span>PT游戏乱码</span>
                            <p>
                                您好，这是由于您的网络不稳定造成的呢，请您保持网络顺畅和稳定，或是切换网络重新登录试试。
                            </p>
                        </li>
                        <li>
                            <span>PT游戏一直加载中</span>
                            <p>
                                您好，这是由于您的网络不稳定造成的呢，请您保持网络顺畅和稳定，或是切换网络重新登录试试。
                            </p>
                        </li>
                        <li>
                            <span>PT游戏密码或者用户名错误</span>
                            <p>
                                您好，这是由于您的网络不稳定造成的呢，请您保持网络顺畅和稳定，或是切换网络重新登录试试。
                            </p>
                        </li>
                    </ul>
              `
            },
          },
          {
            text: 'MG',
            content: {
              text: `
             <ul>
			   		<li>
			   			<span>错误代码118</span>
			   			<p>
							您好，若您出现此错误代码，请您将您的游戏关闭，重新打开您的游戏即可。
			   			</p>
			   		</li>
			   		<li>
			   			<span>错误代码119</span>
			   			<p>
							您好，您页面提示的错误代码119的提示是代表您在不同处有重复登入的状况，请您关闭多余的窗口，重新登录游戏即可。
			   			</p>
			   		</li>
			   		<li>
			   			<span>错误代码4</span>
			   			<p>
							您好，若您出现此提示，代表您的游戏余额不足，请您充值后重新登录游戏即可。
			   			</p>
			   		</li>
			   		<li>
			   			<span>错误代码11</span>
			   			<p>
							您好，若您出现此提示，请您提供您的游戏账号以及您的错误提示截图给在线客服为您查询处理。
			   			</p>
			   		</li>
			   		<li>
			   			<span>错误代码107</span>
			   			<p>
							您好，您出现此错误提示，说明您在非大陆地区登录游戏，请您在大陆地区内登陆游戏即可。
			   			</p>
			   		</li>
			   		<li>
			   			<span>错误代码404</span>
			   			<p>
							您好，若您出现此提示，请您退出您的游戏，稍等一会儿再次登陆游戏，若您长时间无法进入游戏，请您提供您的游戏账号和错误提示截图给在线客服为您查询处理。
			   			</p>
			   		</li>
			   		<li>
			   			<span>错误代码211</span>
			   			<p>
			   				您好，若您出现此提示，请您提供您的游戏账号以及您的错误提示截图给在线客服为您查询处理。
			   			</p>
			   		</li>
			   		<li>
			   			<span>错误代码118</span>
			   			<p>
			   				您好，若您出现此提示，请您提供您的游戏账号以及您的错误提示截图给在线客服为您查询处理。
			   			</p>
			   		</li>
			   		<li>
			   			<span>错误代码504</span>
			   			<p>
			   				您好，若您出现此提示，请您提供您的游戏账号以及您的错误提示截图给在线客服为您查询处理。
			   			</p>
			   		</li>
			   	</ul>
              `
            },
          },
          {
            text: 'PNG',
            content: {
              text: `
              	<ul>
			   		<li>
			   			<span>错误提示：Something went wrong Your device is currently not supported</span>
			   			<p>
							您好，若您出现此提示，说明您使用的设备不支持您当前娱乐的游戏。 PNG游戏支持的设备为:电脑版：操作系统Windows版 7以上OS X 10.11或更高版本可用浏览器（最低要求）谷歌Chrome v.45 +火狐 v.47 +Internet Explorer 11+Edgev.13 +苹果电脑Safari v.7 +
			   			</p>
			   		</li>
			   	</ul>
              `
            },
          },

            {
                text: 'NT',
                content: {
                    text: `
                    <ul>
                        <li>
                            <span>错误提示：请启用Adobe Flash Player以继续。要启用/下载Adobe Flash Player请按“开始”按钮。</span>
                            <p>
                                您好，您出现此提示说明您是使用手机登录的电脑版本的游戏，请您更换手机版本的游戏即可。
                            </p>
                        </li>
                    </ul>
              `
                },
            },
            {
                text: 'DT',
                content: {
                    text: `
                    <ul>
                      <li>
                          <span>错误代码3：网络连接错误（3），请稍后再试</span>
                          <p>
                              您好，您出现此提示，说明您当前网络不稳定，无法成功连接游戏，请您退出游戏保持网络顺畅后，再次登陆游戏即可。
                          </p>
                      </li>
                      <li>
                          <span>错误代码7：网络错误，请勿一个账号开多个游戏（7）</span>
                          <p>
                              您好，您出现此提示，说明您重复登陆同一个账号娱乐同一款游戏，请您关闭多余游戏窗口，不要使用多窗口的模式游戏。
                          </p>
                      </li>
                      <li>
                          <span>错误代码16：Error code 16</span>
                          <p>
                              您好，您出现此错误提示，说明您在非大陆地区登录游戏，请您在大陆地区内登陆游戏即可。
                          </p>
                      </li>
                      <li>
                          <span>错误代码19：错误D0019</span>
                          <p>
                              您好，您出现此提示，说明您当前网络不稳定，请您退出游戏保持网络顺畅后，再次登陆游戏即可。
                          </p>
                      </li>
                      <li>
                          <span>错误代码6#00009：网络连接错误（6#00009），请稍后再试...</span>
                          <p>
                              您好，若您出现此提示请您退出所有游戏窗口并且退出您的游戏账号，重新登陆即可。
                          </p>
                      </li>
                      <li>
                          <span>错误提示：未受信任的企业级开发者</span>
                          <p>
                              您好，若您在打开DT客户端的时候出现此提示您需要：找到设置→通用。通用拉到最下面，选择“描述文件”或者“设备管理”。在"描述文件"或"设备管理"里，可以看到打不开软件的描述文件。点击这个描述文件，可以看到详情。然后点击信任这个描述文件。iPhone弹出对话窗口，咨询是否信任该文件，选择“信任”。
                          </p>
                      </li>
                      <li>
                          <span>错误提示：网络连接错误（6#object object）请稍后再试...</span>
                          <p>
                              您好，若您出现此提示，请您提供您的游戏账号以及您的错误提示截图给在线客服为您查询处理。
                          </p>
                      </li>
                      <li>
                          <span>错误提示：进入游戏失败：C0012</span>
                          <p>
                              您好，若您出现此提示，请您将您的游戏账号退出登录，重新登录即可。
                          </p>
                      </li>
                      <li>
                          <span>错误提示：ERR_SPDY_PROTOCOL_ERROR</span>
                          <p>
                              您好，若您出现此错误提示，说明您的浏览器设置问题出错，请参考浏览器解决办法请访问：https://zvv.me/z/1454.html
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