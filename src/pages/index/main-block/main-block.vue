<template>
  <div class="main-block">
    <div class="left-nav-block">
      <router-link v-if="item.path.includes('/')" v-for="item in navItems" :to="{path:item.path}">
        <i v-if="item.new" class="iconfont icon-iconfontzhizuobiaozhun023113 icon-badge-shit"></i>
        <i :class="_getIconClass(item.icon)" class="iconfont icon"></i>
        <span>{{item.text}}</span>
      </router-link>
      <a v-for="item in navItems" v-if="!item.path.includes('/')" :href="item.path">
        <i v-if="item.new" class="iconfont icon-iconfontzhizuobiaozhun023113 icon-badge-shit"></i>
        <i :class="_getIconClass(item.icon)" class="iconfont icon"></i>
        <span>{{item.text}}</span>
      </a>
      <div class="zb-app-download">
        <img src="./img/icat.jpg" alt="">
      </div>
    </div>
    <div class="right-game-block">
      <div class="item">
        <div class="big-box">
          <div class="big">
            <img src="./img/p-ag.jpg" alt="">
            <div class="mask">
              <img src="./img/i-ag.png" alt="">
              <div class="text">
                <p>亚洲最新的游戏平台</p>
                <p>极致画面的震撼</p>
              </div>
              <game-api :factoryFun="gameAginRedirect">
                <el-button type="warning">立即投注</el-button>
              </game-api>
            </div>
          </div>
          <div class="big">
            <img src="./img/p-sport.jpg" alt="">
            <div class="mask">
              <img src="./img/i-sport.png" alt="">
              <div class="text">
                <p>推荐赛事</p>
                <p>{{sbData.gameTime}}</p>
                <p>{{sbData.name1}} VS {{sbData.name2}} </p>
              </div>
              <p class="sb-p">全场单双 {{sbData.odds}}</p>
              <router-link to="/sports">
                <el-button type="warning">立即投注</el-button>
              </router-link>
            </div>
          </div>
        </div>
        <div class="small-box">

          <div class="small-item">
            <img src="./img/p-fish.jpg" alt="">
            <div class="mask">
              <h3>捕鱼游戏</h3>

              <router-link class="light" to="/fish-classify">
                <el-button type="warning">立即游戏</el-button>
              </router-link>

            </div>
          </div>

          <div class="small-item">
            <img src="./img/p-card.jpg" alt="">
            <div class="mask">
              <h3>棋牌游戏</h3>
              <router-link class="light" to="/chess">
                <el-button type="warning">立即游戏</el-button>
              </router-link>
            </div>
          </div>

        </div>
      </div>
      <div class="item item-02">
        <div v-for="item in slotList" class="small-item">
          <img :src="item.icon" alt="">
          <div class="mask">
            <h3><img :src="item.img" alt=""></h3>

            <router-link :to="{path:item.path}">
              <el-button type="warning">立即游戏</el-button>
            </router-link>

          </div>
        </div>

        <div class="small-item">
          <img src="./img/p-more.jpg" alt="">
          <div class="mask">
            <h3>更多游戏</h3>
            <router-link to="/slots/pt">
              <el-button type="warning">立即游戏</el-button>
            </router-link>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import gameApi from '@/components/game-api/game-api'

  import {getShabSetting,gameAginRedirect} from '@/api/index'

  export default {
    data() {
      return {
        gameAginRedirect,
        sbData: {},//沙巴体育
        // 左侧导航
        navItems: [
          {
            text: 'VIP专区',
            icon: 'VIP',
            path: '/activity/vip',
            new: true
          },
          {
            text: '积分商城',
            icon: 'jifenshangcheng',
            path: '/integral',
            new: true
          },
          {
            text: '代理加盟',
            icon: 'zhaoshangdaili',
            path: '/activity/newagents'
          },
          // {
          //   text: '官方公众号',
          //   icon: 'guanfangrenzheng',
          //   path: '#foot'
          // },
          {
            text: '尊宝电影院',
            icon: 'dianyingyuan',
            path: '/activity/movie'
          },
          {
            text: '客服中心',
            icon: 'kefu',
            path: '/service'
          }
        ],
        // 老虎机
        slotList: [
          {
            icon: require('./img/p-pt.jpg'),
            img: require('./img/i-pt.png'),
            path: '/slots/pt'
          },
          {
            icon: require('./img/p-dt.jpg'),
            img: require('./img/i-dt.png'),
            path: '/slots/dt'
          },
          {
            icon: require('./img/p-mg.jpg'),
            img: require('./img/i-mg.png'),
            path: '/slots/mg'
          },
          {
            icon: require('./img/p-png.jpg'),
            img: require('./img/i-pg.png'),
            path: '/slots/pg'
          },

        ],
      }
    },
    computed: {},
    created() {
      this._getShabSetting()
    },
    methods: {
      //沙巴体育
      _getShabSetting() {
        getShabSetting().then((res) => {
          if (res.code === this.ERR_OK) {
            this.sbData = res.data
          }
        })
      },
      //获取导航icon
      _getIconClass(icon) {
        return `icon-${icon}`
      },
    },
    watch: {},
    components: {
      gameApi
    }

  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'
  .main-block
    margin 20px 0
    clearfix()

  .left-nav-block
    float left
    width 190px
    background #d82737
    color $color-light
    a
      display block
      border-bottom 1px solid #b00110
      line-height 54px
      padding-left 30px
      color $color-light
      font-size 16px
      position relative
      &:hover
        background #f85f00
      i.icon
        margin-right 10px
        font-size 18px
      .icon-badge-shit
        position absolute
        left 0
        top -12px
        color $color-danger
        font-size 30px

    .zb-app-download
      padding 10px 0
      text-align center
      img
        width 100%

  .right-game-block
    float left
    margin-left 20px
    .item
      clearfix()
    .mask
      position absolute
      top 0
      left 0
      right 0
      bottom 0
      background rgba(47, 52, 82, 0.7)
      text-align center
      color $color-light
      opacity 0
      transition all .3s ease-in
      a
        color $color-light
      img
        margin-top 30px
      h3
        height 90px
        line-height 90px
        font-size 18px
        font-weight 600
      .text
        width 70%
        margin 30px auto
        padding 20px 0
        border-bottom 1px solid #bbb
        border-top 1px solid #bbb
        line-height 28px

    .big:hover .mask, .small-item:hover .mask
      opacity 1
    .big-box
      float left
      font-size 16px
    .big
      float left
      width 390px
      height 317px
      overflow hidden
      position relative
      margin-right 10px
      cursor pointer
      img
        transition:all 1s ease
      &:hover img
        transform: scale(1.1)
      &:last-child .mask
        .text
          padding 5px 0
          margin-bottom 10px
        .sb-p
          margin-bottom 10px

    .small-box
      float left
      width 190px
      .small-item:last-child
        margin-top 13px

    .small-item
      position relative
      height 152px
      width 190px
      overflow hidden
      float left
      cursor pointer
      img
        transition:all 1s ease
      &:hover img
        transform: scale(1.1)
      .mask
        h3
          img
            margin-top 0
    .item-02
      margin-top 10px
      .small-item:not(:last-child)
        margin-right 10px
</style>