<template>
  <div class="app-container">
    <div id="echarts-pieChart--container"></div>
  </div>
</template>

<script>
// 引入基本模板
import Echarts from 'echarts/lib/echarts'
// 引入柱状图组件
import 'echarts/lib/chart/pie'
// 引入提示框和title组件，图例等组件
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/dataZoom'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/legendScroll' //图例翻译滚动
// 引入柱状图基本配置文件
import chartOpts from './chartOpts'
// 引入echarts主题配置文件
import { theme_01, theme_02 } from './themes'
export default {
  name: 'pieChart',
  created() {
    // 注册主题
    this.registerTheme()
  },
  mounted() {
    this.initPieEchart()
  },
  methods: {
    // 注册主题
    registerTheme() {
      Echarts.registerTheme('theme_01', theme_01)
      Echarts.registerTheme('theme_02', theme_02)
    },

    initPieEchart() {
      // 获取echarts容器与其引用
      const pieEchartsContainer = document.getElementById('echarts-pieChart--container')
      const pieEchartsRef = Echarts.init(pieEchartsContainer, 'theme_02')
      this.generateChartData().then(res => {
        console.log(res)
        const chartOpts = res
        // // 使用指定的配置项和数据显示图表
        pieEchartsRef.setOption(chartOpts)
      })
      window.onresize = pieEchartsRef.resize
    },
    // 生成随机数据-->后期的ajax请求
    generateChartData() {
      return new Promise((resolve, reject) => {
        resolve(chartOpts)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#echarts-pieChart--container {
  height: 600px;
}
</style>