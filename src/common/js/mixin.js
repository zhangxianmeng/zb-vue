import {
  btcWithdraw,
  getBtcWallet,
  initBtcWallet,
  findBtcTargetWalletList,
  addOrUpdateTargetWallet,
  deleteTargetWallet,
  findWalletLogList,
  getBetDetailByTime,
  getWxZzQuota,
  checkAgentURLogin,
  getAppVersionCustomInfo,
  gamePTLogin,
  gamePTH5Login,
  gamePNGH5Login,
  gameDTLogin,
  gameSWLogin,
  gamePNGLogin,
  gameNTLogin,
  gameQTLogin,
  gameMGLogin,
  gameAGLogin,
  gameCQ9Login,
  gamePGLogin,
  gameTTGLogin,
  queryList,
  addGameCollect,
  deleteGameCollect,
  queryGameCollect,
  checkLoginApiFucn,
  getUser,
  getUserStatus,
  loginApiFun,
  logOutApiFun,
  unBindBankinfo,
  getBankInfoList,
  getGameMoneyApiFun,
  queryPointsApiFun,
  pointsRecord,
  getAllPointsPresents,
  completeLuckyDrawRecord,
  pointsExchange,
  getLevelSave,
  handleAddress,
  luckyDraw,
  luckyDrawCost,
  getAllLuckyDrawPresent,
  makeCallApiFun,
  queryQrcodeApiFun,
  getbackPwdByDx,
  getbackPwdByEmail,
  getForgetAccbySms,
  getForgetAccbyEmail,
  unlockAccountByInfo,
  registerApiFun,
  getDtJackpot,
  querySignAmountApiFun,
  getPayWay,
  commonDeposit,
  getNewdeposit,
  withdrawTwo,
  mainbandingBankno,
  getBankInfo,
  oneKeyGameMoney,
  updateGameMoney,
  transferInforRedRain,
  transferInforRedRaintoUser,
  queryRedRainMoney,
  getSelfYouHuiObject,
  getYouHuiConfig,
  oneKeyXimaNew,
  getOnekeyData,
  checkUpgrade,
  queryBetOfPlatform,
  queryPTLosePromoReccords,
  optLosePromo,
  transferInforRedCoupon,
  transferInforCoupon,
  applyActivity,
  checkActivityInfo,
  birthdayActivityInfo,
  checkBirthday,
  doSignRecord,
  findSignrecord,
  changePwd,
  changeInfo,
  depositRecordsApiFun,
  cashinRecordsApiFun,
  depositOrderRecordApiFun,
  withdrawRecordsApiFun,
  transferRecordsApiFun,
  consRecordsApiFun,
  searchXimaApiFun,
  couponRecordsApiFun,
  saveBookDate,
  readMsg,
  getMessageByUser,
  addAgent,
  getAgentExpandSite,
  searchPtCommissions,
  searchagprofit,
  searchsubuserProposalApiFun,
  searchCreditlogs,
  queryAgentSubUserInfo,
  agentWithdrawpz,
} from '@/api/index'
import {mapMutations, mapGetters} from 'vuex'
import config from '@/common/js/config'
import validtorReg from '@/common/js/validtor'
import {
  getMobilePlatform,
  isMobilePlatform,
  getPageContents,
  ajaxRequst,
  formatStr,
  unique,
  getMonthFirstDay
} from '@/common/js/util'

import Clipboard from "clipboard"

const isMobile = isMobilePlatform()
const path = isMobile ? '/mobile' : ''
const BADGE = require('@/common/image/deposit/zhi.png')

// 遮罩层页面处理
export const commonMaskPageModule = {
  methods: {
    setContentHeight(isShowCommonMaskPage) {
      this.$nextTick(() => {
        let content = document.querySelector('.content')
        let commonMaskPage = document.querySelector('.common-mask-page')
        if (isShowCommonMaskPage) {
          content.style.height = commonMaskPage.clientHeight + 'px'
          content.style.background = '#fff'
        } else {
          content.style.height = 'auto'
          content.style.background = ''
        }
      })
    }
  }
}
// 复制
export const copy = {
  methods: {
    copy() {
      let clipboard = new Clipboard('.tag-read')
      clipboard.on('success', e => {
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
  }
}
// 检查登录状态
export const checkLogin = {
  computed: {
    ...mapGetters(['isLogin', 'userInfo'])
  },
  methods: {
    checkLogin(loginName, token) {
      //开始初始化登录状态
      this.SET_INIT_LOGIN_STATE(false)
      //是否传token，
      let checkLoginReqData = null
      if (token) {
        checkLoginReqData = {token}
      }
      checkLoginApiFucn(checkLoginReqData).then((res) => {
        if (res.code === this.ERR_OK) {
          //初始化登录状态结束
          this.SET_INIT_LOGIN_STATE(true)
          if (res.data) {
            //获取用户信息
            let reqData = null
            if (loginName) {
              reqData = {loginName}
            }
            getUser(reqData).then((res) => {
              if (res.code === this.ERR_OK) {
                // 设置用户信息
                this.SET_USERINFO(res.data)

                //设置代理登录状态
                let result = this.userInfo.role !== config.role
                this.SET_AGENT_LOGIN(result)
                //如果为代理登录 则获取代理老虎机账户余额
                if (result) {
                  getUserStatus().then((res) => {
                    if (this.ERR_OK === res.code) {
                      this.SET_SLOT_AMOUNT(res.data)
                    }
                  })
                }
              }
            })
          }
          // 设置登录状态
          this.SET_LOGIN(res.data)
          // 设置代理状态
          !res.data && this.SET_AGENT_LOGIN(res.data)
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },
    ...mapMutations([
      'SET_LOGIN',
      'SET_INIT_LOGIN_STATE',
      'SET_USERINFO',
      'SET_AGENT_LOGIN',
      'SET_SLOT_AMOUNT',
    ])
  }
}
// 登录
export const login = {
  data() {
    return {
      userFormData: {
        loginName: '',
        passWord: '',
        dialogId: ''
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    login() {
      if (!this.userFormData.loginName) {
        this.$message({
          type: 'warning',
          message: '请输入账号'
        })
        return
      }
      if (!this.userFormData.passWord) {
        this.$message({
          type: 'warning',
          message: '请输入密码'
        })
        return
      }
      loginApiFun(this.userFormData).then((res) => {
        if (res.code === this.ERR_OK) {
          // 设置登录状态
          this.SET_LOGIN(true)
          // 查询用户数据
          getUser().then((res) => {
            if (res.code === this.ERR_OK) {
              // 移动端
              if (isMobile && window.location.href.includes('/mobile/login')) {
                this.$router.push('/mobile')
              }
              // 设置用户数据
              this.SET_USERINFO(res.data)

              //设置代理登录状态
              let result = this.userInfo.role !== config.role
              this.SET_AGENT_LOGIN(result)
              //如果为代理登录 则获取代理老虎机账户余额
              if (result) {
                getUserStatus().then((res) => {
                  if (this.ERR_OK === res.code) {
                    this.SET_SLOT_AMOUNT(res.data)
                  } else {
                    this.$message({
                      type: 'warning',
                      message: res.message
                    })
                  }
                })
              }
            }
          })
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },
    ...mapMutations([
      'SET_LOGIN',
      'SET_USERINFO',
      'SET_AGENT_LOGIN',
      'SET_SLOT_AMOUNT'
    ])

  }

}
// 退出
export const logOut = {

  methods: {
    logOut() {
      logOutApiFun().then((res) => {
        if (res.code === this.ERR_OK) {
          // 初始化用户信息
          this.SET_USERINFO(config.userInfo)
          // 初始化登录状态
          this.SET_LOGIN(false)
          //设置代理登录状态
          this.SET_AGENT_LOGIN(false)
          //刷新页面
          this.$router.go(0)
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },
    ...mapMutations([
      'SET_LOGIN',
      'SET_USERINFO',
      'SET_AGENT_LOGIN'
    ])
  }
}
// 游戏
export const playGame = {
  props: {
    factoryFun: {
      type: Function,
      default: function ({}) {
      }
    },
    reqData: {
      type: Object,
      default: null
    }
  },
  computed: {
    ...mapGetters(['isLogin', 'isAgent'])
  },
  methods: {
    playGame(apiFun, reqData, isFun) {
      if (!isFun) { // 如果是进入真钱游戏
        if (!this.isLogin) {
          this.$message({
            type: 'warning',
            message: '请先登录游戏账号！'
          })
          return
        }

        if (this.isAgent) {
          this.$message({
            type: 'warning',
            message: '代理登录不能进行游戏！'
          })
          return
        }
      }
      let tempWindow = ''
      if (!isMobile) {
        tempWindow = window.open(`${this.baseUrl}html/loading.html`, apiFun.name)
      }
      apiFun(reqData).then((res) => {
        if (this.ERR_OK === res.code || this.ERR_OK_OTHER === res.code) {
          let gameUrl = res.data
          // 判断是否为游戏链接
          if (/^http/.test(gameUrl)) {
            if (isMobile) {
              window.location.href = res.data
            } else {
              tempWindow.location = res.data
            }
          } else {
            if (!isMobile) {
              tempWindow.close()
            }
            this.$msgbox({
              title: '温馨提示',
              confirmButtonText: '知道了',
              message: res.message || '进入游戏失败，请刷新页面重试'
            }).catch(e => e)
          }
        } else {
          if (!isMobile) {
            tempWindow.close()
          }
          this.$msgbox({
            title: '温馨提示',
            confirmButtonText: '知道了',
            message: res.message || '进入游戏失败，请刷新页面重试'
          }).catch(e => e)
        }
      })
    }
  }
}
// 提款银行卡
export const withdrawal = {
  data() {
    return {
      withdrawalData: {
        password: '',
        bank: '',
        accountNo: '',
        bankAddress: '',
        amount: '',
        agree: true
      },
      bankList: []
    }
  },
  activated() {
    this._getBankInfoList()
  },
  methods: {
    // 解绑银行卡
    unBindBank() {
      this.$prompt('解绑银行卡号：', '解绑银行卡', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: validtorReg.bankReg,
        inputErrorMessage: '银行卡格式不正确',
        center: true
      }).then(({value}) => {
        unBindBankinfo({bankno: value}).then((res) => {
          if (this.ERR_OK === res.code) {
            this.$message({
              type: 'info',
              message: res.data
            })
            //解绑成功后刷新
            this._getBankInfoList()
            // 清空输入框
            this.withdrawalData = {
              password: '',
              bank: '',
              accountNo: '',
              bankAddress: '',
              amount: '',
              agree: true
            }
          } else {
            this.$message({
              type: 'warning',
              message: res.message
            })
          }
        })
      }).catch((e) => {
        console.log(e)
      })

    },
    //获取已绑定的银行卡
    _getBankInfoList() {
      getBankInfoList().then((res) => {
        if (this.ERR_OK_OTHER === res.code) {
          this.bankList = res.data || []
          if (!this.bankList.length) {
            this.$msgbox({
              type: 'warning',
              title: '温馨提示',
              message: '请先绑定银行卡',
              lockScroll: false
            }).catch(e => {
              console.log(e)
            })
          }
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },
    // 提款须知
    withdrawalRule() {
      this.$msgbox({
        title: '温馨提示',
        message: `
          1.用户每日提款次数不限。用户每日最高派彩金额1000万人民币，即所有玩法总和的派彩金额。

          <br>2.最低提款额度为100元，当日提款总额度无上限。
          
          <br>3.用户申请提款若遇到配合平台抽查，需全力配合，此不在《尊宝》秒提、五分钟提款的承诺范围，平台抽查完毕，若无问题，《尊宝》会于第一时间为用户出款。
          
          <br>4.所有提款申请必须符合本网站的提款政策，如存款未达到全额投注，即无法通过提款审核，提款申请将会被驳回。若有需要，用户必须提供个人资料如身份证副本、驾驶执照副本、银行交易记录截图、居民户口簿副本等资料。
          
          <br>5.用户被严禁使用他人或第三者银行账户或银行卡进行取款业务。
          
          <br>6.《尊宝》秒提、五分钟提款的承诺不包含系统异常、银行维护、网路延迟。
          
          <br>7.任何会员在老虎机游戏幸运中奖池奖金50000以上，将扣除20%~40%的费用做为平台建设。
          
          <br>无论任何情况，《尊宝》拥有最终决定权。
        `,
        dangerouslyUseHTMLString: true,
        center: false,
        width: '60%'
      }).catch(e => e)
    }
  },
  watch: {
    'withdrawalData.bank'(val) {
      if (!val) return
      if (this.bankList.length) {
        this.bankList.forEach((item) => {
          if (item.bankname === val) {
            this.withdrawalData.accountNo = item.bankno
            this.withdrawalData.bankAddress = item.bankaddress
            return
          }
        })
      }
    },
  }
}
// 主账户查询
export const getGameMoney = {
  data() {
    return {
      balance: '0元'
    }
  },
  methods: {
    //主账户余额查询
    getGameMoney() {
      getGameMoneyApiFun({gameCode: 'self'}).then((res) => {
        if (this.ERR_OK === res.code) {
          this.balance = res.data
        }
      })
    },
  }
}
// 登录框控制
export const loginDialog = {
  computed: {
    ...mapGetters([
      'isLogin',
      'isShowLoginDialog'
    ])
  },
  methods: {
    openLoginDialog() {
      if (!this.isLogin && !this.isShowLoginDialog) {
        this.SET_IS_SHOW_LOGIN_DIALOG(true)
      }
    },
    closeLoginDialog() {
      if (this.isShowLoginDialog) {
        this.SET_IS_SHOW_LOGIN_DIALOG(false)
      }
    },
    ...mapMutations([
      'SET_IS_SHOW_LOGIN_DIALOG'
    ])
  }
}
// 等级图
export const levelImage = {
  computed: {
    levelImage() {
      return this.userInfo.level && require(`@/common/image/level/${this.userInfo.level}.png`)
    },
    ...mapGetters([
      'userInfo'
    ])
  },
}
// 积分商城属性计算
export const property = {
  methods: {
    _property(flag, item) {
      let property = ''
      if (flag === 1) {//抽奖记录
        property = this._filterAttrVal(item.luckyDrawPresentType, item.property)
        if (item.luckyDrawPresentType === 'money' || item.luckyDrawPresentType === 'phoneFee' || item.luckyDrawPresentType === 'phoneData') {
          property = ''
        }
      } else {
        property = this._filterAttrVal(item.type, item.property)
      }
      return property
    },
    _filterAttrVal(type, remark) {
      let resultProperty = ''
      if (type === 'coupon') {
        let res = remark.split('-')
        let title = res[0].toLocaleUpperCase()
        if ('SLOT' === res[0].toLocaleUpperCase()) {
          title = 'SLOT' || '综合老虎机'
        }
        resultProperty = title + ' ' + res[1] + '%' + ' 存送优惠券'
      } else if (type === 'phoneData') {
        resultProperty = remark + 'M'
      } else if (type === 'phoneFee' || type === 'money') {
        resultProperty = remark + '元'
      } else {
        resultProperty = remark
      }
      return resultProperty
    },
  }
}
// 积分查询
export const queryPoints = {
  computed: {
    ...mapGetters(['points', 'isLogin'])
  },
  created() {
    if (!this.points && this.isLogin && !window.location.href.includes('isFromApp')) {
      this._queryPoints()
    }
  },
  methods: {
    _queryPoints() {
      queryPointsApiFun().then((res) => {
        if (this.ERR_OK === res.code) {
          this.SET_POINTS(parseInt(res.data))
        }
      })
    },
    ...mapMutations(['SET_POINTS'])
  }
}
// 积分兑换成功提示
export const openSuccessTip = {
  methods: {
    openSuccessTip(name, action, type) {
      let cancelButtonText = ''
      let tips = ''
      let {phoneFee, phoneData, coupon, money} = config.integral
      if (type === coupon) {
        cancelButtonText = '再去逛逛商城'
      }
      if (type === money) {
        tips = '，请刷新余额查看'
      } else if (type === phoneFee || type === phoneData) {
        tips = '，请稍后在手机上查收'
      } else if (type === coupon) {
        tips = '，请查看站内信。'
      } else {
        tips = '，发货时会以站内信通知，将于一周内发货，请注意查收。'
      }
      let temp = `
                  <div>您成功${action}了 <span class="red">${name}</span>${tips}</div>
                  `
      this.$msgbox({
        title: '温馨提示',
        type: 'success',
        message: temp,
        showCancelButton: cancelButtonText,
        confirmButtonText: '再去逛逛商城',
        cancelButtonText: '去站内信查看',
        dangerouslyUseHTMLString: true,
        distinguishCancelAndClose: true
      }).then(() => {
        this.$router.push(path + '/integral')
      }).catch((dialogAction) => {
        if (dialogAction === 'cancel') {
          this.$router.push(path + '/user/letter')
        }
      })

    }
  }
}

// 兑换记录
export const exchangeRecords = {
  mixins: [property],
  data() {
    return {
      allPointsRecord: [],//所有记录
      pageContents: [],//分页数据
      pagination: {
        pageSizes: [5, 8, 10],
        size: 10,
        pageIndex: 1,
        total: 0
      },
    }
  },
  props: {
    flag: {
      type: Number,
      default: 1
    },
    isShowRecordDialog: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    recordTitle() {
      return this.flag === 1 ? '我的抽奖记录' : '我的兑换记录'
    }
  },
  activated() {
    // 请求一次接口
    this.mark = null
  },
  methods: {
    handleSizeChange(val) {
      this.pagination.size = val
      this.pageContents = getPageContents(this.allPointsRecord, val, this.pagination.pageIndex)
    },
    handleCurrentChange(val) {
      this.pagination.pageIndex = val
      this.pageContents = getPageContents(this.allPointsRecord, this.pagination.size, val)
    },
    closeDialog() {
      this.$emit('closeDialog')
    },
    lotteryRecords(flag) {
      if (this.flag !== flag) {//切换兑换记录处理
        this.pagination.pageIndex = 1
      }
      this.flag = flag
      pointsRecord({flag}).then((res) => {
        if (this.ERR_OK === res.code) {
          this.allPointsRecord = res.data
          this.pagination.total = this.allPointsRecord.length
          this.pageContents = getPageContents(this.allPointsRecord, this.pagination.size, this.pagination.pageIndex)
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },
    getLotteryPrize(item) {
      this.$emit('getLotteryPrize', item.name, this._property(this.flag, item), item.luckyDrawPresentType, item.id, true, item.imgUrl)
    }
  },
  watch: {
    isShowRecordDialog(val) {
      if (val) {
        !this.mark && this.lotteryRecords(this.flag)
        this.mark = true
      }
    }
  },
}

//会员中奖信息
export const vipLuckyList = {
  mixins: [loginDialog, property],
  data() {
    return {
      luckyList: [],
    }
  },
  created() {
    this._getPointsRecord()
  },
  methods: {
    formatStr,
    _getPointsRecord() {
      pointsRecord({flag: 3}).then((res) => {
        if (this.ERR_OK === res.code) {
          this.luckyList = res.data
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },
  }
}

// 商品列表
export const goodsListModule = {
  data() {
    return {
      // 所有兑换商品
      allPointsPresents: [],
      // 商品分类
      tabs: [
        {
          text: '彩金福利兑换',
          value: 'other'
        },
        {
          text: '礼品兑换',
          value: 'physical'
        }
      ],
      // 商品当前分类
      currentCategory: 'other',
      // 价格
      values: [
        {
          text: '全部',
          value: 0,
        },
        {
          text: '10000以上',
          value: 10000,
        },
        {
          text: '50000以上',
          value: 50000,
        },
        {
          text: '100000以上',
          value: 100000,
        }
      ],
      currentPriceRage: 0,
    }
  },
  computed: {
    filterPointPresents() {//条件过滤后的奖品
      return this.allPointsPresents.filter((item) => {
        return (this.currentCategory === 'physical' ? (item.type === this.currentCategory) : (item.type !== 'physical'))
          && (parseInt(item.vipSaveRange) >= this.currentPriceRage)
      })
    },
  },
  created() {
    this._getAllPointsPresents()
  },
  methods: {
    // 去详情页
    goToDetailPage(item) {
      this.$router.push({
        path: path + '/integral/detail',
        query: {
          item: JSON.stringify(item)
        }
      })
    },
    //选择价格
    selectPriceRage(item) {
      this.currentPriceRage = item.value
    },
    // 商品分类
    selectItem(item) {
      this.currentCategory = item.value
    },
    // 获取所有商品
    _getAllPointsPresents() {
      getAllPointsPresents().then((res) => {
        if (this.ERR_OK === res.code) {
          this.allPointsPresents = res.data
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },
  },
}

// 中奖喜讯弹框
export const winnerNewsModule = {
  data() {
    return {
      // 中奖弹框喜讯数据
      dialogData: {
        dialogVisiblePhone: false,
        dialogVisiblePhysical: false,
        dialogVisibleCoupon: false,
        dialogVisibleMoney: false,
        dialogVisibleOther: false,
        getPrize: {},
        userInput: {
          phone: ''
        }
      },
      isMobile,
      width: isMobile ? '90%' : '30%'
    }
  },
  methods: {
    //中奖弹框
    winnerNews(item) {
      this.dialogData.getPrize = item
      console.log(item)
      let {phoneFee, phoneData, physical, coupon, money,} = config.integral
      let {type} = item
      if (type === phoneFee || type === phoneData) {
        this.openDialog('dialogVisiblePhone')
      } else if (type === physical) {
        this.openDialog('dialogVisiblePhysical')
      } else if (type === coupon) {
        this.openDialog('dialogVisibleCoupon')
      } else if (type === money) {
        this.openDialog('dialogVisibleMoney')
      } else {
        this.openDialog('dialogVisibleOther')
      }

    },
    // 领取手机奖品
    receivePhonePrize(item) {
      let phone = this.dialogData.userInput.phone
      if (!validtorReg.phoneReg.test(phone)) {
        this.$message({
          type: 'warning',
          message: '手机格式有误'
        })
        return
      }
      let reqData = {
        json: JSON.stringify({
          id: item.id,
          phone
        }),
        token: '',
        addressId: ''
      }
      completeLuckyDrawRecord(reqData).then((res) => {
        if (this.ERR_OK === res.code) {
          this.closeDialog('dialogVisiblePhone')
          this.$msgbox({
            type: 'success',
            title: '温馨提示',
            message: `<div><span class="red">${item.name}</span><span> 领取成功，请稍后在手机上查收</span></div>`,
            dangerouslyUseHTMLString: true,
          }).catch(e => e)
          if (item.obj) {
            //修改按钮状态为 已领取
            this.$emit('updateData')
          }
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })

    },
    // 领取实物奖品
    receivePrizePhysical(item) {
      this.$router.push({
        path: path + '/integral/exchangePage',
        query: {
          itemData: JSON.stringify(item),
          comeFrom: 'luckyLottery'
        }
      })
      this.closeDialog('dialogVisiblePhysical')
    },
    //领取优惠券奖品
    receivePrizeCoupon() {
      this.$router.push(path + '/user/letter')
      this.closeDialog('dialogVisibleCoupon')
    },
    openDialog(attr) {
      this.dialogData[attr] = true
    },
    closeDialog(attr) {
      this.dialogData[attr] = false
    },
  },
}

// 兑换详情页
export const integralDetailModule = {
  mixins: [property, levelImage, loginDialog, queryPoints, openSuccessTip],
  data() {
    return {
      isMobile,
      promoList: [],
      currentIdx: 0,
      dialogData: {
        dialogVisiblePhone: false,
        userInput: {
          phone: ''
        },
        item: {}
      }
    }
  },
  computed: {
    itemData() {
      let res = JSON.parse(this.$route.query.item || '{}')
      if (res.property) {
        res.property = JSON.parse(res.property || '[]')
      }
      return res
    },
    currentPoint() {
      let res = this.itemData.property
      return res && res[this.currentIdx].point * this.itemData.vipSave
    },
    oldCurrentPoint() {
      let res = this.itemData.property
      return res && res[this.currentIdx].point
    },
    currentProperty() {
      let res = this.itemData.property
      return res && res[this.currentIdx].property
    },
    ...mapGetters(['points', 'userInfo', 'isLogin'])
  },
  created() {
    if (!this.itemData.name) {
      this.$router.push(path + '/integral')
    }
    //优惠列表
    // this._getLevelSave()
    //查询积分
    if (!this.points) {
      this._queryPoints()
    }
  },
  methods: {
    //兑换手机
    pointsExchangePhone(item) {
      let phone = this.dialogData.userInput.phone
      if (!validtorReg.phoneReg.test(phone)) {
        this.$message({
          type: 'warning',
          message: '手机格式有误'
        })
        return
      }
      let reqData = {
        json: JSON.stringify({
          id: item.id,
          type: item.type,
          property: this.currentProperty,
          phone
        }),
        addressId: ''
      }
      this._requestPointsExchangeApi(reqData, item.name, '兑换', item.type)

    },
    //兑换
    pointsExchange() {

      if (!this.isLogin) {
        this.openLoginDialog()
        return
      }
      //积分不够
      if (this.currentPoint > this.points) {
        this.$msgbox({
          title: '温馨提示',
          confirmButtonText: '充值赚积分',
          message: '积分不够啦，快去充值赚积分吧',
        }).then((action) => {
          if (action === 'confirm') {
            this.$router.push(path + '/user/deposit')
          }
        }).catch(e => e)
        return
      }

      this.dialogData.item = this.itemData

      let {type, imageUrl, id, vipSave, name} = this.itemData
      let {phoneFee, phoneData, physical} = config.integral
      if (type === physical) {
        let property = this.currentProperty
        let oldPoint = this.oldCurrentPoint
        let point = this.currentPoint
        let promotion = oldPoint - point
        let item = {
          imageUrl,
          promotion,
          property,
          point,
          oldPoint,
          id,
          vipSave,
          name,
          type
        }
        this.$router.push({
          path: path + '/integral/exchangePage',
          query: {
            itemData: JSON.stringify(item),
            comeFrom: 'detail'
          }
        })
      } else if (type === phoneData || type === phoneFee) {
        this.openDialog('dialogVisiblePhone')
      } else { //彩金、优惠券
        let reqData = {
          json: JSON.stringify({
            id,
            type,
            property: this.currentProperty,
          }),
          addressId: ''
        }
        this._requestPointsExchangeApi(reqData, name, '兑换', type)
      }
    },
    selectItem(item, idx) {
      this.currentIdx = idx
    },
    openDialog(attr) {
      this.dialogData[attr] = true
    },
    closeDialog(attr) {
      this.dialogData[attr] = false
    },
    //请求兑换接口
    _requestPointsExchangeApi(reqData, name, action, type) {
      pointsExchange(reqData).then((res) => {
        if (this.ERR_OK === res.code) {

          //关闭手机输入弹框
          let {phoneFee, phoneData} = config.integral
          if (type === phoneFee || type === phoneData) {
            this.closeDialog('dialogVisiblePhone')
          }
          //刷新积分
          this._queryPoints()
          this.openSuccessTip(name, action, type)

        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },
    //获取等级优惠
    _getLevelSave() {
      getLevelSave().then((res) => {
        if (this.ERR_OK === res.code) {
          this.promoList = res.data
        }
      })
    },

  },
}

// 实物奖品兑换
export const exchangePhysical = {
  activated() {
    this.mark = null
  },
  methods: {
    //兑换实物奖品
    exchangePhysical() {
      if (this.mark) {
        this.$message({
          type: 'info',
          message: '已经兑换完成，请勿重复操作!'
        })
        return
      }
      let addressItem = this.addressItem

      if (!addressItem.id) {
        // 手机端指定页面
        if (!this.addrList.length && (window.location.pathname === '/mobile/integral/exchangePage')) {
          this.$msgbox({
            title: '温馨提示',
            message: '您还没有设置收货地址哦，请点击添加',
            confirmButtonText: '去添加'
          }).then((action) => {
            if (action === 'confirm') {
              this.$router.push(`/mobile/integral/exchangePage/edit-address`)
            }
          })
        } else {
          this.$message({
            type: 'warning',
            message: '请选择地址'
          })
        }

        return
      }

      let action = ''
      let exchangeApi = null
      if (this.isComeFromDetail) {
        action = '兑换'
        exchangeApi = pointsExchange
      } else {
        action = '领取'
        exchangeApi = completeLuckyDrawRecord
      }
      let temp = `
                    <div>
                      <p>您即将${action} <span class="red">${this.itemData.name}</span>，将于一周内发货，收货信息无法修改，请确认如下：</p>
                      <p><span>姓名：</span><span class="red">${addressItem.name}</span></p>
                      <p><span>手机：</span><span class="red">${addressItem.phone}</span></p>
                      <p><span>地址：</span><span class="red">${addressItem.area + addressItem.address}</span></p>
                    </div>
                    `

      this.$msgbox({
        title: '温馨提示',
        dangerouslyUseHTMLString: true,
        message: temp,
        center: false
      }).then((actionDialog) => {
        if (actionDialog === 'confirm') {
          let reqData = {
            json: JSON.stringify({
              id: this.itemData.id,
              phone: addressItem.phone,
              property: this.itemData.property
            }),
            addressId: addressItem.id,
            token: ''
          }

          exchangeApi(reqData).then((res) => {
            if (this.ERR_OK === res.code) {
              //只可领取一次
              this.mark = true
              if (res.data === 'SUCCESS') {
                this.openSuccessTip(this.itemData.name, action, this.itemData.type)
              } else {
                this.$message({
                  type: 'info',
                  message: res.data
                })
              }
            } else {
              this.$message({
                type: 'warning',
                message: res.message
              })
            }
          })

        }
      }).catch(e => e)

    },
  }
}

// 获取地址并选中
export const getHandleAddress = {
  computed: {
    addressItem() {
      return this.addrList[this.flagAddrIndex] || {}
    },
    ...mapGetters(['addrList', 'flagAddrIndex'])
  },
  created() {
    this._handleAddress()
  },
  methods: {
    // 获取地址
    _handleAddress() {
      handleAddress({
        state: 4,
        id: '',
        province: '',
        city: '',
        district: '',
        area: '',
        address: '',
        flag: '',
        name: '',
        phone: '',
      }).then((res) => {
        if (this.ERR_OK === res.code) {
          this.SET_ADDR_LIST(res.data)
          //默认地址索引
          let flagAddrIndex = this.addrList.findIndex((item) => item.flag)
          flagAddrIndex = flagAddrIndex > -1 ? flagAddrIndex : 0
          this.SET_CURRENT_ADDR_INDEX(flagAddrIndex)

          if (res.data.length) {
            this.setActiveClass()
          } else {
            // 只有在手机端指定页面
            if (window.location.pathname === '/mobile/integral/exchangePage') {
              this.$msgbox({
                title: '温馨提示',
                message: '您还没有设置收货地址哦，请点击添加',
                confirmButtonText: '去添加'
              }).then((action) => {
                if (action === 'confirm') {
                  this.$router.push(`/mobile/integral/exchangePage/edit-address`)
                }
              })
            }
          }
        }
      })
    },
    setActiveClass() {
      this.$nextTick(() => {
        this.addrListDom = this.$refs.addrList
        if (this.addrListDom) {
          this.addrListDom.forEach((item) => {
            item.classList.remove('active')
          })
          this.addrListDom[this.flagAddrIndex].classList.add('active')
        }
      })
    },

    selectAddr(item, idx) {
      this.SET_CURRENT_ADDR_INDEX(idx)
      this.setActiveClass()
    },
    ...mapMutations(['SET_ADDR_LIST', 'SET_CURRENT_ADDR_INDEX'])
  }
}

// 抽奖游戏
export const luckLotteryGame = {
  mixins: [loginDialog, property, queryPoints],
  data() {
    return {
      allLuckyDrawPresent: [],// 所有抽奖奖品
      luckyDrawCostPonit: 0,//积分消耗值
      canClick: true,//默认可点击
      timer: null,//启动游戏定时器
      endTimer: null,//游戏结束定时器
      confirmTimer: null,//确保视图正确定时器
      goodNewsTimer: null,//弹出喜讯定时器
      idx: 0//游戏起始位置
    }
  },
  computed: {
    //抽奖奖品id集合
    lottoList() {
      if (this.allLuckyDrawPresent.length) {
        return this.allLuckyDrawPresent.map((item) => {
          return item.id
        })
      }
    },
    ...mapGetters(['isLogin'])
  },
  created() {
    this.mark = null
    this._getAllLuckyDrawPresent()
    this._luckyDrawCost()
  },
  methods: {
    startLuckyDraw() {
      // 是否登录
      if (!this.isLogin) {
        this.openLoginDialog()
        return
      }

      //首次点击
      if (!this.mark) {
        this.mark = true
        this.$msgbox({
          title: '温馨提示',
          dangerouslyUseHTMLString: true,
          message: `
                    <div>
                      <p>
                        <span>每次抽奖将消耗</span>
                        <span class="red">${this.luckyDrawCostPonit}</span>
                        <span> 积分</span>
                      </p>
                    </div>
                  `
        }).catch(e => e)
        return
      }

      //积分不够
      if (!this._canPlayLotto()) {
        this.$msgbox({
          title: '温馨提示',
          message: '积分不够啦，快去充值赚积分吧',
          confirmButtonText: '充值赚积分'
        }).then((action) => {
          if (action === 'confirm') {
            this.$router.push(path + '/user/deposit')
          }
        }).catch(e => e)
        return
      }

      if (this.canClick) {
        this.canClick = false
        luckyDraw().then((res) => {
          if (this.ERR_OK === res.code) {
            //间隔时间 (不能取值50,dom渲染机制)
            let interval = 40
            //圈数
            let circleNum = 4
            //奖品数量
            let proNum = 8
            // 中奖列表
            let resultArray = []
            for (let i = 0; i < proNum; i++) {
              resultArray.push(interval * proNum * circleNum + i * interval)
            }
            //中奖结果索引
            let resultIdx = this.lottoList.indexOf(res.data.luckyDrawPresentId)
            //中奖结果
            let result = resultArray[resultIdx]
            //奖品类型
            let type = res.data.luckyDrawPresentType
            //奖品属性值转换
            let resultProperty = this._filterAttrVal(type, res.data.property)

            // 启动游戏
            this.timer = setInterval(() => {
              this.idx++
              if (this.idx === proNum) {
                this.idx = 0
              }
            }, interval)

            //指定时间结束游戏
            this.endTimer = setTimeout(() => {
              // 游戏结束
              clearInterval(this.timer)
              //释放定时器
              this.endTimer = null
              //按钮状态恢复
              this.canClick = true

              // 弹出中奖喜讯
              this.goodNewsTimer = setTimeout(() => {
                this._winnerNews(res.data.name, resultProperty, type, res.data.id, null, res.data.imgUrl)
                //释放定时器
                this.goodNewsTimer = null
              }, 500)
              // 确保视图正确
              this.confirmTimer = setTimeout(() => {
                this.idx = resultIdx
                this.confirmTimer = null
              }, interval)
              //更新积分
              this._queryPoints()
            }, result)
          } else {
            this.$message({
              type: 'warning',
              message: res.message
            })
            this.canClick = true
          }
        })
      }
    },
    // 获取积分消耗
    _luckyDrawCost() {
      luckyDrawCost().then((res) => {
        if (this.ERR_OK === res.code) {
          this.luckyDrawCostPonit = parseInt(res.data.luckyDrawCost)
        }
      })
    },
    //是否可以抽奖
    _canPlayLotto() {
      return this.points > this.luckyDrawCostPonit
    },
    // 中奖喜讯弹框
    _winnerNews(name, resultProperty, type, id, obj, imageUrl) {
      this.$refs.winnerNewsDialog.winnerNews({name, resultProperty, type, id, obj, imageUrl})
    },
    // 获取所有抽奖奖品
    _getAllLuckyDrawPresent() {
      getAllLuckyDrawPresent().then((res) => {
        if (this.ERR_OK === res.code) {
          this.allLuckyDrawPresent = res.data
        } else {
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
        this._luckyDrawCost()
      }
    }
  }
}

// 电话回拨
export const makeCall = {
  data() {
    return {
      number: '',
    }
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  methods: {
    makeCall() {
      if (!this.isLogin) {
        this.$message({
          type: 'warning',
          message: '请先登录游戏'
        })
        return
      }
      if (!validtorReg.phoneReg.test(this.number)) {
        this.$message({
          type: 'warning',
          message: '请输入正确的手机号！'
        })
        return
      }
      makeCallApiFun({phone: this.number}).then((res) => {
        if (this.ERR_OK === res.code) {
          this.$message({
            type: 'success',
            message: res.data
          })
          this.number = ''
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    }
  },

}

// 客服二维码
export const queryQrcode = {
  data() {
    return {
      vipEWM: ''
    }
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  created() {
    this._isLoginChangeCallback()//初始化加载项
  },
  methods: {
    //初始化加载项
    _isLoginChangeCallback() {
      if (this.isLogin) {
        this._queryQrcode()//客服二维码
      }
    },
    //查询客服二维码
    _queryQrcode() {
      queryQrcodeApiFun().then((res) => {
        if (this.ERR_OK === res.code) {
          this.vipEWM = res.data
        }
      })
    },
  },
  watch: {
    isLogin() {
      this._isLoginChangeCallback()
    }
  },
}

// 自助安全中心
export const safeCenter = {
  data() {
    return {
      //短信找回密码
      getbackPwdByDxData: {
        name: '',
        phone: '',
        check_address: 0,
        check_key: 0,
        sid: 0
      },
      //邮箱找回密码
      getbackPwdByEmailData: {
        name: '',
        email: '',
        code: ''
      },

      //短信找回账号
      getForgetAccbySmsData: {
        phone: '',
        code: ''
      },

      //邮箱找回账号
      getForgetAccbyEmailData: {
        email: '',
        code: ''
      },

      //自助解冻账号
      unlockAccountByInfoData: {
        loginName: '',
        accountName: '',
        phone: '',
        email: ''
      },

      //解绑银行卡
      unBindBankinfoData: {
        bankno: ''
      },

      //验证码
      validateCodeForIndex: '',
    }
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  created() {
    this.changeCode()
  },
  methods: {
    //短信找回登录密码
    getbackPwdByDx() {
      let {name, phone} = this.getbackPwdByDxData
      if (!name) {
        this.$message({
          type: 'warning',
          message: '请输入游戏账号'
        })
        return
      }
      if (!validtorReg.phoneReg.test(phone)) {
        this.$message({
          type: 'warning',
          message: '手机格式输入有误'
        })
        return
      }

      getbackPwdByDx(this.getbackPwdByDxData).then((res) => {
        if (this.ERR_OK === res.code) {
          this.$message({
            type: 'info',
            message: res.data
          })

          //清空
          this.getbackPwdByDxData = {
            name: '',
            phone: '',
            check_address: 0,
            check_key: 0,
            sid: 0
          }


        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },

    //邮箱找回密码
    getbackPwdByEmail() {
      let {name, email, code} = this.getbackPwdByEmailData
      if (!name) {
        this.$message({
          type: 'warning',
          message: '请输入游戏账号'
        })
        return
      }
      if (!validtorReg.emailReg.test(email)) {
        this.$message({
          type: 'warning',
          message: '邮箱格式输入有误'
        })
        return
      }

      if (!validtorReg.codeReg.test(code)) {
        this.$message({
          type: 'warning',
          message: '验证码输入有误'
        })
        return
      }
      getbackPwdByEmail(this.getbackPwdByEmailData).then((res) => {
        this.changeCode()
        if (this.ERR_OK === res.code) {
          this.$message({
            type: 'info',
            message: res.data
          })

          this.getbackPwdByEmailData = {
            name: '',
            email: '',
            code: ''
          }
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },

    //短信找回账号
    getForgetAccbySms() {
      let {phone, code} = this.getForgetAccbySmsData
      if (!validtorReg.phoneReg.test(phone)) {
        this.$message({
          type: 'warning',
          message: '手机格式输入有误'
        })
        return
      }

      if (!validtorReg.codeReg.test(code)) {
        this.$message({
          type: 'warning',
          message: '验证码输入有误'
        })
        return
      }
      getForgetAccbySms(this.getForgetAccbySmsData).then((res) => {
        this.changeCode()
        if (this.ERR_OK === res.code) {
          this.$message({
            type: 'info',
            message: res.data
          })

          this.getForgetAccbySmsData = {
            phone: '',
            code: ''
          }
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },

    //邮箱找回账号
    getForgetAccbyEmail() {
      let {email, code} = this.getForgetAccbyEmailData
      if (!validtorReg.emailReg.test(email)) {
        this.$message({
          type: 'warning',
          message: '邮箱格式输入有误'
        })
        return
      }

      if (!validtorReg.codeReg.test(code)) {
        this.$message({
          type: 'warning',
          message: '验证码输入有误'
        })
        return
      }
      getForgetAccbyEmail(this.getForgetAccbyEmailData).then((res) => {
        this.changeCode()
        if (this.ERR_OK === res.code) {
          this.$message({
            type: 'info',
            message: res.data
          })

          this.getForgetAccbyEmailData = {
            email: '',
            code: ''
          }

        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },

    //自助解冻账号
    unlockAccountByInfo() {

      let {loginName, accountName, phone, email} = this.unlockAccountByInfoData
      if (!loginName) {
        this.$message({
          type: 'warning',
          message: '请输入游戏账号'
        })
        return
      }
      if (!validtorReg.chineseReg.test(accountName)) {
        this.$message({
          type: 'warning',
          message: '注册姓名只能是中文'
        })
        return
      }
      if (!validtorReg.phoneReg.test(phone)) {
        this.$message({
          type: 'warning',
          message: '手机号输入有误'
        })
        return
      }

      if (!validtorReg.emailReg.test(email)) {
        this.$message({
          type: 'warning',
          message: '邮箱格式输入有误'
        })
        return
      }

      unlockAccountByInfo(this.unlockAccountByInfoData).then((res) => {
        if (this.ERR_OK === res.code) {
          this.$message({
            type: 'info',
            message: res.data
          })

          this.unlockAccountByInfoData = {
            loginName: '',
            accountName: '',
            phone: '',
            email: ''
          }
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },

    //解绑银行卡
    unBindBankinfo() {
      if (!this.isLogin) {
        this.$msgbox({
          title: '温馨提示',
          type: 'warning',
          message: '请先登录账号'
        })
        return
      }
      if (!validtorReg.bankReg.test(this.unBindBankinfoData.bankno)) {
        this.$message({
          type: 'warning',
          message: '银行卡输入有误'
        })
        return
      }


      unBindBankinfo(this.unBindBankinfoData).then((res) => {
        if (this.ERR_OK === res.code) {
          this.$message({
            type: 'info',
            message: res.data
          })

          this.unBindBankinfoData = {
            bankno: ''
          }

        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },

    // 切换验证码
    changeCode() {
      this.validateCodeForIndex = `/1.0/validateCodeForIndex?r=${Math.random().toFixed(5)}`
    },
  }
}

// 注册
export const register = {
  data() {
    return {
      registerData: {
        loginName: '',
        password: '',
        rePwd: '',
        email: '',
        phone: '',
        qq: '',
        validateCode: '',
      },
      agree: true,
      validateCodeForIndex: '/1.0/validateCodeForIndex',
    }
  },
  methods: {
    changeCode() {
      this.validateCodeForIndex = this.validateCodeForIndex + `?r=${Math.random().toFixed(5)}`
    },
    submitRegister() {
      if (!validtorReg.usernameReg.test(this.registerData.loginName)) {
        this.$message({
          type: 'warning',
          message: '登入账号只允许小写字母与数字的组合，字母开头，6-11字符之间,不能包含特殊字符'
        })
        return
      }
      if (!validtorReg.passwordReg.test(this.registerData.password)) {
        this.$message({
          type: 'warning',
          message: '密码长度为6-16个字符,以及必须含有字母和数字的组合'
        })
        return
      }
      if (!(this.registerData.rePwd === this.registerData.password)) {
        this.$message({
          type: 'warning',
          message: '两次密码请保持一致'
        })
        return
      }
      if (!validtorReg.emailReg.test(this.registerData.email)) {
        this.$message({
          type: 'warning',
          message: '邮箱格式有误'
        })
        return
      }
      if (!validtorReg.phoneReg.test(this.registerData.phone)) {
        this.$message({
          type: 'warning',
          message: '密码长度为6-16个字符,以及必须含有字母和数字的组合'
        })
        return
      }
      if (!validtorReg.qqReg.test(this.registerData.qq)) {
        this.$message({
          type: 'warning',
          message: 'qq号码有误'
        })
        return
      }

      if (!validtorReg.codeReg.test(this.registerData.validateCode)) {
        this.$message({
          type: 'warning',
          message: '验证码有误'
        })
        return
      }

      if (!this.agree) {
        this.$message({
          type: 'warning',
          message: '请选中用户协议'
        })
        return
      }

      registerApiFun(this.registerData).then((res) => {
        this.changeCode()
        if (this.ERR_OK === res.code) {
          this.registerData = {
            loginName: '',
            password: '',
            rePwd: '',
            email: '',
            phone: '',
            qq: '',
            validateCode: '',
          }
          this.checkLogin()
          this.$router.push(path + '/welcome')

        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }

      })
    }
  }
}

// 游戏大厅
export const gameLobby = {
  data() {
    return {
      jackpotList: [
        {
          startNum: 301518148,//开始数
          endNum: 30151814800000,//结束数
          stepNum: 0.01,//每次增加
          step: 10,//变频
          styleObj: {
            fontSize: '28px',
            color: '#fff',
            fontWeight: 600
          },
          title: 'PT老虎机总奖池'
        },
        {
          startNum: 301518148,//开始数
          endNum: 30151814800000,//结束数
          stepNum: 0.01,//每次增加
          step: 50,//变频
          styleObj: {
            fontSize: '28px',
            color: '#fff',
            fontWeight: 600
          },
          title: 'DT老虎机总奖池'
        },
        {
          startNum: 201518148,//开始数
          endNum: 20151814800000,//结束数
          stepNum: 0.01,//每次增加
          step: 10,//变频
          styleObj: {
            fontSize: '28px',
            color: '#fff',
            fontWeight: 600
          },
          title: 'MG老虎机总奖池'
        },
      ],//奖池
      platformList: [
        {
          path: '/slots/ptasia',
          text: 'PT国际版'
        },
        {
          path: '/slots/pt',
          text: 'PT游戏'
        },
        {
          path: '/slots/pg',
          text: 'PG游戏'
        },
        {
          path: '/slots/cq9',
          text: 'CQ9游戏'
        },
        {
          path: '/slots/sw',
          text: 'SW 老虎机'
        },
        {
          path: '/slots/dt',
          text: 'DT游戏'
        },
        {
          path: '/slots/mg',
          text: 'MG 老虎机'
        },
        {
          path: '/slots/qt',
          text: 'QT 老虎机'
        },
        {
          path: '/slots/png',
          text: 'PNG 老虎机'
        },
        {
          path: '/slots/nt',
          text: 'NT 老虎机'
        },
        {
          text: 'BBIN 老虎机'
        },
      ],//所有平台游戏
      allGameList: [],//所有游戏
      filterList: [],//过滤后的游戏
      filter: { //过滤条件
        gameLine: '', // 赔付线数
        gameType: '', //游戏类型
        gameTag: ''//游戏大厅
      },
    }
  },
  computed: {
    gameCategory() {
      return this.$route.params.type
    },
    ...mapGetters([
      'isLogin',
    ])
  },
  created() {
    this._getDtJackpot()
  },
  activated() {
    //获取所有游戏并渲染游戏
    this._getAllGames()
    this.unwatch = this.$watch('$route', function () {
      this._getAllGames()
    })
  },
  methods: {
    //获取dt奖池金额
    _getDtJackpot() {
      getDtJackpot().then((res) => {
        if (this.ERR_OK === res.code) {
          this.jackpotList[1].startNum = parseFloat(res.data.pot) || 10000
          this.jackpotList[1].endNum = this.jackpotList[1].startNum * 10000
        }
      })
    },
    //游戏过滤搜索
    _search(value, filter) {
      if (filter) this.filter[filter] = value
      let {gameLine, gameType, gameTag} = this.filter
      this.filterList = this.allGameList.filter((item) => {
        return (gameLine === '' || (item.gameLine && item.gameLine.includes(gameLine)))
          && (gameType === '' || (item.gameType && item.gameType.includes(gameType)))
          && (gameTag === '' || (item.gameTag && item.gameTag.includes(gameTag)))
      })
    },
    //搜索框查询
    _searchInput(query) {
      this.filterList = this.allGameList.filter((item) => {
        return item.gameCName.includes(query) || item.gameEName.toLowerCase().includes(query)
      })
    },
    //获取所有游戏并渲染游戏
    _getAllGames() {
      let gameCategory = this.gameCategory
      if (!gameCategory) return
      let gameTerminal = isMobile ? 'MOBILE' : 'PC'
      queryList({
        gameTerminal,
        gameCategory
      }).then((res) => {
        if (this.ERR_OK_OTHER === res.code) {
          this.allGameList = res.data.dataList
          //过滤渲染
          this._search()
        }
      })
    },
    //获取收藏游戏列表
    getFavoriteGameList() {
      if (!this.isLogin) {
        this.$msgbox({
          title: '温馨提示',
          type: 'warning',
          message: '请先登录账号'
        }).catch((e) => {
          console.log(e)
        })
        return
      }

      queryGameCollect({
        gameTerminal: isMobile ? 'MOBILE' : 'PC'
      }).then((res) => {
        if (this.ERR_OK_OTHER === res.code) {
          this.filterList = res.data
        }
      })
    },
    // 跳转btc
    goToBTCBet() {
      if (!this.isLogin) {
        this.$message({
          type: 'warning',
          message: '请先登录账号'
        })
        return
      }
      this.$router.push('/btc-bet')
    }
  },
  watch: {
    // $route() {
    //   this._getAllGames()
    // },
  },
  deactivated() {
    this.unwatch && this.unwatch()
  }
}

// 游戏列表
export const gameList = {
  mixins: [playGame],
  data() {
    return {
      limit: 20,
      isShowMoreBtn: true,
      isShowBtcGameDialog: false,
      currentItem: {}, //当前游戏
      playMode: ''//btc游戏模式
    }
  },
  props: {
    filterList: {
      type: Array,
      default: []
    },
    isShowFavorite: {
      type: Boolean,
      default: true
    },
    isBtcGame: {
      type: Boolean,
      default: false
    },
    country: {
      type: String,
      default: ''
    },
    btcBalance: {
      type: Number,
      default: 0
    }
  },
  computed: {
    finalList() {
      return this.filterList.slice(0, this.limit) || []
    },
    ...mapGetters([
      'isLogin',
      'isAgent',
      'userInfo',
    ])
  },
  created() {
  },
  methods: {
    // 登录验证
    _checkLoginValidtor() {
      if (!this.isLogin) {
        this.$message({
          type: 'warning',
          message: '请先登录游戏'
        })
        return 0
      }
      if (this.isAgent) {
        this.$message({
          type: 'warning',
          message: '代理登录不能进入游戏'
        })
        return 0
      }
      return 1
    },
    closeDialog() {
      this.playFlag = false //充值按钮状态
      this.isShowBtcGameDialog = false
    },
    openDialog() {
      this.isShowBtcGameDialog = true
    },
    // 开始游戏
    playGameFun(item, isFun) {
      //用户btc投注打开弹框
      if (this.isBtcGame && !this.playFlag && !isFun) {
        if (!this._checkLoginValidtor()) {
          return
        }
        this.currentItem = item
        this.playMode = isFun
        this.openDialog()
        this.playFlag = true
        return
      }
      // 如果进入BTC游戏则关闭弹框
      if (this.isBtcGame) {
        this.closeDialog()
      }
      let country = this.country
      let playMode = ''
      switch (item.gameCategory) {
        case 'PTASIA':
          if (isMobile) {
            if (this._checkLoginValidtor()) {
              window.location.href = `/1.0/gamePTASIALogin?gameCode=${item.gameCode}&language=zh-cn&platform=mobile&lobby=${window.location.origin + '/mobile/user/deposit' + window.location.search}&id=${item.id}`
            }
          } else {
            if (isFun) {
              let url = `http://cachedownload.luckyspin88.com/casinoclient.html?mode=offline&affiliates=1&language=zh-cn&game=${item.gameCode}`
              window.open(url, `${item.gameCategory}GameWind`)
            } else {
              if (this._checkLoginValidtor()) {
                window.open(`/1.0/gamePTASIALogin?gameCode=${item.gameCode}&language=zh-cn&platform=pc&lobby=${window.location.origin + '/user/deposit'}&id=${item.id}`, `${item.gameCategory}GameWind`)
              }
            }
          }
          break
        case 'PT':
          if (isMobile) {
            if (this._checkLoginValidtor()) {
              window.location.href = `/1.0/gamePTLogin?gameCode=${item.gameCode}&language=ZH-CN&platform=mobile&lobby=${window.location.origin + '/mobile/user/deposit' + window.location.search}&id=${item.id}`
            }
          } else {
            if (isFun) {
              let url = `http://cachedownload.goldenrose88.com/casinoclient.html?language=zh-cn&game=${item.gameCode}&mode=offline`
              window.open(url, `${item.gameCategory}GameWind`)
            } else {
              if (this._checkLoginValidtor()) {
                window.open(`/1.0/gamePTLogin?gameCode=${item.gameCode}&language=ZH-CN&platform=pc&lobby=${window.location.origin + '/user/deposit'}&id=${item.id}`, `${item.gameCategory}GameWind`)
              }
            }
          }
          break
        case 'DT':
          let reqData = {
            gameCode: item.gameCode,
            playMode: isFun,
            id: item.id,
          }
          if (this.isBtcGame && !isFun) {
            reqData.country = country
          }
          this.playGame(gameDTLogin, reqData, isFun)
          break
        case 'SW':
          this.playGame(gameSWLogin, {
            gameCode: item.gameCode,
            playMode: isFun ? 'fun' : 'real',
            id: item.id
          }, isFun)
          break
        case 'PNG':
          if (isMobile) {
            // if (isFun) {
            //   window.location.href = `https://bsicw.playngonetwork.com/casino/PlayMobile?pid=${item.gameCode}&gid=${item.gameId}&lang=zh_CN&practice=1&lobby=${window.location.href}`
            // } else {
            //   this.playGame(gamePNGH5Login, {
            //     gameCode: item.gameId,
            //     playMode: 'png_app',
            //     lobby: window.location.href,
            //     platform: 'mobile',
            //     id: item.id
            //   }, isFun)
            // }
            this.playGame(gamePNGH5Login, {
              gameCode: item.gameId,
              playMode: isFun ? 'png_app_fun' : 'png_app',
              lobby: window.location.href,
              platform: 'mobile',
              id: item.id
            }, isFun)
          } else {
            let res = true
            if (!isFun) {
              res = this._checkLoginValidtor()
            }
            playMode = isFun ? 'png_fun' : 'png'
            if (res) {
              window.open(`/1.0/gamePNGLogin?gameCode=${item.gameId}&playMode=${playMode}&id=${item.id}&lobby=${window.location.href}&platform=pc`, `${item.gameCategory}GameWind`)
            }
          }
          break
        case 'NT':
          if (isMobile) {
            playMode = isFun ? 'nt_app_fun' : 'nt_app'
          } else {
            playMode = isFun ? 'nt_fun' : 'nt'
          }
          this.playGame(gameNTLogin, {
            gameCode: item.gameCode,
            playMode,
            id: item.id
          }, isFun)
          break
        case 'QT':
          if (isMobile) {
            playMode = isFun ? 'qt_app_fun' : 'qt_app'
          } else {
            playMode = isFun ? 'qt_fun' : 'qt'
          }
          this.playGame(gameQTLogin, {
            gameCode: item.gameCode,
            playMode,
            id: item.id
          }, isFun)
          break
        case 'MG':
          if (item.trdFlag === 'Y') {
            if (isMobile) {
              playMode = isFun ? 'mgthird_app_fun' : 'mgthird_app'
            } else {
              playMode = isFun ? 'mgthird_fun' : 'mgthird'
            }
          } else {
            if (isMobile) {
              playMode = isFun ? 'mg_app_fun' : 'mg_app'
            } else {
              playMode = isFun ? 'mg_fun' : 'mg'
            }
          }

          this.playGame(gameMGLogin, {
            gameCode: item.gameCode,
            playMode,
            id: item.id
          }, isFun)
          break
        case 'CQ9':
          this.playGame(gameCQ9Login, {
            gameCode: item.gameCode,
            playMode: isFun ? 'fun' : 'real',
            type: item.gameTerminal === 'PC' ? 'PC' : ('MB' || 'WAP'),
            id: item.id
          }, isFun)
          break
        case 'PG':
          this.playGame(gamePGLogin, {
            gameCode: item.gameCode,
            playMode: isFun ? 'fun' : 'real',
            id: item.id
          }, isFun)
          break
      }
    },
    // 添加收藏
    addGameCollect(item) {
      addGameCollect({
        gameId: item.id,
        gameTerminal: item.gameTerminal
      }).then((res) => {
        if (this.ERR_OK === res.code || this.ERR_OK_OTHER === res.code) {
          item.collectFlag = 'Y'
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },
    // 取消收藏
    deleteGameCollect(item) {
      deleteGameCollect({
        gameId: item.id,
        gameTerminal: item.gameTerminal
      }).then((res) => {
        if (this.ERR_OK === res.code || this.ERR_OK_OTHER === res.code) {
          item.collectFlag = 'N'
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },
    gameNumControl(isShowMore) {
      if (isShowMore) {
        this.limit = this.filterList.length
      } else {
        this.limit = 20
      }
      this.isShowMoreBtn = !this.isShowMoreBtn
    },

  },
  watch: {
    $route() {
      this.limit = 20
      this.isShowMoreBtn = true
    }
  },
}

// 游戏分类
export const gameFilter = {
  data() {
    return {
      filterTypeList: [
        {
          title: '游戏大厅',
          filter: 'gameTag',
          active: '',
          list: {
            'ptasia': config.COMMON_GAME_STYLE,
            'pt': config.COMMON_GAME_STYLE,
            'pg': config.COMMON_GAME_STYLE,
            'cq9': config.COMMON_GAME_STYLE,
            'sw': config.COMMON_GAME_STYLE,
            'dt': config.COMMON_GAME_STYLE,
            'mg': config.COMMON_GAME_STYLE,
            'qt': config.COMMON_GAME_STYLE,
            'png': config.COMMON_GAME_STYLE,
            'nt': config.COMMON_GAME_STYLE,
          }
        },
        {
          title: '游戏类型',
          filter: 'gameType',
          active: '',
          list: {
            'ptasia': config.COMMON_GAME_TYPE,
            'pt': config.COMMON_GAME_TYPE,
            'pg': config.COMMON_GAME_TYPE,
            'cq9': config.COMMON_GAME_TYPE,
            'sw': config.COMMON_GAME_TYPE,
            'dt': config.COMMON_GAME_TYPE,
            'mg': config.COMMON_GAME_TYPE,
            'qt': config.COMMON_GAME_TYPE,
            'png': config.COMMON_GAME_TYPE,
            'nt': config.COMMON_GAME_TYPE,
          }
        },
        {
          title: '赔付线数',
          filter: 'gameLine',
          active: '',
          list: {
            "pt": config.COMMON_GAME_LINE,
            "mg": config.COMMON_GAME_LINE,
            "dt": config.COMMON_GAME_LINE,
            "sw": config.COMMON_GAME_LINE,
            "qt": config.COMMON_GAME_LINE,
            "png": config.COMMON_GAME_LINE,
            "nt": config.COMMON_GAME_LINE,
            "ptasia": config.COMMON_GAME_LINE,
            "cq9": config.COMMON_GAME_LINE,
            "pg": config.COMMON_GAME_LINE,
          }
        },
      ]
    }
  },
  computed: {
    category() {
      return this.$route.params.type
    }
  },
  created() {
  },
  methods: {
    search(obj, item) {
      //设置当前选中状态
      item.active = obj.value
      this.$emit('search', obj.value, item.filter)
    },
    // 重置筛选
    reset() {
      this.filterTypeList.forEach((item) => {
        item.active = ''
        this.$emit('search', '', item.filter)
      })
    }
  },
  watch: {
    $route() {
      this.reset()
    }
  },
}

// 虚拟币游戏
export const btcBetModule = {
  mixins: [levelImage, copy],
  data() {
    return {
      btcList: config.btcList,
      currentCode: config.btcList[0].value,//当前余额货币
      depositCode: config.btcList[0].value,//当前充币货币
      withdralCode: config.btcList[0].value,//当前提币货币
      depositBtcWalet: {},//充币用户钱包
      amount: '',//提款金额
      tarAddress: '',//提款地址
      password: '',//提款密码
      minPrice: '',//最低提跨金额
      serviceCharge: '',//手续费
      isShowSelect: true,//是否显示货币选择框
      singleBtcType: '',//单币种提币
      withdralAddressList: [],//提款地址列表
      isShowDepositDialog: false,//充币弹框
      isShowWithdralDialog: false//提币弹框
    }
  },
  computed: {
    ...mapGetters([
      'currentBtcWallet',//当前用户钱包
      'userInfo',
      'isLogin'
    ])
  },
  activated() {
    this.needLogin()
    this._getBtcWallet(this.currentCode, 1)
  },
  methods: {
    closeDialog(attr) {
      this[attr] = false
    },
    openDialog(attr) {
      this[attr] = true
    },
    needLogin() {
      if (!this.isLogin) {
        this.$router.push(isMobile ? '/mobile' : '/')
      }
    },
    bindAddress() {
      this.closeDialog('isShowWithdralDialog')
      this.openDialog('isShowEditDialog')
    },
    //刷新余额
    refresh() {
      this._getBtcWallet(this.currentCode, 1)
      this._initBtcWallet()
    },
    //打开充币
    openDeposit() {
      this._getBtcWallet(this.depositCode, 2)
      this.openDialog('isShowDepositDialog')
      if (!this.loadFlag) {
        this._loadScript()
      }
    },
    //获取二维码
    getEwmCode() {
      this.$refs.QRCode.innerHTML = ''
      this.depositBtcWalet.address && new QRCode(this.$refs.QRCode, {
        text: this.depositBtcWalet.address,
        width: 180,
        height: 180
      })
    },
    // 打开提币弹框
    openWithdral(code) {
      if (code) {
        this.isShowSelect = false
        this.singleBtcType = code
      } else {
        this.isShowSelect = true
      }
      this._getBtcWallet(code || this.withdralCode, 3)
      this._findBtcTargetWalletList(code || this.withdralCode)
      this.openDialog('isShowWithdralDialog')
    },
    //提币
    withdralBtc() {
      let code = ''
      if (this.isShowSelect) {
        code = this.withdralCode
      } else {
        code = this.singleBtcType
      }
      if (!code) {
        this.$message({
          type: 'warning',
          message: '请选择货币种类'
        })
        return
      }
      if (this.amount < this.minPrice) {
        this.$message({
          type: 'warning',
          message: `提款金额不能少于${this.minPrice}`
        })
        return
      }
      if (!this.tarAddress) {
        this.$message({
          type: 'warning',
          message: '请选择提款地址'
        })
        return
      }
      if (!this.password) {
        this.$message({
          type: 'warning',
          message: '请填写账户密码'
        })
        return
      }

      btcWithdraw({
        code,
        amount: this.amount,
        tarAddress: this.tarAddress,
        password: this.password,
        loginName: this.userInfo.loginname
      }).then((res) => {
        if (this.ERR_OK === res.code) {
          this.$message({
            type: 'info',
            message: res.data
          })

          // 刷新余额
          this.refresh()
          //主账户记录
          this._findWalletLogList()
          //清空输入框
          this.amount = ''
          this.tarAddress = ''
          this.password = ''
          // 关闭弹框
          this.closeDialog('isShowWithdralDialog')
        } else {
          this.$message({
            type: 'warning',
            message: res.message === '[提示]你的登录已过期，请从首页重新登录!'?'未登录或登录失效，请刷新页面重试':res.message
          })
        }
      })
    },

    //获取当前货币钱包
    _getBtcWallet(code, type) {
      // type:1.当前货币余额 2.充币 3.提币
      getBtcWallet({
        code,
        loginName: this.userInfo.loginname
      }).then((res) => {
        if (this.ERR_OK === res.code) {
          let data = res.data
          // 货币余额
          if (type === 1) {
            this.SET_CURRENT_WALLET(data)
          }
          // 充币
          if (type === 2) {
            this.depositBtcWalet = data

          }
          // 提币
          if (type === 3) {
            this.amount = data.balance
            this.minPrice = data.minPrice
            this.serviceCharge = data.serviceCharge
          }
        } else {

          if (res.message === '币种不存在或者维护中') {
            this.$msgbox({
              title: '温馨提示',
              type: 'warning',
              message: res.message,
              beforeClose: (action, instance, done) => {
                this.$router.push(isMobile ? '/mobile/' : '/')
                done()
              }
            }).then(() => {
              this.$router.push(isMobile ? '/mobile/' : '/')
            }).catch(e => e)
          } else {
            this.$message({
              type: 'warning',
              message: res.message === '[提示]你的登录已过期，请从首页重新登录!'?'未登录或登录失效，请刷新页面重试':res.message
            })
          }

        }

      })
    },

    //获取目标钱包地址
    _findBtcTargetWalletList(code) {
      findBtcTargetWalletList({code, loginName: this.userInfo.loginname}).then((res) => {
        if (this.ERR_OK === res.code) {
          this.tarAddress = ''
          this.withdralAddressList = res.data
        }else{
          this.$message({
            type: 'warning',
            message: res.message === '[提示]你的登录已过期，请从首页重新登录!'?'未登录或登录失效，请刷新页面重试':res.message
          })
        }
      })
    },
    //加载js
    _loadScript() {
      let body = document.querySelector('body')
      let script = document.createElement('script')
      script.src = `${this.baseUrl}script/qrcode.js`
      body.appendChild(script)
      this.loadFlag = true
    },
    ...mapMutations([
      'SET_CURRENT_WALLET'
    ])
  },
  watch: {
    //当前余额货币
    currentCode(code) {
      if (!code) return
      this._getBtcWallet(code, 1)
    },
    //当前充币货币
    depositCode(code) {
      if (!code) return
      this._getBtcWallet(code, 2)
    },
    //当前提款货币
    withdralCode(code) {
      if (!code) return
      this._getBtcWallet(code, 3)
      this._findBtcTargetWalletList(code)
    },
    initLoginState(val) {
      if (val) {
        this.needLogin()
      }
    },
    currentIdx(val) {
      if (val === 2 && !this.flag2) {
        this.flag2 = true
        this._findBtcAllWalletList()
      }
      if ((val === 3) && !this.flag3) {
        this.flag3 = true
        this._findWalletLogList()
        this._getBetDetailByTime()
      }
    }
  }
}

//虚拟币余额
export const btcBalanceModule = {
  data() {
    return {
      multipleSelection: [],
      balanceHeadList: [
        {
          prop: 'code',
          label: '货币'
        },
        {
          prop: 'balance',
          label: '金额'
        },
        {
          prop: 'balance',
          label: '可提款金额'
        }
      ],
    }
  },
  computed: {
    ...mapGetters([
      'walletList'
    ])
  },
  created() {
    this._initBtcWallet()
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //获取用户所有钱包余额
    _initBtcWallet() {
      initBtcWallet({
        loginName: this.userInfo.loginname,
        page: 1,
        limit: 10
      }).then((res) => {
        if (this.ERR_OK === res.code) {
          this.SET_WALLET_LIST(res.data)
        }
      })
    },
    ...mapMutations([
      'SET_WALLET_LIST'
    ])
  }
}

//虚拟币钱包
export const btcWalletModule = {
  data() {
    return {
      multipleSelection: [],
      btcWalletList: [],
      walletHeadList: [
        {
          prop: 'addressName',
          label: '钱包名'
        },
        {
          prop: 'code',
          label: '钱包类型'
        },
        {
          prop: 'address',
          label: '钱包地址'
        }
      ],
      isShowEditDialog: false,//修改用户信息弹框
      title: '新增',
      walletData: {
        targetAddressId: '',
        addressName: '',
        targetAddress: '',
        code: config.btcList[0].value
      }
    }
  },
  computed: {},
  created() {
    // this._findBtcAllWalletList()
  },
  methods: {
    calcWidth(prop) {
      return prop === 'address' ? 400 : 'auto'
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    openEditWallet(type, item) {
      if (type === 1) {//修改
        this.walletData = {
          targetAddressId: item.id,
          addressName: item.addressName,
          targetAddress: item.address,
          code: config.btcList[0].value
        }
        this.title = '修改'
      } else {//新增
        this.walletData = {
          targetAddressId: '',
          addressName: '',
          targetAddress: '',
          code: config.btcList[0].value
        }
        this.title = '新增'
      }
      this.openDialog('isShowEditDialog')
    },
    deleteTargetWallet(item) {
      this.$msgbox({
        type: 'warning',
        title: '温馨提示',
        message: '此操作将永久删除该文件, 是否继续',
        cancelButtonText: '取消',
        showCancelButton: true,
      }).then((action) => {
        if (action === 'confirm') {
          let targetAddressId = item.id
          deleteTargetWallet({
            targetAddressId,
            loginName: this.userInfo.loginname
          }).then((res) => {
            if (this.ERR_OK === res.code) {
              this.$message({
                type: 'info',
                message: res.data || '删除成功'
              })
              let idx = this.btcWalletList.findIndex(obj => obj.id === item.id)
              this.btcWalletList.splice(idx, 1)
            } else {
              this.$message({
                type: 'warning',
                message: res.message === '[提示]你的登录已过期，请从首页重新登录!'?'未登录或登录失效，请刷新页面重试':res.message
              })
            }
          })
        }
      }).catch(e => e)
    },
    addOrUpdateTargetWallet() {
      let {addressName, targetAddress} = this.walletData
      if (!addressName) {
        this.$message({
          type: 'warning',
          message: '请填写钱包名'
        })
        return
      }
      if (!targetAddress) {
        this.$message({
          type: 'warning',
          message: '请填写钱包地址'
        })
        return
      }
      this.walletData.loginName = this.userInfo.loginname
      addOrUpdateTargetWallet(this.walletData).then((res) => {
        if (this.ERR_OK === res.code) {
          this.$message({
            type: 'info',
            message: res.data || '保存成功'
          })
          this._findBtcAllWalletList()
          this.closeDialog('isShowEditDialog')
        } else {
          this.$message({
            type: 'warning',
            message: res.message === '[提示]你的登录已过期，请从首页重新登录!'?'未登录或登录失效，请刷新页面重试':res.message
          })
        }
      })
    },
    _findBtcAllWalletList() {
      findBtcTargetWalletList({
        page: 1,
        limit: 10,
        loginName: this.userInfo.loginname,
        code: ''
      }).then((res) => {
        if (this.ERR_OK === res.code) {
          this.btcWalletList = res.data
        }else{
          this.$message({
            type: 'warning',
            message: res.message === '[提示]你的登录已过期，请从首页重新登录!'?'未登录或登录失效，请刷新页面重试':res.message
          })
        }
      })
    },

  }
}

//虚拟币记录
export const btcLogModule = {
  data() {
    return {
      accountLogList: [],
      gameLogList: [],
      logHeadList: [
        {
          prop: 'createTime',
          label: '时间'
        },
        {
          prop: 'code',
          label: '货币'
        },
        {
          prop: 'logType',
          label: '项目'
        },
        {
          prop: 'changeAmount',
          label: '金额'
        },
        {
          prop: 'status',
          label: '备注'
        },
      ],
      gameHeadList: [
        {
          prop: 'createTime',
          label: '投注时间'
        },
        {
          prop: 'gameCode',
          label: '游戏编号'
        },
        {
          prop: 'currency',
          label: '游戏币种'
        },
        {
          prop: 'betWins',
          label: '输赢值'
        },
        {
          prop: 'creditBefore',
          label: '投注前'
        },
        {
          prop: 'creditAfter',
          label: '投注后'
        },
        {
          prop: 'betPrice',
          label: '投注额'
        },
        {
          prop: 'betId',
          label: '投注id'
        },
      ],
      currentIdxLog: 0,
      list: [
        {
          text: '主账户记录'
        },
        {
          text: '游戏记录'
        },
      ],
      accountPagination: {
        pageIndex: 1,
        size: 10,
        code: 'ALL',
        total: 0
      },
      gamePagination: {
        pageIndex: 1,
        size: 10,
        total: 0,
        country: 'ALL'
      }

    }
  },
  created() {
    // this._findWalletLogList()
    // this._getBetDetailByTime()
  },
  methods: {
    handleSizeChange(val) {
      this.accountPagination.size = val
      this._findWalletLogList()
    },
    handleCurrentChange(val) {
      this.accountPagination.pageIndex = val
      this._findWalletLogList()
    },
    handleSizeChangeGameLog(val) {
      this.gamePagination.size = val
      this._getBetDetailByTime()
    },
    handleCurrentChangeGameLog(val) {
      this.gamePagination.pageIndex = val
      this._getBetDetailByTime()
    },
    //主账户记录
    _findWalletLogList() {
      let {pageIndex, size, code} = this.accountPagination
      findWalletLogList({
        pageIndex,
        size,
        code,
        loginName: this.userInfo.loginname,
      }).then((res) => {
        if (this.ERR_OK === res.code) {
          let data = res.data.data
          if (data.length) {
            data = data.map((item) => {
              item.logType = item.logType === '1' ? '充币' : '提币'
              let status = ''
              switch (item.status) {
                case '1':
                  status = '待审核'
                  break
                case '2':
                  status = '已完成'
                  break
                case '3':
                  status = '异常'
                  break
                case '4':
                  status = '已取消'
                  break
              }
              item.status = status
              return item
            })
            this.accountLogList = data
            this.accountPagination.total = Number(res.data.total) || 0
          } else {
            this.accountLogList = []
            this.accountPagination.total = Number(res.data.total) || 0
          }
        }else{
          this.$message({
            type: 'warning',
            message: res.message === '[提示]你的登录已过期，请从首页重新登录!'?'未登录或登录失效，请刷新页面重试':res.message
          })
        }
      })
    },
    //游戏记录
    _getBetDetailByTime() {
      let {pageIndex, size, country} = this.gamePagination
      getBetDetailByTime({
        pageIndex,
        size,
        country
      }).then((res) => {
        if (this.ERR_OK === res.code) {
          let data = res.data.data
          if (data.length) {
            data = data.map((item) => {
              item.createTime = item.createTime.split('.')[0]
              return item
            })
          }
          this.gameLogList = data

          this.gamePagination.total = Number(res.data.total)
        }else{
          // this.$message({
          //   type: 'warning',
          //   message: res.message === '[提示]你的登录已过期，请从首页重新登录!'?'未登录或登录失效，请刷新页面重试':res.message
          // })
        }
      })
    },
    selectTabItem(idx) {
      this.currentIdxLog = idx
    }
  },
  watch: {}
}

// 活动优惠
export const promotion = {
  data() {
    return {
      menuList: [
        {
          text: '全部优惠',
          icon: 'weibiaoti2fuzhi02'
        },
        {
          text: '老虎机优惠',
          icon: 'game'
        },
        {
          text: '真人优惠',
          icon: 'nvren'
        },
        {
          text: '手机优惠',
          icon: 'shouji'
        },
        // {
        //   text: '过期优惠',
        //   icon: 'xiaolian'
        // },
        // {
        //   text: '体育优惠',
        //   icon: 'tiyu'
        // },
      ],
      currentIdx: 0,
      filterList: [],
      time: config.promotion.TIME,
      allItems: [
        {
          id: 'christmas',
          title: '圣诞元旦',
          content: '圣诞元旦喜上云端',
          time: '详情见专题内',
          img: require('@/common/image/promotion/christmas-youhui.jpg'),
          link: path + "/activity/christmas",
          type: []
        },
        {
          id: 'casino',
          title: 'AG赌神赛',
          content: 'AG赌神赛，总奖金2,000,000人民币',
          time: '详情见专题内',
          img: require('@/common/image/promotion/aug-ag-youhui.png'),
          link: path + "/activity/casino",
          type: []
        },
        // {
        //   id: 'dtWinner',
        //   title: 'DT全面争霸',
        //   content: 'DT全面争霸',
        //   time: '详情见专题内',
        //   img: require('@/common/image/promotion/sep-dt-youhui.png'),
        //   link: "http://play.dreamtech8.com/dta.aspx?http://dtshow.vip",
        //   type: []
        // },
        {
          id: 'shoucun',
          title: '尊宝新100%首次存送',
          content: '尊宝首存再次升级 , 业界最高-史无前例 ! 老虎机最高存送128% ，AG真人首存优惠等着您！',
          time: config.promotion.TIME,
          img: require('@/common/image/promotion/shoucun.jpg'),
          state: false,
          type: [
            config.promotion.TYPE_SLOT
          ]
        },
        {
          id: 'movie',
          title: '尊宝电影院',
          content: '最新最热的电影这里都能免费看！',
          time: '1月5号正式上线',
          img: require('@/common/image/promotion/zb-movie-youhui.png'),
          link: path + "/activity/movie",
          type: []
        },
        {
          id: 'ckms',
          title: '存款秒送VIP+礼包 ',
          content: '存款就送VIP！让您走上人生高端路，玩游戏享VIP！做人生大赢家！',
          time: '长期有效',
          img: require('@/common/image/promotion/upgradevip.png'),
          state: false,
          type: []
        },
        {
          id: 'fanzeng',
          title: ' 秒存返赠立即送1%',
          content: '秒存返赠立即送1%，不需要申请，使用就能自动添立即到账，最高500元。',
          time: config.promotion.TIME,
          img: require('@/common/image/promotion/miaocun3.png'),
          state: false,
          type: []
        },
        {
          id: 'handsel',
          title: 'app彩金下载送12-88',
          content: '只要您下载尊宝手机APP，无需联系客服，即可自助领取12-88元彩金。彩金无需流水，达到388元即可提款。',
          time: config.promotion.TIME,
          img: require('@/common/image/promotion/register.jpg'),
          state: false,
          type: [
            config.promotion.TYPE_SLOT
          ]
        },
        {
          id: 'ccc',
          title: '老虎机次次存送最高25%',
          content: '最高红利可达5888元，人人有份，尊宝优惠天天送。',
          time: config.promotion.TIME,
          img: require('@/common/image/promotion/ccc.jpg'),
          state: false,
          type: [
            config.promotion.TYPE_SLOT
          ]
        },
        {
          id: 'jyj',
          title: '尊宝救援金，让您无后顾之忧',
          content: '尊宝救援金 不需要向客服人员申请，可自己自助领取救援金，最高救援10%。',
          time: config.promotion.TIME,
          img: require('@/common/image/promotion/jyj.jpg'),
          state: false,
          type: [
            config.promotion.TYPE_SLOT
          ]
        },
        {
          id: 'sign',
          title: '每日签到送彩金',
          content: '新会员每日签到送4元，单月120元，无需存款可签到，VIP玩家最高签到每日高达20元。',
          time: config.promotion.TIME,
          img: require('@/common/image/promotion/meiriqd.jpg'),
          state: false,
          type: [
            config.promotion.TYPE_SLOT
          ]
        },
        {
          id: 'fanshui',
          title: ' 尊宝返水最高可达1.1%',
          content: '无需申请，人人有份，游戏投注就可以享受此优惠，返水额度无上限，可自助领取优惠，无需等待。',
          time: config.promotion.TIME,
          img: require('@/common/image/promotion/fanshui.jpg'),
          state: false,
          type: []
        },
        {
          id: 'limitTime',
          title: '尊宝限时30%-100%存送',
          content: '在特定的时间尊宝会开放30%-100%存送优惠活动，请您关注好尊宝微信公众号，或者下载尊宝APP，掌握最新优惠资讯。',
          time: config.promotion.TIME,
          img: require('@/common/image/promotion/limit-time.jpg'),
          state: false,
          type: [
            config.promotion.TYPE_PHONE
          ]
        }
      ],
    }
  },
  created() {
    this.filterList = this.allItems
  },
  methods: {
    //打开优惠详情
    goToThisPromotion(item) {
      if (!item.link) { //本地打开
        item.state = !item.state
        return
      }
      if (this._isHttpUrl(item.link)) {
        window.open(item.link)
      } else {
        this.$router.push(item.link)
      }
    },
    togglePanel(item) {
      item.state = !item.state
    },
    selectItem(idx) {
      let {TYPE_ALL, TYPE_SLOT, TYPE_REAL, TYPE_SPORT, TYPE_PHONE, TYPE_OLD} = config.promotion
      this.currentIdx = idx
      switch (idx) {
        case 0 :
          idx = TYPE_ALL
          break
        case 1 :
          idx = TYPE_SLOT
          break
        case 2 :
          idx = TYPE_REAL
          break
        case 3 :
          idx = TYPE_PHONE
          break
        case 4 :
          idx = TYPE_OLD
          break
        case 5 :
          idx = TYPE_SPORT
      }
      this._searchCategory(idx)
    },
    _searchCategory(type) {
      if (!type) {
        return this.filterList = this.allItems
      }
      this.filterList = this.allItems.filter((item) => {
        return item.type.indexOf(type) !== -1
      })
    },
    _isHttpUrl(string) {
      return /^http/.test(string)
    },
  }
}

//账户余额查询
export const queryAccountBalance = {
  data() {
    return {
      config,
      balance: '0元',
      gameCode: ''
    }
  },
  methods: {
    getGameMoney() {
      if (!this.gameCode) {
        this.$message({
          type: 'warning',
          message: '请选择账户'
        })
        return
      }
      getGameMoneyApiFun({gameCode: this.gameCode}).then((res) => {
        if (this.ERR_OK === res.code) {
          this.balance = res.data
        }
      })
    }
  },
}

// 查询签到
export const querySignAmount = {
  methods: {
    _querySignAmount() {
      querySignAmountApiFun({_: new Date()}).then((res) => {
        if (this.ERR_OK === res.code) {
          this.SET_SIGNAMOUNT(res.data)
        }
      })
    },
    ...mapMutations([
      'SET_SIGNAMOUNT',
    ])
  }
}

// 存款初始化、分类逻辑
export const depositModule = {
  mixins: [commonMaskPageModule],
  data() {
    return {
      config,
      currentId: '',//显示当前存款title
      payWay: [],// 所有存款通道
      //第三方支付没有depositName属性
      depositTypes: {//存款类型
        bankCardTitle: {//银行卡title
          currentType: config.PAYWAY.yinLian,
          list: [
            {
              payWayType: config.PAYWAY.yinLian,
              type: 'ylsm',
              title: '银联扫码',
              icon: 'saoma',
              describe: '银联APP，云闪付扫码',
              payWayItem: { //银联扫码
                payWayCurrentIdx: 0,
                depositMoney: null,
                discount: 0,
                accountCurrentIdx: -1,
                currentPayWay: {},
                payWayType: config.PAYWAY.yinLian,
                payWayList: [],
                tooltip: {
                  title: '银联扫码充值说明',
                  items: [
                    {
                      text: '银联扫码，可使用任意银联APP或云闪付APP扫码支付。',
                    },
                  ]
                }
              }
            },
            {
              payWayType: config.PAYWAY.phoneWYPay,
              type: 'wyzz',
              icon: 'shouji',
              title: '手机/网银转账',
              describe: '推荐已开通网银的用户使用',
              payWayItem: {//手机、网银转账 - 秒存
                depositName: '',
                payWayCurrentIdx: 0,
                depositMoney: null,
                discount: 0.01,
                accountCurrentIdx: -1,
                currentPayWay: {},
                payWayType: config.PAYWAY.phoneWYPay,
                payWayList: [
                  {
                    showName: '通道1',
                    value: 1,
                    minPay: 11,
                    maxPay: 3000000
                  },
                  {
                    showName: '通道2',
                    value: 7,
                    minPay: 11,
                    maxPay: 3000000
                  },
                ],
                tooltip: {
                  title: '手机/网银转账充值说明',
                  items: [
                    {
                      text: '手机/网银转账每日23:30-02:00左右有延迟到帐现象，若转账状态成功后仍未到账，请咨询客服。',
                    },
                  ]
                }
              },
            },
            {
              payWayType: config.PAYWAY.online,
              type: 'onlinePay',
              icon: 'yinhangqia',
              title: '在线支付',
              describe: '推荐已开通网银的用户使用',
              payWayItem: { //在线支付
                payWayCurrentIdx: 0,
                depositMoney: null,
                discount: 0,
                accountCurrentIdx: -1,
                currentPayWay: {},
                payWayType: config.PAYWAY.online,
                payWayList: [],
                //支付银行
                payBankList: [],
                payBankCurrentIdx: 0,
                currentPayBank: {},
                tooltip: {
                  title: '在线充值说明',
                  items: [
                    {
                      text: '最低存款额度为20元，最高50000元。',
                    },
                    {
                      text: '在线支付需要承担手续费，手续费由第三方收取。',
                    },
                    {
                      text: '您存款成功后，请您记住跳转出来的支付单号。如果您出现掉单，请您联系在线客服提供您的支付单号，我们将第一时间为您处理。',
                    },
                  ]
                }
              },
            },
            {
              payWayType: config.PAYWAY.fastPay,
              type: 'fastPay',
              icon: 'shuaqiaqiapianyinhangqia',
              title: '快捷支付',
              describe: '验证身份证号、短信即可使用',
              payWayItem: {//快捷支付
                payWayCurrentIdx: 0,
                depositMoney: null,
                discount: 0,
                accountCurrentIdx: -1,
                currentPayWay: {},
                payWayType: config.PAYWAY.fastPay,
                payWayList: [],
              },
            }
          ],
          forTitle: {
            id: config.PAYWAY.yinLian.toString(),
            text: '银行卡',
            icon: 'shuaqiaqiapianyinhangqia',
            badge: BADGE,
            includes: [config.PAYWAY.yinLian, config.PAYWAY.online, config.PAYWAY.fastPay, config.PAYWAY.phoneWYPay]
          },
        },
        zfbTitle: {//支付宝title
          currentType: config.PAYWAY.zfbSM,
          list: [
            {
              payWayType: config.PAYWAY.zfbTransformPay,
              type: 'zfbzz',
              icon: 'zhifubao',
              title: '支付宝转账',
              describe: '稳定，单笔上限300万',
              payWayItem: {//支付宝转账 - 秒存
                depositName: '',
                payWayCurrentIdx: 0,
                depositMoney: null,
                discount: 0.01,
                accountCurrentIdx: -1,
                currentPayWay: {},
                payWayType: config.PAYWAY.zfbTransformPay,
                payWayList: [
                  {
                    showName: '通道1',
                    value: 66,
                    minPay: 11,
                    maxPay: 3000000
                  }
                ],
                tooltip: {
                  title: '支付宝充值说明',
                  items: [
                    {
                      text: '支付宝转账每日23:20-01:00左右有延迟到帐现象，若转账状态显示“成功到账”后仍未到账，请咨询客服。',
                    },
                    {
                      text: '请务必保存存款成功截图，未到账时可提供给官网客服。',
                    },
                    {
                      text: `若遇到收款账户异常，或其他异常情况，导致交易被中断无法完成支付，请提供截图联系客服。<a target="_blank" href="${config.serviceLink}" class="link">在线客服</a>`,
                    },
                  ]
                }
              },

            },
            {
              payWayType: config.PAYWAY.zfbSM,
              type: 'zfbsm',
              icon: 'saoma',
              title: '支付宝扫码',
              describe: '便捷，适合小额存款',
              payWayItem: {
                payWayCurrentIdx: 0,
                depositMoney: null,
                discount: 0,
                accountCurrentIdx: -1,
                currentPayWay: {},
                payWayType: config.PAYWAY.zfbSM,
                payWayList: [],
                tooltip: {
                  title: '支付宝充值说明',
                  items: [
                    {
                      text: '支付宝扫码通道需要扣除手续1%—5%手续费，不同支付通道收取的费率不同，此费用由第三方收取。',
                    },
                    {
                      text: '请务必保存存款成功截图，未到账时可提供给官网客服。',
                    },
                    {
                      text: `若如果您的款项10分钟未能到账，请联系24小时<a target="_blank" href="${config.serviceLink}" class="link">在线客服</a>`,
                    },
                  ]
                }
              },
            },
          ],
          forTitle: {
            id: config.PAYWAY.zfbSM.toString(),
            text: '支付宝',
            icon: 'zhifubao1',
            badge: BADGE,
            includes: [config.PAYWAY.zfbSM, config.PAYWAY.zfbTransformPay]
          },
        },
        wxTitle: {//微信title
          currentType: config.PAYWAY.wxSM,
          list: [
            {
              payWayType: config.PAYWAY.wxSM,
              type: 'wxsm',
              icon: 'weixin icon-weixin-color',
              title: '微信扫码支付',
              describe: '便捷，适合小额存款',
              payWayItem: {//微信扫码
                payWayCurrentIdx: 0,
                depositMoney: null,
                discount: 0,
                accountCurrentIdx: -1,
                currentPayWay: {},
                payWayType: config.PAYWAY.wxSM,
                payWayList: [],
                tooltip: {
                  title: '微信充值说明',
                  items: [
                    {
                      text: '微信支付通道需要扣除手续1%—5%手续费，不同支付通道收取的费率不同，此费用由第三方收取。',
                    },
                    {
                      text: '请按照系统指示的最低和最高金额进行充值，以免给您带来不便。',
                    },
                    {
                      text: `若如果您的款项10分钟未能到账，请联系24小时<a target="_blank" href="${config.serviceLink}" class="link">在线客服</a>`,
                    },
                  ]
                }
              },
            },
            {
              payWayType: config.PAYWAY.wxKJ,
              type: 'wxkj',
              icon: 'saoma icon-weixin-color',
              title: '微信快捷',
              describe: '火爆，方便快捷',
              payWayItem: {
                payWayCurrentIdx: 0,
                depositMoney: null,
                discount: 0,
                accountCurrentIdx: -1,
                currentPayWay: {},
                payWayType: config.PAYWAY.wxKJ,
                payWayList: [],
                tooltip: {
                  title: '微信充值说明',
                  items: [
                    {
                      text: '微信支付通道需要扣除手续1%—5%手续费，不同支付通道收取的费率不同，此费用由第三方收取。',
                    },
                    {
                      text: '请按照系统指示的最低和最高金额进行充值，以免给您带来不便。',
                    },
                    {
                      text: `若如果您的款项10分钟未能到账，请联系24小时<a target="_blank" href="${config.serviceLink}" class="link">在线客服</a>`,
                    },
                  ]
                }
              },
            },

          ],
          forTitle: {
            id: config.PAYWAY.wxSM.toString(),
            text: '微信支付',
            icon: 'weixin1',
            includes: [config.PAYWAY.wxSM, config.PAYWAY.wxKJ]
          },
        },
        jdTitle: {//京东美团title
          currentType: config.PAYWAY.jD,
          list: [
            {
              payWayType: config.PAYWAY.jD,
              type: 'jdPay',
              icon: 'jd',
              title: '京东支付',
              describe: '便捷，最高上限3000',
              payWayItem: {//京东支付
                payWayCurrentIdx: 0,
                depositMoney: null,
                discount: 0,
                accountCurrentIdx: -1,
                currentPayWay: {},
                payWayType: config.PAYWAY.jD,
                payWayList: [],
              },
            },
            {
              payWayType: config.PAYWAY.meiTuan,
              type: 'mtPay',
              icon: 'meituan1',
              title: '美团支付',
              describe: '便捷，最高上限3000',
              payWayItem: {//美团支付
                payWayCurrentIdx: 0,
                depositMoney: null,
                discount: 0,
                accountCurrentIdx: -1,
                currentPayWay: {},
                payWayType: config.PAYWAY.meiTuan,
                payWayList: [],
              },
            },
          ],
          forTitle: {
            id: config.PAYWAY.meiTuan.toString(),
            text: '京东美团',
            icon: 'jd',
            includes: [config.PAYWAY.meiTuan, config.PAYWAY.jD]
          },
        },
        qqTitle: {//京东美团title
          currentType: config.PAYWAY.qq,
          list: [
            {
              payWayType: config.PAYWAY.qq,
              type: 'qqPay',
              icon: 'QQ',
              title: 'QQ支付',
              describe: '便捷，最高上限3000',
              payWayItem: {//京东支付
                payWayCurrentIdx: 0,
                depositMoney: null,
                discount: 0,
                accountCurrentIdx: -1,
                currentPayWay: {},
                payWayType: config.PAYWAY.qq,
                payWayList: [],
                tooltip: {
                  title: 'QQ扫描充值说明',
                  items: [
                    {
                      text: '请按照系统指示的最低和最高金额进行充值，以免给您带来不便。',
                    },
                    {
                      text: 'QQ扫码通道需要扣除手续1%—5%手续费，不同支付通道收取的费率不同，此费用由第三方收取。',
                    },
                    {
                      text: `存款过程中如有任何问题，请及时联系24小时<a target="_blank" href="${config.serviceLink}" class="link">在线客服</a>`,
                    },
                  ]
                }
              }
            }
          ],
          forTitle: {
            id: config.PAYWAY.qq.toString(),
            text: 'QQ钱包',
            icon: 'QQ',
            includes: [config.PAYWAY.qq]
          },
        },
      },
    }
  },
  computed: {
    //存款标题计算 隐藏通道处理等
    tabTitleList() {
      let res = []
      Object.keys(this.depositTypes).forEach((item) => {
        res.push(this.depositTypes[item].forTitle)
      })
      // 接口获取的通道集
      let payWayS = this.payWay.map((obj) => {
        return obj.payWay
      })
      // 秒存通道集
      let secondPayWays = []
      Object.keys(config.PAYWAY).forEach((item) => {
        let obj = config.PAYWAY[item]
        if (typeof obj === 'string') {
          secondPayWays.push(obj)
        }
      })
      //隐藏未开启的通道,秒存无法判断是否关闭,故默认一直开启
      res = res.filter((item) => {
        return this._checkArr(item.includes, secondPayWays) || this._checkArr(item.includes, payWayS)
      })
      //pc端默认展示第一个存款类型
      if (!isMobile) {
        res[0] && (this.currentId = res[0].id)
      }
      return res
    },
    ...mapGetters(['isLogin', 'initLoginState', 'userInfo'])
  },
  created() {
    //处理app跳过来,判断加载一次
    this.initPayWayFlag = null
    // 如果为app跳转过来，不用获取通道，待请求登录状态后获取
    if (!window.location.href.includes('isFromApp')) {
      this._getPayWay()
    }
  },
  methods: {
    //存款标题切换
    selectItem(idx, item) {
      this.currentId = item.id
      if (this.commonPageHeadData) {
        this.commonPageHeadData.title = item.text
        this.isShowCommonMaskPage = true
      }
    },
    // 支付类型切换
    payWayTypeSelect(item, type) {
      this.depositTypes[type].currentType = item.payWayType
      if (this.commonPageHeadData) {
        this.setContentHeight(this.isShowCommonMaskPage)
      }
    },
    // 获取所有通道
    _getPayWay() {
      getPayWay({usetype: isMobile ? 1 : 2}).then((res) => {
        if (this.ERR_OK === res.code) {
          this.payWay = res.data
          //初始化支付通道
          this._initPayWayInfo()
          //只加载一次
          this.initPayWayFlag = true
          // 获取在线支付银行
          this._getPayBankList()
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },
    // 获取在线支付银行
    _getPayBankList(payType) {
      let baseUrl = 'http://220.241.124.160:15002'
      if (process.env.NODE_ENV === 'production') {
        baseUrl = ''
      }
      let url = baseUrl + '/api/pay/thirdPaymentBank/list'

      if (!payType) {
        this.depositTypes.bankCardTitle.list.forEach((item) => {
          if (item.payWayItem.payBankList) {
            let payTypeArr = item.payWayItem.payWayList[0].payCenterUrl.split('/')
            payType = payTypeArr[1] + payTypeArr[2]
          }
        })
      }

      ajaxRequst(url, 'POST', {payType}).then((res) => {
        if (this.ERR_OK_OTHER === res.code) {
          this.depositTypes.bankCardTitle.list.forEach((item) => {
            if (item.payWayItem.payBankList) {
              item.payWayItem.payBankList = res.data
            }
          })
          //初始化支付银行
          this._initPayBankInfo()
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },
    // 初始化支付银行
    _initPayBankInfo() {
      Object.keys(this.depositTypes).forEach((item) => {
        let obj = this.depositTypes[item]
        obj.list.forEach((payWayItem) => {
          payWayItem = payWayItem.payWayItem
          // 默认第一个支付通道
          if (payWayItem.currentPayBank) {
            payWayItem.currentPayBank = payWayItem.payBankList[0]
          }
        })
      })
    },
    // 初始化支付通道
    _initPayWayInfo() {
      let payWayS = this.payWay.map((obj) => {
        return obj.payWay
      })
      Object.keys(this.depositTypes).forEach((item) => {
        let obj = this.depositTypes[item]
        obj.list.forEach((payWayItem) => {
          payWayItem = payWayItem.payWayItem
          // 是否为第三方支付存款
          let isThirdPartyPay = !('depositName' in payWayItem)
          this.$set(payWayItem, 'isThirdPartyPay', isThirdPartyPay)
          // 默认第一个支付通道 && 存款值范围
          if (isThirdPartyPay) { //第三方存款
            payWayItem.payWayList = this._calcPayWay(payWayItem.payWayType)
            payWayItem.currentPayWay = payWayItem.payWayList[0]
          } else { //秒存
            payWayItem.currentPayWay = payWayItem.payWayList[0]
            //设置确认存款信息页面显示状态
            this.$set(payWayItem, 'state', false)
            this.$set(payWayItem, 'depositInfo', {})
          }

          // 存款值范围
          if (payWayItem.currentPayWay) {
            payWayItem.range = {
              min: payWayItem.currentPayWay.minPay,
              max: payWayItem.currentPayWay.maxPay,
            }
          }
        })
        // 隐藏关闭的通道
        obj.list = obj.list.filter((payWayItem) => {
          payWayItem = payWayItem.payWayItem
          let res = payWayS.includes(payWayItem.payWayType) || !payWayItem.isThirdPartyPay
          if (res) {//如果开启则return出去展示
            return res
          }
        })
        //展示第一个选项
        if (obj.list[0]) {
          obj.currentType = obj.list[0].payWayType
        }
      })


    },
    // 获取对应支付通道
    _calcPayWay(payWay) {
      return this.payWay.filter((item) => {
        return item.payWay === payWay
      })
    },
    // 判断两个数组是否包含相同成员
    _checkArr(arr1, arr2) {
      let rs = false
      arr1.forEach((item) => {
        arr2.forEach((item2) => {
          if (item === item2) {
            rs = true
            return rs
          }
        })
      })
      return rs
    },
  },
  watch: {
    //处理app跳转web存款
    initLoginState(val) { //等待登录状态初始化成功后 获取支付通道
      if (val && window.location.href.includes('isFromApp') && this.isLogin) {
        this._getPayWay()
      }
    }
  },
}

//存款页面逻辑
export const depositPageModule = {
  mixins: [copy],
  data() {
    return {
      config,
    }
  },
  props: {
    obj: {
      type: Object,
      default: {}
    }
  },
  computed: {
    // 处理固定金额
    commonAccountList() {
      let res = [50, 100, 200, 300, 500, 1000, 2000, 3000, 5000, 10000, null]
      //微信快捷
      if (this.obj.payWayType === config.PAYWAY.wxKJ) {
        res = [20, 30, ...res]
      }
      //微信扫码某个单一通道
      if (this.obj.payWayType === config.PAYWAY.wxSM) {
        let payWayList = this.obj.payWayList
        if (payWayList.length) {
          let idx = payWayList.findIndex((item) => {
            return item.payCenterUrl.includes('sss')
          })
          if (idx === this.obj.payWayCurrentIdx) {
            res = [50, 60, 70, 80, 1000, 2000, 3000, 5000, 10000, null]
          }
        }
      }
      // ...
      return res
    },
    //是否显示存款金额框
    isShowInput() {
      let currentItem = this.obj
      let payWayList = currentItem.payWayList
      //隱藏指定通道payPlatform
      switch (currentItem.payWayType) {
        // 微信扫码
        case config.PAYWAY.wxSM:
          return getResult(['yfwxsm2'])
        // 支付宝扫码
        case config.PAYWAY.zfbSM:
          return getResult(['yfzfbsm'])
        //...
      }

      function getResult(noNeedPayWayList) {
        if (payWayList.length) {
          let idxs = noNeedPayWayList.map((item) => {
            return payWayList.findIndex((obj) => {
              return obj.payPlatform === item
            })
          })
          return !idxs.includes(currentItem.payWayCurrentIdx)
        }
      }
    },
    ...mapGetters(['userInfo', 'isLogin'])
  },
  created() {
  },
  methods: {
    // 第三方支付存款
    commonDeposit(currentPayWay) {

      let reqData = {}
      let depositMoney = this.obj.depositMoney
      reqData = {
        platformId: currentPayWay.id,
        orderAmount: depositMoney,
        loginName: this.userInfo.loginname,
        payUrl: currentPayWay.payCenterUrl,
        usetype: isMobile ? 1 : 2,
        // bank_code: "ZF_WX",
        bankCode: '',
        bankcard: '',
        bankname: '',
        phoneNumber: '',

      }
      //是否需要支付银行
      if (this.obj.currentPayBank) {
        reqData.bankCode = this.obj.currentPayBank.bankCode
      }

      if (!this.isLogin) {
        this.$message({
          type: 'warning',
          message: `请先登录账号`
        })
        return
      }
      if (!validtorReg.intNumReg.test(depositMoney)) {
        this.$message({
          type: 'warning',
          message: `请输入整数金额`
        })
        return
      }
      if (depositMoney < currentPayWay.minPay || depositMoney > currentPayWay.maxPay) {
        this.$message({
          type: 'warning',
          message: `请输入${currentPayWay.minPay}至${currentPayWay.maxPay}之间的金额`
        })
        return
      }

      // console.log(reqData)


      //其他第三方
      let tempWindow = ''
      if (!isMobile) {
        tempWindow = window.open(`${this.baseUrl}html/loading.html`)
      }
      commonDeposit(reqData).then((res) => {
        if (this.ERR_OK === res.code) {
          //type 1.跳第三方页面 url 2. 二维码 data
          let url = res.data.url
          let data = res.data.data
          let type = res.data.type
          if (url) {//跳第三方页面

            if (type === '9') {// 直接页面打开
              if (isMobile) {
                window.location.href = url
              } else {
                tempWindow.location = url
              }
            } else {//表单提交
              if (isMobile) {
                window.location.href = `${this.baseUrl}html/thirdPay.html?query=${JSON.stringify(res.data)}`
              } else {
                tempWindow.location = `${this.baseUrl}html/thirdPay.html?query=${JSON.stringify(res.data)}`
              }
            }
          } else if (data) {//生成二维码
            if (isMobile) {
              window.location.href = `${this.baseUrl}html/pay-code.html?query=${data}`
            } else {
              tempWindow.location = `${this.baseUrl}html/pay-code.html?query=${data}`
            }
          } else {
            if (!isMobile) {
              tempWindow.close()
            }
            this.$msgbox({
              type: 'warning',
              title: '温馨提示',
              message: '跳转第三方失败'
            }).catch(e => e)
          }
          //清空存款金额
          this._restDepositData()
        } else {
          if (!isMobile) {
            tempWindow.close()
          }
          this.$msgbox({
            type: 'warning',
            title: '温馨提示',
            message: res.message
          }).catch(e => e)

        }
      })
    },
    // 秒存
    secondsDeposit(currentPayWay, {repeat, deleteLastOneOrder}) {//秒存
      let banktype = currentPayWay.value
      let uaccountname = this.obj.depositName
      let amount = this.obj.depositMoney
      let ubankname = '' //超级转账 -- 银行名
      let force = null //是否作废上一笔订单
      let ubankno = ''//未知
      let depositId = ''//重新获取新的收款账户

      let reqData = {
        banktype,
        uaccountname,
        amount,
        ubankname,
        force,
        ubankno,
        depositId
      }

      //超级转账添加银行名称
      if (banktype === 7) {
        if (this.obj.payWayType === config.PAYWAY.phoneWYPay) {
          ubankname = 'BANK_ICBC'
        }
        if (this.obj.payWayType === config.PAYWAY.zfbTransformPay) {
          ubankname = 'ZFB_ABC'
        }
        if (this.obj.payWayType === config.PAYWAY.wxzzPay) {
          ubankname = 'WX_CCB'
        }
        reqData.ubankname = ubankname
      }

      //作废上一笔订单
      if (deleteLastOneOrder) {
        reqData.force = true
      }

      //重新获取新的收款账户
      if (repeat) {
        reqData.force = true
        reqData.depositId = this.obj.depositInfo.depositId
      }

      if (!this.isLogin) {
        this.$message({
          type: 'warning',
          message: `请先登录账号`
        })
        return
      }

      if (!validtorReg.chineseReg.test(uaccountname)) {
        this.$message({
          type: 'warning',
          message: '请输入真实姓名'
        })
        return
      }

      if (!validtorReg.intNumReg.test(amount)) {
        this.$message({
          type: 'warning',
          message: '请输入整数金额'
        })
        return
      }

      if (amount < currentPayWay.minPay || amount > currentPayWay.maxPay) {
        this.$message({
          type: 'warning',
          message: `请输入${currentPayWay.minPay}至${currentPayWay.maxPay}之间的金额`
        })
        return
      }

      // 是否需要获取小数点
      if (banktype === 66) {
        getWxZzQuota({amount}).then((res) => {
          if (this.ERR_OK === res.code) {
            reqData.amount = res.data
          } else {
            this.$message({
              type: 'warning',
              message: res.message
            })
          }
        })
      }

      console.log(reqData)

      getNewdeposit(reqData).then((res) => {
        if (this.ERR_OK === res.code) {
          if (!res.data.massage) {//无障碍直接存款
            // 打开确认信息页面
            this._openDepositInfo(res.data, banktype, repeat)
          } else {
            if (res.data.force) {//上一笔订单未支付
              //弹出确认框...
              this.$msgbox({
                title: '温馨提示',
                confirmButtonText: '作废上笔订单，生成新订单',
                cancelButtonText: '取消',
                showCancelButton: true,
                type: 'warning',
                message: '您上一笔订单未支付，可点击作废订单，系统将生成新的存款信息，按存款信息存款即可到账。',
              }).then((action) => {
                if (action === 'confirm') {
                  this.secondsDeposit(currentPayWay, {deleteLastOneOrder: true})
                }
              }).catch(e => e)
            } else { //存款银行关闭
              this.$message({
                type: 'warning',
                message: res.data.massage
              })
            }
          }
        } else {
          this.$message({
            type: 'warning',
            message: '系统故障'
          })
        }
      })

    },
    // 重新获取新的的收款账户
    reSecondsDeposit(currentPayWay, repeat) {
      this.$msgbox({
        title: '温馨提示',
        confirmButtonText: '换卡',
        cancelButtonText: '取消',
        showCancelButton: true,
        type: 'warning',
        message: '此操作将作废当前订单，页面会获取新的银行卡，请重新存款。',
      }).then((action) => {
        if (action === 'confirm') {
          this.secondsDeposit(currentPayWay, {repeat})
        }
      }).catch(e => e)
    },
    // 关闭确认存款页面
    closeConfirmPage() {
      // 清空存款姓名
      this.obj.depositName = ''
      //清空存款金额
      this._restDepositData()
      // 关闭确认存款页面
      this.obj.state = false
    },
    // 关闭带小数点限额提示页面
    closeConfirmQuotaPage() {
      if (this.obj.agree && this.obj.reAgree) {
        this.obj.stateSub = false
      } else {
        this.$message({
          type: 'warning',
          message: '请您勾选确认须知！'
        })
      }
    },
    // 金额切换
    amountSelect(idx, depositMoney) {
      this.obj.accountCurrentIdx = idx
      this.obj.depositMoney = depositMoney
    },
    amountChange(amount) {
      this.obj.depositMoney = amount
    },
    // 支付通道切换
    payWaySelect(idx, item) {
      this.obj.payWayCurrentIdx = idx
      this.obj.currentPayWay = item
      this.obj.range = {
        min: item.minPay,
        max: item.maxPay
      }
      // 在线支付
      if (this.obj.payWayType === config.PAYWAY.online) {
        let payTypeArr = item.payCenterUrl.split('/')
        let payType = payTypeArr[1] + payTypeArr[2]
        this.$emit('getPayBankList', payType)
      }

    },
    // 支付银行切换
    payBankSelect(idx, item) {
      this.obj.payBankCurrentIdx = idx
      this.obj.currentPayBank = item
    },
    // 计算优惠及手续费
    _calcActualAmount(discount, account) {
      //fee 为手续费
      let fee = this.obj.currentPayWay.fee
      if (fee) {
        account = Number(account) || 0
        let result = account * (1 - fee / 100)
        return Number(result.toFixed(2))
      } else {
        account = Number(account) || 0
        discount = Number(discount)
        let prom = account * discount > 500 ? 500 : account * discount
        return Number((account + prom).toFixed(2))
      }
    },
    // 打开存款确认页
    _openDepositInfo(data, _bankType, repeat) {
      this.obj.depositInfo = data
      //展示带小数点限额提示页面 && 不是在换卡
      if ((this.obj.depositInfo.amount != this.obj.depositMoney) && !repeat) {
        this.$set(this.obj, 'stateSub', true)
        this.$set(this.obj, 'agree', false)
        this.$set(this.obj, 'reAgree', false)
      }
      //展示页面
      this.obj.state = true

    },
    //清空存款金额
    _restDepositData() {
      this.obj.accountCurrentIdx = -1
      this.$refs.accountWrapper.clearData()
    },
  },
  watch: {},
}

// 提款模块
export const withdrawalModule = {
  mixins: [withdrawal, getGameMoney, commonMaskPageModule],
  data() {
    return {
      tabTitleList: [
        {
          text: '银行卡提款'
        },
      ],
      currentIdx: 0,
      //主账户余额
      balance: 0,
      //银行卡提款
      withdrawalData: {
        password: '',
        bank: '',
        accountNo: '',
        bankAddress: '',
        amount: '',
        agree: true,
        //公共部分
        bankCardName: '',
        tkType: '',
      },
      bankList: [],//已绑定的银行卡
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    formatStr,
    //标题选择
    selectItem(idx) {
      this.currentIdx = idx
    },
    // PC去绑定银行卡
    goToBindBank() {
      this.$router.push('/user/account-settings?query=bindBankCard')
    },
    // 绑定银行卡
    bindBankCard() {
      this.isShowCommonMaskPage = true
    },

    //银行卡提款
    withdrawSubmit() {
      let {password, bank, amount, agree} = this.withdrawalData
      if (!password) {
        this.$message({
          type: 'warning',
          message: '请输入密码'
        })
        return
      }

      if (!bank) {
        this.$message({
          type: 'warning',
          message: '请选择提款银行'
        })
        return
      }

      if (!validtorReg.intNumReg.test(amount)) {
        this.$message({
          type: 'warning',
          message: '请输入整数金额'
        })
        return
      }

      if (amount < 100) {
        this.$message({
          type: 'warning',
          message: '提款金额最低为100元'
        })
        return
      }

      if (!agree) {
        this.$message({
          type: 'warning',
          message: '请勾选提款须知'
        })
        return
      }

      let temp = `
                  <div style="text-align: left">
                    <p>账户姓名：<span class="red">${this.userInfo.accountName}</span></p>
                    <p>银行名称：<span class="red">${this.withdrawalData.bank}</span></p>
                    <p>银行账号：<span class="red">${formatStr(this.withdrawalData.accountNo, 4, 4, 6)}</span></p>
                    <p>金额：<span class="red">${this.withdrawalData.amount} 元</span></p>
                    <p class="red">温馨提示：如您的注册姓名与您的收款账户姓名不一致,将导致提款失败!请您联系在线客服!</p>
                  </div>
                  `
      this.$msgbox({
        title: '收款人资料',
        message: temp,
        confirmButtonText: '提交',
        dangerouslyUseHTMLString: true
      }).then((action) => {
        if (action === 'confirm') {
          //取款提交
          withdrawTwo(this.withdrawalData).then((res) => {
            if (this.ERR_OK === res.code) {
              this.$message({
                type: 'info',
                message: res.data
              })
              //清空信息
              this.withdrawalData = {
                password: '',
                bank: '',
                accountNo: '',
                bankAddress: '',
                amount: '',
                agree: true,
                //公共部分
                bankCardName: '',
                tkType: '',
              }

            } else {
              this.$message({
                type: 'warning',
                message: res.message
              })
            }
          })
        }
      }).catch(e => e)

    },
  },
  watch: {},
}

// 绑定银行卡
export const bindBankCardModule = {
  data() {
    return {
      bankCard: {
        bankno: '',
        bankname: '',
        password: '',
        xinMing: '',
        bankaddress: 'none'
      },
      inputType: 'text',
      isShowCommonMaskPage: false,
      maskPageHeadData: {
        title: '绑定银行卡',
        leftIcon: 'arrowr',
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created() {
    this.closeMaskPage()
    this.bankCard.xinMing = this.userInfo.accountName
  },
  methods: {
    // 绑定银行卡
    mainbandingBankno() {
      let {bankno, bankname, password, xinMing} = this.bankCard
      if (!validtorReg.bankReg.test(bankno)) {
        this.$message({
          type: 'warning',
          message: '卡/折号格式输入有误'
        })
        return
      }

      if (!bankname) {
        this.$message({
          type: 'warning',
          message: '银行账户不能为空'
        })
        return
      }

      if (!password) {
        this.$message({
          type: 'warning',
          message: '请输入密码'
        })
        return
      }

      if (!xinMing) {
        this.$message({
          type: 'warning',
          message: '请填写真实姓名'
        })
        return
      }

      mainbandingBankno(this.bankCard).then((res) => {
        if (this.ERR_OK === res.code) {
          //多余代码啊...
          if (res.data === 'SUCCESS') {
            this.$message({
              type: 'info',
              message: '成功'
            })
            return
          }
          this.$message({
            type: 'info',
            message: res.data
          })

          //清空信息
          this.bankCard = {
            bankno: '',
            bankname: '',
            password: '',
            xinMing: this.userInfo.accountName || '',
            bankaddress: 'none'
          }

          //关闭绑卡页面
          if (isMobile) {
            this.isShowCommonMaskPage = false
            //刷新银行卡
            this._getBankInfoList()
          }

        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }

      })
    },
    //获取银行卡信息
    getBankInfo() {
      getBankInfo({bankno: this.bankCard.bankno}).then((res) => {
        if (this.ERR_OK === res.code) {
          let bankName = res.data.issuebankname
          if (bankName) {
            this.bankCard.bankname = bankName
          } else {
            this.$message({
              type: 'info',
              message: res.data
            })
          }
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },
    // 关闭绑定银行卡层
    closeMaskPage() {
      this.isShowCommonMaskPage = false
    }
  },
  watch: {
    'bankCard.password'(val) {
      if (val) {
        this.inputType = 'password'
      } else {
        this.inputType = 'text'
      }
    },
    'bankCard.bankno'(val) {
      this.bankCard.bankno = val.replace(/[^\d]/, '')
    },
  }
}

// 户内转账模块
export const transformModule = {
  data() {
    return {
      config,
      transformIn: 'self',//来源账户
      transformOut: 'self',//目标账户
      transformInBalance: 0,
      transformOutBalance: 0,
      amount: ''
    }
  },
  computed: {
    transforOutAccountList() {
      let res = []
      res = config.accountList.filter((item) => {
        return !(item.value === 'qqdk' || item.value === 'qd')
      })
      if (this.transformIn === 'qqdk' || this.transformIn === 'qd') {
        res = [
          {
            value: 'newpt',
            text: 'PT账户'
          },
          {
            value: 'ptasia',
            text: 'PT国际版账户'
          },
          {
            value: 'slot',
            text: '老虎机钱包账户'
          },
          {
            value: 'cq9',
            text: 'CQ9账户'
          },
          {
            value: 'pg',
            text: 'PG账户'
          },
        ]
        res[0] && (this.transformOut = res[0].value)
      }
      return res
    }
  },
  mounted() {
    this._getGameMoney(1) //来源账户
    this._getGameMoney(2) //目标账户
  },
  methods: {
    //一键回归
    oneKeyGameMoney() {
      oneKeyGameMoney().then((res) => {
        if (this.ERR_OK === res.code) {
          let arr = res.data.split('\n')
          // 去重
          arr = Array.from(new Set(arr))
          let temp = ''
          arr.forEach((item) => {
            if (item) {
              temp += `<p style="text-align: left">${item}</p>`
            }
          })
          this.$msgbox({
            type: 'info',
            title: '温馨提示',
            message: temp || '成功',
            center: true,
            dangerouslyUseHTMLString: true
          }).catch(e => e)
          this._getGameMoney(1) //来源账户
          this._getGameMoney(2) //目标账户
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },
    // 转账
    updateGameMoney() {
      if (this.transformIn === this.transformOut) {
        this.$message({
          type: 'warning',
          message: '相同账户之间无法转账！'
        })
        return
      }

      if (!this.amount) {
        this.$message({
          type: 'warning',
          message: '请输入转账金额！'
        })
        return
      }

      updateGameMoney({
        transferGameOut: this.transformIn,
        transferGameIn: this.transformOut,
        transferGameMoney: this.amount
      }).then((res) => {
        if (this.ERR_OK === res.code) {
          this.$message({
            type: 'info',
            message: res.data
          })
          this.amount = ''
          this._getGameMoney(1) //来源账户
          this._getGameMoney(2) //目标账户
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },
    _getGameMoney(mode) {
      let gameCode = mode === 1 ? this.transformIn : this.transformOut
      getGameMoneyApiFun({gameCode}).then((res) => {
        if (this.ERR_OK === res.code) {
          if (mode === 1) {
            this.transformInBalance = res.data
          } else {
            this.transformOutBalance = res.data
          }
        }
      })
    }
  },
  watch: {
    transformOut() {
      this._getGameMoney(2) //目标账户
    }
  }

}

// 红包转账转账模块
export const redPacketTransformModule = {
  data() {
    return {
      transformIn: 'self',//来源账户
      transformOut: '',//目标账户
      transformInBalance: 0,
      transformOutBalance: 0,
      transformInAccountList: [
        {
          text: '尊宝账户',
          value: 'self'
        },
        {
          text: '红包账户',
          value: 'redrain'
        }
      ],//来源账户列表
      transformOutAccountList: [
        {
          text: '请选择目标账户',
          value: ''
        },
        {
          text: '红包账户',
          value: 'redrain'
        }
      ],//目标账户列表
      amount: '',

      //转账给好友
      friendTransformAmount: '',
      friendAccount: ''
    }
  },
  created() {
    this._getGameMoney(1) //来源账户
    this._getGameMoney(2) //目标账户
  },
  methods: {
    // 红包转账
    transformMoney() {
      if (!this.transformIn) {
        this.$message({
          type: 'warning',
          message: '请选择来源账户'
        })
        return
      }

      if (!this.transformOut) {
        this.$message({
          type: 'warning',
          message: '请选择目标账户'
        })
        return
      }

      if (!this.amount) {
        this.$message({
          type: 'warning',
          message: '请输入转账金额'
        })
        return
      }

      if (this.transformIn === 'self') {
        // 主账户转入红包账户
        updateGameMoney({
          transferGameOut: this.transformIn,//来源账户
          transferGameIn: this.transformOut,//目标账户
          transferGameMoney: this.amount
        }).then((res) => {
          if (this.ERR_OK === res.code) {
            this.$message({
              type: 'info',
              message: res.data
            })
            //刷新账户
            this._getGameMoney(1) //来源账户
            this._getGameMoney(2) //目标账户
          } else {
            this.$message({
              type: 'warning',
              message: res.message
            })
          }
        })
      } else if (this.transformIn === 'redrain') {
        // 红包账户转入游戏账户
        transferInforRedRain({
          // transformIn: this.transformIn,
          // transformOut: this.transformOut,//目标账户
          signType: this.transformOut,//目标账户
          redRainRemit: this.amount
        }).then((res) => {
          if (this.ERR_OK === res.code) {
            this.$message({
              type: 'info',
              message: res.data || '成功'
            })
            //刷新账户
            this._getGameMoney(1) //来源账户
            this._getGameMoney(2) //目标账户
          } else {
            this.$message({
              type: 'warning',
              message: res.message
            })
          }
        })
      }
    },

    //好友转账
    transferInforRedRaintoUser() {
      if (!this.friendAccount) {
        this.$message({
          type: 'warning',
          message: '请输入好友账户'
        })
        return
      }
      if (!this.friendTransformAmount) {
        this.$message({
          type: 'warning',
          message: '请输入转账金额'
        })
        return
      }
      transferInforRedRaintoUser({
        loginName: this.friendAccount,
        redRainRemit: this.friendTransformAmount
      }).then((res) => {
        if (this.ERR_OK === res.code) {
          this.$message({
            type: 'info',
            message: res.data
          })
          //刷新账户
          this._getGameMoney(1) //来源账户
          this._getGameMoney(2) //目标账户
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },

    //账户余额查询
    _getGameMoney(mode) {
      let gameCode = mode === 1 ? this.transformIn : this.transformOut
      if (!gameCode) return
      let apiFun = null
      if (gameCode === 'redrain') {
        apiFun = queryRedRainMoney
      } else {
        apiFun = getGameMoneyApiFun
      }
      apiFun({gameCode}).then((res) => {
        if (this.ERR_OK === res.code) {
          if (mode === 1) {
            this.transformInBalance = res.data
          } else {
            this.transformOutBalance = res.data
          }
        } else {
          if (mode === 1) {
            this.transformInBalance = 0
          } else {
            this.transformOutBalance = 0
          }
        }
      })
    }
  },
  watch: {
    transformIn(val) {
      if (val === 'self') {
        this.transformOutAccountList = [
          {
            text: '请选择目标账户',
            value: ''
          },
          {
            text: '红包账户',
            value: 'redrain'
          }
        ]
      } else if (val === 'redrain') {
        this.transformOutAccountList = [
          {
            text: '请选择目标账户',
            value: ''
          },
          {
            text: 'PT账户',
            value: 'newpt'
          },
          {
            text: 'PT国际版账户',
            value: 'ptasia'
          },
          {
            text: 'PG账户',
            value: 'pg'
          },
          {
            text: 'CQ9钱包账户',
            value: 'cq9'
          },
          {
            text: '老虎机钱包账户',
            value: 'slot'
          },
        ]
      }
      this.transformOut = this.transformOutAccountList[0].value
      this.transformOutBalance = 0
    }
  },
}

//========= 自助优惠模块 ==========
// 自助存送
export const depositSendModule = {
  data() {
    return {
      platformList: [
        {
          value: '6001',
          text: 'PT存送优惠'
        },
        {
          value: '6009',
          text: '老虎机钱包优惠'
        },
        {
          value: '6008',
          text: 'AG真人存送优惠'
        },
      ],//平台列表
      allDiscountTypeList: [],//所有存送优惠类型列表
      discountTypeList: [],//存送优惠类型列表
      selectedPlatform: '',//选择平台值
      amount: '',//金额
      //giftMoney: '',//红利金额
      selectedDiscountType: '',//存送优惠值
      betMultiples: '',//流水
    }
  },
  computed: {
    giftMoney() {
      let val = this.amount
      if (!val) return
      if (this.discountTypeList.length) {
        //计算红利
        let discountObj = this.discountTypeList.find((item) => {
          return item.id === this.selectedDiscountType
        })
        return (val * (discountObj.percent) > (discountObj.limitMoney) ? (discountObj.limitMoney) : val * (discountObj.percent)).toString().$toFixed(2) || ''
      }
    }
  },
  created() {
    this._getYouHuiConfig()
  },
  methods: {
    // 提交自助存送
    getSelfYouHuiObject() {
      if (!this.selectedPlatform) {
        this.$message({
          type: 'warning',
          message: '请选择存送优惠平台'
        })
        return
      }

      if (!this.selectedDiscountType) {
        this.$message({
          type: 'warning',
          message: '请选择存送优惠类型'
        })
        return
      }

      if (!this.amount) {
        this.$message({
          type: 'warning',
          message: '请输入金额'
        })
        return
      }
      if (this.discountTypeList.length) {
        let discountObj = this.discountTypeList.find((item) => {
          return item.id === this.selectedDiscountType
        })
        getSelfYouHuiObject({
          id: discountObj.id,
          titleId: discountObj.titleId,
          platformId: this.selectedPlatform,
          remit: this.amount,

        }).then((res) => {
          if (this.ERR_OK === res.code) {
            this.amount = ''
            this.selectedPlatform = ''
            this.betMultiples = ''
            this.$message({
              type: 'info',
              message: res.data
            })
          } else {
            this.$message({
              type: 'warning',
              message: res.message
            })
          }
        })
      } else {
        this.$message({
          type: 'warning',
          message: '请选择存送优惠类型'
        })
      }

    },
    //获取所有存送优惠类型
    _getYouHuiConfig() {
      getYouHuiConfig().then((res) => {
        if (this.ERR_OK === res.code) {
          this.allDiscountTypeList = res.data
          this.platformList = this.allDiscountTypeList.map((item) => {
            return {
              value: item.platformId,
              text: item.platformName
            }
          })
          this.platformList = unique(this.platformList, 'value')
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },
  },
  watch: {
    selectedPlatform(val) {
      this.discountTypeList = this.allDiscountTypeList.filter((item) => {
        return item.platformId === val
      })
      this.discountTypeList.length && (this.selectedDiscountType = this.discountTypeList[0].id)
    },
    selectedDiscountType() {
      if (this.discountTypeList.length) {
        //计算流水
        let discountObj = this.discountTypeList.find((item) => {
          return item.id === this.selectedDiscountType
        })
        this.betMultiples = discountObj.betMultiples
      }
    },
    // amount(val) {
    //   if (!val) return
    //   if (this.discountTypeList.length) {
    //     //计算红利
    //     let discountObj = this.discountTypeList.find((item) => {
    //       return item.id === this.selectedDiscountType
    //     })
    //     this.giftMoney = (val * (discountObj.percent) > (discountObj.limitMoney) ? (discountObj.limitMoney) : val * (discountObj.percent)).toString().$toFixed(2) || 0
    //   }
    // }
  },
}
// 自助返水
export const backwaterModule = {
  data() {
    return {
      isShowDialog: false,
      backwaterInfoList: {},
      //自助返水
      backwater: {
        headList: [
          {
            label: '游戏平台',
            prop: 'gameType'
          },
          {
            label: '有效投注额',
            prop: 'bet'
          },
          {
            label: '起始时间',
            prop: 'startTime'
          },
          {
            label: '截止时间',
            prop: 'endTime'
          },
          {
            label: '返水比例',
            prop: 'scale'
          },
          {
            label: '返水金额',
            prop: 'amount'
          },
        ],
        tableData: [],
        totalXimaAmount: 10,
      },
    }
  },
  computed: {},
  created() {
    this._getOnekeyData()
  },
  methods: {
    //列合并
    arraySpanMethod({row, column, rowIndex, columnIndex}) {
      if (rowIndex === (this.backwater.tableData.length - 1)) {
        return [1, 6]
      }
    },
    //一键返水
    oneKeyXimaNew() {
      oneKeyXimaNew().then((res) => {
        if (this.ERR_OK === res.code) {
          this.isShowDialog = true
          this.backwaterInfoList = res.data
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },
    // 数据查询
    _getOnekeyData() {
      getOnekeyData().then((res) => {
        if (this.ERR_OK === res.code) {
          let data = res.data
          if (!(data instanceof Array)) {
            data = JSON.parse(data) || [{}]
          }
          this.backwater.totalXimaAmount = data[0].totalXimaAmount
          this._trimData(data[0].tiggerAndEA)
        }
      })
    },
    _trimData(data) {
      let result = []
      for (let key in data) {
        let obj = {}
        let item = data[key]
        obj.gameType = key
        obj.bet = item.validAmount
        obj.startTime = item.startTimeStr
        obj.endTime = item.endTimeStr
        obj.scale = item.rate
        obj.amount = item.ximaAmount
        result.push(obj)
      }
      //合计
      result.push({
        'gameType': '返水总金额约：' + this.backwater.totalXimaAmount
      })
      this.backwater.tableData = result
    }
  },
}
// 自助晋级
export const promotedModule = {
  data() {
    return {
      headList: [
        {
          label: '序号',
          prop: 'order'
        },
        {
          label: '游戏平台',
          prop: 'platform'
        },
        {
          label: '投注额',
          prop: 'bet'
        }
      ],
      tableData: [],
    }
  },
  computed: {},
  created() {
    this._queryBetOfPlatform()
  },
  methods: {
    //去查看晋级标准
    watchPromtedRule() {
      this.$router.push('/activity/vip')
    },
    // 检查升级
    checkUpgrade() {
      this.$msgbox({
        title: '温馨提示',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        message: '您若按下确定检测后，若符合将自动晋级成当前最高等级！请审慎考虑'
      }).then((action) => {
        if (action === 'confirm') {
          checkUpgrade({type: 'month'}).then((res) => {
            if (this.ERR_OK === res.code) {
              this.$message({
                type: 'info',
                message: res.data
              })
            } else {
              this.$message({
                type: 'warning',
                message: res.message
              })
            }
          })
        }
      })

    },
    //本月投注额
    _queryBetOfPlatform() {
      queryBetOfPlatform({type: 'month'}).then((res) => {
        if (this.ERR_OK === res.code) {
          //拼表格数据
          let result = res.data
          result = result.map((item, idx) => {
            item.order = idx + 1
            return item
          })
          this.tableData = result
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    }
  },
}
// 救援金
export const rescueMoneyModule = {
  data() {
    return {
      config,
      headList: [
        {
          label: '编号',
          prop: 'pno'
        },
        {
          label: '金额',
          prop: 'promo'
        },
        {
          label: '状态',
          prop: 'status'
        },
        {
          label: '发放时间',
          prop: 'tempCreateTime'
        },
        {
          label: '备注',
          prop: 'remark'
        },

      ],
      apiFun: queryPTLosePromoReccords,
      pagination: {
        pageIndex: 1,
        size: 10,
        pageContents: [],
        totalRecords: 0,
      },
      isShowGetLosePromoDialog: false,
      platform: 'pttiger',
      options: [
        {
          text: 'PT老虎机',
          value: 'pttiger'
        },
        {
          text: '老虎机钱包帐户',
          value: 'slot'
        },
        {
          text: 'PG钱包帐户',
          value: 'pg'
        },
        {
          text: 'CQ9钱包帐户',
          value: 'cq9'
        },
      ],
      jobPno: '',
    }
  },
  computed: {},
  created() {
  },
  methods: {
    //取消救援金
    cancelLosePromo(pno) {
      this.$msgbox({
        title: '温馨提示',
        message: '是否确定取消该笔返赠？',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showCancelButton: true
      }).then((action) => {
        if (action === 'confirm') {
          this.jobPno = pno
          optLosePromo({
            jobPno: this.jobPno,
            proposalFlag: -1,
            platform: ''
          }).then((res) => {
            if (this.ERR_OK === res.code) {
              this.$message({
                type: 'info',
                message: res.data
              })
            } else {
              this.$message({
                type: 'warning',
                message: res.message
              })
            }
          })
        }
      })

    },
    //领取救援金
    optLosePromo() {
      optLosePromo({
        jobPno: this.jobPno,
        proposalFlag: 2,
        platform: this.platform
      }).then((res) => {
        if (this.ERR_OK === res.code) {
          this.$message({
            type: 'info',
            message: res.data
          })
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },
    // 打开领取救援金弹框
    openGetLosePromoDialog(pno) {
      this.jobPno = pno
      this.openDialog('isShowGetLosePromoDialog')
    },
    closeDialog(attr) {
      this[attr] = false
    },
    openDialog(attr) {
      this[attr] = true
    },
  },
}
// 红包优惠券
export const redCouponModule = {
  data() {
    return {
      platformList: [
        {
          text: 'PT账户',
          value: 'pt'
        },
        {
          text: 'PT国际版账户',
          value: 'ptasia'
        },
        {
          text: 'CQ9账户',
          value: 'cq9'
        },
        {
          text: 'PG账户',
          value: 'pg'
        },
        {
          text: '老虎机钱包账户',
          value: 'slot'
        },
      ],
      redCoupon: {
        couponType: '',
        couponCode: ''
      }
    }
  },
  methods: {
    //红包优惠券
    transferInforRedCoupon() {
      let {couponType, couponCode} = this.redCoupon
      if (!couponType) {
        this.$message({
          type: 'warning',
          message: '请选择账户'
        })
        return
      }
      if (!couponCode) {
        this.$message({
          type: 'warning',
          message: '请输入优惠券代码'
        })
        return
      }
      transferInforRedCoupon(this.redCoupon).then((res) => {
        if (this.ERR_OK === res.code) {
          this.$message({
            type: 'info',
            message: res.data
          })
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },
  }
}
// 存送优惠券
export const couponModule = {
  data() {
    return {
      platformList: [
        {
          text: 'PT账户',
          value: 'pt'
        },
        {
          text: 'PT国际版账户',
          value: 'ptasia'
        },
        {
          text: 'CQ9账户',
          value: 'cq9'
        },
        {
          text: 'PG账户',
          value: 'pg'
        },
        {
          text: '老虎机钱包账户',
          value: 'slot'
        },
      ],
      coupon: {
        couponType: '',
        couponRemit: '',
        couponCode: '',
      },
    }
  },
  methods: {
    //存送优惠券
    transferInforCoupon() {
      let {couponType, couponRemit, couponCode} = this.coupon
      if (!couponType) {
        this.$message({
          type: 'warning',
          message: '请选择账户'
        })
        return
      }
      if (!couponRemit) {
        this.$message({
          type: 'warning',
          message: '请输入转账金额'
        })
        return
      }
      if (!couponCode) {
        this.$message({
          type: 'warning',
          message: '请输入优惠券代码'
        })
        return
      }
      transferInforCoupon(this.coupon).then((res) => {
        if (this.ERR_OK === res.code) {
          this.$message({
            type: 'info',
            message: res.data
          })
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },
  }
}
// 免费筹码
export const freeChipModule = {
  data() {
    return {
      amount: 0
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created() {
    this._checkActivityInfo()
  },
  methods: {
    //领取筹码
    applyActivity() {
      applyActivity({
        titleId: 'vipmonthfree',
        platform: '',
        entrance: 'pc',
      }).then((res) => {
        if (this.ERR_OK === res.code) {
          this.$message({
            type: 'info',
            message: res.data
          })
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },
    //查询筹码
    _checkActivityInfo() {
      checkActivityInfo({titleId: 'vipmonthfree'}).then((res) => {
        if (this.ERR_OK === res.code) {
          this.amount = res.data.amount
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    }
  },
}
// 生日礼金
export const birthdayModule = {
  data() {
    return {
      amount: 0,
      id: '',
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created() {
    this._checkBirthday()
  },
  methods: {
    birthdayActivityInfo() {
      birthdayActivityInfo({id: this.id}).then((res) => {
        if (this.ERR_OK === res.code) {
          this.$message({
            type: 'info',
            message: res.data
          })
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },
    _checkBirthday() {
      checkBirthday().then((res) => {
        if (this.ERR_OK === res.code) {
          if (res.data.id) {
            this.id = res.data.id
            this.amount = res.data.amount
          } else {
            this.$message({
              type: 'info',
              message: res.data
            })
          }
        }
      })
    }
  },
}
// ========== 自助优惠模块end =============

// 签到
export const signLotteryModule = {
  data() {
    return {
      tabTitleList: [
        {
          text: '签到中心'
        },
        {
          text: '签到说明'
        },
      ],
      currentIdx: 0,
      headList: [
        {
          label: '等级',
          prop: 'level'
        },
        {
          label: '每日签到',
          prop: 'sign'
        },
        {
          label: '激活要求',
          prop: 'condition'
        },
        {
          label: '签到金最高提款',
          prop: 'maxMoney'
        }
      ],
      tableData: [
        {
          level: '普通会员',
          sign: '4元',
          condition: '240元',
          maxMoney: '588元',
        },
        {
          level: '青铜VIP',
          sign: '10元',
          condition: '600元',
          maxMoney: '3888元',
        },
        {
          level: '白银VIP',
          sign: '12元',
          condition: '700元',
          maxMoney: '5888元',
        },
        {
          level: '黄金VIP',
          sign: '14元',
          condition: '800元',
          maxMoney: '8888元',
        },
        {
          level: '白金VIP',
          sign: '16元',
          condition: '900元',
          maxMoney: '12888元',
        },
        {
          level: '钻石VIP',
          sign: '18元',
          condition: '1000元',
          maxMoney: '21888元',
        },
        {
          level: '王者VIP',
          sign: '20元',
          condition: '1200元',
          maxMoney: '38888元',
        },
      ],
      arrDate: [],
      isSignToday: false,
      getSignAmount: 0
    }
  },
  computed: {
    ...mapGetters(['signAmount'])
  },
  created() {
    this._findSignrecord()
  },
  methods: {
    selectItem(idx) {
      this.currentIdx = idx
    },
    doSignRecord() {
      doSignRecord().then((res) => {
        if (this.ERR_OK === res.code) {
          this.$message({
            type: 'info',
            message: res.data
          })
          this._findSignrecord()
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },
    _findSignrecord() {
      findSignrecord({
        _: Math.random().toFixed(5)
      }).then((res) => {
        if (this.ERR_OK === res.code) {
          let today = new Date().getDate()
          this.arrDate = res.data.map((item) => {
            let day = new Date(item.timeStr).getDate()
            if (day === today) {//今日是否已签到
              this.isSignToday = true
              this.getSignAmount = item.amount
            }
            return day
          })
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    }
  },
  watch: {
    signAmount() {
      this._findSignrecord()
    }
  },
}
// 账户设置 基本资料&修改密码
export const accountSettingsModule = {
  mixins: [logOut, checkLogin],
  data() {
    return {
      tabTitleList: [
        {
          text: '基本资料'
        },
        {
          text: '修改密码'
        },
        {
          text: '绑定银行卡'
        },
      ],
      currentIdx: 0,
      //基本资料
      baseInfo: {
        qq: '',
        microchannel: '',
        birthday: '',
        aliasName: ''
      },
      //修改密码
      pwd: {
        oldPwd: '',
        newPwd: '',
        rePwd: ''
      },
    }
  },
  created() {
    //获取用户信息接口执行后
    this.baseInfo.qq = this.userInfo.qq
    this.baseInfo.microchannel = this.userInfo.microchannel
    this.baseInfo.aliasName = this.userInfo.aliasName
    this.baseInfo.birthday = this.userInfo.birthday
    this.baseInfoOld = Object.assign({}, this.baseInfo)
  },
  // 每次激活重新调用
  activated() {
    if (this.$route.query.query === 'bindBankCard') {
      this.currentIdx = 2
    }
  },
  methods: {
    //修改密码
    changePwd() {
      let {oldPwd, newPwd, rePwd} = this.pwd
      if (!oldPwd) {
        this.$message({
          type: 'warning',
          message: '请输入原密码',
        })
        return
      }
      if (!newPwd) {
        this.$message({
          type: 'warning',
          message: '请输入新密码',
        })
        return
      }
      if (newPwd !== rePwd) {
        this.$message({
          type: 'warning',
          message: '两次密码输入请保持一致',
        })
        return
      }
      changePwd(this.pwd).then((res) => {
        if (this.ERR_OK === res.code) {
          this.$message({
            type: 'info',
            message: '修改成功',
            onClose: this.logOut
          })

        } else {
          this.$message({
            type: 'warning',
            message: res.message,
          })
        }
      })
    },
    //修改信息
    changeInfo() {
      let {qq, microchannel, birthday, aliasName} = this.baseInfo
      if (!birthday) {
        this.$message({
          type: 'warning',
          message: '请输入生日信息'
        })
        return
      }
      if (!qq) {
        this.$message({
          type: 'warning',
          message: '请输入qq号'
        })
        return
      }
      // if (qq.includes('***')) {
      //   this.$message({
      //     type: 'warning',
      //     message: '请输入正确的QQ号替换 “*” 符号'
      //   })
      //   return
      // }
      if (!aliasName) {
        this.$message({
          type: 'warning',
          message: '请输入用户昵称'
        })
        return
      }
      // if (aliasName.includes('***')) {
      //   this.$message({
      //     type: 'warning',
      //     message: '请输入正确的用户昵称替换 “*” 符号'
      //   })
      //   return
      // }
      if (!microchannel) {
        this.$message({
          type: 'warning',
          message: '请输入微信号'
        })
        return
      }

      // if (microchannel.includes('***')) {
      //   this.$message({
      //     type: 'warning',
      //     message: '请输入正确的微信替换 “*” 符号'
      //   })
      //   return
      // }

      let baseInfoOld = this.baseInfoOld
      if ((baseInfoOld.qq === qq) && (baseInfoOld.microchannel === microchannel) && (baseInfoOld.birthday === birthday) && (baseInfoOld.aliasName === aliasName)) {
        this.$message({
          type: 'warning',
          message: '资料没有异动'
        })
        return
      }


      //日期格式转换
      if (this.baseInfo.birthday.getTime) {
        this.baseInfo.birthday = this.baseInfo.birthday.format('yyyy-MM-dd')
      }

      changeInfo(this.baseInfo).then((res) => {
        if (this.ERR_OK === res.code) {
          this.checkLogin(this.userInfo.loginname)
          if (res.data === 'success') {
            res.data = '资料修改成功'
          }
          this.$message({
            type: 'info',
            message: res.data
          })
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },
    goTobindName() {
      this.currentIdx = 2
    },
    formatStr,
    selectItem(idx) {
      this.currentIdx = idx
    },
  },
}
// 账户清单
export const accountListModule = {
  data() {
    return {
      currentIdx: 0,
      pagination: {
        pageIndex: 1,
        size: 10,
        pageContents: [],
        totalRecords: 0,
      },
      typeList: {//账号清单
        depositRecords: 0,
        cashinRecords: 1,
        depositOrderRecord: 2,
        withdrawRecords: 3,
        transferRecords: 4,
        consRecords: 5,
        searchXima: 6,
        couponRecords: 7,
      }
    }
  },
  computed: {
    paginationData() {
      let headList = null
      let apiFun = null
      let {
        depositRecords,
        cashinRecords,
        depositOrderRecord,
        withdrawRecords,
        transferRecords,
        consRecords,
        searchXima,
        couponRecords
      } = this.typeList
      switch (this.currentIdx) {
        case depositRecords:
          headList = [
            {
              label: '序号',
              prop: 'order'
            },
            {
              label: '编号',
              prop: 'billno'
            },
            {
              label: '存款金额',
              prop: 'money'
            },
            {
              label: '存款时间',
              prop: 'tempCreateTime'
            }
          ]
          apiFun = depositRecordsApiFun
          break
        case cashinRecords:
          headList = [
            {
              label: '序号',
              prop: 'order'
            },
            {
              label: '编号',
              prop: 'pno'
            },
            {
              label: '存款金额',
              prop: 'amount'
            },
            {
              label: '存款时间',
              prop: 'tempCreateTime'
            },
            {
              label: '状态',
              prop: 'flag'
            },
            {
              label: '备注',
              prop: 'remark'
            },
          ]
          apiFun = cashinRecordsApiFun
          break
        case depositOrderRecord:
          headList = [
            {
              label: '序号',
              prop: 'order'
            },
            {
              label: '附言',
              prop: 'depositId'
            },
            {
              label: '银行',
              prop: 'bankname'
            },
            {
              label: '账号名',
              prop: 'accountname'
            },
            {
              label: '备注',
              prop: 'remark'
            },
            {
              label: '创建时间',
              prop: 'tempCreateTime'
            },
            {
              label: '状态',
              prop: 'status'
            },
          ]
          apiFun = depositOrderRecordApiFun
          break
        case withdrawRecords:
          headList = [
            {
              label: '序号',
              prop: 'order'
            },
            {
              label: '编号',
              prop: 'pno'
            },
            {
              label: '提款金额',
              prop: 'amount'
            },
            {
              label: '提款时间',
              prop: 'tempCreateTime'
            },
            {
              label: '状态',
              prop: 'flag'
            }
          ]
          apiFun = withdrawRecordsApiFun
          break
        case transferRecords:
          headList = [
            {
              label: '序号',
              prop: 'order'
            },
            {
              label: '编号',
              prop: 'id'
            },
            {
              label: '转账金额',
              prop: 'remit'
            },
            {
              label: '转账时间',
              prop: 'tempCreateTime'
            },
            {
              label: '转账类型',
              prop: 'typeName'
            }
          ]
          apiFun = transferRecordsApiFun
          break
        case consRecords:
          headList = [
            {
              label: '序号',
              prop: 'order'
            },
            {
              label: '编号',
              prop: 'pno'
            },
            {
              label: '优惠类型',
              prop: 'typeValue'
            },
            {
              label: '赠送金额',
              prop: 'amount'
            },
            {
              label: '时间',
              prop: 'tempCreateTime'
            },
            {
              label: '备注',
              prop: 'remark'
            },
          ]
          apiFun = consRecordsApiFun
          break
        case searchXima:
          headList = [
            {
              label: '序号',
              prop: 'order'
            },
            {
              label: '编号',
              prop: 'pno'
            },
            {
              label: '统计时段',
              prop: 'statisticsTimeRange'
            },
            {
              label: '有效投注额',
              prop: 'validAmount'
            },
            {
              label: '结算金额',
              prop: 'ximaAmount'
            },
            {
              label: '洗码类型',
              prop: 'ximaType'
            },
            {
              label: '洗码率',
              prop: 'rate'
            },
            {
              label: '状态',
              prop: 'ximaStatus'
            },
          ]
          apiFun = searchXimaApiFun
          break
        case couponRecords:
          headList = [
            {
              label: '编号',
              prop: 'pno'
            },
            {
              label: '类型',
              prop: 'typeValue'
            },
            {
              label: '存款金额',
              prop: 'amount'
            },
            {
              label: '赠送金额',
              prop: 'gifTamount'
            },
            // {
            //   label: '投注倍数',
            //   prop: 'betMultiples'
            // },
            {
              label: '红利代码',
              prop: 'shippingCode'
            },
            {
              label: '转账类型',
              prop: 'remark'
            },
            {
              label: '执行时间',
              prop: 'tempCreateTime'
            },
          ]
          apiFun = couponRecordsApiFun
          break
      }
      return {headList, apiFun}
    }
  },
  methods: {
    selectItem(idx) {
      this.currentIdx = idx
    },
  },
}
// 站内信
export const letterModule = {
  data() {
    return {
      tabTitleList: [
        {
          text: '收件箱'
        },
        // {
        //   text: '发件箱'
        // },
      ],
      currentIdx: 0,
      pagination: {
        pageIndex: 1,
        size: 10,
        totalRecords: 0,
        pageContents: []
      },
      isShowLetterDialog: false,
      letterDetail: {},
      sendData: {
        title: '',
        content: ''
      }
    }
  },
  computed: {},
  created() {
    this._getMessageByUser()
  },
  methods: {
    closeDialog(attr) {
      this[attr] = false
    },
    selectItem(idx) {
      this.currentIdx = idx
    },
    handleSizeChange(size) {
      this.pagination.size = size
      console.log(size)
      this._getMessageByUser()
    },
    handleCurrentChange(pageIndex) {
      this.pagination.pageIndex = pageIndex
      this._getMessageByUser()
    },
    //发信件
    saveBookDate() {
      let {title, content} = this.sendData
      if (!title) {
        this.$message({
          type: 'warning',
          message: '请填写标题'
        })
        return
      }
      if (!content) {
        this.$message({
          type: 'warning',
          message: '请填写内容'
        })
        return
      }
      saveBookDate(this.sendData).then((res) => {
        if (this.ERR_OK === res.code) {
          this.$message({
            type: 'info',
            message: res.data
          })
          this.pagination.pageIndex = 1
          this.pagination.size = 10
          this._getMessageByUser()
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },
    //信件详情
    readMsg(item) {
      readMsg({
        msgID: item.id
      }).then((res) => {
        if (this.ERR_OK === res.code) {
          this.letterDetail = res.data
          item.read = true
          this.isShowLetterDialog = true
          if (isMobile) {
            this._setHeaderTitle()
          }
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },
    //获取站内信信件
    _getMessageByUser() {
      getMessageByUser({
        pageIndex: this.pagination.pageIndex,
        size: this.pagination.size
      }).then((res) => {
        if (this.ERR_OK === res.code) {
          this.pagination.pageContents = res.data.pageContents
          this.pagination.totalRecords = res.data.totalRecords
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },
    // 手机端设置头部标题
    _setHeaderTitle() {
      this.commonPageHeadData.title = this.letterDetail.title
    }
  },
}

// 代理加盟
export const agentJoinModule = {
  data() {
    return {
      config,
      currentIdx: 0,
      menuList: [
        {
          text: '关于我们',
          icon: 'guanyuwomen'
        },
        {
          text: '代理政策',
          icon: 'zhaoshangdaili'
        },
        {
          text: '立即注册',
          icon: 'xiazai'
        },
        {
          text: '联系我们',
          icon: 'dianhua'
        }
      ],
      slides: [
        {
          src: require("@/common/image/agent/1.jpg"),
          title: "日结佣金",
          text: {
            title: '日结佣金',
            describe: '业界首创，日结佣金，助你走向巅峰'
          }
        },
        {
          src: require("@/common/image/agent/2.jpg"),
          title: "自助优惠",
          text: {
            title: '自助优惠',
            describe: '体验尊宝自助优惠的便捷'
          }
        },
        {
          src: require("@/common/image/agent/3.jpg"),
          title: "实力强大",
          text: {
            title: '实力强大',
            describe: '菲律宾拥有实体赌场 资金雄厚'
          }
        },
        {
          src: require("@/common/image/agent/4.jpg"),
          title: "秒提技术",
          text: {
            title: '秒提技术',
            describe: '尊宝秒存秒提，无需等待'
          }
        }
      ],

      tabTitleList: {
        aboutUs: [
          {
            text: '关于我们'
          },
        ],
        scheme: [
          {
            text: '代理政策'
          }
        ],
        register: [
          {
            text: '立即注册'
          }
        ],
        contact: [
          {
            text: '联系我们'
          }
        ]
      },
      currentTabTitleIdx: 0,
      //注册信息
      registerData: {
        loginName: 'a_',
        password: '',
        rePwd: '',
        accountName: '',//真实姓名
        email: '',
        phone: '',
        qq: '',
        microchannel: '',//微信
        sms: 0,//短信 0表示勾选，1未勾选
        validateCode: '',
        partner: '',//代理审核码
        agree: true, //接受协议
        referWebsite: '',//没用
      },
      validateCodeForIndex: '/1.0/validateCodeForIndex',
      question: [
        {
          q: '怎样注册代理？',
          a: '登陆代理页面即可看到“申请加盟”字样，点击即可来到注册页面，注册的时候，请仔细阅读我们的代理合作协议说明书。'
        },
        {
          q: '合营代理有任何费用吗？',
          a: '这是零投资的赚钱方式，您是无需花费任何费用开始，仅仅只需点击“立即注册”，注册后您将拥有一个独一无二的合营官网链接，然后便能开始向您的会员宣传推广而赚取佣金了。'
        },
        {
          q: '怎样赚取佣金？支付佣金是怎么样的？',
          a: '只要您注册了代理账号之后，会生成一个您独立的链接，然后您可以推广自己的链接，让其他人在您的链接注册并且游戏。然后他们产生负盈利的话，你就有佣金了。我们会按照日结累计，只要您满足佣金累计到了100以上就可以随时提款。'
        },
        {
          q: '我怎么能知道我一个月挣了多少钱？',
          a: '尊宝国际拥有强大的技术团队，所有合营人员都可以自己登陆自己的账号查看到自己下线的输赢情况（登陆账号——点击账户管理——佣金明细）。'
        },
        {
          q: '我如何知道注册的会员是不是在我的下线？',
          a: '如果您推荐的会员有注册成功，那么您直接可以在自己的后台看到他的情况。（登陆账号——点击账户管理——下线会员)。'
        },
        {
          q: '如何能保证我的佣金可以结算给我？',
          a: '尊宝国际所有的结算系统都是采用了强大技术创造的全自动结算模式。只要您下线会员有产生负盈利，那么系统会自动结算完毕，添加到合营账户中，您只需要申请提款即可。'
        },

        {
          q: '下线会员无法打开链接怎么处理？',
          a: '尊宝国际是属于菲律宾正规博弈老虎机娱乐城，国内一些具有拦截性质的浏览器会产生一些影响，建议会员使用谷歌浏览器进入，您也可以联系我们的在线客服索要备用网址。'
        },
        {
          q: '下线会员的情况我可以看到吗？',
          a: '合营人员可以在自己的合营账号看到下线会员所有的存款、提款、输赢等信息！所有的信息都在账户管理可以看到的哦！'
        },
        {
          q: '合营链接是否可以修改？',
          a: '如果您需要修改您的合营链接，那么您可以联系我们的市场部门专员，提供您的注册信息，进行修改您自己熟悉的链接哦！'
        },
        {
          q: '长时间没有登录忘记了密码，或者输入5次错误密码被冻结怎么办？',
          a: '如果忘记密码或者账号被锁定，您可以直接点击“登入”后面的“忘记密码”使用邮箱或者电话进行重置，重置成功之后账号自动恢复正常的哦!'
        },
        {
          q: '日结佣金需要达到一个什么样的条件？',
          a: '所有代理无需申请，自动日结不需要任何条件！'
        },
        {
          q: '我可以自己注册到自己的下线游戏吗？',
          a: '尊宝国际绝对禁止此类事件，具体的相关条例，请参照我们代理合作协议的责任与条款！'
        },
      ]
    }
  },
  methods: {
    changeCode() {
      this.validateCodeForIndex = this.validateCodeForIndex + `?r=${Math.random().toFixed(5)}`
    },
    registerSubmit() {

      if (!validtorReg.agentAccountReg.test(this.registerData.loginName)) {
        this.$message({
          type: 'warning',
          message: '账号以a_ 开头（a后面是下划线_），由3-15个数字或英文字母组成'
        })
        return
      }

      if (!validtorReg.passwordReg.test(this.registerData.password)) {
        this.$message({
          type: 'warning',
          message: '密码长度为6-16个字符,以及必须含有字母和数字的组合'
        })
        return
      }

      if (this.registerData.rePwd !== this.registerData.password) {
        this.$message({
          type: 'warning',
          message: '两次密码请保持一致'
        })
        return
      }

      if (!this.registerData.accountName) {
        this.$message({
          type: 'warning',
          message: '真实姓名必须与你的银行账户名称相同，否则不能出款'
        })
        return
      }

      if (!validtorReg.phoneReg.test(this.registerData.phone)) {
        this.$message({
          type: 'warning',
          message: '请输入正确有效的手机号码'
        })
        return
      }

      if (!this.registerData.qq) {
        this.$message({
          type: 'warning',
          message: '玩家注册时必须填写QQ或skype账户'
        })
        return
      }

      if (!validtorReg.emailReg.test(this.registerData.email)) {
        this.$message({
          type: 'warning',
          message: '请输入正确有效的邮箱'
        })
        return
      }

      if (!validtorReg.codeReg.test(this.registerData.validateCode)) {
        this.$message({
          type: 'warning',
          message: '请输入正确的验证码'
        })
        return
      }
      if (!this.registerData.agree) {
        this.$message({
          type: 'warning',
          message: '请勾选确认用户协议'
        })
        return
      }

      this.$confirm('请确认资料是否填写正确，如有乱填将不审核，此账号不能进行游戏，确认提交后，我们的市场专员会24小时内会联系您。, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        addAgent(this.registerData).then((res) => {
          this.changeCode()

          if (this.ERR_OK === res.code) {
            //清空信息
            this.registerData = {
              loginName: '',
              password: '',
              rePwd: '',
              accountName: '',//真实姓名
              email: '',
              phone: '',
              qq: '',
              microchannel: '',//微信
              sms: 0,//短信 0表示勾选，1未勾选
              validateCode: '',
              partner: '',//代理审核码
              agree: true, //接受协议
              referWebsite: '',//没用
            }
            this.$message({
              type: 'success',
              message: '代理账号审核中......'
            })
          } else {
            this.$message({
              type: 'warning',
              message: res.message
            })
          }
        })
      }).catch((e) => {
        console.log(e)
      })

    },
    joinUs() {
      this.currentIdx = 2
    },
    selectItem(idx) {
      this.currentIdx = idx
    },
    _bannerImage(src) {
      return {
        background: `url(${src}) center`,
        backgroundSize: 'cover'
      }
    },
  },
  watch: {
    'registerData.loginName'(val) {
      if (val.length < 2) {
        this.registerData.loginName = 'a_'
      }
    },
    currentIdx(val) {
      //防止验证码过期
      if (val === 2) {
        this.changeCode()
      }
    }
  },
}

// =============代理中心=================
export const agentCenterModule = {
  data() {
    return {
      tabTitleList: [
        {
          text: '代理中心'
        }
      ],
      currentIdx: 0,
      linkList: [],
    }
  },
  computed: {},
  created() {
    this._getAgentExpandSite()
  },
  methods: {
    _getAgentExpandSite() {
      getAgentExpandSite().then((res) => {
        if (this.ERR_OK === res.code) {
          this.linkList = res.data
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    }
  },
}

// 日结佣金
export const dayCommissionModule = {
  data() {
    return {
      config,
      tabTitleList: [
        {
          text: '日结佣金'
        }
      ],
      currentIdx: 0,
      timer: [],//时间
      headList: [
        {
          label: '代理账号',
          prop: 'agent'
        },
        {
          label: '平台',
          prop: 'platform'
        },
        {
          label: '数据日期',
          prop: 'createdate'
        },
        {
          label: '输赢额度',
          prop: 'profitall'
        },
        {
          label: '优惠额度',
          prop: 'couponfee'
        },
        {
          label: '洗码额度',
          prop: 'ximafee'
        },
        {
          label: '日佣金',
          prop: 'amount'
        },
        {
          label: '是否派发',
          prop: 'flag'
        },
        // {
        //   label: '创建时间',
        //   prop: 'tempExcuteTime'
        // },
      ],
      apiFun: searchPtCommissions,
      pagination: {
        pageIndex: 1,
        size: 10,
        pageContents: [],
        totalRecords: 10
      }
    }
  },
  computed: {},
  created() {
    //初始化日期
    this._initTimer()
  },
  methods: {
    searchData() {
      this.$refs.pagination.refresh()
    },
    _initTimer() {
      this.timer = [new Date(getMonthFirstDay().replace(/\-/g, "/")), new Date()]
    },
    selectItem(idx) {
      this.currentIdx = idx
    }
  },
}

//会员输赢
export const searchagprofitModule = {
  data() {
    return {
      config,
      timer: [],
      loginname: '',
      platform: '',
      list: [
        {
          text: 'PT',
          value: 'newpt'
        },
        {
          text: 'NT',
          value: 'nt'
        },
        {
          text: 'QT',
          value: 'qt'
        },
        {
          text: 'DT',
          value: 'dt'
        },
        {
          text: 'PNG',
          value: 'png'
        },
        {
          text: 'MG',
          value: 'mg'
        },
        {
          text: 'MG真人',
          value: 'mglive'
        },
        {
          text: 'AG',
          value: 'ag'
        },
        {
          text: 'AG捕鱼',
          value: 'aginfish'
        },
        {
          text: 'AG老虎机',
          value: 'aginslot'
        },

        {
          text: 'PTSW',
          value: 'ptsky'
        },
        {
          text: 'EBET',
          value: 'ebetapp'
        },
        {
          text: 'SBA',
          value: 'sba'
        },
        {
          text: 'CQ9',
          value: 'cq9'
        },
        {
          text: 'PG',
          value: 'pg'
        },
        {
          text: 'VR',
          value: 'vr'
        },
        {
          text: 'IM体育',
          value: 'im'
        },
        {
          text: 'bit秒赢',
          value: 'bit'
        },
        {
          text: '开元棋牌',
          value: 'kyqp'
        },
        {
          text: '泛亚电竞',
          value: 'fanya'
        },
        {
          text: 'PT国际',
          value: 'ptasia'
        },
      ],
      headList: [
        // {
        //   label: '序号',
        //   prop: 'order'
        // },
        {
          label: '会员账号',
          prop: 'loginname'
        },
        {
          label: '平台',
          prop: 'platform'
        },
        {
          label: '创建时间',
          prop: 'tempCreateTime'
        },
        {
          label: '投注总额',
          prop: 'bettotal'
        },
        {
          label: '输赢值',
          prop: 'amount'
        },
      ],
      apiFun: searchagprofit,
      pagination: {
        pageIndex: 1,
        size: 10,
        pageContents: [],
        totalRecords: 10,
      },
    }
  },
  computed: {},
  created() {
    //初始化日期
    this._initTimer()
  },
  methods: {
    searchData() {
      this.$refs.pagination.refresh()
    },
    _initTimer() {
      this.timer = [new Date(getMonthFirstDay().replace(/\-/g, "/")), new Date()]
    },
  },
}
// 会员存款
export const searchsubuserProposal = {
  data() {
    return {
      config,
      timer: [],
      loginname: '',
      proposalType: 502,
      list: [
        {
          text: '存款',
          value: 502
        },
        {
          text: '在线支付',
          value: 1000
        },
      ],
      headList: [
        // {
        //   label: '序号',
        //   prop: 'order'
        // },
        {
          label: '会员账号',
          prop: 'loginname'
        },
        {
          label: '申请时间',
          prop: 'tempCreateTime'
        },
        {
          label: '额度',
          prop: 'amount'
        },
        {
          label: '申请类型',
          prop: 'type'
        }
      ],
      apiFun: searchsubuserProposalApiFun,
      pagination: {
        pageIndex: 1,
        size: 10,
        pageContents: [],
        totalRecords: 10
      },
    }
  },
  computed: {},
  created() {
    //初始化日期
    this.timer = [new Date(getMonthFirstDay().replace(/\-/g, "/")), new Date()]

  },
  methods: {
    searchData() {
      this.$refs.pagination.refresh()
    }
  },
}
// 会员提款
export const membershipWithdraw = {
  data() {
    return {
      config,
      timer: [],
      loginname: '',
      proposalType: 503,
      headList: [
        // {
        //   label: '序号',
        //   prop: 'order'
        // },
        {
          label: '会员账号',
          prop: 'loginname'
        },
        {
          label: '提款时间',
          prop: 'tempCreateTime'
        },
        {
          label: '提款额度',
          prop: 'amount'
        },
        {
          label: '提款类型',
          prop: 'type'
        }
      ],
      apiFun: searchsubuserProposalApiFun,
      pagination: {
        pageIndex: 1,
        size: 10,
        pageContents: [],
        totalRecords: 10
      },
    }
  },
  computed: {},
  created() {
    //初始化日期
    this.timer = [new Date(getMonthFirstDay().replace(/\-/g, "/")), new Date()]
  },
  methods: {
    searchData() {
      this.$refs.pagination.refresh()
    }
  },
}
// 会员返水
export const vipBackwater = {
  data() {
    return {
      config,
      timer: [],
      loginname: '',
      proposalType: 507,
      list: [
        {
          text: '系统洗码',
          value: 507
        },
        {
          text: 'pttiger自助洗码',
          value: 616
        },
        {
          text: 'qt自助洗码',
          value: 624
        },
        {
          text: 'nt自助洗码',
          value: 625
        },

        {
          text: 'dt自助洗码',
          value: 628
        },
        {
          text: 'mg自助洗码',
          value: 629
        },

        {
          text: 'png自助洗码',
          value: 630
        },
        {
          text: 'ptsw自助洗码',
          value: 632
        },

        {
          text: 'cq9自助洗码',
          value: 634
        },
        {
          text: 'pg自助洗码',
          value: 635
        },
        {
          text: 'ptasiatiger自助洗码',
          value: 636
        }

      ],
      headList: [
        // {
        //   label: '序号',
        //   prop: 'order'
        // },
        {
          label: '会员账号',
          prop: 'loginname'
        },
        {
          label: '申请时间',
          prop: 'tempCreateTime'
        },
        {
          label: '返水额度',
          prop: 'amount'
        },
        {
          label: '返水类型',
          prop: 'type'
        }
      ],
      apiFun: searchsubuserProposalApiFun,
      pagination: {
        pageIndex: 1,
        size: 10,
        pageContents: [],
        totalRecords: 10
      },
    }
  },
  computed: {},
  created() {
    //初始化日期
    this.timer = [new Date(getMonthFirstDay().replace(/\-/g, "/")), new Date()]
  },
  methods: {
    searchData() {
      this.$refs.pagination.refresh()
    }
  },
}
// 会员优惠
export const vipPromo = {
  data() {
    return {
      config,
      timer: [],
      loginname: '',
      proposalType: 506,
      list: [
        {
          text: '幸运抽奖',
          value: 506
        },
        {
          text: '生日礼金',
          value: 513
        }
      ],
      headList: [
        // {
        //   label: '序号',
        //   prop: 'order'
        // },
        {
          label: '会员账号',
          prop: 'loginname'
        },
        {
          label: '申请时间',
          prop: 'tempCreateTime'
        },
        {
          label: '优惠',
          prop: 'remark'
        },
        {
          label: '申请类型',
          prop: 'type'
        }
      ],
      apiFun: searchsubuserProposalApiFun,
      pagination: {
        pageIndex: 1,
        size: 10,
        pageContents: [],
        totalRecords: 10
      },
    }
  },
  computed: {},
  created() {
    //初始化日期
    this.timer = [new Date(getMonthFirstDay().replace(/\-/g, "/")), new Date()]
  },
  methods: {
    searchData() {
      this.$refs.pagination.refresh()
    }
  },
}

// 额度记录
export const quotaModule = {
  data() {
    return {
      tabTitleList: [
        {
          text: '额度记录'
        }
      ],
      currentIdx: 0,
      timer: [],//时间
      headList: [
        {
          label: '序号',
          prop: 'order'
        },
        // {
        //   label: '操作类型',
        //   prop: 'type'
        // },
        {
          label: '额度变量',
          prop: 'remit'
        },
        {
          label: '改变前额度',
          prop: 'credit'
        },
        {
          label: '改变后额度',
          prop: 'newCredit'
        },
        {
          label: '加入时间',
          prop: 'tempCreateTime'
        }
      ],
      apiFun: searchCreditlogs,
      pagination: {
        pageIndex: 1,
        size: 10,
        pageContents: [],
        totalRecords: 10
      }
    }
  },
  computed: {},
  created() {
    //初始化日期
    this.timer = [new Date(getMonthFirstDay().replace(/\-/g, "/")), new Date()]
  },
  methods: {
    searchData() {
      this.$refs.pagination.refresh()
    },
    selectItem(idx) {
      this.currentIdx = idx
    }
  }
}
// 下线会员
export const offlineMembers = {
  data() {
    return {
      config,
      tabTitleList: [
        {
          text: '下线会员'
        }
      ],
      currentIdx: 0,
      timer: [],//时间
      headList: [
        // {
        //   label: '序号',
        //   prop: 'order'
        // },
        {
          label: '会员账户',
          prop: 'loginname'
        },
        {
          label: '状态',
          prop: 'flag'
        },
        {
          label: '尊宝账户额度',
          prop: 'credit'
        },
        {
          label: '开户日期',
          prop: 'tempCreateTime'
        },
        {
          label: '来源网址',
          prop: 'howToKnow'
        }
      ],
      //活跃会员:${activeUsers}个 注册总量：${subUsers}个
      apiFun: queryAgentSubUserInfo,
      pagination: {
        pageIndex: 1,
        size: 10,
        pageContents: [],
        totalRecords: 10
      }
    }
  },
  computed: {},
  created() {
    //初始化日期
    this.timer = [new Date(getMonthFirstDay().replace(/\-/g, "/")), new Date()]
  },
  methods: {
    searchData() {
      this.$refs.pagination.refresh()
    },
    selectItem(idx) {
      this.currentIdx = idx
    }
  }
}

// 代理提款
export const agentWithdrawal = {
  mixins: [withdrawal, commonMaskPageModule],
  data() {
    return {
      tabTitleList: [
        {
          text: '申请提款'
        }
      ],
      currentIdx: 0,
      withdrawalData: {
        password: '',
        bank: '',
        accountNo: '',
        bankAddress: '',
        amount: '',
        tkType: 'slotmachine',
        bankCardName: ''
      },
      isAgree: true,
      tipText: '',
      bankList: [],//已绑定的银行卡
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'slotAmount'
    ]),
    liveall() {
      return this.userInfo.credit
    },
    maxTkAmount() {
      return this.slotAmount + this.liveall
    },
  },
  created() {
  },
  methods: {
    formatStr,
    // PC去绑定银行卡
    goToBindBank() {
      this.$router.push('/agent-manage/account-settings?query=bindBankCard')
    },
    // 绑定银行卡
    bindBankCard() {
      this.isShowCommonMaskPage = true
    },
    //提款平账
    agentWithdrawpz() {
      agentWithdrawpz({
        tkType: this.withdrawalData.tkType,
        slotmachine: this.slotAmount,
        liveall: this.liveall
      }).then((res) => {
        if (this.ERR_OK === res.code) {
          this.tkType = res.data
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },
    //提款
    withdrawal() {
      let {password, bank, accountNo, bankAddress, amount, tkType} = this.withdrawalData
      if (!password) {
        this.$message({
          type: 'warning',
          message: '密码不可为空!'
        })
        return
      }
      if (!bank) {
        this.$message({
          type: 'warning',
          message: '请选择银行!'
        })
        return
      }
      if (!accountNo) {
        this.$message({
          type: 'warning',
          message: '卡折号不可为空!'
        })
        return
      }
      if (!bankAddress) {
        this.$message({
          type: 'warning',
          message: '开户网点不可为空!'
        })
        return
      }

      if (!tkType) {
        this.$message({
          type: 'warning',
          message: '提款类型不可为空!'
        })
        return
      }

      if (!amount) {
        this.$message({
          type: 'warning',
          message: '提款金额不可为空!'
        })
        return
      }

      if (this.maxTkAmount < 100) {
        this.$message({
          type: 'warning',
          message: '老虎机/其它类佣金综合余额不足100无法提款'
        })
        return
      }

      if ((tkType === 'slotmachine') && (amount > this.slotAmount)) {
        this.$message({
          type: 'warning',
          message: `最大提款金额为${this.slotAmount}元`
        })
        return
      }

      if (amount - this.maxTkAmount > 0) {
        this.$message({
          type: 'warning',
          message: `最大提款金额为${this.maxTkAmount}元`
        })
        return
      }

      if (amount < 100 || amount > 190000) {
        this.$message({
          type: 'warning',
          message: '单次提款金额只能在100至190000之间'
        })
        return
      }

      if (!this.isAgree) {
        this.$message({
          type: 'warning',
          message: '未选中提款须知'
        })
        return
      }

      withdrawTwo(this.withdrawalData).then((res) => {
        if (this.ERR_OK === res.code) {
          this.$message({
            type: 'info',
            message: res.data
          })
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
    }
  },
  watch: {},
}

// =============手机端===================

// 菜单
export const menu = {
  data() {
    return {
      isShow: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.body = document.querySelector('body')
    })
  },
  methods: {
    openMenu() {
      this.isShow = true
      if (this.body) {
        this.body.style.overflow = 'hidden'
      } else {
        this.$nextTick(() => {
          this.body = document.querySelector('body')
          this.body.style.overflow = 'hidden'
        })
      }
    },
    closeMenu() {
      this.isShow = false
      this.body.style.overflow = 'auto'
    },
  }
}

// app下载
export const appDownLoad = {
  methods: {
    appDownLoad() {
      let isEmpty = 0
      let version = getMobilePlatform().toUpperCase()
      let appDownloadUrl = 'https://www.qnappzb.com/web/app.html'
      // step 1
      if (version === 'OTHER') {
        this.$toast('请用安卓或者苹果设备打开！！')
        return
      }
      //step 2 判断代理域名
      checkAgentURLogin().then((res) => {

        if (this.ERR_OK === res.code) {

          // 如果为代理域名
          if (!res.data) {
            // step 3 获取代理包
            getAppVersionCustomInfo().then((res) => {

              if (this.ERR_OK === res.code) {

                //代理域名有代理包
                if (res.data.length) {

                  res.data.forEach((obj) => {
                    //根据移动平台获取下载链接
                    if (obj.plat.toUpperCase() === version) {
                      if (!obj.packageUrl) {
                        isEmpty = 0 //已登录
                        window.location.href = obj.packageUrl
                        return false
                      } else {
                        isEmpty = 1 //未登录
                      }
                    } else {
                      isEmpty = 1 //未登录
                    }
                  })
                  // 未登录
                  if (isEmpty === 1) {
                    this.$toast('您好，请先登录游戏账号')
                    return false
                  }

                } else {
                  // step 4 代理域名无代理包
                  if (!this.isLogin) {
                    this.$toast('您好，请先登录游戏账号')
                  } else {
                    window.location.href = appDownloadUrl
                  }
                }

              } else {

                this.$toast(res.message)

              }

            })
          } else {
            window.location.href = appDownloadUrl
          }

        } else {

          this.$toast(res.message)

        }
      })

    }
  }
}

// 返回
export const commonBack = {
  methods: {
    commonBack() {
      if (window.location.href.includes('isFromApp')) {
        // 返回app
        window.location.href = 'zunbaowebapp://Home'
      } else {
        this.$router.back()
      }
    }
  }
}

export const commonHead = {
  mixins: [commonBack],
  data() {
    return {
      headData: {
        title: '',
        leftIcon: 'arrowr',
        rightIcon: 'kefu1',
      },
    }
  },
  created() {
    let title = this.$route.meta.title
    if (title) {
      this.headData.title = title
    }
  },
  methods: {
    back() {
      this.commonBack()
    },
    openService() {
      this.$router.push('/mobile/self-help')
    },
  },
}
