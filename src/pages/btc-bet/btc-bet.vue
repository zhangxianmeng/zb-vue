<template>
  <div class="btc-bet wrapper">
    <div class="btc-user-header">
      <div class="left-wrapper">
        <div class="avator">
          <img :src="levelImage" alt="">
        </div>

        <div class="user-info">
          <p>
            <span>欢迎回来：</span>
            <span class="color-intersperse">{{userInfo.loginname}}</span>
          </p>
          <p>
            <span>币量：</span>
            <select v-model="currentCode">
              <option v-for="item in btcList" :value="item.value">{{item.value}}</option>
            </select>
            <span class="color-intersperse"> {{currentBtcWallet.balance || 0}}</span>
            <span style="margin-left:10px;cursor: pointer" @click="refresh" class="iconfont icon-shuaxin refresh"></span>
          </p>
        </div>

        <div class="introduce">
          <p>
            <span>分数转换：</span>
            <span>1BTC / 1ETH = 1000分</span>
          </p>
          <p>
            <span>游戏分数：</span>
            <span class="color-intersperse">{{currentBtcWallet.balance || 0}}{{currentCode}} = {{(currentBtcWallet.balance*1000).toFixed(2) || 0}}分</span>
          </p>
        </div>
      </div>

      <div class="btn-group">
        <el-button @click="openDeposit" type="warning" size="small" class="small-btn">充币</el-button>
        <el-button @click="openWithdral(0)" type="success" size="small" class="small-btn">提币</el-button>
      </div>

    </div>
    <div class="flex-tab-wrapper">
      <flex-tab @selectItem="selectItem" :flexList="flexList" :currentIdx="currentIdx"></flex-tab>
    </div>
    <!--游戏-->
    <div v-if="currentIdx === 0" class="wrapper game-wrapper">
        <!--游戏平台列表-->
        <platform :platformList="platformList"></platform>
        <div class="game-list-content">
          <!--搜索-->
          <div class="search-wrapper">
            <div class="search-box">
              <span class="label">搜索游戏：</span>
              <search-input @search="_searchInput"></search-input>
            </div>
            <div>
              <el-button @click="$router.push('/slots')" type="warning">人民币投注</el-button>
              <!--<el-button @click="getFavoriteGameList" type="primary">我的收藏</el-button>-->
            </div>
          </div>
          <!--游戏类型-->
          <v-filter @search="_search"></v-filter>

        </div>
        <div class="game-list-wrapper">
          <game-list :isBtcGame="isBtcGame" :btcBalance="currentBtcWallet.balance || 0" :country="currentCode" v-show="filterList.length" :filterList="filterList"></game-list>
          <no-result v-show="!filterList.length"></no-result>
        </div>
      </div>
    <!--余额-->
    <div class="btc-item-wrapper" v-if="currentIdx === 1">
      <div class="table">
        <el-table
            :data="walletList"
            stripe
            border
            @selection-change="handleSelectionChange"
            style="width: 100%">
          <!--<el-table-column-->
              <!--type="selection"-->
              <!--width="55">-->
          <!--</el-table-column>-->
          <el-table-column
              v-for="item in balanceHeadList"
              :prop="item.prop"
              :label="item.label">
          </el-table-column>
          <el-table-column
              prop=""
              label="操作">
            <template slot-scope="scope">
              <el-button class="small-btn" @click="openDeposit" type="warning" size="small">
                充币
              </el-button>
              <el-button class="small-btn" @click="openWithdral(scope.row.code)" type="success" size="small">
                提币
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!--钱包-->
    <div class="btc-item-wrapper" v-if="currentIdx === 2">
      <div class="add-btn">
        <el-button size="small" class="small-btn" @click="openEditWallet(2)" type="success">
          + 新增钱包
        </el-button>
      </div>
      <div class="table">
        <el-table
            :data="btcWalletList"
            stripe
            border
            @selection-change="handleSelectionChange"
            style="width: 100%">
          <!--<el-table-column-->
              <!--type="selection"-->
              <!--width="55">-->
          <!--</el-table-column>-->
          <el-table-column
              :width="calcWidth(item.prop)"
              v-for="item in walletHeadList"
              :prop="item.prop"
              :label="item.label">
          </el-table-column>
          <el-table-column
              prop=""
              label="操作">
            <template slot-scope="scope">
              <el-button class="small-btn" @click="openEditWallet(1,scope.row)" type="warning" size="small">
                编辑
              </el-button>
              <el-button class="small-btn" @click="deleteTargetWallet(scope.row)" type="danger" size="small">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!--记录-->
    <div class="btc-item-wrapper" v-if="currentIdx === 3">
      <div>
        <div style="margin-bottom:10px">
          <tab-border @selectTabItem="selectTabItem" primary="primary" :currentIdx="currentIdxLog" :list="list"></tab-border>
        </div>
        <div v-if="currentIdxLog === 0">
          <div class="table">
            <el-table
                :data="accountLogList"
                stripe
                border
                style="width: 100%">
              <el-table-column
                  v-for="item in logHeadList"
                  :prop="item.prop"
                  :label="item.label">
              </el-table-column>
            </el-table>
          </div>
          <div class="account-log">
            <select v-model="accountPagination.code" key="2">
              <option value="ALL">全部</option>
              <option v-for="item in btcList" :value="item.value">{{item.value}}</option>
            </select>
            <el-pagination
                key="1"
                class="center log-pagination"
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="accountPagination.pageIndex"
                :page-sizes="[10,15,20]"
                :page-size="accountPagination.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="accountPagination.total">
            </el-pagination>
          </div>

        </div>
        <div v-if="currentIdxLog === 1">
          <div class="table">
            <el-table
                :data="gameLogList"
                stripe
                border
                style="width: 100%">
              <el-table-column
                  v-for="item in gameHeadList"
                  :prop="item.prop"
                  :label="item.label">
              </el-table-column>
            </el-table>
          </div>
          <div class="account-log game-log">
            <select v-model="gamePagination.country" key="1">
              <option value="ALL">全部</option>
              <option v-for="item in btcList" :value="item.value">{{item.value}}</option>
            </select>
            <el-pagination
                key="2"
                class="center log-pagination"
                background
                @size-change="handleSizeChangeGameLog"
                @current-change="handleCurrentChangeGameLog"
                :current-page="gamePagination.pageIndex"
                :page-sizes="[10,15,20]"
                :page-size="gamePagination.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="gamePagination.total">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>


    <!--充币-->
    <v-dialog @on-close="closeDialog('isShowDepositDialog')" :isShow="isShowDepositDialog">
      <div>
        <div class="dialog-header">
          <h3>充币</h3>
        </div>
        <div class="dialog-body">
          <div class="input-group">
            <label class="label">选择货币</label>
            <div>
              <select v-model="depositCode">
                <option v-for="item in btcList" :value="item.value">{{item.value}}</option>
              </select>
            </div>
            <span class="color-intersperse">{{depositBtcWalet.balance}}</span>
          </div>

          <div class="input-group">
            <label class="label">充值链接</label>
            <div>
              <input type="text" readonly disabled :value="depositBtcWalet.address">
            </div>
            <el-button @click="copy" :data-clipboard-text="depositBtcWalet.address" size="small" class="small-btn tag-read" type="primary">复制</el-button>
          </div>

          <div id="QRCode" ref="QRCode"></div>



          <div class="center">
            <el-button @click="getEwmCode" size="small" class="small-btn" type="warning">获取二维码</el-button>
            <el-button @click="closeDialog('isShowDepositDialog')" size="small" class="small-btn" type="danger">确认</el-button>
          </div>

        </div>
      </div>
    </v-dialog>
    <!--提款-->
    <v-dialog @on-close="closeDialog('isShowWithdralDialog')" :isShow="isShowWithdralDialog">
      <div>
        <div class="dialog-header">
          <h3>提币</h3>
        </div>
        <div class="dialog-body">

          <div class="input-group">
            <span class="label">货币种类</span>
            <div>
              <select v-if="isShowSelect" v-model="withdralCode">
                <option v-for="item in btcList" :value="item.value">{{item.value}}</option>
              </select>
              <input v-if="!isShowSelect" type="text" readonly :value="singleBtcType">
            </div>
          </div>

          <div class="input-group">
            <span class="label">提款金额</span>
            <div>
              <input type="text" v-model="amount">
            </div>
          </div>

          <div class="input-group">
            <span class="label">最低提款金额</span>
            <div>
              <span class="red">{{minPrice}}</span>， 本次手续费 <span class="red">{{serviceCharge}}</span>
            </div>
          </div>

          <div class="input-group">
            <span class="label">提款地址</span>
            <div>
              <select v-model="tarAddress">
                <option value="">请选择</option>
                <option v-for="item in withdralAddressList" :value="item.address">{{item.address}}</option>
              </select>
            </div>
            <el-button v-if="!withdralAddressList.length" @click="bindAddress" class="small-btn" size="small" type="primary">添加钱包</el-button>
          </div>

          <div class="input-group">
            <span class="label">账户密码</span>
            <div>
              <input type="password" v-model="password">
            </div>
          </div>

          <div class="input-group">
            <span class="label"></span>
            <div>
              <el-button @click="withdralBtc" type="danger" size="small" class="small-btn">提款</el-button>
            </div>
          </div>

        </div>
      </div>
    </v-dialog>
    <!--修改用户信息-->
    <v-dialog @on-close="closeDialog('isShowEditDialog')" :isShow="isShowEditDialog">
      <div>
        <div class="dialog-header">
          <h3>{{title}}钱包</h3>
        </div>
        <div class="dialog-body">


          <div class="input-group">
            <span class="label">钱包名</span>
            <div>
              <input type="text" v-model="walletData.addressName">
            </div>
          </div>

          <div class="input-group">
            <span class="label">钱包地址</span>
            <div>
              <input type="text" v-model="walletData.targetAddress">
            </div>
          </div>

          <div class="input-group">
            <span class="label">选择货币</span>
            <div>
              <select v-model="walletData.code">
                <option v-for="item in btcList" :value="item.value">{{item.value}}</option>
              </select>
            </div>
          </div>


          <div class="input-group">
            <span class="label"></span>
            <div>
              <el-button @click="addOrUpdateTargetWallet" type="danger" size="small" class="small-btn">保存</el-button>
            </div>
          </div>

        </div>
      </div>
    </v-dialog>


  </div>
</template>

<script>
  import flexTab from '@/components/flex-tab/flex-tab'
  import Platform from '@/components/platform/platform'
  import VFilter from '@/components/v-filter/v-filter'
  import SearchInput from '@/components/search-input/search-input'
  import GameList from '@/components/game-list/game-list'
  import NoResult from '@/components/no-result/no-result'
  import tabBorder from 'MComponents/tab-border/tab-border'
  import {gameLobby,btcBetModule,btcBalanceModule,btcWalletModule,btcLogModule} from '@/common/js/mixin'
  import VDialog from '@/components/dialog/dialog'
  export default {
    mixins:[gameLobby,btcBetModule,btcBalanceModule,btcWalletModule,btcLogModule],
    data() {
      return {
        isBtcGame:true,
        flexList:[
          {
            text:'游戏'
          },
          {
            text:'余额'
          },
          {
            text:'钱包'
          },
          {
            text:'记录'
          }
        ],
        currentIdx:0,
        platformList:[
          {
            path:'/btc-bet',
            text:'DT游戏'
          },
        ]
      }
    },
    computed: {},
    created() {
    },
    methods: {
      selectItem(idx){
        this.currentIdx = idx
      }
    },
    watch: {
      'accountPagination.code'(val) {
        if (!val) return
        this.accountPagination.code = val
        this.accountPagination.pageIndex = 1
        this.accountPagination.size = 10
        this._findWalletLogList()
      },
      'gamePagination.country'(val) {
        if (!val) return
        this.gamePagination.country = val
        this.gamePagination.pageIndex = 1
        this.gamePagination.size = 10
        this._getBetDetailByTime()
      },
    },
    components: {
      flexTab,
      Platform,
      VFilter,
      SearchInput,
      GameList,
      NoResult,
      tabBorder,
      VDialog
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  .btc-bet
    margin-bottom 20px
    min-height 450px
  .game-wrapper
    position relative
    min-height 200px
    .game-list-content
      position relative
      padding 20px
      background #fff
    .search-wrapper
      display flex
      justify-content space-between
      margin-bottom 20px
      border-bottom 1px dashed $color-border-gray
      padding-bottom 15px
      .search-box
        display flex
        align-items center
        .label
          color $color-primary
    .game-list-wrapper
      padding 20px 0
  .btc-item-wrapper
    background $color-light
    padding 20px
  .btc-user-header
    background $color-nav-background
    color $color-light
    display flex
    justify-content space-between
    align-items center
    margin 15px auto
    padding 20px
    .left-wrapper
      display flex
      align-items center
      &>div
        margin-right 20px
        line-height 30px

      .avator
        img
          width 80px
  .flex-tab-wrapper
    margin-bottom 15px
  .add-btn
    text-align right
    margin-bottom 10px
  .account-log
    display: flex
    align-items center
    justify-content center
    margin-top 20px
  #QRCode
    margin-bottom 15px
    display flex
    justify-content center
</style>