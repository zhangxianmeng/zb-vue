import {loadLoginState,loadAgentState,loadUserInfo,loadAddrList} from '@/common/js/cache'
const state = {
  isLogin: loadLoginState(), //登陆状态
  initLoginState:false,//开始初始化登录状态
  isAgent:loadAgentState(),//代理登录状态
  userInfo:loadUserInfo(),//用户信息
  isShowCommonModule:true,//默认显示公共模块
  isShowMobileCommonModule:true,//默认显示公共模块 手机端
  isShowLoginDialog:false,//是否显示登录模块
  slotAmount:0,//代理账号 老虎机账户余额
  points:0,
  signAmount:0,//签到余额
  loadingState:false,//加载状态
  unReadMessageNum:0,//未读消息
  addrList:loadAddrList(),//用户地址列表
  flagAddrIndex:{},//当前使用的地址索引
  currentBtcWallet:{},//当前货币钱包
  walletList:[],//钱包地址列表
}

export default state
