<template>
  <div class="safe">
    <v-header :data="headData" @leftIconClick="back"></v-header>
      <div class="s_conter">
        <div class="top_box">
          <ul>
            <li @click="navItem(item)" v-for="(item,idx) in navlist">
              <i><img :src="item.img"></i>
              <span>{{item.text}}</span>

              <transition name="slide-fade">
                <div class="shAlert" v-if="item.id =='serveremail'" v-show="isServeremail">
                  <div>
                    <p>{{item.content.text}}</p>
                  </div>
                </div>
                <div class="shAlert" v-if="item.id =='selfserver'" v-show="isSelfserver">
                  <div>
                    <img class="img" :src="vipEWM" alt="">
                    <p>{{item.content.text}}</p>
                  </div>
                </div>
              </transition>
            </li>
          </ul>
        </div>
        <div class="Space"></div>
        <div id="conter">
          <div class="section1 ">
            <div class="section1_title">
              <span>帮助中心</span>
            </div>
            <div class="section1_list">
              <ul>
                <li>
                  <a v-for="item in flist" @click="selectItem(item)" href="javascript:;"  class="title">
                    <i :class="getIcon(item)"></i>
                    <span>{{item.text}}</span>
                  </a>
                </li>
              </ul>
              <div class="Space"></div>
              <div class="section1_title">
                <span>常用服务</span>
              </div>
              <ul>
                <li>
                  <a @click="selectItem(item)" v-for="item in tlist" href="javascript:;">
                    <i :class="getIcon(item)"></i>
                    <span>{{item.text}}</span>
                  </a>
                </li>
              </ul>
            </div>
            <div class="Space"></div>
            <div class="section1">
              <div class="section1_title">
                <i class=""></i>
                <span>电话回拨</span>
              </div>
              <div class="section1_box">
                <div class="section1_box_input">
                  <input v-model="number" type="text" value="" placeholder="输入手机号码" id="phone" />
                  <span class="huibo"  @click="makeCall">电话回拨</span>
                  <p>24小时电话回拨为您服务</p>
                </div>
              </div>
            </div>
            <div class="Space"></div>
          </div>
        </div>
      </div>

    </div>
</template>

<script>
    import {makeCall, queryQrcode} from '@/common/js/mixin'
    import config from '@/common/js/config'
    import VDialog from '@/components/dialog/dialog'
    import {mapGetters} from 'vuex'

  export default {
    mixins: [makeCall, queryQrcode],
    data() {
      return {
        headData: {
          title: '客服中心',
          leftIcon: 'arrowr',
        },
          navlist:[
              {
                  text:'在线客服',
                  img:require('./img/server.png'),
                  id:'online'
              },
              {
                  text:'客服邮箱',
                  img:require('./img/server-email.png'),
                  id:'serveremail',
                  content:{
                      text: `尊宝邮箱：${config.serviceEmail}`
                  }
              },
              {
                  text:'专属客服',
                  img:require('./img/safe.png'),
                  id:'selfserver',
                  content: {
                      text: '周一至周六 10点-19点'
                  },
                  show: 'isLogin'
              }
          ],
          flist:[
              {
                  text:'账号问题',
                  icon:'icon-test',
                  id:'userqustion'
              },
              {
                  text:'资金问题',
                  icon:'zizhufanshui',
                  id:'cashqustion'
              },
              {
                  text:'优惠问题',
                  icon:'tuikuan',
                  id:'offerquestion'
              },
              {
                  text:'游戏问题',
                  icon:'zizhu',
                  id:'gamequestion'
              },
              {
                  text:'技术问题',
                  icon:'shezhi',
                  id:'techquestion'
              },

          ],
          tlist:[
              {
                  text:'免费注册',
                  icon:'zizhufanshui',
                  id:'register'
              },
              {
                  text:'自助返水',
                  icon:'zhuanzhang',
                  id:'funds'
              },
              {
                  text:'找回账号',
                  icon:'zhaoshangdaili',
                  id:'username'
              },
              {
                  text:'找回密码',
                  icon:'jinjishenpi',
                  id:'password'
              },
              {
                  text:'账号解锁',
                  icon:'chouma',
                  id:'unuser'
              },
              {
                  text:'解绑银行卡',
                  icon:'declare',
                  id:'uncard'
              },
          ],
          isServerwx: false,
          isServeremail: false,
          isSelfserver: false
      }
    },
    computed: {
        ...mapGetters(['isLogin'])
    },
    created() {
    },
    methods: {
        back() {
          this.$router.back()
        },
        getIcon(item){
            return `iconfont icon-${item.icon}`
        },
        navItem(item){
            // nav
            if(item.id === 'online'){
                window.location.href = config.serviceLink
            }else {
                if(item.id === 'serverwx'){
                    this.isServerwx = !this.isServerwx;
                }
                if(item.id === 'serveremail'){
                    this.isServeremail = !this.isServeremail;
                }
                if(item.id === 'selfserver'){
                    if(!this.isLogin){
                        this.$message({
                            type:'waring',
                            message:'请先登录'
                        })
                        return
                    }
                    this.isSelfserver = !this.isSelfserver;
                }
            }
        },
        selectItem(item, idx) {
            // 帮助中心

            if(item.id === 'userqustion'){
                this.$router.push('/mobile/self-account')
            }else if(item.id === 'cashqustion'){
                this.$router.push('/mobile/self-funds')
            }else if(item.id === 'offerquestion'){
                this.$router.push('/mobile/self-offer')
            }else if(item.id === 'gamequestion'){
                this.$router.push('/mobile/self-game')
            }else if(item.id === 'techquestion'){
                this.$router.push('/mobile/self-tech')
            }



            // 常用服务
            if (item.id === 'register') {
                this.$router.push('/mobile/register')
            } else if(item.id === 'funds'){
                if(!this.isLogin){
                    this.$message({
                        type:'waring',
                        message:'请先登录'
                    })
                    return
                }
                this.$router.push('/mobile/user/discounts/backwater')
            }else if(item.id === 'username'){
                this.$router.push('/mobile/help-self/forget-account')
            }else if(item.id === 'password'){
                this.$router.push('/mobile/help-self/forget-pwd')
            }else if(item.id === 'unuser'){
                this.$router.push('/mobile/help-self/unbind-account')
            }else if(item.id === 'uncard'){
                this.$router.push('/mobile/help-self/unbind-card')
            }
        },
        closeDialog(attr) {
            this[attr] = false
        }
    },
    watch: {},
    components: {VDialog}

  }
</script>

<style lang="stylus" src="./self-help.styl" scoped>

</style>