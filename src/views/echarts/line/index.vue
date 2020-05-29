<template>
  <div class="app-main-container">
    <div id="echarts-lineChart--container"></div>
  </div>
</template>

<script>
// 引入基本模板
import Echarts from 'echarts/lib/echarts'
// 引入柱状图组件
import 'echarts/lib/chart/line'
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
  name: 'lineChart',
  created() {
    // 注册主题
    this.registerTheme()
  },
  mounted() {
    this.initLineEchart()
  },
  methods: {
    // 注册主题
    registerTheme() {
      Echarts.registerTheme('theme_01', theme_01)
      Echarts.registerTheme('theme_02', theme_02)
    },

    initLineEchart() {
      // 获取echarts容器与其引用
      const lineEchartsContainer = document.getElementById('echarts-lineChart--container')
      const lineEchartsRef = Echarts.init(lineEchartsContainer, 'theme_02')
      this.generateChartData().then(res => {
        console.log(res)
        const { date, data } = res
        chartOpts.xAxis.data = date
        chartOpts.series[0].data = data
        // 使用指定的配置项和数据显示图表
        lineEchartsRef.setOption(chartOpts)
      })
      window.onresize = lineEchartsRef.resize
    },
    // 生成随机数据-->后期的ajax请求
    generateChartData() {
      return new Promise((resolve, reject) => {
        let base = +new Date(1968, 9, 3)
        const oneDay = 24 * 3600 * 1000
        let date = []
        let data = [Math.random() * 300]

        for (let i = 1; i < 20000; i++) {
          let now = new Date((base += oneDay))
          date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'))
          data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]))
        }
        resolve({ date, data })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#echarts-lineChart--container {
  height: inherit;
}
</style>