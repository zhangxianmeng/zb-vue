<template>
  <div class="service">
    <v-header :data="headData" @leftIconClick="back"></v-header>
    <div class="main">
      <div class="m-list">
        <ul>
          <li v-if="item.id !== 'zs' || (typeof vipEWM === 'string')" :class="{active:idx === currentIdx}"
              v-for="(item,idx) in filterList">
            <div class="tit" @click="selectItem(item,idx)">
              <p>
                <i v-if="item.icon" class="icon-badge-shit" :class="getIcon(item)"></i>
                <span>{{item.text}}</span>
              </p>
              <i class="iconfont icon-arrow"></i>
            </div>
            <transition name="slide-fade">
              <div v-if="idx === currentIdx && item.content" class="sub">

                <div class="center" v-if="item.id === 'wexin'">
                  <img class="img" :src="item.content.img" alt="">
                  <p class="text">{{item.content.text}}</p>
                </div>

                <div class="center" v-if="item.id === 'zs'">
                  <p class="text red" style="margin-bottom:10px">{{item.content.text}}</p>
                  <img class="img" :src="vipEWM" alt="">
                </div>

                <div v-if="item.id === 'phone'">
                  <div class="mobile-input-group">
                    <label for="phone">您的联系号码:</label>
                    <input v-model="number" id="phone"/>
                  </div>
                  <mt-button size="small" @click="makeCall" type="primary">电话回拨</mt-button>
                  <p style="margin-top:10px">{{item.content.text}}</p>
                </div>

                <div v-if="item.id=== 'email' || item.id=== 'ceo-email' ">
                  <p>{{item.content.text}}</p>
                </div>

              </div>
            </transition>

          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {makeCall, queryQrcode} from '@/common/js/mixin'
  import config from '@/common/js/config'
  import {mapGetters} from 'vuex'

  export default {
    mixins: [makeCall, queryQrcode],
    data() {
      return {
        headData: {
          title: '尊宝客服',
          leftIcon: 'arrowr'
        },

        list: [
          {
            icon: 'kefu',
            text: '在线客服',
            id: 'online',
            show: 'all'
          },
          {
            icon: 'weixin1',
            text: '微信客服',
            id: 'wexin',
            content: {
              img: config.wxServiceEwm,
              text: '微信公众号：zunbaoguoji 关注即可咨询！'
            },
            show: 'all'
          },
          {
            icon: 'weixin1',
            text: '专属客服',
            id: 'zs',
            content: {
              text: '周一至周六 10点-19点'
            },
            show: 'isLogin'
          },
          {
            icon: 'dianhua',
            text: '电话客服',
            id: 'phone',
            content: {
              text: '回拨为注册电话，点击号码回拨即可，如果回拨不是注册电话，请输入最新电话 ，点击回拨'
            },
            show: 'all'
          },
          {
            icon: 'youxiang',
            text: '客服邮箱',
            id: 'email',
            content: {
              text: `尊宝邮箱：${config.serviceEmail}`
            },
            show: 'all'
          },
          {
            icon: 'youxiang',
            text: 'CEO投诉邮箱',
            id: 'ceo-email',
            content: {
              text: `CEO投诉邮箱：${config.complaintEmail}`
            },
            show: 'all'
          },
        ],
        currentIdx: -1
      }
    },
    computed: {
      filterList() {
        if (this.isLogin) {
          return this.list
        } else {
          return this.list.filter(item => !item.show.includes('isLogin'))
        }
      },
      ...mapGetters(['isLogin'])
    },
    created() {
    },
    methods: {
      back() {
        this.$router.back()
      },
      selectItem(item, idx) {
        // 在线客服
        if (item.id === 'online') {
          window.location.href = config.serviceLink
        } else {
          if (this.currentIdx === idx) {
            this.currentIdx = -1
            return
          }
          this.currentIdx = idx
        }
      },
      getIcon(item) {
        return `iconfont icon-${item.icon}`
      },
    },
    watch: {},
    components: {}

  }
</script>

<style lang="stylus" src="./service.styl" scoped>

</style>