import VWrapper from '@/components/wrapper/wrapper'
import TabMenu from '@/components/tab-menu/tab-menu'
import TabTitle from '@/components/tab-title/tab-title'
import Vue from 'vue'

// import Banner from '@/components/banner/banner'
import {
  Carousel,
  CarouselItem,
} from 'element-ui'

import {agentJoinModule} from '@/common/js/mixin'

Vue.use(Carousel)
Vue.use(CarouselItem)

export default {
  mixins: [agentJoinModule],
  components: {
    VWrapper,
    TabMenu,
    TabTitle,
    //Banner
  }
}