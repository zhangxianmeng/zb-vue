<template>
  <div>
    <v-dialog :width="width" :height="height" :is-show="isShowLoginDialog"
              @on-close="closeDialog">
      <div class="login-dialog">
        <div class="dialog-header">
          <h3>会员登录</h3>
        </div>
        <div class="dialog-body">
          <!--pc-->
          <form v-if="!isMobile">
            <div class="input-group">
              <label class="label" for="username"><span>*</span>用户名</label>
              <div>
                <input v-model="userFormData.loginName" id="username" type="text">
              </div>
            </div>
            <div class="input-group">
              <label class="label" for="password"><span>*</span>密码</label>
              <div>
                <input v-model="userFormData.passWord" id="password" type="password">
              </div>
            </div>
            <div class="input-group">
              <label class="label"></label>
              <div>
                <el-button type="danger" @click="login">确定</el-button>
              </div>
            </div>
          </form>

          <!--手机-->
          <div class="form" v-if="isMobile">
            <div class="mobile-input-group">
              <label class="label" for="usernameMobile"><span class="red">*</span>用户名</label>
              <div>
                <input v-model="userFormData.loginName" id="usernameMobile" type="text">
              </div>
            </div>
            <div class="mobile-input-group">
              <label class="label" for="passwordMobile"><span class="red">*</span>密码</label>
              <div>
                <input v-model="userFormData.passWord" id="passwordMobile" type="password">
              </div>
            </div>
            <div class="center">
              <mt-button size="small" type="danger" @click="login">确定</mt-button>
            </div>
          </div>

        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script>
  import VDialog from '@/components/dialog/dialog'
  import {login} from '@/common/js/mixin'
  import {isMobilePlatform} from '@/common/js/util'
  import {mapGetters} from 'vuex'

  export default {
    mixins: [login],
    data() {
      return {
        userFormData: {
          loginName: '',
          passWord: ''
        },
        isMobile: isMobilePlatform()
      }
    },
    props: {
      isShowLoginDialog: {
        type: Boolean,
        default: false
      },
      width: {
        type: Number,
        default: 600
      },
      height: {
        type: Number,
        default: 500
      }
    },
    computed: {
      ...mapGetters(['isLogin'])
    },
    created() {
    },
    methods: {
      closeDialog() {
        this.$emit('closeDialog')
      },
    },
    watch: {
      isLogin(val) {
        if (val) {
          this.closeDialog()
        }
      }
    },
    components: {
      VDialog
    }

  }
</script>

<style lang="stylus" scoped></style>