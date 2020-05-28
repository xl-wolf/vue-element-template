import echarts from 'echarts/lib/echarts'

export default {
  title: {
    text: '柱状图动画延迟',
    y: 10,
    x: 10
  },
  legend: {
    data: ['bar', 'bar2'],
    top: 10
  },
  tooltip: {},
  xAxis: {
    data: [], //结合具体数据填充
    splitLine: {
      show: false
    }
  },
  yAxis: {
  },
  // dataZoom: [
  //   {
  //     type: 'inside',
  //     start: 0,
  //     end: 10
  //   },
  //   {
  //     start: 0,
  //     end: 10,
  //     handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
  //     handleSize: '80%',
  //     handleStyle: {
  //       color: '#fff',
  //       shadowBlur: 3,
  //       shadowColor: 'rgba(0, 0, 0, 0.6)',
  //       shadowOffsetX: 2,
  //       shadowOffsetY: 2
  //     }
  //   }
  // ],
  series: [{
    name: 'bar',
    type: 'bar',
    itemStyle: {
      color: new echarts.graphic.LinearGradient(
        0, 0, 0, 1,
        [
          { offset: 0, color: '#83bff6' },
          { offset: 0.5, color: '#188df0' },
          { offset: 1, color: '#188df0' }
        ]
      )
    },
    emphasis: {
      itemStyle: {
        color: new echarts.graphic.LinearGradient(
          0, 0, 0, 1,
          [
            { offset: 0, color: '#2378f7' },
            { offset: 0.7, color: '#2378f7' },
            { offset: 1, color: '#83bff6' }
          ]
        )
      }
    },
    data: [],//结合具体数据填充
    animationDelay: function (idx) {
      return idx * 10;
    }
  }, {
    name: 'bar2',
    type: 'bar',
    itemStyle: {
      color: new echarts.graphic.LinearGradient(
        0, 0, 0, 1,
        [
          { offset: 0, color: '#f683bf' },
          { offset: 0.5, color: '#f0188d' },
          { offset: 1, color: '#f0188d' }
        ]
      )
    },
    emphasis: {
      itemStyle: {
        color: new echarts.graphic.LinearGradient(
          0, 0, 0, 1,
          [
            { offset: 0, color: '#f72378' },
            { offset: 0.7, color: '#f72378' },
            { offset: 1, color: '#f683bf' }
          ]
        )
      }
    },
    data: [],//结合具体数据填充
    animationDelay: function (idx) {
      return idx * 10 + 100;
    }
  }],
  animationEasing: 'elasticOut',
  animationDelayUpdate: function (idx) {
    return idx * 5;
  }
};