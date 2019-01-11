import payWayTab from '@/components/pay-way-tab/pay-way-tab'
import accountSelectTab from '@/components/account-select-tab/account-select-tab'
import {depositPageModule} from '@/common/js/mixin'

export default {
  mixins: [depositPageModule],
  components: {
    payWayTab, accountSelectTab
  }

}