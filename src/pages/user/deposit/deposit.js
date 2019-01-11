import TabTitle from '@/components/tab-title/tab-title.vue'
import payWayTypeTab from '@/components/pay-way-type-tab/pay-way-type-tab.vue'
import thirdPartyPayment from './third-party-payment/third-party-payment.vue'
import {depositModule} from '@/common/js/mixin'
export default {
  mixins:[depositModule],
  components: {
    TabTitle, payWayTypeTab, thirdPartyPayment
  }
}