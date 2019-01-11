import Vue from 'vue'
// 按需载入 element-ui组件 http://element-cn.eleme.io/#/zh-CN
import {
  Dialog,
  Message,
  MessageBox,
  Loading,
  Pagination,
  Button,
  Table,
  TableColumn,
} from 'element-ui'

Vue.use(Loading.directive)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Button)
Vue.use(Table)
Vue.use(TableColumn)

//定义共享方法
Vue.prototype.$message = function (option) {
  option = Object.assign({}, {
    type: 'warning',
    dangerouslyUseHTMLString: true,
    showClose: true,
    message: '',
    onClose() {
    }
  }, option)
  Message({
    dangerouslyUseHTMLString: option.dangerouslyUseHTMLString,
    showClose: option.showClose,
    message: option.message,
    type: option.type,
    onClose: option.onClose
  })
}
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$loading = Loading.service
Vue.prototype.$prompt = MessageBox.prompt

//全局样式
import '../../../theme/index.css'

import '@/common/stylus/index.styl'


