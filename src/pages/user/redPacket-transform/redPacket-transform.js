import tabTitle from '@/components/tab-title/tab-title'
import {redPacketTransformModule} from '@/common/js/mixin'

export default {
  mixins: [redPacketTransformModule],
  data() {
    return {
      tabTitleList: [
        {
          text: '转账'
        }
      ],
      currentIdx: 0,
    }
  },
  computed: {},

  methods: {
    selectItem(idx) {
      this.currentIdx = idx
    }
  },
  components: {tabTitle}
}