import Vue from 'vue'
import VHeader from 'MComponents/v-header/v-header'
import fastclick from 'fastclick'
import {
  Header, Toast,MessageBox,Button
} from 'mint-ui'

import {Pagination,Dialog,Table,TableColumn} from 'element-ui'
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Table)
Vue.use(TableColumn)
Vue.component(Button.name, Button)
Vue.component(Header.name, Header)
Vue.component('v-header', VHeader)

Vue.prototype.$toast = Toast
Vue.prototype.$message = Toast
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$prompt = MessageBox.prompt

fastclick.attach(document.body)
import 'mint-ui/lib/style.css'
import '@/common/stylus/index.styl'