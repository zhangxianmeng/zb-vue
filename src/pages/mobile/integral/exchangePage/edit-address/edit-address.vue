<template>
  <div class="edit-address">
    <v-header :data="headData" @leftIconClick="back" @rightIconClick="openService"></v-header>
    <div class="content">
      <div class="list">
        <div class="item">
          <label for="name">收货人：</label>
          <input id="name" placeholder="请输入收货人姓名" v-model="name" type="text">
        </div>
        <div class="item">
          <label for="phone">手机号码：</label>
          <input id="phone" placeholder="请输入收货人姓名" v-model="phone" type="text">
        </div>
        <div class="item">
          <label>所选地区：</label>
          <region-picker
              v-if="fixbug"
              :province="region.province"
              :city="region.city"
              :district="region.district"
              @onchange="change">
          </region-picker>
        </div>
        <div class="item">
          <label for="address">详细地址：</label>
          <input id="address" placeholder="请输入收货人姓名" v-model="address" type="text">
        </div>
        <div class="flag">
          <input id="flag" placeholder="请输入收货人姓名" v-model="flag" type="checkbox">
          <label for="flag">设为默认地址</label>
        </div>

        <div class="btn-wrapper">
          <mt-button @click="saveAddr" size="small" type="danger">保存</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getHandleAddress} from '@/common/js/mixin'
  import validtorReg from '@/common/js/validtor'
  import {handleAddress} from '@/api/index'
  import Vue from 'vue'
  import RegionPicker from 'vue-region-picker'
  import CHINA_REGION from 'china-area-data'

  Vue.use(RegionPicker, {
    region: CHINA_REGION,
    vueVersion: 2
  })
  export default {
    mixins: [getHandleAddress],
    data() {
      return {
        fixbug: false,
        headData: {
          title: '新建地址',
          leftIcon: 'arrowr',
          rightIcon: 'kefu1',
        },
        region: {
          province: '', //
          city: '', //
          district: '' //
        },
        address: '',
        name: '',
        phone: '',
        flag: false,
        state: 1,//创建地址
        //已保存的地址对象
        addressItem: {}
      }
    },
    computed: {
      queryId() {
        return Number(this.$route.query.id)
      },
    },
    created() {
      this.setAddrInfo()
    },
    methods: {
      setAddrInfo() {
        this.fixbug = false
        setTimeout(() => {
          this.fixbug = true
        })
        let queryId = this.queryId
        if (queryId) {
          this.addressItem = this.addrList.find(item => item.id === queryId)
          let {province, city, district, flag, name, phone, address} = this.addressItem
          this.region = {province, city, district}
          this.address = address
          this.name = name
          this.phone = phone
          this.flag = flag === 1 ? true : false
          this.state = 3
          this.headData.title = '编辑地址'

        } else {
          this.state = 1
          this.headData.title = '新建地址'
          this.addressItem = {}
          this.region = {}
          this.address = ''
          this.name = ''
          this.phone = ''
          this.flag = ''
        }
      },
      back() {
        this.$router.back()
      },
      openService() {
        this.$router.push('/mobile/self-help')
      },
      //创建、修改、保存地址
      saveAddr() {
        // 请求参数
        let {province, city, district} = this.region
        let area = province + city + district
        let address = this.address
        let flag = this.flag ? 1 : 0
        let name = this.name
        let phone = this.phone
        let state = this.state
        let reqData = {
          state,
          id: '',
          province,
          city,
          district,
          area,
          address,
          flag,
          name,
          phone,
        }

        if (state === 3) {
          reqData.id = this.addressItem.id
        }
        // 验证
        if (!name) {
          this.$message({
            type: 'warning',
            message: '请填写收款人姓名'
          })
          return
        }

        if (!validtorReg.phoneReg.test(phone)) {
          this.$message({
            type: 'warning',
            message: '手机格式有误'
          })
          return
        }

        if (!province || !city || !district || !address) {

          this.$message({
            type: 'warning',
            message: '请完善地址信息'
          })
          return
        }

        handleAddress(reqData).then((res) => {
          if (this.ERR_OK === res.code) {
            this.$message({
              type: 'success',
              message: res.data
            })
            this._handleAddress()
            this.$router.back()
          } else {
            this.$message({
              type: 'warning',
              message: res.message
            })
          }
        })

      },
      // 地址选择
      change(item) {
        this.region = item
      },
    },
    watch: {
    },
    components: {}
  }
</script>

<style lang="stylus">
  @import '~common/stylus/mixin'
  @import '~common/stylus/variable'
  .edit-address
    mobile-wrapper()
    m-wrapper()
    line-height 21px
    .list
      padding 20px 0
    .item
      display flex
      align-items center
      border-bottom 1px solid $color-border-gray
      line-height 34px
      label
        flex 0 0 70px
        width 70px
      input[type=text]
        flex 1
        border 0
      .area
        nw-wrap()
    .flag
      display flex
      line-height 34px
      align-items center
      input[type=checkbox]
        width 16px
        height 16px
        margin-right 5px
    .region-picker
      padding 5px 0
      flex 1
      display flex
      label
        flex 1
        margin-right 5px
        &:last-child
          margin-right 0
        select
          width 100%
    .btn-wrapper
      margin-top 15px
      button
        width 100%
        display block


</style>