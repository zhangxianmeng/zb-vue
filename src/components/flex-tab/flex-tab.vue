<template>
  <div class="flex-tab">
    <a @click="selectItem(idx,item)" :class="{active:currentIdx===idx}" v-for="(item,idx) in flexList" href="javascript:;">{{item.text}}</a>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    props:{
      flexList:{
        type:Array,
        default:[]
      },
      currentIdx:{
        type:Number,
        default:0
      }
    },
    computed: {},
    created() {
    },
    methods: {
      selectItem(idx,item){
        this.$emit('selectItem',idx,item)
      }
    },
    watch: {},
    components: {}

  }
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  .flex-tab
    display flex
    line-height 50px
    text-align center
    background $color-primary
    a
      flex 1
      color $color-light
      font-size 16px
      font-weight 600
      &.active
        background $color-light
        color $color-primary



</style>