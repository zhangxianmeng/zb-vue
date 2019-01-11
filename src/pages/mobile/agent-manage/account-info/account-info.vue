<template>
  <div class="agent-manage">
    <v-header :data="headData" @leftIconClick="back" @rightIconClick="openService"></v-header>
    <div class="content">
      this is agent page
    </div>
  </div>
</template>

<script>
  import {commonHead} from '@/common/js/mixin'

  export default {
    mixins: [commonHead],
    data() {
      return {}
    },
    computed: {},
    created() {
    },
    methods: {},
    watch: {},
    components: {}

  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/mixin'
  @import '~common/stylus/variable'
  .agent-manage
    mobile-wrapper()
    background #eee

</style>