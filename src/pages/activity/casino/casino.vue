<template>
  <div class="casino">
    <common-nav></common-nav>
    <div class="bg-wap">
      <div class="banner">
        <img class="logo" src="./img/logo.png" alt="">
        <div id="points" class="points">
          <div class="p-item"
               v-for="(item,index) in tabsParam"
               @click="toggleTabs(index)"
               :class="{active:index === nowIndex}"
          ></div>
        </div>
      </div>
      <div class="content">
        <div id="tabs" class="tabs">
          <div class="tab-item" v-show="nowIndex==0">
            <div class="t1">
              <div class="top">
                <img src="./img/top1.jpg" alt="">
                <img src="./img/top2.jpg" alt="">
                <img src="./img/top3.jpg" alt="">
              </div>
              <p>如何参赛：用户账号必须为尊宝国际AG平台的真钱账号；进入尊宝国际AG平台在“赌神赛”厅中选择对应的比赛场报名即可；</p>
              <div>
                <img class="m-40" src="./img/ti-b1.png" alt="">
              </div>
              <div>
                <img src="./img/t1-b2.png" alt="">
              </div>
            </div>
          </div>
          <div class="tab-item" v-show="nowIndex==1">
            <p><span class="num">1</span>玩家报名参加比赛后，在比赛中将以固定的比赛筹码在特定的比赛桌枱中进行投注，该比赛筹码与玩家<span style="color:#f2960a ">个人真钱额度及用户积分</span>并无任何关联，所有比赛筹码将不会累积带到下一个比赛场中。若玩家的用户积分不足，可通过非比赛的游戏投注，来提高有效投注额换积分；</p>
            <p><span class="num">2</span>为保证系统公平透明性，玩家报名成功后，进入比赛场时的座位均采用系统随机分配，玩家不得选择或交换桌台上的座位；</p>
            <p><span class="num">3</span>所有比赛奖金将依照各比赛场奖金分配表发放，实时到账；</p>
            <p><span class="num">4</span>比赛将根据“免佣百家乐”的规则下进行，有关“百家乐”游戏规则请于游戏内按菜单>游戏规则查看玩法。参赛者必须于每局下注时间内下注，每局的下注时限为25秒，每位参赛者必须于每局至少以最低投注额下注于庄家或闲家。于每一手牌中，参赛者只可选择投注于庄家或闲家任何一方，当选择投注于和局或对子时，亦必须同时选择投注庄家或闲家其中一方；</p>
            <p><span class="num">5</span>于资格赛及赌神赛开始前，每位参赛者将获得比赛筹码10万 (比赛筹码只适用于比赛，不能兑换现金或现金筹码)，玩家在比赛中的投注限红为1000 -10,000, 参赛者不可投注多于其拥有之比赛筹码。</p>
            <p>在比赛进行时，参赛者于每局的投注金额限制如下：</p>
            <table class="table">
              <tbody>
              <tr>
                <td>投注項目</td>
                <td>最低投注筹码</td>
                <td>最高投注筹码</td>
              </tr>
              <tr>
                <td>庄家</td>
                <td>1,000</td>
                <td>10,000</td>
              </tr>
              <tr>
                <td>闲家</td>
                <td>1,000</td>
                <td>10,000</td>
              </tr>
              <tr>
                <td>和局</td>
                <td>100</td>
                <td>1,000</td>
              </tr>
              <tr>
                <td>对子</td>
                <td>100</td>
                <td>1,000</td>
              </tr>
              </tbody>
            </table>
            <p><span class="num">6</span>所有比赛场，荷官会先派出2局不设投注的牌局后开始正式发牌，后面的比赛在同一靴牌中将不再重复洗牌；</p>
            <p><span class="num">7</span>为保证玩家间的公平透明，比赛系统将使用以下晋级/淘汰机制：</p>
            <div class="pl-180">
              <p>比赛过程中,系统根据每个比赛场次设定的规则每轮按虚拟桌晋级指定数目的玩家，每轮未获晋级的參賽者将自动淘汰。</p>
              <p>例如：某场比赛共56人参赛，玩家分布于A、B、C、D、E、F、G 、H 8个虚拟桌上，比赛共分4轮(每轮5局)进行，每轮比赛每桌晋级前3名, 即A-H每桌的前3名晋级下一轮(未晋级的自动淘汰),直到比赛完成。</p>
              <p>玩家比赛中晋级的额度优势: 如比赛场设定每桌每轮晋级2 人以上时，当玩家在上一轮以第一名晋级下一轮时，每桌第一名的玩家的在下一轮的初始比赛筹码额度会有固定百分比的增加（即每桌的第一名会比其他玩家多固定百分比的比赛筹码额度，该百分比在游戏中设定）</p>
              <p>系统采用尽量保证每桌玩家数目平均的方式，每轮晋级的玩家将会再次随机平均分配到不同的桌上进行游戏；</p>
            </div>
            <p><span class="num">8</span>于比赛过程中，可使用的特别投注功能条款如下:</p>
            <div class="pl-180">
              <p>“暗注”供参赛者于比赛中使用，是属于策略投注技巧。主要是隐藏自己投注的项目，直到投注时间完毕时，其他玩家才能看到自己所投的筹码及位置。暗注次数则按该场比赛的”轮数”提供相对的暗注次数。例如: 总轮数: 5 , 总暗注次数: 5</p>
              <p>“过牌”供参赛者做决定时使用，意思就是不下注。过牌次数则按该场比赛的”轮数”提供相对的过牌次数。例如: 总轮数: 5 , 总过牌次数: 5</p>
            </div>
            <p><span class="num">9</span>不论赢或输，所有已使用或未使用的特别投注功能于比赛结束时将自动清零，参赛者之间不能转让或借用比赛筹码，在每场比赛结束后，系统会将玩家的比赛筹码自动清零。</p>
            <p><span class="num">10</span>排名规则将使用以下优先级:</p>
            <div class="pl-180">
              <p>晋级参赛者排名高于淘汰玩家,然后按该场比赛筹码从高至低来排名；</p>
              <p>若玩家比赛筹码相同,则该场胜率较高者排名较高；</p>
              <p>若以上2个排名规则情况下多个参赛者存在相同排名,则以该场报名时间较早的玩家排名较高。</p>
            </div>
            <p><span class="num">11</span>如参赛者在比赛中因任何理由需离开比赛，离桌的时间不可超过5局游戏，若违反此规定，参赛者获奖的资格将被取消而只可获排名。</p>
          </div>
          <div class="tab-item" v-show="nowIndex==2">

            <p><span class="num">1</span>所有有效尊宝国际AG平台的真钱会员均可参加。</p>
            <p><span class="num">2</span>活动期间，玩家参与“资格赛”，需使用玩家现有用户积分报名参与赛事；</p>
            <p><span class="num">3</span>所有比赛均依照比赛大厅所公告之时间准时开始报名，我们有权在不事先通知玩家的情况下，更改、延迟或取消比赛。</p>
            <p><span class="num">4</span>用户积分赚取只限玩家于真人视讯游戏中进行有效投注，包括：各类型百家乐、龙虎、骰宝、轮盘、21点、牛牛、炸金花、竞咪、多台、包桌、好路投注；详细说明以及积分兑换规则请参考“用户积分系统” 说明。</p>
            <p><span class="num">5</span>“资格赛”胜出者即可获取参与“赌神赛”门票一张 (若门票已派完则当日不再发放门票，所有比赛也不再接受报名，先到先得，派完即止)，每位玩家获得的门票于本月比赛活动期间有效 </p>
            <p><span class="num">6</span>为保证活动回馈广大会员，本活动每位会员限同一帐户及同一IP地址参加。违规者取消领奖资格，严重舞弊者尊宝国际有权在不事先通知情况下作封号处理或扣除相关获利；</p>
            <p><span class="num">7</span>任何会员以任何非法手段，包括但不限于对冲、合谋作弊等参加本活动，违规处理等同活动条款6 </p>
            <p><span class="num">8</span>若违反比赛之规定，参赛者将会失去其参赛的资格 </p>
            <p><span class="num">9</span>玩家参加本次AG活动，即视为同意本活动条款；</p>
            <p><span class="num">10</span>尊宝国际保留对本次活动的最终解释权。</p>

          </div>
          <div class="tab-item" v-show="nowIndex==3">
            <div class="t4">
              <h3>报名</h3>
              <p><span class="num">1</span>如果玩家同时拥有赌神赛门票和足够积分的情况报名赌神赛，系统优先使用门票来报名赌神赛</p>
              <p><span class="num">2</span>任何比赛开始前的20分钟内同一用户同时只能报名一场比赛（资格赛或赌神赛）</p>
              <div class="pl-180">
                <p>为确保玩家能优先进行赌神赛，当玩家已经报名赌神赛且距离下场赌神赛开始只有20分钟的情况下，同一个玩家不能报名另一场资格赛；</p>
                <p>若玩家已报名赌神赛且离该赌神赛开始多于20分钟，则玩家仍可以报名资格赛，但当该场赌神赛开始只有20分钟且玩家报名的资格赛仍未开始则系统会自动取消玩家所报名的资格赛并退回积分。</p>
              </div>
              <h3>退赛</h3>
              <p><span class="num">1</span>每一位玩家只可以在比赛开始前退赛，退赛后将不可以重新报名该相同场次的比赛。</p>
              <p><span class="num">2</span>比赛开始后,玩家强行退赛将按该玩家已下注局数及轮数来判断排名及获奖机会。</p>
              <p><span class="num">3</span>所有用户可以选择旁观正在进行中的比赛, 不能投注比赛, 但可以进行聊天 </p>
              <h3>异常处理</h3>
              <p><span class="num">1</span>如遇系统故障原因而影响比赛顺利进行,我们有权随时取消比赛，并且将该场比赛取消后实时退还玩家在该场比赛已扣除的用户积分或赌神赛门票；</p>
              <p><span class="num">2</span>比赛开始后，因玩家自身网络原因造成的断线，玩家应在5局时间内重新登录并即时返回该比赛场游戏，自动下注系统将在每一局以最小限红于“闲”下注，当5局时间内玩家仍未进入比赛场将自动因玩家没有任何手动下注而被淘汰，玩家只会获取排名而不会获取任何奖金机会；</p>
              <p><span class="num">3</span>任何参与比赛的玩家如因连续使用对冲下注等方法进行比赛投注，我们有权取消玩家比赛资格及奖金，并将对该玩家作封号处理，永久不得参加比赛。</p>
            </div>
          </div>
        </div>
    </div>
    <input type="hidden" value="${session.customer.loginname}" id="checkUserIsLoad">

  </div>
    <common-footer></common-footer>
  </div>
</template>

<script>
  import commonNav from '@/pages/activity/common-nav/common-nav.vue'
  import commonFooter from '@/pages/activity/common-footer/common-footer.vue'
  export default {
    data() {
      return {
          tabsParam:['tab1','tab2','tab3','tab4'],
          nowIndex:0,
      }
    },
    computed: {},
    created() {},
    methods: {
        toggleTabs:function(index){
            this.nowIndex=index
        },
    },
    watch: {},
    components: {commonNav,commonFooter}

  }
</script>

<style lang="stylus" scoped>
  .casino
    background #fefefe
    .bg-wap
      background url('./img/bg2.jpg') no-repeat center bottom
  #modal-login .modal-dialog{
    width: 25%
  }
  .banner{
    position: relative
    background: url("./img/aug-bg.jpg") no-repeat top center
    height: 850px
    min-width:1200px
  }
  .tab-warp{
    margin-bottom: 80px
  }
  .table {
    background-color: #0a2337
    margin:0 0 35px 0
    border: none
    width: 500px
  }
  .table tr,th,td {
    color: #fff
    font-size: 14px
    text-align: center
  }
  .table tr th {
    color: #fff
    background: #494949
  }
  .table tbody tr{
    background-color:#fff
  }
  .c-yel {
    color: #de0101!important
  }
  .table th, .table td {
    line-height: 40px
    border: 1px solid #d3881e
    padding: 0px
    font-size: 26px
    font-weight: normal
    color: #563908
  }
  #headertop{
    background-color:#05051a
  }
  a.goHome{
    border: 2px solid #fff
    background-color: #05051a
    line-height: 48px
  }
  .table td{
    font-size: 16px
  }
  .footer {
    color: #fff
    background-color:#05051a
    font-size: 14px
  }
  .modal-dialog iframe{
    height: 260px
  }

  .bg-wap {
    background: url("./img/bg2.jpg") no-repeat bottom center #fff
    overflow: hidden
    text-align: center
    margin-bottom: -20px
  }
  .bot.c-yel{
    margin: 50px 0
  }
  .points{
    position: absolute
    width: 1200px
    bottom: 0
    left: 50%
    margin-left: -600px
    height: 90px
  }
  .points .p-item{
    display: inline-block
    width: 24.5%
    height: 90px
    cursor: pointer
  }
  .points .p-item:nth-child(1){
    display: inline-block
    background: url("./img/topic1.png") no-repeat center
    background-size: contain
  }
  .points .p-item:nth-child(2){
    display: inline-block
    background: url("./img/topic2.png") no-repeat center
    background-size: contain
  }
  .points .p-item:nth-child(3){
    display: inline-block
    background: url("./img/topic3.png") no-repeat center
    background-size: contain
  }
  .points .p-item:nth-child(4){
    display: inline-block
    background: url("./img/topic4.png") no-repeat center
    background-size: contain
  }
  .points .p-item.active:nth-child(1){
    background: url("./img/topic-1.png") no-repeat center
    background-size: contain
  }
  .points .p-item.active:nth-child(2){
    background: url("./img/topic2-1.png") no-repeat center
    background-size: contain
  }
  .points .p-item.active:nth-child(3){
    background: url("./img/topic3-1.png") no-repeat center
    background-size: contain
  }
  .points .p-item.active:nth-child(4){
    background: url("./img/topic4-1.png") no-repeat center
    background-size: contain
  }
  img.logo{
    position: absolute
    top: 170px
    left: 50%
    margin-left: -150px
    -webkit-animation: myfirst 3s infinite
    width 300px
  }
  .tab-item{
    color: #634310
    font-size: 16px
  }
  .tab-item p{
    position: relative
    text-align: left
    margin: 20px 0
    line-height: 2
    padding-left: 40px
  }
  .num{
    position: absolute
    left: 0px
  }
  .pl-180{
    padding-left: 33px
  }
  .t1 img{
    vertical-align: bottom
    margin 5px
  }
  .m-40{
    margin: 40px 0
  }
  @-webkit-keyframes myfirst
  {
    0%   {top: 170px }
    50%  {top:130px }
    100% {top:170px }
  }
  .tab-item h3{
    font-size: 24px
    font-weight: bold
  }
  .tab-item .t1{
    padding: 74px
  }
  .tab-item{
    padding: 30px 0
    width: 1150px
    margin: 0 auto
  }

  @media screen and (max-width: 767px)
    .casino
      .bg-wap
        background url(./img/aug-bg-m.jpg) no-repeat top
        background-size contain
        padding 54% 1% 8%
        .table
          width 100%
        .banner
          height auto
          min-width: auto
          background transparent
          img
            display none
        .points
          position: inherit;
          width: 100%;
          margin: 0;
          left: 0;
          height: auto
          .p-item
            height 45px
        .tab-item
          width: 100%;
          padding 0
        .tab-item .t1
          padding: 0;
        .t1 img
          width 96%
</style>