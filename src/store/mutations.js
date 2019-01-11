import * as types from './mutation-types'
import {saveLoginState, saveAgentState, saveUserInfo, saveAddrList, savaThirdPay} from '@/common/js/cache'

const mutations = {
  [types.SET_LOGIN](state, flag) {
    state.isLogin = saveLoginState(flag)
  },

  [types.SET_INIT_LOGIN_STATE](state, flag) {
    state.initLoginState = flag
  },

  [types.SET_AGENT_LOGIN](state, flag) {
    state.isAgent = saveAgentState(flag)
  },

  [types.SET_USERINFO](state, flag) {
    state.userInfo = saveUserInfo(flag)
  },

  [types.SET_IS_SHOW_COMMON_MODULE](state, flag) {
    state.isShowCommonModule = flag
  },

  [types.SET_IS_SHOW_MOBILE_COMMON_MODULE](state, flag) {
    state.isShowMobileCommonModule = flag
  },

  [types.SET_IS_SHOW_LOGIN_DIALOG](state, flag) {
    state.isShowLoginDialog = flag
  },

  [types.SET_SLOT_AMOUNT](state, flag) {
    state.slotAmount = flag
  },

  [types.SET_POINTS](state, flag) {
    state.points = flag
  },

  [types.SET_SIGNAMOUNT](state, flag) {
    state.signAmount = flag
  },

  [types.SET_LOADINGSTATE](state, flag) {
    state.loadingState = flag
  },

  [types.SET_UNREAD_MESSAGE](state, flag) {
    state.unReadMessageNum = flag
  },

  [types.SET_ADDR_LIST](state, flag) {
    state.addrList = saveAddrList(flag)
  },

  [types.SET_CURRENT_ADDR_INDEX](state, flag) {
    state.flagAddrIndex = flag
  },

  [types.SET_CURRENT_WALLET](state, flag) {
    state.currentBtcWallet = flag
  },

  [types.SET_WALLET_LIST](state, flag) {
    state.walletList = flag
  },

}

export default mutations
