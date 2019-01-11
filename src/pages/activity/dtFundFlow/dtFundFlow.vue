<template>
  <div class="dtFundFlow">
    <common-nav ref="nav"></common-nav>
    <div class="main bg-wap">
      <div class="content">
        <img class="gif" src="./img/logos.gif" alt="">
        <div class="dt-content">
          <div class="topic-bar">
          </div>
          <div class="game-list">
            <div class="game-l-c">
              <a @click="clickGame(item)" href="javascript:;" v-for="item in gameList">
                <img :src="item.src" alt="">
              </a>
            </div>
          </div>
          <img class="p-item" src="./img/p-item.png" alt="">
          <div class="part-o">
            <img class="dt-l" src="./img/dt-l.png" alt="">
            <div class="dt-ls">
              <template v-if="!isLogin">
                <div class="dt-lg">请登录后查看</div>
              </template>
              <template v-if="isLogin">
                <div id="dt-ls" class="dt-lg"></div>
                <p class="flow">{{yourFlow}} 元</p>
                <img id="dt-btn" @click="dtReceive" src="./img/c-btn.png" alt="">
              </template>
            </div>
          </div>
        </div>

        <div class="topic-bar">
          <div class="pc">
            <img src="./img/t-3.png" alt="">
          </div>
        </div>
        <div class="rule">
          <div class="row">
            <p>1.每天最低存款满足100元方可拥有兑换资格,每日仅限申请一次,逾期视同放弃。</p>
          </div>
          <div class="row">
            <p>2.参与DT平台【任意一款游戏】投注额达到对应或以上额度，即可自助领取彩金代码进行兑换。</p>
          </div>
          <div class="row">
            <p>3.投注统计为北京时间：00:00:00----23:59:59。</p>
          </div>
          <div class="row">
            <p>4.活动彩金需在指定老虎机平台内完成10倍流水方可提款。</p>
          </div>
          <div class="row">
            <p>5.尊宝国际拥有本次活动最终解释权。</p>
          </div>
        </div>
      </div>
    </div>


    <transition name="opacity">
      <div v-if="isShowDialog" class="obt-wrap">
        <div class="obt">
          <div class="cls" @click="isShowDialog = false"></div>
          <p>神秘彩金代码，请复制一下代码进行兑换</p>
          <div class="copy">
            <input readonly id="tg-link" :value="coupon"/>
            <span class="tag-read" :data-clipboard-text="coupon" @click="copy">复制</span>
          </div>
          <a @click="exchange" href="javascript:;" id="links" target="_blank"><img src="img/a-click.png" alt=""></a>
        </div>
      </div>
    </transition>
  </div>

</template>

<script>
  import commonNav from '@/pages/activity/common-nav/common-nav.vue'
  import commonFooter from '@/pages/activity/common-footer/common-footer.vue'
  import {mapGetters} from 'vuex'
  import {gameDTLogin, findDTBetAmoutOfEveryDay, drawDTBetAmoutOfDay} from '@/api/index'
  import {playGame} from "@/common/js/mixin"
  import {isMobilePlatform} from '@/common/js/util'
  import Clipboard from "clipboard"


  export default {
    mixins: [playGame],
    data() {
      return {
        isShowDialog: false,
        gameList: [
          {
            src: require('./img/item1.jpg'),
            id: 'oceanpark5x50'
          },
          {
            src: require('./img/item2.jpg'),
            id: 'hotpot5x25'
          },
          {
            src: require('./img/item3.jpg'),
            id: 'pethouse'
          },
          {
            src: require('./img/item4.jpg'),
            id: 'merryxmas'
          },
          {
            src: require('./img/item5.jpg'),
            id: 'camgirl5x25'
          },
          {
            src: require('./img/item6.jpg'),
            id: 'rocknight'
          },
        ],
        yourFlow: 0,
        coupon: '',
        isMobile:isMobilePlatform()
      }
    },
    computed: {
      ...mapGetters([
        'isLogin'
      ])
    },
    created() {
      this._findDTBetAmoutOfEveryDay()
    },
    methods: {
      clickGame(item) {
        this.playGame(gameDTLogin, {
          gameCode: item.id,
          playMode: 0,
        }, 0)
      },
      dtReceive() {
        drawDTBetAmoutOfDay().then((res) => {
          if (this.ERR_OK === res.code || this.ERR_OK_OTHER === res.code) {
            this.coupon = res.coupon
            this.isShowDialog = true
          } else {
            this.$message({
              type: 'warning',
              message: res.message
            })
          }
        })
      },
      _findDTBetAmoutOfEveryDay() {
        if (!this.isLogin) return
        findDTBetAmoutOfEveryDay().then((res) => {
          if (this.ERR_OK === res.code || this.ERR_OK_OTHER === res.code) {
            this.yourFlow = res.data
          }
        })
      },
      // 复制功能
      copy() {
        let clipboard = new Clipboard('.tag-read')
        clipboard.on('success', e => {
          this.flag = true
          this.$message({
            type: 'success',
            message: '复制成功'
          })
          // 释放内存
          clipboard.destroy()
        })
        clipboard.on('error', e => {
          // 不支持复制
          console.log('该浏览器不支持自动复制')
          // 释放内存
          clipboard.destroy()
        })
      },
      // 去个人中心
      exchange() {
        if (this.flag) {
          if (this.isMobile) {
            this.$router.push('/mobile/user/discounts')
          } else {
            this.$router.push('/user/discounts')
          }
        } else {
          this.$message({
            type: 'info',
            message: '请先复制代码并去账户中心进行兑换'
          })
        }
      },
    },
    watch: {
      isLogin(val) {
        if (!val) return
        this._findDTBetAmoutOfEveryDay()
      }
    },
    components: {commonNav, commonFooter}

  }
</script>

<style lang="stylus" src="./dtff.styl" scoped></style>