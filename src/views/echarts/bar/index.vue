<template>
  <div class="app-main-container">
    <div id="echarts-bar--container"></div>
  </div>
</template>

<script>
// 引入基本模板
import Echarts from 'echarts/lib/echarts'
// 引入柱状图组件
import 'echarts/lib/chart/bar'
// 引入提示框和title组件，图例等组件
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/dataZoom'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/legendScroll' //图例翻译滚动
// 引入柱状图基本配置文件
import chartOpts from './chartOpts'
// 引入echarts主题配置文件
import { _01, _02 } from './themes'
import { mapGetters } from 'vuex'
import mixins from '../mixins'

export default {
  name: 'bar',
  mixins:[mixins],
  data() {
    return {
      barEchartsRef: null
    }
  },
  computed: {
    ...mapGetters(['menuStatus'])
  },
  watch: {
    menuStatus: {
      deep: false,
      immediate: false,
      handler: function(val, oldVal) {
        this.onWindowResize(this.barEchartsRef)
      }
    }
  },
  created() {
    // 注册主题
    this.registerTheme()
  },
  mounted() {
    this.initBarEchart()
  },
  methods: {
    // 注册主题
    registerTheme() {
      Echarts.registerTheme('theme_01', _01)
      Echarts.registerTheme('theme_02', _02)
    },
    // 初始化柱状图
    initBarEchart() {
      // 获取echarts容器与其引用
      const barEchartsContainer = document.getElementById('echarts-bar--container')
      this.barEchartsRef = Echarts.init(barEchartsContainer, 'theme_01')
      this.generateChartData().then(res => {
        // console.log(res)
        const { xAxisData, data1, data2 } = res
        chartOpts.xAxis.data = xAxisData
        chartOpts.series[0].data = data1
        chartOpts.series[1].data = data2
        // 使用指定的配置项和数据显示图表
        this.barEchartsRef.setOption(chartOpts)
      })
      window.onresize = this.onWindowResize.bind(null,this.barEchartsRef)
    },
    // 生成随机数据-->后期的ajax请求
    generateChartData() {
      return new Promise((resolve, reject) => {
        let xAxisData = []
        let data1 = []
        let data2 = []
        for (let i = 0; i < 100; i++) {
          xAxisData.push('类目' + i)
          data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5)
          data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5)
        }
        resolve({ xAxisData, data1, data2 })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#echarts-bar--container {
  height: inherit;
}
</style>