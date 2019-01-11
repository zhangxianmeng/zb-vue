<template>
  <div>
    <bar-chart :chartData="chartData" :height="350"></bar-chart>
  </div>
</template>

<script>
  import BarChart from './BarChart.js'

  export default {
    props: {
      chartData: {
        type: Object,
        default: {
          "tiKuan": 0,
          "touZhu": 0,
          "yingLi": 0,
          "cunKuan": 0
        }
      }
    },
    components: {
      BarChart
    }
  }
</script>

<style lang="stylus" scoped>

</style>