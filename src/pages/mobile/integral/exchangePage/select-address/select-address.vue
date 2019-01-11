<template>
  <div class="select-address">
    <v-header :data="headData" @leftIconClick="back" @rightIconClick="openService"></v-header>
    <div class="content">
      <div @click="selectAddr(item,idx)" ref="addrList" v-for="(item,idx) in addrList" class="item">
        <i class="iconfont icon-ziyuan selected"></i>
        <div class="text">
          <p class="name">{{item.name}} {{ item.phone}}</p>
          <p class="area">{{item.area+' '+item.address}}</p>
        </div>
        <span @click.stop="editor(item)" class="edit">
          <i class="iconfont icon-bianji"></i>编辑
        </span>
      </div>

      <div class="new-addr">
        <mt-button @click.stop="editor" size="small" type="danger"><i class="iconfont icon-icon02"></i>新建地址</mt-button>
      </div>
    </div>

  </div>
</template>

<script>
  import {getHandleAddress} from '@/common/js/mixin'

  export default {
    mixins: [getHandleAddress],
    data() {
      return {
        headData: {
          title: '选择地址',
          leftIcon: 'arrowr',
          rightIcon: 'kefu1',
        },

      }
    },
    computed: {},
    methods: {
      back() {
        this.$router.back()
      },
      openService() {
        this.$router.push('/mobile/self-help')
      },
      editor(item){
        if(item){
          this.$router.push(`/mobile/integral/exchangePage/edit-address?id=${item.id}`)
        }else{
          this.$router.push(`/mobile/integral/exchangePage/edit-address`)
        }
      }
    },
    watch: {
      addrList(){
        this.setActiveClass()
      }
    },
    components: {}
  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/mixin'
  @import '~common/stylus/variable'
  .select-address
    mobile-wrapper()
    background #eee
    line-height 21px
    .item
      display flex
      align-items center
      background $color-light
      padding 10px
      border-bottom 1px solid #eee
      &.active
        .selected, .name
          color $color-danger

      .text
        flex 1
        padding-left 10px
      .edit
        flex 0 0 60px
        width 60px
        text-align right
      .name
        font-weight 600
        margin-bottom 4px
    .new-addr
      margin-top 15px
      button
        display block
        width 100%
      i
        margin-right 5px
        font-size 18px
        vertical-align middle
</style>