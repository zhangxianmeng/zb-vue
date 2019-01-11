<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
  import {isMobilePlatform} from '@/common/js/util'
  export default {
    data() {
      return {}
    },
    computed: {},
    created() {
      if (isMobilePlatform() && !window.location.href.includes('/mobile')) {
        window.location.href = '/mobile/index'
      }
    },
    methods: {},
    watch: {},
    components: {}
  }
</script>
