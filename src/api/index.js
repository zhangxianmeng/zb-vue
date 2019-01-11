import {ajaxFactory} from './ajaxFactory'
//800客服
export function playerInfo4Live800(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/playerInfo4Live800', data))
}

//获取存款小数点
export function getWxZzQuota(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/getWxZzQuota', data))
}

//千炮捕鱼下载
export function mobileMwgLogin(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/mobileMwgLogin', data))
}

//查dt流水
export function findDTBetAmoutOfEveryDay(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/findDTBetAmoutOfEveryDay', data))
}

//领取dt**
export function drawDTBetAmoutOfDay(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/drawDTBetAmoutOfDay', data))
}

//幸运盘抽奖
export function queryLuckDraw(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/queryLuckDraw', data))
}

//幸运盘领取奖金
export function drawLuckDraw(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/drawLuckDraw', data))
}

//幸运大轮盘
export function queryRankings(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/queryRankings', data))
}

//查询打卡记录
export function findSignClockRecord(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/findSignClockRecord', data))
}

//打卡
export function doSignClockRecord(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/doSignClockRecord', data))
}

//notice
export function getNotice(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/getAllNews', data))
}

//login
export function loginApiFun(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/login', data))
}

//logOut
export function logOutApiFun(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/logOut', data))
}

// checkLogin
export function checkLoginApiFucn(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/checkLogin', data))
}

//getuser 查询用户信息
export function getUser(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/getUser', data))
}

//查询代理账户老虎机账户余额
export function getUserStatus(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/getUserStatus', data))
}

//makeCallApiFun
export function makeCallApiFun(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/makeCall', data))
}

//registerApiFun
export function registerApiFun(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/register', data))
}

// 存款通道
export function getPayWay(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/pay_way', data))
}

// 秒存
export function getNewdeposit(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/getNewdeposit', data))
}

// 通用存款
export function commonDeposit(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/pay_api', data))
}

// 久安充值
export function recharge(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/recharge', data))
}

// 签到余额查询
export function querySignAmountApiFun(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/querySignAmount', data))
}

// 签到
export function doSignRecord(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/doSignRecord', data))
}

// 用户最新消息
export function getGuestbookCountNew(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/getGuestbookCountNew', data))
}

// 查询客服二维码
export function queryQrcodeApiFun(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/queryQrcode', data))
}


// getBankInfoList 获取绑定的银行卡
export function getBankInfoList(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/getBankInfoList', data))
}

// withdrawTwo 提款
export function withdrawTwo(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/withdrawNew', data))
}

// unBindBankinfo 解绑银行卡
export function unBindBankinfo(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/unBindBankinfo', data))
}

//getWithDrawBankStatus 获取提款银行状态
export function getWithDrawBankStatus(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/getWithDrawBankStatus', data))
}

// getUserBalance UET余额
export function getUserBalance(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/getUserBalance', data))
}

// searchBankno 获取银行账号
export function searchBankno(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/searchBankno', data))
}

// getUserToken 获取token
export function getUserToken(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/getUserToken', data))
}

// getGameMoneyApiFun
export function getGameMoneyApiFun(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/getGameMoney', data))
}

// queryPoints
export function queryPointsApiFun(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/queryPoints', data))
}

// queryProfit
export function queryProfit(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/queryProfit', data))
}

//查询红包账户
export function queryRedRainMoney(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/queryRedRainMoney', data))
}

//主账户转红包转账
export function updateGameMoney(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/updateGameMoney', data))
}

//红包转账转游戏账户
export function transferInforRedRain(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/transferInforRedRain', data))
}

// 转账给好友
export function transferInforRedRaintoUser(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/transferInforRedRaintoUser', data))
}

// 修改基本资料
export function changeInfo(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/changeInfo', data))
}

// 修改密码
export function changePwd(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/changePwd', data))
}

// 获取银行卡信息
export function getBankInfo(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/getBankInfo', data))
}

// 绑定银行卡
export function mainbandingBankno(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/mainbandingBankno', data))
}

// 站内信列表
export function getMessageByUser(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/getMessageByUser', data))
}

// 信件详情
export function readMsg(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/readMsg', data))
}

// 发件箱
export function saveBookDate(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/saveBookDate', data))
}

// 已签到列表查询
export function findSignrecord(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/findSignrecord', data))
}

// 一键回归
export function oneKeyGameMoney(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/oneKeyGameMoney', data))
}


// 短信找回密码
export function getbackPwdByDx(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/getbackPwdByDx', data))
}

// 邮箱找回密码
export function getbackPwdByEmail(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/getbackPwdByEmail', data))
}

// 短信找回账号
export function getForgetAccbySms(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/getForgetAccbySms', data))
}

//邮箱信找回账号
export function getForgetAccbyEmail(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/getForgetAccbyEmail', data))
}

//自助解冻账号
export function unlockAccountByInfo(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/unlockAccountByInfo', data))
}

//查询所有抽奖奖品
export function getAllLuckyDrawPresent(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/getAllLuckyDrawPresent', data))
}

//查询所哟兑换奖品
export function getAllPointsPresents(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/getAllPointsPresents', data))
}

//getLevelSave
export function getLevelSave(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/getLevelSave', data))
}

//pointsRecord
export function pointsRecord(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/pointsRecord', data))
}

//领取抽奖奖品
export function completeLuckyDrawRecord(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/completeLuckyDrawRecord', data))
}

//handleAddress
export function handleAddress(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/handleAddress', data))
}

//积分消耗
export function luckyDrawCost(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/luckyDrawCost', data))
}

//抽奖
export function luckyDraw(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/luckyDraw', data))
}

//兑换
export function pointsExchange(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/pointsExchange', data))
}

//getYouHuiConfig 优惠查询
export function getYouHuiConfig(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/getYouHuiConfig', data))
}

//getSelfYouHuiObject 自助存送
export function getSelfYouHuiObject(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/getSelfYouHuiObject', data))
}

//getOnekeyData 自助存送
export function getOnekeyData(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/getOnekeyData', data))
}

//oneKeyXimaNew 一键返水
export function oneKeyXimaNew(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/oneKeyXimaNew', data))
}

//queryPTLosePromoReccords 救援金
export function queryPTLosePromoReccords(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/queryPTLosePromoReccords', data))
}

//transferInforCoupon 存送优惠券
export function transferInforCoupon(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/transferInforCoupon', data))
}

//transferInforRedCoupon 红包优惠券
export function transferInforRedCoupon(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/transferInforRedCoupon', data))
}

//checkActivityInfo 获取免费筹码
export function checkActivityInfo(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/checkActivityInfo', data))
}

//applyActivity 领取免费筹码
export function applyActivity(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/applyActivity', data))
}

//queryBetOfPlatform 本月投注额
export function queryBetOfPlatform(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/queryBetOfPlatform', data))
}

//checkUpgrade 检查升级
export function checkUpgrade(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/checkUpgrade', data))
}

//获取生日礼金及id
export function checkBirthday(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/checkBirthday', data))
}

//领取生日礼金
export function birthdayActivityInfo(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/birthdayActivityInfo', data))
}

// 领取救援金
export function optLosePromo(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/optLosePromo', data))
}

// 在线存款记录
export function depositRecordsApiFun(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/depositRecords', data))
}

// 手工存款记录
export function cashinRecordsApiFun(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/cashinRecords', data))
}

// 附言存款记录
export function depositOrderRecordApiFun(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/depositOrderRecord', data))
}

// 提款记录
export function withdrawRecordsApiFun(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/withdrawRecords', data))
}

// 户内转账记录
export function transferRecordsApiFun(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/transferRecords', data))
}

// 优惠记录
export function consRecordsApiFun(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/consRecords', data))
}

// 自助返水记录
export function searchXimaApiFun(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/searchXima', data))
}

// 存送优惠记录
export function couponRecordsApiFun(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/couponRecords', data))
}

//推广链接
export function getAgentExpandSite(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/getAgentExpandSite', data))
}

//日结佣金
export function searchPtCommissions(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/searchPtCommissions', data))
}

//会员输赢
export function searchagprofit(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/searchagprofit', data))
}

//会员账务
export function searchsubuserProposalApiFun(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/searchsubuserProposal', data))
}

//额度记录
export function searchCreditlogs(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/searchCreditlogs', data))
}

//下线会员
export function queryAgentSubUserInfo(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/queryAgentSubUserInfo', data))
}

//提款平账
export function agentWithdrawpz(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/agentWithdrawpz', data))
}

// ==============游戏接口===============


export function getDtJackpot(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/dtJackpot', data))
}


export function bbinLogin(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/bbinLogin', data))
}

export function vrLogin(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/vrLogin', data))
}

export function gameAginRedirect(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/gameAginRedirect', data))
}

export function gameMGLive(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/gameMGLive', data))
}

export function getEbetToken(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/getEbetToken', data))
}

export function sbLogin(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/sbLogin', data))
}

export function PBUserLogin(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/PBUserLogin', data))
}

export function imLogin(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/imLogin', data))
}

export function fanyaLogin(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/fanyaLogin', data))
}

export function gameAginBuyuRedirect(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/gameAginBuyuRedirect', data))
}

export function mwgLogin(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/mwgLogin', data))
}

export function gameLoginDTFish(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/gameLoginDTFish', data))
}

export function kyqpLogin(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/kyqpLogin', data))
}

export function cg761Login(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/cg761Login', data))
}

export function bitGameUserLogin(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/bitGameUserLogin', data))
}

export function checkAgentURLogin(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/checkAgentURLogin', data))
}

export function getAppVersionCustomInfo(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/getAppVersionCustomInfo', data))
}

//PT
export function gamePTLogin(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/gamePTLogin', data))
}

//PT(wap)
export function gamePTH5Login(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/gamePTH5Login', data))
}

//DT
export function gameDTLogin(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/gameDTLogin', data))
}

//SW
export function gameSWLogin(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/gameSWLogin', data))
}

//PNG
export function gamePNGLogin(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/gamePNGLogin', data))
}

export function gamePNGH5Login(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/gamePNGH5Login', data))
}

//NT
export function gameNTLogin(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/gameNTLogin', data))
}

//QT
export function gameQTLogin(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/gameQTLogin', data))
}

//MG
export function gameMGLogin(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/gameMGLogin', data))
}

//CQ9
export function gameCQ9Login(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/gameCQ9Login', data))
}

//PG
export function gamePGLogin(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/gamePGLogin', data))
}

//TTG
export function gameTTGLogin(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/gameTTGLogin', data))
}

//queryList
export function queryList(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/queryList', data))
}

//addGameCollect 添加收藏游戏
export function addGameCollect(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/addGameCollect', data))
}

//deleteGameCollect 取消收藏游戏
export function deleteGameCollect(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/deleteGameCollect', data))
}

//queryGameCollect 查询收藏游戏
export function queryGameCollect(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/queryGameCollect', data))
}

//gameList
export function getAllGames(data) {
  return Promise.resolve(ajaxFactory('post', '/api/game/gameConfig/list', data))
}

//checkConfigSystem
export function checkConfigSystem(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/checkConfigSystem', data))
}

//banner
export function getBannerData(data) {
  return Promise.resolve(ajaxFactory('post', '/api/personal/carouselMapConfig/list', data))
}

//getShabSetting
export function getShabSetting(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/getShabSetting', data))
}


//addAgent
export function addAgent(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/addAgent', data))
}

//validateCodeForIndex
export function validateCodeForIndex(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/validateCodeForIndex', data))
}

//电影
export function getMoneyTime(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/getMoneyTime', data))
}

//申请电影
export function addUserMovie(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/addUserMovie', data))
}

// 双旦领取状态查询
export function existGift(data) {
    return Promise.resolve(ajaxFactory('post', '/1.0/isExistGiftNew', data))
}
// 七份圣诞礼树
export function drawGiftNew(data) {
    return Promise.resolve(ajaxFactory('post', '/1.0/drawGiftNew', data))
}
// 七份圣诞礼树
export function applyGiftNew(data) {
    return Promise.resolve(ajaxFactory('post', '/1.0/applyGiftNew', data))
}

//============= 比特币投注

// 获取钱包余额
export function getBtcWallet(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/getBtcWallet', data))
}

// 获取所有钱包余额
export function initBtcWallet(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/initBtcWallet', data))
}

// 获取目标钱包地址
export function findBtcTargetWalletList(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/findBtcTargetWalletList', data))
}

// 修改钱包地址
export function addOrUpdateTargetWallet(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/addOrUpdateTargetWallet', data))
}

// 删除钱包地址
export function deleteTargetWallet(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/deleteTargetWallet', data))
}

// 主账户记录
export function findWalletLogList(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/findWalletLogList', data))
}

// 游戏记录
export function getBetDetailByTime(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/getBetDetailByTime', data))
}

// 提币
export function btcWithdraw(data) {
  return Promise.resolve(ajaxFactory('post', '/1.0/btcWithdraw', data))
}
