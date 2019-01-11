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
            title: '技术问题',
            leftIcon: 'arrowr',
            rightIcon: '',
        },
        list: [
          {
            text: '如何使用截图',
            content: {
              text:`
                  <ul>
                      <li>
                          <span>如何怎么截图？</span>
                          <p>
                              安卓手机端 Android 4.0以上的操作系统都支持快捷键截图，只要同时按住“关机键”和“减音量键”3秒钟即可截图电脑端 请您点击键盘右上方的PrintScreen键全屏截图，按下后表面上是没有反应的，截图是保存在剪贴簿，您可以使用画板或是写字板以及聊天窗口粘贴此截图，然后另存新挡即可
                          </p>
                      </li>
                  </ul>
              `
            },
          },
          {
            text: '电脑网页被狭持了怎么办',
            content: {
              text: `
                      	<ul>
                            <li>
                                <span>电脑网页被狭持了怎么办？</span>
                                <p>
                                    您好，若您是使用电脑，请您先下载这个挡案 https://www.qnappzb.com/web/dns.rar ，下载后请直接点开，等待系统自动修复，提示修复完成后，请直接尝试开启网页试看看，谢谢您
                                </p>
                            </li>
                        </ul>
              `
            },
          },
          {
            text: '如何查询游戏记录',
            content: {
              text: `
              	    <p>
                        <span>PT手机网页、客户端：</span>请您先进入到游戏页面，点击左上角的圆形图案(三条杠)后，选择(游戏历史)记录即可查询游戏记录。 <br />
                        <span>PT电脑网页、客户端：</span>请您先进入到游戏页面，查找游戏界面的“小扳手”图标，点击出现“游戏记录”即可查询。  <br />
                        <span>DT网页：</span>请您进入游戏后，点击右上角的 齿轮 图示，再点击记录，就可以查询到您的游戏记录。  <br />
                        <span>DT客户端：</span>客户端登录帐号后点击左侧账单，选择游戏记录即可查看到投注记录。（无法查到游戏局号）  <br />
                        <span>SW手机网页：</span>进入游戏后点击屏幕左上角的三条横岗，选择点击历史记录后就可以查看到记录。  <br />
                        <span>AG手机网页：</span>请您登入ag网页版之后，点击右上方的下注记录，这样就可以查询您的投注记录，您可以查询到您最近100笔的投注记录。  <br />
                        <span>AG手机客户端：</span>请您登入手机AG客户端后，点击右上方三横杠，点击记录-下注记录，这样就可以查询您的投注记录了，您可以查询到您最近7天的投注记录。  <br />
                        <span>AG电脑网页：</span>请您登入AG页面后，点击左边的(记录)这样就可以查询您的下注记录了，您可以查询到您最近7天的投注记录。  <br />
                        <span>EBET：</span>您登入游戏大厅界面后，点击左上方齿轮图示，之后选择资产明细，就可以看到您的游戏记录，您可以查询到您最近14天的投注记录。  <br />
                        <span>BBIN:</span>进入游戏之后，点击下注记录即可查看。
			   		</p>
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