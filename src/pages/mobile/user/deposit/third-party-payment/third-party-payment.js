import payWayTab from 'MComponents/pay-way-tab/pay-way-tab'
import accountSelectTab from 'MComponents/account-select-tab/account-select-tab'
import {depositPageModule} from '@/common/js/mixin'
export default {
  mixins: [depositPageModule],
  components: {
    payWayTab, accountSelectTab
  }
}