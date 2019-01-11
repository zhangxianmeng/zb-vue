<template>
  <div class="user-center">
    <v-header :data="headData" @leftIconClick="back" @rightIconClick="openService"></v-header>
    <div class="content">
      <user-header></user-header>
      <vip :isShowCommon="false"></vip>
    </div>
  </div>
</template>

<script>
  import {commonHead} from '@/common/js/mixin'
  import vip from '@/pages/activity/vip/vip.vue'
  import userHeader from 'MComponents/user-header/user-header'

  export default {
    mixins: [commonHead],
    data() {
      return {
      }
    },
    computed: {},
    methods: {
    },
    watch: {},
    components: {userHeader,vip}

  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/mixin'
  .user-center
    mobile-wrapper()
</style>