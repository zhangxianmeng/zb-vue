<template>
  <div class="game-menu-wrapper">
    <div v-if="isShow" class="mask" @click="closeMenu"></div>
    <transition name="slider-right">
      <div v-if="isShow" class="menu-wrapper">

        <div v-if="isShowTitleTab" class="tab-header">
          <tab-card :list="list" @selectTabItem="selectTabItem" :currentIdx="currentIdx"></tab-card>
        </div>
        <div class="tab-content">
          <!--老虎机-->
          <div class="filters" v-if="currentIdx === 0">

            <div class="common-type game-platform">
              <h3 class="tit red">游戏平台</h3>
              <div class="item-list">
                <router-link class="item" v-for="item in platformList"
                             :to="{path:`/mobile/${isShowTitleTab?'slots':'btc-bet'}/${item.path}?${platform}`}">
                  {{item.text}}
                </router-link>
                <a v-if="isShowTitleTab" class="item" @click="playGame(bbinLogin,{gameKind:'game',gameCode:'',mode:'h5'})"
                   href="javascript:;">BBIN</a>
              </div>
            </div>

            <div class="common-type" v-if="item.list[category] && item.list[category].length"
                 v-for="item in filterTypeList">
              <h3 class="tit red">{{item.title}}</h3>
              <div class="item-list">
                <a
                    href="javascript:;"
                    @click="search(obj,item)"
                    class="item"
                    v-for="(obj) in item.list[category]"
                    :class="{active: obj.value === item.active}">
                  {{obj.name}}
                </a>
              </div>
            </div>

          </div>

          <!--真人-->
          <div v-if="currentIdx === 1">
            <div class="common-type">
              <h3 class="tit red">游戏平台</h3>
              <div class="item-list">
                <a @click="playGame(item.api,item.reqData)" v-for="item in realList" class="item" href="javascript:;">{{item.text}}</a>
              </div>
            </div>
          </div>

          <!--捕鱼-->
          <div v-if="currentIdx === 2">
            <div class="common-type">
              <h3 class="tit red">游戏平台</h3>
              <div class="item-list">
                <a @click="playGame(item.api,item.reqData)" v-for="item in fishList" class="item" href="javascript:;">{{item.text}}</a>
              </div>
            </div>
          </div>

          <!--体育-->
          <div v-if="currentIdx === 3">
            <div class="common-type">
              <h3 class="tit red">游戏平台</h3>
              <div class="item-list">
                <a @click="playGame(item.api,item.reqData)" v-for="item in sportsList" class="item" href="javascript:;">{{item.text}}</a>
              </div>
            </div>
          </div>

        </div>

        <div class="bottom">
          <span @click="reset">重置</span>
          <span @click="closeMenu">完成</span>
        </div>

      </div>
    </transition>
  </div>
</template>

<script>
  import {
    getEbetToken,
    gameAginRedirect,
    cg761Login,
    kyqpLogin,
    bbinLogin,
    gameAginBuyuRedirect,
    mwgLogin,
    sbLogin,
    PBUserLogin,
    imLogin,
    fanyaLogin,
    gameMGLive,
    vrLogin
  } from '@/api/index'
  import {playGame, gameFilter} from '@/common/js/mixin'
  import {mapGetters} from 'vuex'
  import TabCard from 'MComponents/tab-card/tab-card'

  export default {
    mixins: [playGame, gameFilter],
    props: {
      isShow: {
        type: Boolean,
        default: false
      },
      currentIdx:{
        type:Number,
        default:0
      },
      isShowTitleTab:{
        type:Boolean,
        default:true
      },
      platformList:{
        type:Array,
        default:[]
      }
    },
    data() {
      return {
        bbinLogin,
        //真人列表
        realList: [
          {
            text: 'EBET',
            api: getEbetToken,
          },
          {
            text: 'AG真人',
            api: gameAginRedirect,
          },
          {
            text: 'MG真人',
            api: gameMGLive,
          },
          {
            text: 'BBIN真人',
            api: bbinLogin,
            reqData: {
              gameKind: 'live',
              mode: 'h5',
              gameCode: ''
            }
          },
          {
            text:'VR彩票',
            api:vrLogin,
          }

        ],
        //捕鱼
        fishList: [
          {
            text: 'AG捕鱼',
            api: gameAginBuyuRedirect,
          },
          {
            text: '千炮捕鱼',
            api: mwgLogin,
            reqData: {gameCode: 1051}
          },
          {
            text: '761捕鱼',
            api: cg761Login,
            reqData: {gameCode: 'jcby'}
          },
          {
            text: '棋乐游',
            api: cg761Login,
            reqData: {gameCode: ''}
          },
          {
            text: '开元棋牌',
            api: kyqpLogin,
            reqData: {gameCode: ''}
          },
        ],
        //体育
        sportsList: [
          {
            text: '沙巴体育',
            api: sbLogin,
          },
          // {
          //   text: '平博体育',
          //   api: PBUserLogin,
          // },
          {
            text: 'IM体育',
            api: imLogin,
          },
          {
            text: '泛亚电竞',
            api: fanyaLogin,
          },
        ],
        list: [
          {
            text: '老虎机'
          },
          {
            text: '真人&彩票'
          },
          {
            text: '捕鱼&棋牌'
          },
          {
            text: '体育平台'
          },
        ],
      }
    },
    computed: {
      platform(){
        return window.location.href.includes('isFromApp')?'isFromApp':''
      },
      ...mapGetters(['isLogin'])
    },
    created() {
    },
    methods: {
      closeMenu() {
        this.$emit('closeMenu')
      },
      selectTabItem(idx) {
        this.$emit('selectTabItem',idx)
      }
    },
    components: {
      TabCard
    }
  }
</script>

<style lang="stylus" src="./game-menu.styl" scoped></style>
