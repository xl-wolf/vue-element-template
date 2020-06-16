<template>
  <div class="app-main-container">
    <div id="echarts-mixChart--container"></div>
  </div>
</template>

<script>
// 引入基本模板
import Echarts from 'echarts/lib/echarts'
// 引入柱状图，线图组件
import 'echarts/lib/chart/line'
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
import { theme_01, theme_02 } from './themes'
import { mapGetters } from 'vuex'
import mixins from '../mixins'

export default {
  name: 'mixChart',
  mixins:[mixins],
  data() {
    return {
      mixEchartsRef: null
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
        this.onWindowResize(this.mixEchartsRef)
      }
    }
  },
  created() {
    // 注册主题
    this.registerTheme()
  },
  mounted() {
    this.initMixEchart()
  },
  methods: {
    // 注册主题
    registerTheme() {
      Echarts.registerTheme('theme_01', theme_01)
      Echarts.registerTheme('theme_02', theme_02)
    },

    initMixEchart() {
      // 获取echarts容器与其引用
      const mixEchartsContainer = document.getElementById('echarts-mixChart--container')
      this.mixEchartsRef = Echarts.init(mixEchartsContainer, 'theme_02')
      this.generateChartData().then(res => {
        console.log(res)
        const chartOpts = res
        // 使用指定的配置项和数据显示图表
        this.mixEchartsRef.setOption(chartOpts)
      })
      window.onresize = this.onWindowResize.bind(null,this.mixEchartsRef)
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
#echarts-mixChart--container {
  height: inherit;
}
</style>