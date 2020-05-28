import echarts from 'echarts'

export default {
  tooltip: {
    trigger: 'item',
    formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: ['30%', '75%'],
      center: ['50%', '50%'],
      data: [
        {
          value: 335,
          name: '直接访问',
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(152,251,152,1)'
              }, {
                offset: 1,
                color: 'rgba(64,224,208,1)'
              }]),
              shadowBlur: 200,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        },
        {
          value: 310,
          name: '邮件营销',
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(5,15,88,1)'
              }, {
                offset: 1,
                color: 'rgba(235,122,255,1)'
              }]),
              shadowBlur: 200,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        },
        {
          value: 274,
          name: '联盟广告',
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(5,193,255,1)'
              }, {
                offset: 1,
                color: 'rgba(15,15,90,1)'
              }]),
              shadowBlur: 200,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        },
        {
          value: 235,
          name: '视频广告',
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(255,34,34,1)'
              }, {
                offset: 1,
                color: 'rgba(80,123,45,1)'
              }]),
              shadowBlur: 200,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        },
        {
          value: 400,
          name: '搜索引擎',
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(75,0,130,1)'
              }, {
                offset: 1,
                color: 'rgba(176,196,222,1)'
              }]),
              shadowBlur: 200,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ].sort(function (a, b) { return a.value - b.value }),
      roseType: 'radius',
      label: {
        normal: {
          textStyle: {
            color: 'rgba(255, 255, 255, 1)'
          }
        }
      },
      labelLine: {
        normal: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 1)'
          },
          smooth: 0.2,
          length: 10,
          length2: 20
        }
      },
      animationType: 'scale',
      animationEasing: 'elasticOut',
      animationDelay: function (idx) {
        return Math.random() * 200;
      }
    },
    {
      name: '内环',
      type: 'pie',
      silent: true,
      clockWise: true,
      hoverAnimation: false,
      animationType: 'scale',
      radius: ['22%', '25%'],
      label: {
        normal: {
          position: 'center'
        }
      },
      data: [{
        value: 100,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(152,251,152,1)'
            }, {
              offset: 1,
              color: 'rgba(64,224,208,1)'
            }])
          }
        }
      }]
    },
    {
      name: '线1',
      type: 'pie',
      silent: true,
      clockWise: true,
      hoverAnimation: false,
      animationType: 'scale',
      radius: ['80%', '80.5%'],
      label: {
        normal: {
          position: 'center'
        }
      },
      data: [{
        value: 100,
        itemStyle: {
          normal: {
            color: 'rgba(255,255,255,0.3)'
          }
        }
      }]
    },
    {
      name: '线2',
      type: 'pie',
      silent: true,
      clockWise: true,
      hoverAnimation: false,
      animationType: 'scale',
      radius: ['70%', '70.3%'],
      label: {
        normal: {
          position: 'center'
        }
      },
      data: [{
        value: 100,
        itemStyle: {
          normal: {
            color: 'rgba(255,255,255,0.15)',
            borderType: 'dotted'
          }
        }
      }]
    }
  ]
}