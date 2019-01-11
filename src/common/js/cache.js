import storage from 'good-storage'
import config from '@/common/js/config'

const IS_LOGIN_KEY = '__isLogin__'
const IS_AGENT_KEY = '__isAgent__'
const USER_INFO_KEY = '__userInfo__'
const ADDR_LIST_KEY = '__addrList__'


export function loadLoginState() {
  return storage.get(IS_LOGIN_KEY, false)
}

export function loadAgentState() {
  return storage.get(IS_AGENT_KEY, false)
}

export function loadUserInfo() {
  return storage.get(USER_INFO_KEY, config.userInfo)
}

export function loadAddrList() {
  return storage.get(ADDR_LIST_KEY, [])
}


export function saveLoginState(flag) {
  storage.set(IS_LOGIN_KEY, flag)
  return flag
}

export function saveAgentState(flag) {
  storage.set(IS_AGENT_KEY, flag)
  return flag
}

export function saveUserInfo(flag) {
  storage.set(USER_INFO_KEY, flag)
  return flag
}

export function saveAddrList(flag) {
  storage.set(ADDR_LIST_KEY, flag)
  return flag
}
