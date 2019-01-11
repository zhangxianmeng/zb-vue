<template>
  <div class="common-user-center">
    <tab-title @selectItem="selectItem" :tab-title-list="tabTitleList" :currentIdx="currentIdx"></tab-title>
    <div class="border-content">
      <level></level>
      <div class="chart-line-wrapper">
        <!--<chart-line :chartData="chartData"></chart-line>-->
        <chart-bar :chartData="chartData"></chart-bar>

      </div>
    </div>
  </div>
</template>

<script>
  import tabTitle from '@/components/tab-title/tab-title'
  import level from '@/components/level/level'
  // import chartLine from '@/components/chart-line/chart-line'
  import chartBar from '@/components/chart-bar/chart-bar'

  import {queryProfit} from '@/api/index'

  export default {
    data() {
      return {
        tabTitleList: [
          {
            text: '个人中心'
          }
        ],
        currentIdx: 0,
        chartData: {}
      }
    },
    computed: {},
    created() {
      this._queryProfit()
    },
    methods: {
      selectItem(idx) {
        this.currentIdx = idx
      },
      //获取数据
      _queryProfit() {
        queryProfit().then((res) => {
          if (this.ERR_OK === res.code) {
            this.chartData = res.data
          } else {
            this.$message({
              type: 'warning',
              message: res.message
            })
          }
        })
      }
    },
    watch: {},
    components: {
      level,
      tabTitle,
      chartBar,
      // chartLine
    }

  }
</script>

<style lang="stylus" scoped>
  .chart-line-wrapper
    margin-top 100px
</style>