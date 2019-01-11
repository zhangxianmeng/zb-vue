<template>
  <div class="btc-bet">
    <v-header :data="headData" @leftIconClick="back" @rightIconClick="openService"></v-header>
    <div class="content">
      <div class="btc-user-header">
        <div class="user-info">
          <p style="font-size:16px">
            <span>欢迎回来：</span>
            <span>{{userInfo.loginname}}</span>
          </p>
          <p class="balance-line">
            <span class="balance">{{currentBtcWallet.balance || 0}}</span>
            <select class="mobile-select" v-model="currentCode">
              <option v-for="item in btcList" :value="item.value">{{item.value}}</option>
            </select>
            <span style="margin-left:10px;cursor: pointer" @click="refresh"
                  class="iconfont icon-shuaxin refresh"></span>
          </p>
          <div class="btn-group">
            <span  @click="openWithdral(0)">提币</span>
            <span @click="openDeposit">充币</span>
          </div>
        </div>

      </div>
      <div class="flex-tab-wrapper">
        <tab-icon @selectTabItem="selectItem" :list="flexList" :currentIdx="currentIdx"></tab-icon>
      </div>
      <!--游戏-->
      <div v-if="currentIdx === 0" class="btc-item-wrapper">
        <div class="">
          <div class="search-input-wrapper">
            <search-input class="search-input" @search="_searchInput"></search-input>
            <div class="select-btn" @click="openMenu">
              <span>筛选</span>
              <i class="iconfont icon-filter"></i>
            </div>
          </div>

          <!--游戏列表-->
          <div class="game-list-wrapper">
            <game-list :isBtcGame="isBtcGame" :btcBalance="currentBtcWallet.balance || 0" :country="currentCode" v-show="filterList.length" :filterList="filterList"></game-list>
            <no-result v-show="!filterList.length"></no-result>
          </div>
        </div>

        <game-menu :platformList="platformList" :isShowTitleTab="false" @search="_search" @closeMenu="closeMenu" :isShow="isShow" :currentIdx="0"></game-menu>
      </div>
      <!--余额-->
      <div class="btc-item-wrapper" v-if="currentIdx === 1">
        <div class="card-list">
          <div :class="{eth:item.code==='ETH'}" class="item" v-for="item in walletList">
            <h3>{{item.code}}货币</h3>
            <h2>金额：<span>{{item.balance}}</span></h2>
            <div class="bottom">
              <p>可提款金额：{{item.balance}}</p>
              <div>
                <mt-button :style="styleObj(item)" class="small-btn" @click="openDeposit" type="danger" size="small">
                  充币
                </mt-button>
                <mt-button class="small-btn" @click="openWithdral(item.code)" type="primary" size="small">
                  提币
                </mt-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--钱包-->
      <div class="btc-item-wrapper" v-if="currentIdx === 2">
        <div class="add-btn">
          <mt-button size="large"  @click="openEditWallet(2)" type="danger">
            + 新增钱包
          </mt-button>
        </div>
        <div class="card-list wallet-list" v-if="btcWalletList.length">
          <div :class="{eth:item.code==='ETH'}" class="item" v-for="item in btcWalletList">
            <h3>{{item.code}}</h3>
            <div class="address">
              <p style="margin: 10px 0">钱包名：{{item.addressName}}</p>
              <p style="display: flex; margin-bottom:20px"><span></span><span>{{item.address}}</span></p>
            </div>
            <div class="bottom">
              <div>
                <mt-button :style="styleObj(item)" class="small-btn" @click="openEditWallet(1,item)" type="danger" size="small">
                  编辑
                </mt-button>
                <mt-button class="small-btn" @click="deleteTargetWallet(item)" type="primary" size="small">
                  删除
                </mt-button>
              </div>
            </div>
          </div>
        </div>
        <no-result text="您还没有添加任何钱包" v-if="!btcWalletList.length"></no-result>

      </div>
      <!--记录-->
      <div class="btc-item-wrapper" v-if="currentIdx === 3">
        <div>
          <div style="margin-bottom:10px">
            <tab-border @selectTabItem="selectTabItem"  :currentIdx="currentIdxLog"
                        :list="list"></tab-border>
          </div>
          <div v-if="currentIdxLog === 0">
            <tab-card key="1" style="margin:15px 0 10px"  :width="calcWidth(accountLogListXXX.length)" :list="accountLogListXXX" @selectTabItem="selectTabItemLog" :currentIdx="currentIdxAccountLog"></tab-card>

            <div class="log-card-list" v-if="accountLogList.length">
              <div :class="{eth:item.code==='ETH'}" class="item" v-for="item in accountLogList">
                <div class="title">
                  <span>{{item.code}}</span>
                  <span style="color:#6c9fff">{{item.logType}}</span>
                </div>
                <p>
                  <span>时间</span>
                  <span>{{item.createTime}}</span>
                </p>
                <p>
                  <span>币量</span>
                  <span>{{item.changeAmount}}</span>
                </p>
                <p>
                  <span>状态</span>
                  <span class="red">{{item.status}}</span>
                </p>
              </div>
            </div>
            <no-result text="暂无记录" v-if="!accountLogList.length"></no-result>

            <div class="account-log">
              <el-pagination
                  class="center log-pagination"
                  background
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="accountPagination.pageIndex"
                  :page-sizes="[10,15,20]"
                  :page-size="accountPagination.size"
                  layout="prev,pager,next"
                  :total="accountPagination.total">
              </el-pagination>
            </div>

          </div>
          <div v-if="currentIdxLog === 1">
            <tab-card key="2" :width="calcWidth(gameLogListXXX.length)" style="margin:15px 0 10px" :list="gameLogListXXX" @selectTabItem="selectTabItemGameLog" :currentIdx="currentIdxGameLog"></tab-card>
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

            <el-pagination
                style="margin-top:20px"
                class="center log-pagination"
                background
                @size-change="handleSizeChangeGameLog"
                @current-change="handleCurrentChangeGameLog"
                :current-page="gamePagination.pageIndex"
                :page-sizes="[10,15,20]"
                :page-size="gamePagination.size"
                layout=" prev, pager, next"
                :total="gamePagination.total">
            </el-pagination>
          </div>
        </div>
      </div>


      <!--充币-->
      <v-dialog :width="dialogWidth" @on-close="closeDialog('isShowDepositDialog')" :isShow="isShowDepositDialog">
        <div>
          <div class="dialog-header">
            <h3>充币</h3>
          </div>
          <div class="dialog-body">
            <div class="mobile-input-group">
              <label class="label">选择货币</label>
              <div>
                <select v-model="depositCode">
                  <option v-for="item in btcList" :value="item.value">{{item.value}}</option>
                </select>
              </div>
              <span class="color-intersperse">{{depositBtcWalet.balance}} {{depositCode}}</span>
            </div>

            <div class="mobile-input-group">
              <label class="label">充值链接</label>
              <div>
                <input type="text" readonly disabled :value="depositBtcWalet.address">
              </div>
              <mt-button @click="copy" :data-clipboard-text="depositBtcWalet.address" size="small"
                         class="small-btn tag-read" type="primary">复制
              </mt-button>
            </div>

            <div id="QRCode" ref="QRCode"></div>


            <div class="center">
              <mt-button @click="getEwmCode"style="margin-right:10px" size="small" class="small-btn" type="primary">获取二维码</mt-button>
              <mt-button @click="closeDialog('isShowDepositDialog')" size="small" class="small-btn" type="danger">确认
              </mt-button>
            </div>

          </div>
        </div>
      </v-dialog>
      <!--提款-->
      <v-dialog :width="dialogWidth" @on-close="closeDialog('isShowWithdralDialog')" :isShow="isShowWithdralDialog">
        <div>
          <div class="dialog-header">
            <h3>提币</h3>
          </div>
          <div class="dialog-body">

            <div class="mobile-input-group">
              <span class="label">货币种类</span>
              <div>
                <select v-if="isShowSelect" v-model="withdralCode">
                  <option v-for="item in btcList" :value="item.value">{{item.value}}</option>
                </select>
                <input v-if="!isShowSelect" type="text" readonly :value="singleBtcType">
              </div>
            </div>

            <div class="mobile-input-group">
              <span class="label">提款金额</span>
              <div>
                <input type="text" v-model="amount">
              </div>
            </div>

            <div class="mobile-input-group">
              <span class="label"></span>
              <div>
                最低提款金额 <span class="red"> {{minPrice}}</span>， 本次手续费 <span class="red">{{serviceCharge}}</span>
              </div>
            </div>

            <div class="mobile-input-group">
              <span class="label">提款地址</span>
              <div>
                <select v-model="tarAddress">
                  <option value="">请选择</option>
                  <option v-for="item in withdralAddressList" :value="item.address">{{item.address}}</option>
                </select>
              </div>
              <el-button v-if="!withdralAddressList.length" @click="bindAddress" class="small-btn" size="small"
                         type="primary">添加钱包
              </el-button>
            </div>

            <div class="mobile-input-group">
              <span class="label">账户密码</span>
              <div>
                <input type="password" v-model="password">
              </div>
            </div>

            <div class="mobile-input-group">
              <span class="label"></span>
              <div class="center">
                <mt-button @click="withdralBtc" type="danger" size="small" class="small-btn">提款</mt-button>
              </div>
            </div>

          </div>
        </div>
      </v-dialog>
      <!--编辑钱包-->
      <v-dialog :width="dialogWidth" @on-close="closeDialog('isShowEditDialog')" :isShow="isShowEditDialog">
        <div>
          <div class="dialog-header">
            <h3>{{title}}钱包</h3>
          </div>
          <div class="dialog-body">


            <div class="mobile-input-group">
              <span class="label">钱包名</span>
              <div>
                <input type="text" v-model="walletData.addressName">
              </div>
            </div>

            <div class="mobile-input-group">
              <span class="label">钱包地址</span>
              <div>
                <input type="text" v-model="walletData.targetAddress">
              </div>
            </div>

            <div class="mobile-input-group">
              <span class="label">选择货币</span>
              <div>
                <select v-model="walletData.code">
                  <option v-for="item in btcList" :value="item.value">{{item.value}}</option>
                </select>
              </div>
            </div>


            <div class="mobile-input-group">
              <span class="label"></span>
              <div class="center">
                <mt-button @click="addOrUpdateTargetWallet" type="danger" size="small" class="small-btn">保存</mt-button>
              </div>
            </div>

          </div>
        </div>
      </v-dialog>
    </div>


  </div>
</template>

<script>
  import SearchInput from '@/components/search-input/search-input'
  import GameList from 'MComponents/game-list/game-list'
  import NoResult from '@/components/no-result/no-result'
  import GameMenu from 'MComponents/game-menu/game-menu'
  import tabBorder from 'MComponents/tab-border/tab-border'
  import tabIcon from 'MComponents/tab-icon/tab-icon'
  import TabCard from 'MComponents/tab-card/tab-card'
  import {gameLobby,menu, btcBetModule, btcBalanceModule, btcWalletModule, btcLogModule, commonHead} from '@/common/js/mixin'
  import VDialog from '@/components/dialog/dialog'

  export default {
    mixins: [gameLobby,menu, btcBetModule, btcBalanceModule, btcWalletModule, btcLogModule, commonHead],
    data() {
      return {
        dialogWidth:window.innerWidth*.9,
        isBtcGame: true,
        flexList: [
          {
            text: '游戏',
            icon:'youxi'
          },
          {
            text: '余额',
            icon:'yue'
          },
          {
            text: '钱包',
            icon:'shuju'
          },
          {
            text: '记录',
            icon:'qianbao'
          }
        ],
        currentIdx: 0,
        platformList: [
          {
            text: 'DT',
            path: 'dt',
          },
        ],
        accountLogListXXX:[],
        gameLogListXXX:[],
        currentIdxAccountLog:0,
        currentIdxGameLog:0
      }
    },
    computed: {
    },
    created() {
      let arr = this.btcList.map((item)=>{
        item.text = item.value
        return item
      })
      this.accountLogListXXX = [{
        text:'全部',
        value:'ALL'
      },...arr]
      this.gameLogListXXX = [{
        text:'全部',
        value:'ALL'
      },...arr]

    },
    methods: {
      calcWidth(length){
        return 100/length + '%'
      },
      styleObj(item){
        if(item.code === 'ETH'){
          return{
            // background:'#354461'
          }
        }
      },
      selectItem(idx) {
        this.currentIdx = idx
      },
      selectTabItemLog(idx){
        this.currentIdxAccountLog = idx
      },
      selectTabItemGameLog(idx){
        this.currentIdxGameLog = idx
      }
    },
    watch: {
      currentIdxAccountLog(val){
        let code = this.accountLogListXXX[val].value
        this.accountPagination.code = code
        this.accountPagination.pageIndex = 1
        this.accountPagination.size = 10
        this._findWalletLogList()
      },
      currentIdxGameLog(val){
        let code = this.gameLogListXXX[val].value
        this.gamePagination.country = code
        this.gamePagination.pageIndex = 1
        this.gamePagination.size = 10
        this._getBetDetailByTime()
      }
    },
    components: {
      SearchInput, NoResult, GameList, GameMenu,
      tabBorder,TabCard,tabIcon,
      VDialog
    }
  }
</script>

<style lang="stylus" src="./btc-bet.styl" scoped>

</style>