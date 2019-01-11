let index = () => import('@/pages/mobile/index.vue')
let indexPage = () => import('@/pages/mobile/index/index.vue')
let noticePage = () => import('@/pages/mobile/notice-page/notice-page.vue')
let gameLobby = () => import('@/pages/mobile/game-lobby/game-lobby.vue')
let login = () => import('@/pages/mobile/login/login.vue')
let aboutUs = () => import('@/pages/mobile/about-us/about-us.vue')
let service = () => import('@/pages/mobile/service/service.vue')
let register = () => import('@/pages/mobile/register/register.vue')
let welcome = () => import('@/pages/mobile/register/welcome.vue')
let lineText = () => import('@/pages/mobile/line-text/line-text.vue')


// 活动专题
let activity = () => import('@/pages/mobile/activity/activity.vue')
let vip = () => import('@/pages/activity/vip/vip.vue')
let movie = () => import('@/pages/activity/movie/movie.vue')
let casino = () => import('@/pages/activity/casino/casino.vue')
let upgrade = () => import('@/pages/activity/upgrade/upgrade.vue')
let vipBirthday = () => import('@/pages/activity/vip-birthday/vip-birthday.vue')
let lucky = () => import('@/pages/activity/lucky/lucky.vue')
let dtFundFlow = () => import('@/pages/activity/dtFundFlow/dtFundFlow.vue')
let christmas = () => import('@/pages/activity/christmas/christmas.vue')
let evesf = () => import('@/pages/activity/evesf/index.vue')
let newYearMoney = () => import('@/pages/activity/newYearMoney/index.vue')
let firecracker = () => import('@/pages/activity/firecracker/index.vue')

// 自助中心
let helpSelf = () => import('@/pages/mobile/help-self/help-self.vue')
let helpSelfForgetPwd = () => import('@/pages/mobile/help-self/forget-pwd.vue')
let helpSelfForgetAccount = () => import('@/pages/mobile/help-self/forget-account.vue')
let helpSelfUnBindAccount = () => import('@/pages/mobile/help-self/unbind-account.vue')
let helpSelfUnBindCard = () => import('@/pages/mobile/help-self/unbind-card.vue')


// 积分商城
let integral = () => import('@/pages/mobile/integral/index/index.vue')
let integralDetail = () => import('@/pages/mobile/integral/detail/detail.vue')
let luckyLottery = () => import('@/pages/mobile/integral/lucky-lottery/lucky-lottery.vue')
let exchangePage = () => import('@/pages/mobile/integral/exchangePage/exchangePage.vue')

let selectAddress = () => import('@/pages/mobile/integral/exchangePage/select-address/select-address.vue')
let editAddress = () => import('@/pages/mobile/integral/exchangePage/edit-address/edit-address.vue')

// 个人中心
let user = () => import('@/pages/mobile/user/user.vue')
let deposit = () => import('@/pages/mobile/user/deposit/deposit.vue')
let withdraw = () => import('@/pages/mobile/user/withdraw/withdraw.vue')
let signLottery = () => import('@/pages/mobile/user/sign-lottery/sign-lottery.vue')
let transform = () => import('@/pages/mobile/user/transform/transform.vue')
let redPacketTransform = () => import('@/pages/mobile/user/redPacket-transform/redPacket-transform.vue')
let discounts = () => import('@/pages/mobile/user/discounts/discounts.vue')
let discountsDepositSend = () => import('@/pages/mobile/user/discounts/deposit-send/deposit-send.vue')
let discountsBackwater = () => import('@/pages/mobile/user/discounts/backwater/backwater.vue')
let discountsPromoted = () => import('@/pages/mobile/user/discounts/promoted/promoted.vue')
let discountsRescueMoney = () => import('@/pages/mobile/user/discounts/rescue-money/rescue-money.vue')
let discountsRedCoupon = () => import('@/pages/mobile/user/discounts/red-coupon/red-coupon.vue')
let discountsCoupon = () => import('@/pages/mobile/user/discounts/coupon/coupon.vue')
let discountsFreeChip = () => import('@/pages/mobile/user/discounts/free-chip/free-chip.vue')
let discountsBirthday = () => import('@/pages/mobile/user/discounts/birthday/birthday.vue')

let appHandsel = () => import('@/pages/mobile/user/app-handsel/app-handsel.vue')
let accountSettings = () => import('@/pages/mobile/user/account-settings/account-settings.vue')
let accountList = () => import('@/pages/mobile/user/account-list/account-list.vue')
let letter = () => import('@/pages/mobile/user/letter/letter.vue')
let vipLevel = () => import('@/pages/mobile/user/vip-level/vip-level.vue')
let agent = () => import('@/pages/mobile/user/agent/agent.vue')

// 代理中心
let agentManage = () => import('@/pages/mobile/agent-manage/index.vue')
let accountInfo = () => import('@/pages/mobile/agent-manage/account-info/account-info.vue')
let agentCenter = () => import('@/pages/mobile/agent-manage/agent-center/agent-center.vue')
let dayCommission = () => import('@/pages/mobile/agent-manage/day-commission/day-commission.vue')
let membership = () => import('@/pages/mobile/agent-manage/membership/membership.vue')
let quota = () => import('@/pages/mobile/agent-manage/quota/quota.vue')
let offlineMembers = () => import('@/pages/mobile/agent-manage/offline-members/offline-members.vue')
let withdrawal = () => import('@/pages/mobile/agent-manage/withdrawal/withdrawal.vue')

let searchagprofit = () => import('@/pages/mobile/agent-manage/membership/searchagprofit/searchagprofit.vue')
let searchsubuserProposal = () => import('@/pages/mobile/agent-manage/membership/searchsubuserProposal/searchsubuserProposal.vue')
let membershipWithdraw = () => import('@/pages/mobile/agent-manage/membership/withdraw/withdraw.vue')
let vipBackwater = () => import('@/pages/mobile/agent-manage/membership/vipBackwater/vipBackwater.vue')
let vipPromo = () => import('@/pages/mobile/agent-manage/membership/vipPromo/vipPromo.vue')

// 客服中心

let selfHelp = () => import('@/pages/mobile/self-help/self-help.vue')
let selfDep = () => import('@/pages/mobile/self-help/self-deposit.vue')
let selfFunds = () => import('@/pages/mobile/self-help/self-funds.vue')
let selfGame = () => import('@/pages/mobile/self-help/self-game.vue')
let selfTech = () => import('@/pages/mobile/self-help/self-tech.vue')
let selfOffer = () => import('@/pages/mobile/self-help/self-offer.vue')
let accoutP = () => import('@/pages/mobile/self-help/self-account.vue')
let btcBet = () => import('@/pages/mobile/btc-bet/btc-bet.vue')
export default [
  {
    path: '/mobile',
    redirect: '/mobile/index',
    component: index,
    children: [
      {
        path: 'index',
        component: indexPage,
      },
      {
        path: 'btc-bet',
        redirect: 'btc-bet/dt'
      },
      {
        path: 'btc-bet/:type',
        component: btcBet,
        meta:{
          title:'比特币专区'
        }
      },
      {
        path: 'notice-page',
        component: noticePage
      },
      {
        path: 'slots',
        redirect: 'slots/ptasia'
      },
      {
        path: 'slots/:type',
        component: gameLobby
      },
      {
        path: 'login',
        component: login,
        meta:{
          title:'会员登录'
        }
      },
      {
        path: 'about-us',
        component: aboutUs,
        meta:{
          title:'关于尊宝'
        }
      },
      {
        path: 'service',
        component: service
      },

      {
        path: 'activity',
        component: activity,
      },
      {
        path: 'help-self',
        component: helpSelf,
      },
      {
        path: 'help-self/forget-pwd',
        component: helpSelfForgetPwd,
      },
      {
        path: 'help-self/forget-account',
        component: helpSelfForgetAccount,
      },
      {
        path: 'help-self/unbind-account',
        component: helpSelfUnBindAccount,
      },
      {
        path: 'help-self/unbind-card',
        component: helpSelfUnBindCard,
      },
      {
        path: 'line-test',
        component: lineText
      },


      {
        path: 'integral',
        component: integral,
      },
      {
        path: 'integral/lucky-lottery',
        component: luckyLottery,
      },
      {
        path: 'integral/detail',
        component: integralDetail,
      },
      {
        path: 'integral/exchangePage',
        component: exchangePage,
      },
      {
        path: 'integral/exchangePage/select-address',
        component: selectAddress,
      },
      {
        path: 'integral/exchangePage/edit-address',
        component: editAddress,
      },


      {
        path: 'register',
        component: register
      },
      {
        path: 'welcome',
        component: welcome
      },

      // 个人中心
      {
        path: 'user',
        component: user,
        meta: {
          title: '我的尊宝'
        }
      },
      {
        path: 'user/deposit',
        component: deposit,
        meta: {
          title: '快速存款'
        }
      },

      {
        path: 'user/withdraw',
        component: withdraw,
        meta: {
          title: '提款'
        }
      },
      {
        path: 'user/transform',
        component: transform,
        meta: {
          title: '户内转账'
        }
      },
      {
        path: 'user/redPacket-transform',
        component: redPacketTransform,
        meta: {
          title: '红包转账'
        }
      },
      {
        path: 'user/discounts',
        component: discounts,
        meta: {
          title: '自助优惠'
        }
      },
      {
        path: 'user/discounts/deposit-send',
        component: discountsDepositSend,
        meta: {
          title: '自助存送'
        }
      },
      {
        path: 'user/discounts/promoted',
        component: discountsPromoted,
        meta: {
          title: '自助晋级'
        }
      },
      {
        path: 'user/discounts/backwater',
        component: discountsBackwater,
        meta: {
          title: '自助返水'
        }
      },
      {
        path: 'user/discounts/rescue-money',
        component: discountsRescueMoney,
        meta: {
          title: '救援金'
        }
      },
      {
        path: 'user/discounts/coupon',
        component: discountsCoupon,
        meta: {
          title: '存送优惠券'
        }
      },
      {
        path: 'user/discounts/red-coupon',
        component: discountsRedCoupon,
        meta: {
          title: '红包优惠券'
        }
      },
      {
        path: 'user/discounts/free-chip',
        component: discountsFreeChip,
        meta: {
          title: 'VIP免费筹码'
        }
      },
      {
        path: 'user/discounts/birthday',
        component: discountsBirthday,
        meta: {
          title: '生日礼金'
        }
      },
      {
        path: 'user/app-handsel',
        component: appHandsel,
        meta: {
          title: 'app彩金'
        }
      },
      {
        path: 'user/sign-lottery',
        component: signLottery,
        meta: {
          title: '签到中心'
        }
      },
      {
        path: 'user/account-settings',
        component: accountSettings,
        meta: {
          title: '账户设置'
        }
      },
      {
        path: 'user/account-list',
        component: accountList,
        meta: {
          title: '账户清单'
        }
      },
      {
        path: 'user/letter',
        component: letter,
        meta: {
          title: '站内信'
        }
      },
      {
        path: 'user/vip-level',
        component: vipLevel,
        meta: {
          title: 'vip等级制度'
        }
      },
      {
        path: 'user/agent',
        component: agent,
        meta: {
          title: '合作代理'
        }
      },
      {
        path: 'user/service',
        component: service,
        meta: {
          title: '我的客服'
        }
      },

      // 代理中心
      {
        path: 'agent-manage',
        component: agentManage,
        meta: {
          title: '代理中心'
        }
      },
      {
        path: 'agent-manage/account-info',
        component: accountInfo,
        meta: {
          title: '账户概况'
        }
      },
      {
        path: 'agent-manage/agent-center',
        component: agentCenter,
        meta: {
          title: '账户中心'
        }
      },
      {
        path: 'agent-manage/day-commission',
        component: dayCommission,
        meta: {
          title: '日结佣金'
        }
      },
      {
        path: 'agent-manage/membership',
        component: membership,
        meta: {
          title: '会员账务'
        }
      },
      {
        path: 'agent-manage/membership/searchagprofit',
        component: searchagprofit,
        meta: {
          title: '会员输赢'
        }
      },
      {
        path: 'agent-manage/membership/searchsubuserProposal',
        component: searchsubuserProposal,
        meta: {
          title: '会员存款'
        }
      },
      {
        path: 'agent-manage/membership/withdraw',
        component: membershipWithdraw,
        meta: {
          title: '会员提款'
        }
      },
      {
        path: 'agent-manage/membership/vipBackwater',
        component: vipBackwater,
        meta: {
          title: '会员返水'
        }
      },
      {
        path: 'agent-manage/membership/vipPromo',
        component: vipPromo,
        meta: {
          title: '会员优惠'
        }
      },

      {
        path: 'agent-manage/quota',
        component: quota,
        meta: {
          title: '额度记录'
        }
      },
      {
        path: 'agent-manage/offline-members',
        component: offlineMembers,
        meta: {
          title: '下线会员'
        }
      },
      {
        path: 'agent-manage/withdrawal',
        component: withdrawal,
        meta: {
          title: '申请提款'
        }
      },
      {
        path: 'agent-manage/account-settings',
        component: accountSettings,
        meta: {
          title: '账户设置'
        }
      },
      {
        path: 'agent-manage/letter',
        component: letter,
        meta: {
          title: '站内信'
        }
      },

      // 手机活动专题
      {
        path: 'activity/vip',
        component: vip
      },
      {
        path: 'activity/movie',
        component: movie
      },
      {
        path: 'activity/casino',
        component: casino
      },
      {
        path: 'activity/upgrade',
        component: upgrade
      },
      {
        path: 'activity/vip-birthday',
        component: vipBirthday
      },
      {
        path: 'activity/vip-birthday',
        component: vipBirthday
      },
      {
        path: 'activity/lucky',
        component: lucky
      },
      {
        path: 'activity/dtFundFlow',
        component: dtFundFlow
      },
      {
        path: 'activity/christmas',
        component: christmas
      },
      {
        path: 'activity/evesf',
        component: evesf
      },
      {
        path: 'activity/newYearMoney',
        component: newYearMoney
      },
      {
        path: 'activity/firecracker',
        component: firecracker
      },
      // 客服中心
      {
          path: 'self-help',
          component: selfHelp,
          meta: {
              title: '客服中心'
          }
      },
      {
          path: 'self-account',
          component: accoutP,
          meta: {
              title: '账户问题'
          }
      },
      {
          path: 'self-funds',
          component: selfFunds,
          meta: {
              title: '资金问题'
          }
      },
      {
          path: 'self-deposit',
          component: selfDep,
          meta: {
              title: '存款问题'
          }
      },
      {
          path: 'self-offer',
          component: selfOffer,
          meta: {
              title: '优惠问题'
          }
      },
      {
          path: 'self-game',
          component: selfGame,
          meta: {
              title: '游戏问题'
          }
      },
      {
          path: 'self-tech',
          component: selfTech,
          meta: {
              title: '技术问题'
          }
      },
    ]
  },

]