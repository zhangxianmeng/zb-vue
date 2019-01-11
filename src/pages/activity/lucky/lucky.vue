<template>
  <div class="lucky">
    <common-nav></common-nav>
    <div class="main">
      <img width="100%" v-if="isMobile" :src="mobileBanner" alt="">
      <div class="wrapper">
        <div class="lucky-lottery-wrapper">
          <!--提示-->
          <div class="notice" v-if="isLogin">
            <p>
              亲爱的会员 <span>{{userInfo.loginname}}</span>，您今日已转了 <span>{{dataObj.dayOver}}</span> 次，再来一次吧~！
            </p>
          </div>
          <!--轮盘-->
          <div class="r-lot-b">
            <img class="r-warp" src="./img/r-wrap.png" alt="">
            <div id="rotate" class="r-lot"></div>
            <img @click="startLuckDraw" id="begin" class="begin" src="./img/r-begin.png" alt="">
          </div>
        </div>

        <!--活动内容-->
        <div class="activity-content">
          <img v-if="!isMobile" class="timer" src="./img/r-time.png" alt="">
          <div class="tit">
            <img src="./img/t-1.png" alt="">
          </div>
          <div class="text">
            <p>
              每日存款满200元即可获得 <span>1次</span> 幸运转盘的机会 ,累计存款1000元以上将获得 <span>5次</span> 机会。（每日最多5次）
            </p>
            <p>
              <span>您本月累积转盘次数为：{{dataObj.monthOver}}次</span>
            </p>
            <p>
              <span>您总累积转盘次数为：{{dataObj.totalOver}}次</span>
            </p>
          </div>

          <div class="rankings-caonima">
            <div class="rankings">
              <div class="tit">
                <span @click="selectItem(idx)" :class="{active:currentIdx === idx}" v-for="(item,idx) in titList">{{item.text}}</span>
              </div>
              <div>
                <table v-if="dataObj.data.length">
                  <thead>
                  <tr>
                    <th v-for="item in headList">{{item.label}}</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="item in dataObj.data">
                    <td v-for="obj in headList">
                      {{item[obj.props]}}
                    </td>
                  </tr>
                  </tbody>
                </table>

                <div v-if="!dataObj.data.length" class="waiting">
                  {{isLogin?'敬请期待':'请登陆后查看'}}
                </div>
              </div>
            </div>

            <div class="caonima">
              <img src="./img/bonus.png" alt="">
              <img src="./img/b-item1.png" alt="">
              <p>
                每日激活

                <br><span>5次</span>幸运大转盘后

                <br>即可获得 <span>68元</span>
              </p>
              <span @click="drawLuckDraw" class="btn">立即领取</span>
            </div>

            <div class="caonima">
              <img src="./img/bonus2.png" alt="">
              <img src="./img/b-item2.png" alt="">
              <p>
                <span>每月</span>激活

                <br>幸运大转盘前10名

                <br>即可获得 <span>288元</span>

                <br>需达100次以上
              </p>
              <!--<span @click="drawLuckDraw" class="btn">立即领取</span>-->
            </div>


          </div>
        </div>

        <!--活动规则-->
        <div class="activity-rule">
          <div class="tit">
            <img src="./img/t-3.png" alt="">
          </div>
          <p>
            1、存款满足条件后，每天最多可拥有5次的转动机会，逾期清零。

            <br>2、转盘所获得的彩金、优惠券将以站内信的形式派发，请注意查收或直接复制代码兑换。

            <br>3、每日68元成就彩金只需5倍流水提款只限游戏于老虎机平台/月累积次数将在每新一个月的1号归零。

            <br>4、大富翁彩金派发时间为每月的1-5号期间,此彩金无需流水可直接提款。

            <br>5、若出现当月转盘次数相同的用户排名情况,将以用户当月累计存款金额高低决定出排名顺序。

            <br>6、尊宝国际对本次优惠享有最终解释权。
          </p>
        </div>
      </div>
    </div>
    <common-footer></common-footer>

    <!--弹框-->
    <transition name="opacity">
      <div v-if="isShowBonusDialog" class="index-alert-mask">
        <div class="img">
          <p>恭喜获得 {{prize}}，请复制一下代码进行兑换</p>
          <div class="code-wrapper">
            <p>{{coupon}}</p>
            <span class="tag-read" :data-clipboard-text="coupon" @click="copy">复制</span>
          </div>
          <el-button v-if="!isMobile" @click="exchange" type="danger">去兑换</el-button>
          <mt-button v-if="isMobile" @click="exchange" type="danger">去兑换</mt-button>

          <i @click="closeDialog" class="iconfont icon-2guanbi close-btn"></i>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
  import commonNav from '@/pages/activity/common-nav/common-nav.vue'
  import commonFooter from '@/pages/activity/common-footer/common-footer.vue'
  import {mapGetters} from 'vuex'
  import {queryRankings, drawLuckDraw, queryLuckDraw} from '@/api/index'
  import {isMobilePlatform} from '@/common/js/util'
  import Clipboard from "clipboard"

  export default {
    data() {
      return {
        isShowBonusDialog: false,
        prize: '',
        coupon: '',
        titList: [
          {
            text: '本月排行榜',
          },
          {
            text: '上月排行榜',
          },
        ],
        currentIdx: 0,
        headList: [
          {
            label: '排名',
            props: 'ranging'
          },
          {
            label: '玩家',
            props: 'name'
          },
          {
            label: '总次数',
            props: 'count'
          }
        ],
        dataObj: {
          "dayOver": 0,
          "totalOver": 0,
          "monthOver": 0,
          "data": [],
        },
        isMobile:isMobilePlatform(),
        mobileBanner:require('@/common/image/banner/m-banner/r-m-bg.jpg')
      }
    },
    computed: {
      ...mapGetters(['isLogin', 'userInfo'])
    },
    created() {
      this.isRun = true
      this.timer = null
      this._queryRankings()
      this._loadLuckComponents()
    },
    methods: {
      closeDialog() {
        this.isShowBonusDialog = false
      },
      openDialog() {
        this.isShowBonusDialog = true
      },
      // 点击抽奖
      startLuckDraw() {
        if (!this.isLogin) {
          this.$message({
            type: 'warning',
            message: '请先登录游戏'
          })
          return
        }
        clearTimeout(this.timer)
        if (this.isRun) {
          this.isRun = false
          this.slotClick()
        } else {
          this.$message({
            type: 'warning',
            message: '请稍后，勿重复点击'
          })
        }
        this.timer = setTimeout(() => {
          this.isRun = true
        }, 4000)

      },
      // 抽奖逻辑
      slotClick() {
        let $this = this
        queryLuckDraw().then((res) => {
          if (this.ERR_OK_OTHER === res.code || this.ERR_OK === res.code) {
            let item = res.message
            switch (item) {
              case '再接再厉':
                rotateFn(0, 30, item)
                break
              case '8元红包':
                rotateFn(1, 90, item)
                break
              case 'PTASIA68％存送优惠券':
                rotateFn(2, 60, item)
                break
              case 'SLOT68％存送优惠券':
                rotateFn(2, 60, item)
                break
              case 'CQ968％存送优惠券':
                rotateFn(2, 60, item)
                break
              case 'CQ9100％存送优惠券':
                rotateFn(3, 120, item)
                break
              case 'SLOT100％存送优惠券':
                rotateFn(3, 120, item)
                break
              case 'PTASIA100％存送优惠券':
                rotateFn(3, 120, item)
                break;
              case '18元红包':
                rotateFn(4, 150, item)
                break
              case '88元红包':
                rotateFn(5, 210, item)
                break
            }

            function rotateFn(awards, angles, txt) {
              $('#rotate').stopRotate();
              $('#rotate').rotate({
                angle: 0,
                animateTo: angles + 1800,
                duration: 4000,
                callback: function () {
                  if (txt === '再接再厉') {
                    $this.$message({
                      type: 'success',
                      message: txt
                    })
                  } else {
                    $this.prize = txt
                    $this.coupon = res.coupon
                    $this.openDialog()
                  }
                  $this.addLuckDrawTimes()
                }
              })
            }
          } else {
            $this.$message({
              type: 'warning',
              message: res.message
            })
          }
        })


      },
      // 去个人中心兑换彩金
      exchange() {
        if (this.flag) {
          if(this.isMobile){
            this.$router.push('/mobile/user/discounts')
          }else{
            this.$router.push('/user/discounts')
          }
        } else {
          this.$message({
            type: 'info',
            message: '请先复制代码并去账户中心进行兑换'
          })
        }
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
      // 领取彩金68
      drawLuckDraw() {
        if (!this.isLogin) {
          this.$message({
            type: 'warning',
            message: '请先登录游戏'
          })
          return
        }
        drawLuckDraw().then((res) => {
          if (this.ERR_OK_OTHER === res.code || this.ERR_OK === res.code) {
            this.openDialog()
            this.coupon = res.coupon
            this.prize = '68元成就奖金'
          } else {
            this.$message({
              type: 'warning',
              message: res.message
            })
          }
        })

      },
      selectItem(idx) {
        this.currentIdx = idx
      },
      // 查询排行版
      _queryRankings() {
        if (!this.isLogin) return
        queryRankings({type: this.currentIdx + 1}).then((res) => {
          if (this.ERR_OK === res.code || this.ERR_OK_OTHER === res.code) {

            if (typeof res.data === 'string') {
              res.data = JSON.parse(res.data)
            }
            if (res.data[0]) {
              this.dataObj = res.data[0]
            } else {
              this.dataObj = {
                "dayOver": 0,
                "totalOver": 0,
                "monthOver": 0,
                "data": [],
              }
            }
          }
        })
      },
      //load lucky
      _loadLuckComponents() {
        let jQuery = document.createElement('script')
        jQuery.src = '/script/jquery18.js'
        jQuery.onload = function () {
          let script = document.createElement('script')
          script.src = '/script/awardRotate.js'
          document.body.appendChild(script)
        }
        document.body.appendChild(jQuery)
      },
      // 抽奖次数加1
      addLuckDrawTimes() {
        this.dataObj.dayOver = Number(this.dataObj.dayOver) + 1
        this.dataObj.totalOver = Number(this.dataObj.totalOver) + 1
        this.dataObj.monthOver = Number(this.dataObj.monthOver) + 1
      }
    },
    watch: {
      currentIdx() {
        this._queryRankings()
      },
      isLogin(val) {
        if (!val) return
        this._queryRankings()
      }
    },
    components: {commonNav, commonFooter}

  }
</script>

<style lang="stylus" src="./lucky.styl" scoped>

</style>