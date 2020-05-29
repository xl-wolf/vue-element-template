<template>
  <div class="app-main-container">
    <div id="echarts-map--container"></div>
  </div>
</template>

<script>
// 引入基本模板
import Echarts from 'echarts/lib/echarts'
// 引入柱状图组件
import 'echarts/lib/chart/lines'
import 'echarts/lib/chart/effectScatter'
// 引入地图和title组件，图例等组件
import 'echarts/map/js/china'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
// 引入柱状图基本配置文件
import mapOpts, { geoCoordMap, planePath, convertData, color } from './mapOpts'
// 引入echarts主题配置文件
import { theme_01, theme_02 } from './themes'
export default {
  name: 'echartsMap',
  created() {
    // 注册主题
    this.registerTheme()
  },
  mounted() {
    this.initMapEchart()
  },
  methods: {
    // 注册主题
    registerTheme() {
      Echarts.registerTheme('theme_01', theme_01)
      Echarts.registerTheme('theme_02', theme_02)
    },

    initMapEchart() {
      // 获取echarts容器与其引用
      const mapEchartsContainer = document.getElementById('echarts-map--container')
      const mapEchartsRef = Echarts.init(mapEchartsContainer, 'theme_02')
      this.generateMapData().then(res => {
        // console.log(res)
        mapOpts.series = res
        // 使用指定的配置项和数据显示图表
        mapEchartsRef.setOption(mapOpts)
      })
      window.onresize = mapEchartsRef.resize
    },
    // 生成随机数据-->后期的ajax请求
    generateMapData() {
      return new Promise((resolve, reject) => {
        // 模拟假数据
        let BJData = [
          [{ name: '北京' }, { name: '上海', value: 95 }],
          [{ name: '北京' }, { name: '广州', value: 90 }],
          [{ name: '北京' }, { name: '大连', value: 80 }],
          [{ name: '北京' }, { name: '南宁', value: 70 }],
          [{ name: '北京' }, { name: '南昌', value: 60 }],
          [{ name: '北京' }, { name: '拉萨', value: 50 }],
          [{ name: '北京' }, { name: '长春', value: 40 }],
          [{ name: '北京' }, { name: '包头', value: 30 }],
          [{ name: '北京' }, { name: '重庆', value: 20 }],
          [{ name: '北京' }, { name: '常州', value: 10 }]
        ]

        let SHData = [
          [{ name: '上海' }, { name: '包头', value: 95 }],
          [{ name: '上海' }, { name: '昆明', value: 90 }],
          [{ name: '上海' }, { name: '广州', value: 80 }],
          [{ name: '上海' }, { name: '郑州', value: 70 }],
          [{ name: '上海' }, { name: '长春', value: 60 }],
          [{ name: '上海' }, { name: '重庆', value: 50 }],
          [{ name: '上海' }, { name: '长沙', value: 40 }],
          [{ name: '上海' }, { name: '北京', value: 30 }],
          [{ name: '上海' }, { name: '丹东', value: 20 }],
          [{ name: '上海' }, { name: '大连', value: 10 }]
        ]

        let GZData = [
          [{ name: '广州' }, { name: '福州', value: 95 }],
          [{ name: '广州' }, { name: '太原', value: 90 }],
          [{ name: '广州' }, { name: '长春', value: 80 }],
          [{ name: '广州' }, { name: '重庆', value: 70 }],
          [{ name: '广州' }, { name: '西安', value: 60 }],
          [{ name: '广州' }, { name: '成都', value: 50 }],
          [{ name: '广州' }, { name: '常州', value: 40 }],
          [{ name: '广州' }, { name: '北京', value: 30 }],
          [{ name: '广州' }, { name: '北海', value: 20 }],
          [{ name: '广州' }, { name: '海口', value: 10 }]
        ]

        let SZData = [
          [{ name: '深圳' }, { name: '福州', value: 120 }],
          [{ name: '深圳' }, { name: '长春', value: 100 }],
          [{ name: '深圳' }, { name: '重庆', value: 95 }],
          [{ name: '深圳' }, { name: '兰州', value: 90 }],
          [{ name: '深圳' }, { name: '乌鲁木齐', value: 80 }],
          [{ name: '深圳' }, { name: '厦门', value: 55 }],
          [{ name: '深圳' }, { name: '成都', value: 50 }],
          [{ name: '深圳' }, { name: '北京', value: 30 }],
          [{ name: '深圳' }, { name: '鄂尔多斯', value: 20 }],
          [{ name: '深圳' }, { name: '拉萨', value: 10 }]
        ]
        let series = [];
        [
          ['北京', BJData],
          ['上海', SHData],
          ['广州', GZData],
          ['深圳', SZData]
        ].forEach((item, i) => {
          series.push(
            {
              name: item[0] + ' Top10',
              type: 'lines',
              zlevel: 1,
              effect: {
                show: true,
                period: 6,
                trailLength: 0.7,
                color: '#fff',
                symbolSize: 3
              },
              lineStyle: {
                normal: {
                  color: color[i],
                  width: 0,
                  curveness: 0.2
                }
              },
              data: convertData(item[1])
            },
            {
              name: item[0] + ' Top10',
              type: 'lines',
              zlevel: 2,
              effect: {
                show: true,
                period: 6,
                trailLength: 0,
                symbol: planePath,
                symbolSize: 15
              },
              lineStyle: {
                normal: {
                  color: color[i],
                  width: 1,
                  opacity: 0.4,
                  curveness: 0.2
                }
              },
              data: convertData(item[1])
            },
            {
              name: item[0] + ' Top10',
              type: 'effectScatter',
              coordinateSystem: 'geo',
              zlevel: 2,
              rippleEffect: {
                brushType: 'stroke'
              },
              label: {
                normal: {
                  show: true,
                  position: 'right',
                  formatter: '{b}'
                }
              },
              symbolSize: val => {
                return val[2] / 8
              },
              itemStyle: {
                normal: {
                  color: color[i]
                }
              },
              data: item[1].map(dataItem => {
                return {
                  name: dataItem[1].name,
                  value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                }
              })
            }
          )
        })
        resolve(series)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#echarts-map--container {
  height: inherit;
}
</style>
