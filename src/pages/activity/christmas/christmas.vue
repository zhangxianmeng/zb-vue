<template>
  <div class="chris">
    <common-nav ref="nav"></common-nav>
    <div class="main bg-wap">
      <div class="s-1 section">
        <div class="topic">
          <img src="./img/topic1.png" alt="">
        </div>
        <p>2018年12月20-31日期间，每日存款<span class="bold">满3000元</span>即可获得一份圣诞树和<span class="bold">彩金一份</span></p>
        <div class="trees">
          <div class="tree-wrap">
            <div :class="'item '+item.status" v-for="(item,idx) in treeList">
              <p>{{item.day}}</p>
              <img src="./img/tree.png" alt="">
              <span @click="takeTree(item)">{{item.receive}}</span>
            </div>

          </div>
        </div>
        <p>收集七份圣诞礼树即可获得圣诞<span class="bold">神秘礼盒一份</span></p>
        <div class="alls">
          <img src="./img/person.png" alt="">
          <div>
            <span @click="takeSeven()" class="seven">立即领取</span>
          </div>
        </div>
      </div>
      <div class="s-2 section">
        <div class="topic">
          <img src="./img/topic2.png" alt="">
        </div>
        <p>2019年1月1-10日活动期间</p>
        <div class="dep">
          <img @click="takeTree(item)" v-for="item in depList" :src="item.img">
        </div>

      </div>
      <div class="s-3 section">
        <div class="topic">
          <img src="./img/topic3.png" alt="">
        </div>
        <p>1.每天达到存款要求即可领取一份圣诞礼物，当日未领取视同放弃</p>
        <p>2.此优惠领取到的彩金必需在PT/PT国际/SLOT/CQ9/PG平台完成10倍流水方可提款</p>
        <p>3.元旦彩金2019年1月10 23:59:59前未领取视同放弃</p>
        <p>4.福利第二弹彩金只能领取一个额度的彩金</p>
        
      </div>
      <code-alert @close="close"
        :isShowDialog="isShowDialog"
        :coupon="coupon"
        :prize="prize">
      </code-alert>
    </div>
  </div>

</template>
<script>
  import commonNav from '@/pages/activity/common-nav/common-nav.vue'
  import commonFooter from '@/pages/activity/common-footer/common-footer.vue'
  import codeAlert from '@/pages/activity/alert/codeAlert.vue'
  import {mapGetters} from 'vuex'
  import {existGift,drawGiftNew,applyGiftNew} from '@/api/index'
  import {isMobilePlatform} from '@/common/js/util'
  import Clipboard from "clipboard"


  export default {
    data() {
        return{
//            状态 cant can done
            isShowDialog:false,
            treeList:[
                {
                    day:'第一天',
                    status:'cant',
                    receive:'存满领取',
                    ids:'',
                    title:'圣诞彩金8元'
                },
                {
                    day:'第二天',
                    status:'cant',
                    receive:'存满领取',
                    ids:'',
                    title:'圣诞彩金8元'
                },
                {
                    day:'第三天',
                    status:'cant',
                    receive:'存满领取',
                    ids:'',
                    title:'圣诞彩金8元'
                },
                {
                    day:'第四天',
                    status:'cant',
                    receive:'存满领取',
                    ids:'',
                    title:'圣诞彩金8元'
                },
                {
                    day:'第五天',
                    status:'cant',
                    receive:'存满领取',
                    ids:'',
                    title:'圣诞彩金8元'
                },
                {
                    day:'第六天',
                    status:'cant',
                    receive:'存满领取',
                    ids:'',
                    title:'圣诞彩金8元'
                },
                {
                    day:'第七天',
                    status:'cant',
                    receive:'存满领取',
                    ids:'',
                    title:'圣诞彩金8元'
                },
            ],
            depList:[
                {
                    img:require('./img/d-5000.png'),
                    status:'cant',
                    price:'5000',
                    ids:'',
                    title:'元旦彩金88元'
                },
                {
                    img:require('./img/d-10000.png'),
                    status:'cant',
                    price:'10000',
                    ids:'',
                    title:'元旦彩金288元'
                },
            ],

            giftID:{
                giftID:''
            },
            prize: '',
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
        this._checkstatus()
    },
    methods: {
      _checkstatus(){
          if (!this.isLogin) return
//type 0 ：未达标 1、可领取 2、已领取
          existGift().then((res) => {
              if (this.ERR_OK === res.code || this.ERR_OK_OTHER === res.code) {
//                  let chris = res.data.find(function (arr) {
//                      return arr.title === '圣诞彩金8元'
//                  });
                  let newys = res.data.find(function (arr) {
                      return arr.title === '元旦彩金88元'
                  });
                  let newyl = res.data.find(function (arr) {
                      return arr.title === '元旦彩金288元'
                  });
//                  for(let i = 0; i < chris.count; i++){
//                      this.treeList[i].status = 'done'
//                      this.treeList[i].receive = '已领取'
//                  }
//                  switch(chris.type)
//                  {
//                      case '0':
//                          this.treeList[chris.count].status = 'cant'
//                          this.treeList[chris.count].receive = '存满领取'
//                          break
//                      case '1':
//                          this.treeList[chris.count].status = 'can'
//                          this.treeList[chris.count].receive = '立即领取'
//                          this.treeList[chris.count].ids = chris.id
//                          break
//                      case '2':
//                          break
//                  }
                  switch(newys.type)
                  {
                      case '0':
                          this.depList[0].status = 'cant'
                          break
                      case '1':
                          this.depList[0].status = 'can'
                          this.depList[0].ids = newys.id
                          break
                      case '2':
                          this.depList[0].status = 'done'
                          break
                  }
                  switch(newyl.type)
                  {
                      case '0':
                          this.depList[1].status = 'cant'
                          break
                      case '1':
                          this.depList[1].status = 'can'
                          this.depList[1].ids = newyl.id
                          break
                      case '2':
                          this.depList[1].status = 'done'
                          break
                  }
              }else {

              }
          })

      },
      close(){
          this.isShowDialog = false;
          this._checkstatus()
      },
//领取彩金
      takeTree(item){
          if (!this.isLogin) {
              this.$refs.nav.openLoginDialog('isShowLoginDialog')
              return false
          }
          switch(item.status)
          {
              case 'done':
                  this.$message({
                      type: 'success',
                      message: '您已领取'
                  })
                  break;
              case 'cant':
                  this.$message({
                      type: 'success',
                      message: '请您活动期间，存满后领取'
                  })
                  break;
              case 'can':
                  this.giftID.giftID = item.ids;
                  applyGiftNew(this.giftID).then((res) => {
                      if (this.ERR_OK === res.code || this.ERR_OK_OTHER === res.code) {
                          this.isShowDialog = true
                          this.coupon = res.coupon
                          this.prize = item.title
                      }else {
                          this.$message({
                              type: 'warning',
                              message: res.message
                          })
                      }
                  })
                  break;
          }

      },
//收集圣诞神秘礼盒
      takeSeven(){
          if (!this.isLogin) {
              this.$refs.nav.openLoginDialog('isShowLoginDialog')
              return false
          }
          drawGiftNew().then((res) => {
              if (this.ERR_OK === res.code || this.ERR_OK_OTHER === res.code) {
                  this.isShowDialog = true
                  this.coupon = res.coupon
                  this.prize = '圣诞礼盒'
              }else {
                  this.$message({
                      type: 'warning',
                      message: res.message
                  })
              }
          })

      },
    },
    watch: {
        isLogin(val) {
            if (val) {
                this._checkstatus()
            }
        },
    },
    components: {commonNav, commonFooter,codeAlert}
  }
</script>
<style>
  .obt-wrap .obt{
    background: url(./img/alert.png) no-repeat center;
    background-size: contain;
  }
</style>
<style lang="stylus" src="./christmas.styl" scoped></style>