import tabTitle from '@/components/tab-title/tab-title.vue'
import {withdrawalModule} from '@/common/js/mixin'

export default {
  mixins: [withdrawalModule],
  components: {tabTitle}
}